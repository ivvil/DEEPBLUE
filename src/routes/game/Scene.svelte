<script>
  import { T } from '@threlte/core';
  import PlayField from './PlayField.svelte';
  import Ship from './Ship.svelte';
  import { Vector3 } from 'three';
  import ShipField from './ShipField.svelte';

  let camera;
</script>

<T.DirectionalLight position={[0, 10, 10]} />
<PlayField />
<T.PerspectiveCamera
  makeDefault
  position={[0, 15, 0]}
  oncreate={(ref) => {
    camera = ref;
    ref.lookAt(0, 0, 0);
  }}
/>

<Ship modelName="boat-fishing-small.glb" pos={new Vector3(4, 0, 2)} size={new Vector3(1, 2, 3)} {camera} />
<Ship modelName="boat-speed-a.glb" pos={new Vector3(-4, 0, -2)} size={new Vector3(1, 1, 2)} {camera} />
<Ship modelName="boat-sail-b.glb" pos={new Vector3(0, 0, 0)} size={new Vector3(1, 1, 4)} {camera} />

<ShipField {camera} />
