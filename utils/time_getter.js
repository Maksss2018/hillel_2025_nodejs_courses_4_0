export default (key) => {
  const date = new Date();
  let res = null;
  switch (key) {
    case "seconds":
      res = date / 1000;
      break;
    case "miliseconds":
      res = Date.now();
      break;
    default:
      res = date.toISOString();
  }
  return res;
};
