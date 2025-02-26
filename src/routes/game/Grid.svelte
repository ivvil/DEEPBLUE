<script>
    import {BufferGeometry, Vector3} from 'three'
    import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras'
    import { T } from '@threlte/core';

    /**
     * @typedef {Object} Props
     * @property {Vector3} pos Starting position for the line
     * @property {number} len Length of the line
     * @property {Vector3} [rotation = new Vector3(0, 0, 0)] to apply
     */
    /** @type {Props}*/
    let {pos, len, rotation = new Vector3(0, 0, 0)} = $props();    

    let end = new Vector3(len, 0, 0); // Local coordinates
    const points = [new Vector3(0, 0, 0), end];
</script>

<T.Mesh
    position={[pos.x, pos.y, pos.z]}
    rotation={[rotation.x, rotation.y, rotation.z]}
>
    <MeshLineMaterial width={2.5} color={0xff00ff} attenuate={false} />
    <MeshLineGeometry {points} />
</T.Mesh>