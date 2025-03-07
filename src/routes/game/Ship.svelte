<script>
  import { T } from '@threlte/core';
  import { interactivity, useGltf } from '@threlte/extras';
  import Bbox from '$lib/bbox';
  import { Plane, Raycaster, Vector3, Object3D } from 'three';
  import { TransformControls } from '@threlte/extras';

  let {
    modelName,
    pos = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    size = new Vector3(1, 1, 1),
    camera // Recibe la cámara como prop
  } = $props();

  interactivity();

  let gltf = useGltf(modelName);
  const geo = modelName.substring(0, modelName.lastIndexOf('.')) + '_1';

  function scaleMesh(mesh) {
    Bbox.scale(mesh, size);
  }

  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 1, 0), 0);

  let isDragging = false;

  function handlePointerDown(e) {
    isDragging = true;
  }

  function handlePointerMove(e) {
    if (!isDragging) return;
    const { clientX, clientY } = e;
    const ndcX = (clientX / window.innerWidth) * 2 - 1;
    const ndcY = -(clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera({ x: ndcX, y: ndcY }, camera);
    const newPos = new Vector3();
    if (raycaster.ray.intersectPlane(plane, newPos)) {
      pos.x = newPos.x;
      pos.z = newPos.z;
    }
  }

  function handlePointerUp(e) {
    isDragging = false;
  }

  // Crear un objeto THREE.Object3D para usar con TransformControls
  const object3D = new Object3D();
  object3D.position.copy(pos);
</script>

<T.Group dispose={false}>
  <TransformControls translationSnap={1} rotationSnap={Math.PI / 2} scaleSnap={0.1} mode="translate" object={object3D} camera={camera}>
    <T.Group ref={object3D}>
      {#await gltf then loaded}
        <T.Mesh
          geometry={loaded.nodes[geo].geometry}
          material={loaded.materials.colormap}
          position={[pos.x, pos.y, pos.z]}
          rotation={[rotation.x, rotation.y, rotation.z]}
          oncreate={scaleMesh}
        />
      {/await}
    </T.Group>
  </TransformControls>
</T.Group>