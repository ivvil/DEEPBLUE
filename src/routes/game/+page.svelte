<script>
	import { Canvas } from '@threlte/core';
	import { Studio } from '@threlte/studio';
	import { WebGPURenderer } from 'three/webgpu'	
	import Scene from './Scene.svelte';
</script>

<svelte:head>
	<title>Game</title>
	<meta name="description" content="In game" />
</svelte:head>

<div class="app">
	<Canvas>
		<Studio>
			<Scene />
		</Studio>
	</Canvas>
</div>

<style>
  .app {
	display: flex;
	min-height: 100vh;
	min-width: 100vw;
  }
</style>
