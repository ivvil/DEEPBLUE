<script>
  import { T } from '@threlte/core'
  import { useGltf } from '@threlte/extras'
  import { useLoader } from '@threlte/core' 
  import PlayField from './PlayField.svelte';

</script>

<T.DirectionalLight position={[0, 10, 10]} />

<PlayField></PlayField>

{#await useGltf('/models/kenney_watercraft-pack/Models/boat-fishing-small.glb') then gltf}
  <T is={gltf.scene} castShadow/> 
{/await}