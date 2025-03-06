import { Vector3, BufferGeometry, Mesh, Box3 } from "three";

export default class Bbox {
	/**
	 * @param {Mesh} obj Object to compute the size
	 * @returns {Vector3}
	*/
	static computeSize(obj) {
	  const box = new Box3().setFromObject(obj);
	  return box.getSize(new Vector3);
	}

	/**
	 * @param {Vector3} currentSize Current object size
	 * @param {Vector3} targetSize Target object size
	 */
	static getScale(currentSize, targetSize) {
		return new Vector3(
			targetSize.x / currentSize.x,
			targetSize.y / currentSize.y,
			targetSize.z / currentSize.z
		);
	}

  /**
   * @param {Mesh} obj Object to scale
   * @param {Vector3} target Target size
   */
  static scale(obj, target) {
	const size = this.computeSize(obj);
	const scale = this.getScale(size, target);
	obj.scale.copy(scale);
	obj.updateMatrix();
  }
}
