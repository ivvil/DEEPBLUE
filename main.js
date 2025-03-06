import * as THREE from 'three';
import Playfield from './Playfield.js';
import { Game } from './Game.js';
import { extend } from '@threlte/core';
import { Canvas } from '@threlte/core';

extend({ Canvas});

import App from './App.svelte';

const app = new App({
  target: document.body,
});

export default app;