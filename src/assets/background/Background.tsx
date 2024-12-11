import { useEffect} from 'react'
import * as THREE from 'three'

function Background() {
    useEffect(() => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth/window.innerHeight,
            1,
            1000
        );
        camera.position.z = 96;

        const canvas = document.getElementById('myThreeJsCanvas');
        // @ts-expect-error
        canvas.width = window.innerWidth;
        // @ts-expect-error
        canvas.height = window.innerHeight;
        const renderer = new THREE.WebGLRenderer({
            // @ts-expect-error
            canvas,
            antialias: true,
            alpha: true,
        })
        renderer.setClearColor( 0xffffff, 0 )
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ambientLight.castShadow = true;
        scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.castShadow = true;
        spotLight.position.set(0, 64, 32);
        scene.add(spotLight);

        const boxGeometry = new THREE.BoxGeometry(10, 10, 16);
        //boxGeometry.translate( 10, 10, 0);
        const boxMaterial = new THREE.MeshNormalMaterial();
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        boxMesh.position.set(-70, 30, 0);
        scene.add(boxMesh);

        const animate = () => {
            boxMesh.rotation.x += 0.01;
            boxMesh.rotation.y += 0.01;
            
            renderer.render(scene, camera);
            window.requestAnimationFrame(animate);
        };
        animate();
    }, []);

    return (
        <canvas className="p-0 m-0" id="myThreeJsCanvas"/>
    )
}

export default Background