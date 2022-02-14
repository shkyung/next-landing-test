import {useRef, useEffect} from "react";
import * as THREE from 'three'
import * as dat from 'lil-gui'

const sizes = {width: window.innerWidth, height: window.innerHeight}
const parameters = {
    materialColor: '#ffeded'
}
const objectsDistance = 4

const gui = new dat.GUI()
const clock = new THREE.Clock()
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load("/3.jpg")
gradientTexture.magFilter = THREE.NearestFilter

const cursor = {x: 0, y: 0}
let myReq: number


const Canvas = () => {
    const ref = useRef<HTMLDivElement>(null)
    const infoRef = useRef<{ sectionIndex: number, isDarkMode: boolean } | null>(null)
    const positionMap: { [index: string]: any } = {
        reset: {
            y: 4
        },
        light: {
            "1": {
                y: 0,
                meshes: []
            },
            "2": {
                y: -4,
                meshes: []
            },
            "3": {
                y: -8,
                meshes: []
            },
            "4": {
                y: -12,
                meshes: []
            }
        },
        dark: {
            "1": {},
            "2": {},
            "3": {},
            "4": {}
        }
    }

    // Scene
    const scene = new THREE.Scene()
    //Material
    const material = new THREE.MeshToonMaterial({
        color: parameters.materialColor,
        gradientMap: gradientTexture
    })
    // Meshes
    const mesh1 = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.4, 16, 60),
        material
    )
    const mesh2 = new THREE.Mesh(
        new THREE.ConeGeometry(1, 2, 32),
        material
    )
    const mesh3 = new THREE.Mesh(
        new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
        material
    )

    const mesh4 = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 16),
        material
    )
    mesh1.scale.set(0.5, 0.5, 0.5)
    mesh2.scale.set(0.5, 0.5, 0.5)
    mesh3.scale.set(0.5, 0.5, 0.5)
    mesh4.scale.set(0.5, 0.5, 0.5)

    mesh1.position.x = -2
    mesh2.position.x = -2
    mesh3.position.x = -2
    mesh4.position.x = -2

    mesh1.position.y = positionMap.light["1"].y
    mesh2.position.y = positionMap.light["2"].y
    mesh3.position.y = positionMap.light["3"].y
    mesh4.position.y = positionMap.light["4"].y


    positionMap.light["1"].meshes.push(mesh1)
    positionMap.light["2"].meshes.push(mesh2)
    positionMap.light["3"].meshes.push(mesh3)
    positionMap.light["4"].meshes.push(mesh4)

    scene.add(mesh1, mesh2, mesh3, mesh4)

    const sectionMeshes = [mesh1, mesh2, mesh3, mesh4]
    // Lights
    const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
    directionalLight.position.set(1, 1, 0)
    scene.add(directionalLight)

    /**
     * Camera
     */
    // Group
    const cameraGroup = new THREE.Group()
    scene.add(cameraGroup)

    // Base camera
    const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
    camera.position.z = 6
    cameraGroup.add(camera)

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
        alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const handleResize = (renderer: THREE.WebGLRenderer) => {
        console.error("handleResize called")
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    const handleCustomEvent = (e: CustomEvent<{ sectionIndex: number, isDarkMode: boolean }>) => {
        if (!e.detail) {

            camera.position.y = positionMap.reset.y
            return;
        } else {
            const {sectionIndex, isDarkMode} = e.detail
            if (isDarkMode) {

            } else {
                camera.position.y = positionMap.light[sectionIndex].y
                console.error("camera.position.y : ", camera.position.y)
            }

            infoRef.current = e.detail
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        const {clientX, clientY} = e

        cursor.x = clientX / sizes.width - 0.5
        cursor.y = clientY / sizes.height - 0.5
    }

    const tick = () => {
        myReq = window.requestAnimationFrame(tick)

        if (!infoRef.current) {
            //console.error("infoRef.current is null end tick")
            return
        }
        const {sectionIndex, isDarkMode} = infoRef.current

        const targetMeshes = positionMap[isDarkMode ? "dark" : "light"][sectionIndex].meshes
        const elapsedTime = clock.getElapsedTime()

        // Animate camera -> scrollY 대신 customEvent를 받아 핸들러에서 처리

        const parallaxX = cursor.x
        const parallaxY = -cursor.y
        // cameraGroup.position.x = parallaxX
        // cameraGroup.position.y = parallaxY

        cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 0.1
        cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 0.1
        // Animate Meshes

        for (const mesh of sectionMeshes) {
            mesh.position.x = -2
        }
        for (const mesh of targetMeshes) {
            //mesh.rotation.x = elapsedTime * 0.1
            // mesh.rotation.y = elapsedTime * 0.12
            mesh.position.x += elapsedTime * 0.01
        }

        // Render
        renderer.render(scene, camera)
    }

    useEffect(() => {
        if (ref.current == null) {
            return
        }
        gui
            .addColor(parameters, 'materialColor')
            .onChange(() => {
                material.color.set(parameters.materialColor)
            })

        renderer.render(scene, camera)
        ref.current.appendChild(renderer.domElement)

        window.addEventListener('resize', () => handleResize(renderer))
        window.addEventListener('customEvent', handleCustomEvent as EventListener)
        window.addEventListener('mousemove', handleMouseMove)
        tick()

        return () => {
            console.error("----언마운트 cleanup 함수")
            window.cancelAnimationFrame(myReq)
        }
    }, [])


    return (
        <div ref={ref}/>
    )
}

export default Canvas