const rgb = () => {
  const r = Math.floor(Math.random() * 256); // Valor entre 0 y 255
  const g = Math.floor(Math.random() * 256); // Valor entre 0 y 255
  const b = Math.floor(Math.random() * 256); // Valor entre 0 y 255

  return `rgb(${r},${g},${b})`;
};
const vec2d = (maxX: number = 3, maxY: number = 3) => {
  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY,
  };
};

export const random = {
  vec2d,
  rgb,
};
