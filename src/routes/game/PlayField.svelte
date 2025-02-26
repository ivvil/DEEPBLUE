<script>
	import { T, useTask } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	import { LineBasicMaterial, Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';
	import { DoubleSide, RepeatWrapping } from 'three';
	import { globals } from './Globals';

	const texture = useTexture('assets/ocean.jpg', {
		transform: (texture) => {
			texture.wrapS = RepeatWrapping;
			texture.wrapT = RepeatWrapping;
			texture.repeat.set(1, 1);
			return texture;
		}
	});

	let rows = Array.from(Array(globals.playfield.size.x).keys());
	let cols = Array.from(Array(globals.playfield.size.y).keys());

	let xOffset = 0;
	useTask((dt) => {
		xOffset += dt * 0.1;
	});
</script>

{#await texture then ocean}
	<T.Mesh position={[0, 0, 0]} rotation.x={Math.PI / 2}>
		<T.PlaneGeometry args={[globals.playfield.size.x, globals.playfield.size.y]} />
		<T.MeshBasicMaterial map={ocean} side={DoubleSide} map.offset.x={xOffset}></T.MeshBasicMaterial>
	</T.Mesh>
{/await}

{#each rows as currRow}
	<T.Mesh>
		<T.LineBasicMaterial args={{ color: 0x000000 }}></T.LineBasicMaterial>
        <T.BufferGeometry ></T.BufferGeometry>
	</T.Mesh>
{/each}
