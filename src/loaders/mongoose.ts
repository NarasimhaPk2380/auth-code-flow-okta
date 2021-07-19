import mongoose from "mongoose";
import config from "../config";
import logger from "./logger";

export default async () => {
  logger.info("Please wait DB is connecting");
  await mongoose.connect(
    config.databaseURL,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    () => logger.info("Db is connected")
  );
};
