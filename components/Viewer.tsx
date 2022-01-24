import {useEffect, useRef} from "react";
import * as THREE from 'three';

const Viewer = () => {
    const ref = useRef<HTMLDivElement>(null)
    const scene = new THREE.Scene();
    const SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    const VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 2, FAR = 5000;
    const camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0,200,400);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer( {antialias:true} );

    useEffect(() => {
        if(ref.current == null) {
            return
        }
    },[])

    return (
        <div ref={ref}/>
    )

}

export default Viewer