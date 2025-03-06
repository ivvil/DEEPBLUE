<script>
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import { Vector3 } from 'three';
	import Bbox from '$lib/bbox';

	let { fallback, error, children, ref = $bindable(), ...props } = $props();
	const gltf = useGltf('/boat-fishing-small.glb');

	console.log(gltf);

	/**
	 * @param {THREE.Mesh} mesh
	 */
	function scaleMesh(mesh) {
		Bbox.scale(mesh, new Vector3(1, 2, 3));
	}
</script>

<T.Group bind:ref dispose={false} {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		<T.Mesh
			geometry={gltf.nodes['boat-fishing-small_1'].geometry}
			material={gltf.materials.colormap}
			position={[0, 0, 0.2]}
			oncreate={scaleMesh}
		/>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{@render children?.({ ref })}
</T.Group>
