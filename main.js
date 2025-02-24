import * as THREE from 'three';
import Playfield from './Playfield.js';
import { Game } from './Game.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const light = new THREE.AmbientLight(0xaaaaaa);
scene.add(light);

const board = new Playfield(scene);
board.add();

camera.position.z = 20;

const clock = new THREE.Clock();

let game = new Game(scene, board);
game.rndmField();

function animate() {
    const delta = clock.getDelta();
    board.update(delta);
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);