import { STATUS_CODES, MESSAGES } from "../common/index.js";

export default (min, max, res) => {
  let minNumber = Number(min);
  let maxNumber = Number(max);
  const isOnlyMin = max === undefined && min !== undefined;
  const isOnlyMax = min === undefined && max !== undefined;
  const isSomeUndefined = isOnlyMax || isOnlyMin;
  const isEachUndefined = min === undefined && max === undefined;
  const isMinBiggerMax = minNumber > maxNumber;
  const isSomeNotInteger =
    !Number.isInteger(minNumber) || !Number.isInteger(maxNumber);
  if (isEachUndefined) {
    minNumber = 0;
    maxNumber = 10;
  }

  if (
    !isEachUndefined &&
    (isSomeUndefined || isMinBiggerMax || isSomeNotInteger)
  ) {
    return res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.BAD_REQUEST);
  }
  const randomNumber =
    Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  return randomNumber;
};
