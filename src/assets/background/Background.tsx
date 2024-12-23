import { useEffect} from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'

//TODO: Make background horizontally responsive, vertically consistent [DONE]
//TODO: Render in cool shapes
//TODO: Make cool shapes move with mouse [DONE]
//TODO: Style the shape
//TODO: Position shapes
function Background() {
    let rotation = {
        x: 0,
        y: 0
    }
    let pointerX = 0;
    let pointerY = 0;

    function onPointerMove( event: PointerEvent ) {

        if ( event.isPrimary === false ) return;

        if (event.clientX > pointerX) rotation.x -= 0.01
        if (event.clientY > pointerY) rotation.y -= 0.01
        if (event.clientX < pointerX) rotation.x += 0.01
        if (event.clientY < pointerY) rotation.y += 0.01

        pointerX = event.clientX;
        pointerY = event.clientY;
    }
    
    useEffect(() => {
        addEventListener("pointermove", (event) => {onPointerMove(event)});

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth/window.innerHeight,
            1,
            1000
        );
        camera.position.z = 96;

        const canvas = document.getElementById('myThreeJsCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
        })
        renderer.setClearColor( 0xffffff, 0 )
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100 );

        const torusMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } );
        const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
        torusMesh.position.set(-60, 15, 0);
        scene.add(torusMesh);

        const ambientLight = new THREE.AmbientLight(0xffff00, 0.5);
        ambientLight.castShadow = false;
        scene.add(ambientLight);

        const spotLight = new THREE.DirectionalLight(0x00ffff, 0.5);
        spotLight.castShadow = false;
        spotLight.position.set(-60, 35, 0);
        const helper = new THREE.DirectionalLightHelper( spotLight, 5 ); 

        const spotLight2 = new THREE.DirectionalLight(0x00ff00, 1);
        spotLight2.castShadow = false;
        spotLight2.position.set(-60, -20, 0);
        const helper2 = new THREE.DirectionalLightHelper( spotLight2, 5 ); 

        scene.add(spotLight);
        scene.add(spotLight2);
        scene.add( helper );
        scene.add( helper2 );

        const animate = () => {
            torusMesh.rotation.x = rotation.x;
            torusMesh.rotation.y = rotation.y;
            
            renderer.render(scene, camera);
            window.requestAnimationFrame(animate);
        };
        animate();
    }, []);

    return (
        <div className="text-center">
            <canvas className="p-0 m-0" id="myThreeJsCanvas"/>
        </div>
    )
}

export default Background