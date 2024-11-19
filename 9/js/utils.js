const START_ID_GENERATOR = 0;

const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const createIdGenerator = () => {
  let lastId = START_ID_GENERATOR;
  return () => ++lastId;
};

const isEsc = (key) => key === 27;
const isEnter = (key) => key === 13;

export {
  getRandomNumber,
  createIdGenerator,
  isEsc,
  isEnter,
};
