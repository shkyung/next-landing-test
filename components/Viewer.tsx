import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {useEffect, useRef} from "react";
import {Vector3} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const Viewer = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.error("---window 접근 가능 ? : ", window)

        if (ref.current == null) {
            console.error("null 이라 리턴")
           return;
        }

        console.error("null 아님")

        const loader = new GLTFLoader()
        const renderer = new THREE.WebGLRenderer()
        //gltf cameras.near 0.04999999701976776
        // aspect window.innerWidth / window.innerHeight
        const camera = new THREE.PerspectiveCamera( 45,2 , 0.1, 1000 );
        const scene = new THREE.Scene();


        loader.load('/glb-test.glb', function(gltf) {
            //scene.background = new THREE.Color( 0xffffff );

            camera.position.set( 100, 50, 500 );
            scene.add( gltf.scene );


            let light = new THREE.HemisphereLight( 0xffffff, 0x444444 );

            scene.add( light );
            renderer.setSize(innerWidth, innerHeight);

            scene.add(gltf.scene)
            ref?.current?.appendChild(renderer.domElement);

            console.error("load gltf : ", gltf)
            renderer.render(scene, camera);
        }, undefined, function(error) {
            console.error(error)
        })

        // const innerHeight = window.innerHeight;
        // const innerWidth = window.innerWidth;
        // const aspect = innerWidth / innerHeight;
        //
        //
        // const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        // const renderer = new THREE.WebGLRenderer()
        //
        // renderer.setClearColor("#EEEEEE");
        // renderer.setSize(innerWidth, innerHeight);
        //
        // // 축
        // const axes = new THREE.AxesHelper(20);
        // scene.add(axes);
        //
        // // 배경으로 사용할 2차원 사각형
        // const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
        // const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
        // const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        //
        // plane.rotation.x = -0.5 * Math.PI;
        // plane.position.x = 15;
        // plane.position.y = 0;
        // plane.position.z = 0;
        // scene.add(plane);
        //
        // // 정사각형
        // const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        // const cubeMaterial = new THREE.MeshBasicMaterial({
        //     color: 0xff0000,
        //     wireframe: true, // 이 옵션을 빼면 솔리드 객체(solid object)로 렌더링된다.
        // });
        // const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        //
        // cube.position.x = -4;
        // cube.position.y = 3;
        // cube.position.z = 0;
        // scene.add(cube);
        //
        // // 구체
        // const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        // const sphereMaterial = new THREE.MeshBasicMaterial({
        //     color: 0x777ff,
        //     wireframe: true,
        // });
        // const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        //
        // sphere.position.x = 20;
        // sphere.position.y = 4;
        // sphere.position.z = 2;
        // scene.add(sphere);
        //
        // // 카메라 설정
        // camera.position.x = -30;
        // camera.position.y = 40;
        // camera.position.z = 30;
        // camera.lookAt(scene.position);

        // ref.current.appendChild(renderer.domElement);
        // renderer.render(scene, camera);
    }, [])
    return (
        <div ref={ref} style={{width:'100%', height: '100%'}}/>
    )
}

export default Viewer
