import { Vector3, BufferGeometry } from "three";

export default class Bbox {
 /**
 * @param {BufferGeometry} geo Object to compute the size
 */
  static computeSize(geo) {
	geo.computeBoundingBox();
	const bbox = geo.boundingBox;

	const xS = bbox?.max.x - bbox?.min.x;
	const yS = bbox?.max.y - bbox?.min.y;
	const zS = bbox?.max.z - bbox?.min.z;

	return new Vector3(xS, yS, zS);
  }
}
