import "./style.css";
import luxy from "luxy.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

window.addEventListener("load", () => {
  luxy.init();
});

const body = document.querySelector("body");

// loader
const textureLoader = new THREE.TextureLoader();
const ballTexture = textureLoader.load("/texture/NormalMap.png");

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.2,
  color: "#292929",
  normalMap: ballTexture,
});

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(-1.86, 1, -1.65);
pointLight2.intensity = 10;
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xe1ff, 2);
pointLight3.position.set(2.13, -3, -1.95);
pointLight3.intensity = 10;
scene.add(pointLight3);

// gui.add(pointLight3.position, "y").min(-3).max(3).step(0.01);
// gui.add(pointLight3.position, "x").min(-6).max(6).step(0.01);
// gui.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
// gui.add(pointLight3, "intensity").min(0).max(10).step(0.01);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
let scrollTop = 100;
window.addEventListener("scroll", () => {
  scrollTop = window.scrollY;
  var colorPlus = window.scrollY / 30;
  body.style.background = `rgb(${15 + colorPlus},${200 + colorPlus},${
    210 + colorPlus
  })`;
});

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  var tempPosition = sphere.position;
  tempPosition.z = scrollTop / 3000;

  sphere.position.lerp(tempPosition, 0.2);

  sphere.rotation.x = scrollTop / 500;

  pointLight2.position.z = scrollTop / 2000;
  pointLight3.position.z = -scrollTop / 2000;

  // Update Orbital Controls
  //   controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
