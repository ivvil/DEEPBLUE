<script>
    import {BufferGeometry, Vector3} from 'three'
    import { T } from '@threlte/core';


    /**
     * @typedef {Object} Props
     * @property {Vector3} pos Starting position for the line
     * @property {number} len Length of the line
     * @property {Vector3} rotation to apply
     */
    /** @type {Props}*/
    let {pos, len, rotation = new Vector3(0, 0, 0)} = $props();
    

    let end = pos;
    end.x += len;

    let vectorPoints = [pos, end];
    const pointGeo = new BufferGeometry().setFromPoints(vectorPoints);
</script>

<T.Mesh position.copy={pos}>
    <T.LineBasicMaterial args={[{ color: 0x000000 }]}></T.LineBasicMaterial>
    <T is={pointGeo}></T>
</T.Mesh>