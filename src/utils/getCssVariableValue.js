export default (variableName) => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    variableName
  );
};
