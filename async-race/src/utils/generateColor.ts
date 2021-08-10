export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  let generatedNumber;

  for (let i = 0; i < 6; i++) {
    generatedNumber = Math.floor(Math.random() * 16);
    color += letters[generatedNumber];
  }
  return color;
};
