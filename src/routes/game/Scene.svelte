<script>
  import { T } from '@threlte/core'
  import { useGltf } from '@threlte/extras'
  import { useLoader } from '@threlte/core' 
  import PlayField from './PlayField.svelte';
  import Ship from './Ship.svelte';
	import { Vector3 } from 'three';

</script>

<T.DirectionalLight position={[0, 10, 10]} />

<PlayField></PlayField>

<Ship modelName={'boat-fishing-small.glb'} pos={new Vector3(0, 0, 0)} size={new Vector3(1, 2, 3)}/>
