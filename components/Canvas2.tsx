import {useEffect, useRef} from "react";
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

declare const window: any;
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
let controls: OrbitControls | null = null

let currentIntersect: THREE.Intersection<THREE.Object3D<THREE.Event>> | null = null
const mouse = {
    x: -1,
    y: -1
}

const Dummy3 = () => {
    console.error("----Dummy3 called")
    const ref = useRef<HTMLDivElement>(null)
    const raycaster = new THREE.Raycaster()
    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const cubeGeometry = new THREE.BoxBufferGeometry(0.3, 0.3, 0.3)
    const cubeMaterial = new THREE.MeshBasicMaterial({color: '#e11584'})
    cubeMaterial.transparent = true
    //depthTest까지 했을경우 큐브에 뒷면에 그린 파티클이 보인다.
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    //cube.position.x = 3
    scene.add(cube)

    //resize해도 viewport안으로 들어오는 옵션들
    cube.matrixAutoUpdate = true
    cube.updateMatrix()

    console.error("cube.position :", cube.position)

    const onResize = (e: Event) => {
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

    const onClickCube = (e: MouseEvent) => {
        console.error("event lisnten click!!!")
        mouse.x = e.clientX / sizes.width * 2 - 1
        mouse.y = -(e.clientY / sizes.height) * 2 + 1
    }


    const clock = new THREE.Clock()

    function animate() {
        const elapsedTime = clock.getElapsedTime()

        if (controls) {
            //@ts-ignore
            controls.update()
        }

        raycaster.setFromCamera(mouse, camera)
        const objectsToTest = [cube]
        const intersects = raycaster.intersectObjects(objectsToTest)
        //console.error("intersects", intersects[0])

        if (intersects.length) {
            //window.fullpage_api.moveSlideLeft()
        }

        if (intersects.length) {
            if (!currentIntersect) {
                //console.error('mouse click')
                alert("mouse Click")
            }
            mouse.x = -1
            mouse.y = -1

            currentIntersect = intersects[0]
        } else {
            if (currentIntersect) {
                console.log('mouse leave')
            }
            currentIntersect = null
        }


        // TODO: Viewport를 벗어나지 않으면서도 랜덤한 값으로 X,Y를 움직여야함
        cube.position.x = Math.cos(elapsedTime) * 3
        cube.position.y = Math.sin(elapsedTime) * 2
        //console.error(cube.position.x)
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    useEffect(() => {
        if (ref.current == null) {
            return
        }
        renderer.render(scene, camera);
        ref.current.appendChild(renderer.domElement)
        controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

        window.addEventListener('resize', onResize)
        window.addEventListener('click', onClickCube)

        animate()
        return () => {
            //TODO removeEventListner
        }

    }, [])
    return (
        <div ref={ref}/>
    )
}

export default Dummy3