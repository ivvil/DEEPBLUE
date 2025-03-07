<script>
    import { T } from '@threlte/core'
    import { useGltf } from '@threlte/extras'
  
    let { fallback, error, children, ref = $bindable(), ...props } = $props()
  
    const gltf = useGltf('/boat-row-large-transformed.glb')
  </script>
  
  <T.Group
    bind:ref
    dispose={false}
    {...props}
  >
    {#await gltf}
      {@render fallback?.()}
    {:then gltf}
      <T.Mesh
        geometry={gltf.nodes['boat-row-large_1'].geometry}
        material={gltf.materials.colormap}
      >
        <T.Mesh
          geometry={gltf.nodes.paddles.geometry}
          material={gltf.materials.colormap}
          position={[0, 0.06, -0.42]}
        />
      </T.Mesh>
    {:catch err}
      {@render error?.({ error: err })}
    {/await}
  
    {@render children?.({ ref })}
  </T.Group>
  