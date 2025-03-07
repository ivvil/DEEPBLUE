<script>
	import { onMount } from 'svelte';
	import { T } from '@threlte/core';
	import { interactivity, useGltf } from '@threlte/extras';
	import Bbox from '$lib/bbox';
	import { Vector3, Object3D } from 'three';
	import { TransformControls } from '@threlte/extras';

	let {
		modelName,
		pos = new Vector3(0, 0, 0),
		rotation = new Vector3(0, 0, 0),
		size = new Vector3(1, 1, 1),
		camera
	} = $props();

	interactivity();
	let gltf = useGltf(modelName);
	const geo = modelName.substring(0, modelName.lastIndexOf('.')) + '_1';

	function scaleMesh(mesh) {
		Bbox.scale(mesh, size);
	}

	let groupRef;

	const gridOrigin = { x: -5, y: -5 };

	function updateGridCells() {
		if (!groupRef || !groupRef.position) {
			console.log('groupRef not available yet.');
			return;
		}
		console.log('updateGridCells called');
		const worldPos = groupRef.position;
		const gridX = Math.floor(worldPos.x - gridOrigin.x);
		const gridY = Math.floor(worldPos.z - gridOrigin.y);

		const shipLength = Math.round(size.z);
		let occupiedCells = [];

		if (Math.abs(groupRef.rotation.y % Math.PI) < 0.1) {
			for (let i = 0; i < shipLength; i++) {
				occupiedCells.push({ x: gridX, y: gridY + i });
			}
		} else {
			for (let i = 0; i < shipLength; i++) {
				occupiedCells.push({ x: gridX + i, y: gridY });
			}
		}
		console.log(`Ship ${modelName} moved to grid cell base (${gridX}, ${gridY})`, occupiedCells);
	}
</script>

<T.Group
	bind:this={groupRef}
	position={[pos.x, pos.y, pos.z]}
	rotation={[rotation.x, rotation.y, rotation.z]}
>
	<TransformControls
		translationSnap={1}
		rotationSnap={Math.PI / 2}
		scaleSnap={0.1}
		mode="translate"
		{camera}
		object={groupRef}
		on:change={updateGridCells}
		on:mouseUp={() => {
			console.log('mouseUp triggered');
			updateGridCells();
		}}
	>
		{#await gltf then loaded}
			<T.Mesh
				geometry={loaded.nodes[geo].geometry}
				material={loaded.materials.colormap}
				oncreate={scaleMesh}
			/>
		{/await}
	</TransformControls>
</T.Group>
