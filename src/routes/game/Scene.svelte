<script>
  import { T } from '@threlte/core'
  import { useGltf } from '@threlte/extras'
  import { useLoader } from '@threlte/core' 
  import PlayField from './PlayField.svelte';
  import BoatFishingSmall from './BoatFishingSmall.svelte';

</script>

<T.DirectionalLight position={[0, 10, 10]} />

<PlayField></PlayField>

<BoatFishingSmall scale={[0.5, 1, 0.75]}/>
