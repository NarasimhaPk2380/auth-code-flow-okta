import "reflect-metadata"; // To use @DECORATORS

import config from "./config";

import express from "express";
import logger from "./loaders/logger";
import { Server } from "http";
const app = express();
let server: Server;
async function startServer() {
  await require("./loaders").default({ expressApp: app });

  server = app.listen(config.port, () => {
    logger.info(`Server listening on port: ${config.port}`);
  });
}

startServer();
module.exports = app;
