import express from "express";

import dotenv from "dotenv";
dotenv.config();
import logger from "morgan";

//! import routes
import { homeRouter, apiRouter } from "./routes/index.js";
import { ROUTES } from "./common/index.js";

import { notFoundHandler } from "./middleware/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("tiny"));

app.use(ROUTES.HOME, homeRouter);

app.use(ROUTES.API, apiRouter);

app.use(notFoundHandler);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
