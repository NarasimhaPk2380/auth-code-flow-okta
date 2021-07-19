import winston from "winston";
import config from "../config";
import cls from "continuation-local-storage";
const getNamespace = cls.getNamespace;

const transports = [];
if (process.env.NODE_ENV === "development") {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat()
      ),
    })
  );
} else {
  transports.push(new winston.transports.Console());
}

// Wrap Winston logger to print reqId in each log
const formatMessage = winston.format((info, opts) => {
  const myRequest = getNamespace("my request");
  info.message =
    myRequest && myRequest.get("transactionId")
      ? info.message + " transactionId: " + myRequest.get("transactionId")
      : info.message;
  return info;
});

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    formatMessage()
  ),
  transports,
});

export default LoggerInstance;
