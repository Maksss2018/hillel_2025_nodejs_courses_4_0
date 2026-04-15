import express from "express";
import { STATUS_CODES, MESSAGES } from "../common/index.js";
import generatePassword from "generate-password";

const router = express.Router();
const urlArr = [];

router.get("/", async function (req, res) {
  res.send("api");
});

router.get("/random-number", async function (req, res) {
  const { min, max } = req.query;
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

  res.json({
    action: "random-number",
    random: randomNumber,
  });
});

router.get("/time", (req, res) => {
  const today = new Date();
  res.json({
    action: "time",
    "date-time": today.toISOString(),
  });
});

router.post("/timestamp", (req, res) => {
  const todayInMiliseconds = Date.now();
  res.json({
    action: "timestamp",
    timestamp: todayInMiliseconds,
  });
});

router.post("/timestamp/sec", (req, res) => {
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
  const articul = generatePassword.generate({
    length: 8,
    numbers: true,
  });

  const cardData = {
    articul: articul,
    action: "cart",
    total_amount: 0,
    total_sum: 0,
    goods: [],
  };
  const responsData = Object.entries(receivedData).reduce((acc, item) => {
    if (!acc.goods.some((goodsItem) => goodsItem === item[0])) {
      acc.goods.push(item[0]);
    }
    acc.total_sum = acc.total_sum + item[1].price * item[1].amount;
    acc.total_amount = acc.total_amount + item[1].amount;
    return acc;
  }, cardData);

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
