<template>
    <div id="canvas_wrapper">
        <canvas id="BgParticle"></canvas>
    </div>
</template>
<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Wintersky from '~/assets/js/wintersky.esm.js'

const View = {};

async function loadJSON(path) {
    let content = await new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                resolve(xhr.response);
            } else {
                reject(xhr.response);
            }
        };
        xhr.send();
    })
    return content;
}

async function initializeApp() {
    View.canvas = document.getElementById('BgParticle')
    View.camera = new THREE.PerspectiveCamera(45, 16 / 9, 0.1, 3000);
    // const left = -View.canvas.width / 2;
    // const right = View.canvas.width / 2;  // 默认的canvas大小
    // const top = -View.canvas.height / 2;
    // const bottom = View.canvas.height / 2;  // 默认的canvas大小
    // const near = 0.1;
    // const far = 3000;
    // View.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    // View.camera.zoom = 10;
    View.camera.position.set(0, 0, 10)
    View.renderer = new THREE.WebGLRenderer({
        canvas: View.canvas,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
    })

    View.controls = new OrbitControls(View.camera, View.canvas);
    View.controls.target.set(0, 0, 0)
    View.controls.screenSpacePanning = true;
    View.controls.zoomSpeed = 1.4;

    View.scene = new THREE.Scene()

    View.helper = new THREE.AxesHelper(1);
    View.grid = new THREE.GridHelper(64, 64, '#aaaaaa', '#cccccc');
    View.grid.position.y = -0.001
    // View.grid.rotation.x = Math.PI * -.5
    View.scene.add(View.helper);
    View.scene.add(View.grid);

    resizeCanvas()


    // Initialize Particles
    let content = await loadJSON('../examples/rainbow.particle.json');

    View.wintersky = new Wintersky.Scene({
        // Setup event sub-emitters logic (optional)
        async fetchParticleFile(identifier) {
            if (identifier == 'snowstorm:drop_splash') {
                let json = await loadJSON('../examples/drop_splash.particle.json');
                return json;
            }
        }
    })
    View.emitter = new Wintersky.Emitter(View.wintersky, content);
    View.scene.add(View.wintersky.space);

    animate();
    View.emitter.playLoop();
}

function animate() {
    requestAnimationFrame(animate);
    View.controls.update();
    // Update Particle facing rotation
    View.wintersky.updateFacingRotation(View.camera);
    // Render
    View.renderer.render(View.scene, View.camera);
}

function resizeCanvas() {
    var wrapper = View.canvas.parentNode;
    // var height = wrapper.clientHeight
    // var width = wrapper.clientWidth
    var height = wrapper.clientHeight
    var width = wrapper.clientWidth

    View.camera.aspect = width / height;
    // View.camera.left = -width / 2;
    // View.camera.right = width / 2;  // 默认的canvas大小
    // View.camera.top = -height / 2;
    // View.camera.bottom = height / 2;  // 默认的canvas大小
    View.camera.updateProjectionMatrix();

    View.renderer.setSize(width, height);
    // View.renderer.setPixelRatio(window.devicePixelRatio);
}


async function switchParticleFile(select) {
    let name = select.selectedOptions[0].id;
    let content = await loadJSON(`../examples/${name}.particle.json`);

    View.emitter.stop(true);
    View.emitter.config.reset().setFromJSON(content);
    View.emitter.playLoop();
}

onMounted(() => {
    initializeApp()
    window.addEventListener('resize', resizeCanvas, false);
})
onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas, false)
})
</script>
<style>
#canvas_wrapper {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
}
</style>