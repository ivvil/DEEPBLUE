export default scaleObject(obj, scale) {
  return obj.map((el, i) => el / scale[i]);
}
