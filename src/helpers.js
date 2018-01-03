// Helper func for making reducers cleaner and leaner ;)
export const updateObject = (oldObject, updatedProps) => ({
  ...oldObject,
  ...updatedProps
});

export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
