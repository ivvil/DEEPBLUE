//// filepath: e:\Desarrollo\Clase\Desarrollo Cliente\DEEPBLUE\src\routes\game\Ship.svelte
<script>
  import { onMount } from 'svelte';
  import { T } from '@threlte/core';
  import { interactivity, useGltf } from '@threlte/extras';
  import Bbox from '$lib/bbox';
  import { Plane, Raycaster, Vector3 } from 'three';
  import { TransformControls } from '@threlte/extras';

  let {
    modelName,
    pos = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    size = new Vector3(1, 1, 1),
    camera // Passed from Scene.svelte
  } = $props();

  interactivity();

  let gltf = useGltf(modelName);
  const geo = modelName.substring(0, modelName.lastIndexOf('.')) + '_1';

  function scaleMesh(mesh) {
    Bbox.scale(mesh, size);
  }

  // (Optional: pointer events code omitted for clarity)

  // Reference for the ship’s wrapper group.
  let groupRef;
</script>

<!-- Wrap the ship mesh in a Group (which is in the scene graph) and use that group for TransformControls -->
<T.Group bind:this={groupRef} position={[pos.x, pos.y, pos.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
  <TransformControls
    translationSnap={1}
    rotationSnap={Math.PI / 2}
    scaleSnap={0.1}
    mode="translate"
    {camera}
    object={groupRef}  <!-- Pass the group reference -->
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