export const randomRGB = () => {
  const r = Math.floor(Math.random() * 256); // Valor entre 0 y 255
  const g = Math.floor(Math.random() * 256); // Valor entre 0 y 255
  const b = Math.floor(Math.random() * 256); // Valor entre 0 y 255

  return `rgb(${r},${g},${b})`;
};
