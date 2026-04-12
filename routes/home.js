import express from "express";
const router = express.Router();

router.get("/", async function (req, res) {
  res.send("work");
});

export default router;
