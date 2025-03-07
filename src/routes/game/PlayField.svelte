<script>
	import { T, useTask } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	import { LineBasicMaterial, Mesh, MeshStandardMaterial, PlaneGeometry, Vector2, Vector3 } from 'three';
	import { DoubleSide, RepeatWrapping } from 'three';
	import { globals } from './Globals';
	import Grid from './Grid.svelte';
	

	const texture = useTexture('assets/ocean.jpg', {
		transform: (texture) => {
			texture.wrapS = RepeatWrapping;
			texture.wrapT = RepeatWrapping;
			texture.repeat.set(1, 1);
			return texture;
		}
	});

	let rows = Array.from(Array(globals.playfield.size.x + 1).keys());
	let cols = Array.from(Array(globals.playfield.size.y + 1).keys());

	let xOffset = 0;
	useTask((dt) => {
		xOffset += dt * 0.1;
	});
</script>



{#await texture then ocean}
	<T.Mesh rotation.x={Math.PI / 2} name="bg" position={[ 0, -0.01, 0 ]}>
		<T.PlaneGeometry args={[globals.playfield.size.x, globals.playfield.size.y]} />
		<T.MeshBasicMaterial map={ocean} side={DoubleSide} map.offset.x={xOffset}></T.MeshBasicMaterial>
	</T.Mesh>
{/await}

{#each rows as currRow}
	<Grid pos={new Vector3(-5, 0, currRow - 5)} len={10}/>
{/each}

{#each cols as currCol}
	<Grid pos={new Vector3(currCol - 5, 0, 5)} len={10} rotation={new Vector3(0, Math.PI / 2, 0)}/>
{/each}
