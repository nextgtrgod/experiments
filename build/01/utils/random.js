let random = {
  from: (arr) => arr[~~(Math.random() * arr.length)],
  range: (min = 0, max = 1) => Math.random() * (max - min) + min
};
export default random;
