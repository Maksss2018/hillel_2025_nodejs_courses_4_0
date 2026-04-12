import express from "express";
import { STATUS_CODES, MESSAGES } from "../common/index.js";
const router = express.Router();

router.get("/", async function (req, res) {
  res.send("api");
});

router.get("/random-number", async function (req, res) {
  const { min, max } = req.query;
  const minNumber = Number(min);
  const maxNumber = Number(max);
  const isSomeUndefined = min === undefined || max === undefined;
  const isMinBiggerMax = minNumber > maxNumber;
  const isSomeNotInteger = minNumber % 1 !== 0 || maxNumber % 1 !== 0;

  if (isSomeUndefined || isMinBiggerMax || isSomeNotInteger) {
    return res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.BAD_REQUEST);
  }
  res.json({
    action: "random-number",
    random: `випадкове ціле число від ${min} до ${max}`,
  });
});

router.get("/time", (req, res) => {
  const today = new Date();
  res.json({
    action: "time",
    "date-time": today.toISOString(),
  });
});

export default router;
