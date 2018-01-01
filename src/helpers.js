// Helper func for making reducers cleaner and leaner ;)
export const updateObject = (oldObject, updatedProps) => ({
  ...oldObject,
  ...updatedProps
});
