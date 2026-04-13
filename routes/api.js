import express from "express";
import { STATUS_CODES, MESSAGES } from "../common/index.js";
import generatePassword from "generate-password";

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

router.post("/timestemp", (req, res) => {
  const todayInMiliseconds = Date.now();
  res.json({
    action: "timestamp",
    timestamp: todayInMiliseconds,
  });
});

router.post("/timestemp/sec", (req, res) => {
  const todayInMiliseconds = new Date();
  const todayInSeconds = todayInMiliseconds / 1000;
  res.json({
    action: "timestamp",
    timestamp: todayInSeconds,
  });
});

router.get("/password", (req, res) => {
  const { length = 16 } = req.query;
  if (length % 1 !== 0 && length > 0) {
    return res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.BAD_REQUEST);
  }
  const password = generatePassword.generate({
    length: length,
    numbers: true,
  });

  res.json({
    action: "password",
    length: length,
    password: password,
  });
});

export default router;
