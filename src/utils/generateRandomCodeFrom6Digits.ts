export default (): string => {
  let randomNumber = "";

  for (let i = 0; i < 6; i++) randomNumber += Math.round(Math.random() * 9);

  return randomNumber;
};
