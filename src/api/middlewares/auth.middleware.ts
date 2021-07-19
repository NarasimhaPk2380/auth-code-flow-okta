import { NextFunction, Request, Response } from "express";
import { BadRequest } from "http-errors";
import config from "../../config";
import logger from "../../loaders/logger";
import OktaJwtVerifier from "@okta/jwt-verifier";
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: "https://dev-93177823.okta.com/oauth2/default",
});

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.debug("auth middileware is invoked");
    const { authorization } = req.headers;
    if (!authorization)
      throw new Error("You must send an Authorization header");

    const [authType, token] = authorization.split(" ");
    if (authType !== "Bearer") throw new Error("Expected a Bearer token");
    logger.debug("auth middileware has given token");
    await oktaJwtVerifier.verifyAccessToken(token, "api://default");
    next();
  } catch (e) {
    logger.error(e.message);
    next(new BadRequest(e.message));
  }
};
