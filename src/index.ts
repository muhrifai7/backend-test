import "dotenv/config";
import "reflect-metadata";
import fs from "fs";
import path from "path";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { errorHandler } from "./middleware/errorHandler";
import { getLanguage } from "./middleware/getLanguage";
import routes from "./routes";
import { dbCreateConnection } from "./typeorm/dbCreateConnection";

export const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(getLanguage);

app.use("/", routes);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running tetete  on port ${port}`);
});

(async () => {
  await dbCreateConnection();
})();
