import { Application } from "express";
import mongooseLoader from "./mongoose";
import expressLoader from "./express";
import logger from "./logger";

export default async ({ expressApp }: { expressApp: Application }) => {
  await mongooseLoader();
  await expressLoader({ app: expressApp });
  logger.info("Express loaded");
};
