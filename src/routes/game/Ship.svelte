<script>
	import Bbox from '$lib/bbox';
import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import { Group, Mesh, Vector2, Vector3 } from 'three';

	/**
	 * @typedef {Object} Props
	 * @property {string} modelName Ship model to render
	 * @property {Vector3} pos Size of the ship
	 * @property {Vector3} [rotation = new Vector3(0,0,0)] Rotation of the ship
	 */

	/** @type {Props} */
  let { modelName, pos, rotation = new Vector3(0, 0, 0), size = new Vector3(1, 1, 1), ...props } = $props();

  const gltf = useGltf(modelName);
  const geo = modelName.substring(0, modelName.length - 4) + "_1";

  
  // console.log(Object.values(gltf.nodes));

  function scaleMesh(mesh) {
	Bbox.scale(mesh, size);
  }
</script>

<T.Group dispose={false} {...props}>
  {#await gltf then gltf}
	<T.Mesh
	  geometry={gltf.nodes[geo].geometry}
	  material={gltf.materials.colormap}
	  position.set={pos}
	  oncreate={scaleMesh}  />
  {/await}
</T.Group>

