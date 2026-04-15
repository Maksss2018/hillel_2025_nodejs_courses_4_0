import express from "express";
import { STATUS_CODES, MESSAGES } from "../common/index.js";
import {
  randomNumberGenerator,
  timeGetter,
  cardCalculator,
} from "../utils/index.js";
import generatePassword from "generate-password";

const router = express.Router();
const urlArr = [];

router.get("/", async function (req, res) {
  res.send("api");
});

router.get("/random-number", async function (req, res) {
  const { min, max } = req.query;
  const randomNumber = randomNumberGenerator(min, max, res);
  res.json({
    action: "random-number",
    random: randomNumber,
  });
});

router.get("/time", (req, res) => {
  const todayInISO = timeGetter();
  res.json({
    action: "time",
    "date-time": todayInISO,
  });
});

router.post("/timestamp", (req, res) => {
  const todayInMiliseconds = timeGetter("miliseconds");
  res.json({
    action: "timestamp",
    timestamp: todayInMiliseconds,
  });
});

router.post("/timestamp/sec", (req, res) => {
  const todayInSeconds = timeGetter("seconds");
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

router
  .route("/test")
  .get((req, res) => {
    res.json({
      url: "http://localhost/api/test",
      method: "GET",
    });
  })
  .post((req, res) => {
    res.json({
      url: "http://localhost/api/test",
      method: "POST",
    });
  });

router.post("/test-post", (req, res) => {
  console.log(req.body);
  res.json({
    received: req.body,
  });
});

router.post("/card", (req, res) => {
  const receivedData = req.body;
  const responsData = cardCalculator(receivedData);
  res.json(responsData);
});

router.post("/url", (req, res) => {
  const { url } = req.query;

  if (
    !urlArr.some((itemUrl) => itemUrl === url) &&
    url &&
    url.trim().length > 0
  ) {
    urlArr.push(url);
    res.json({
      action: "url",
      url: url,
      result: "done",
    });
  } else {
    res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.BAD_REQUEST);
  }

  console.log(urlArr);
});

router.get("/url/:urlIndexStr", (req, res) => {
  const { urlIndexStr } = req.params;
  const urlIndexNumber = Number(urlIndexStr);
  if (urlArr[urlIndexNumber] === undefined) {
    return res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.BAD_REQUEST);
  }

  res.redirect(`https://${urlArr[urlIndexNumber]}`);
});

export default router;
