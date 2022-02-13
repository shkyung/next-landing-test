import {useRef, useEffect} from 'react'
import * as THREE from 'three'

const parameters = {
    materialColor: '#ffeded'
}
const objectsDistance = 4

const Canvas = () => {
    console.error("Canvas component render")
    const ref = useRef<HTMLDivElement>(null)

    const scene = new THREE.Scene()
    console.error("scene : ", scene)
    const textureLoader = new THREE.TextureLoader()
    const gradientTexture = textureLoader.load("3.jpg")
    gradientTexture.magFilter = THREE.NearestFilter

    const material = new THREE.MeshToonMaterial({
        color: parameters.materialColor,
        gradientMap: gradientTexture
    })

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

    mesh1.position.y = -objectsDistance * 0
    mesh2.position.y = -objectsDistance * 1
    mesh3.position.y = -objectsDistance * 2

    mesh1.position.x = 2
    mesh2.position.x = -2
    mesh3.position.x = 2

    scene.add(mesh1, mesh2, mesh3)

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    console.error(`window.innerWidth- ${window.innerWidth}, window.innerHeight - ${window.innerHeight}`)

    const camera = new THREE.PerspectiveCamera(35, 1300 / 800, 0.1, 100)
    camera.position.z = 6
    scene.add(camera)

    useEffect(() => {
        if(ref.current == null) {
            console.error("???? 종료?")
            return
        }
        console.error("그린다.")

        renderer.render(scene, camera);
        ref.current.appendChild(renderer.domElement)

    },[])

    return (
        <div ref={ref} className="canvas-container"/>
    )

}

export default Canvas