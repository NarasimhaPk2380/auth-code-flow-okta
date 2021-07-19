import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import request from "request-promise";
import session from "express-session";
import { ExpressOIDC } from "@okta/oidc-middleware";
import ejs from "ejs";
import cors from "cors";
import routes from "../api";
import config from "../config";
import { NotFound } from "http-errors";
import uuid from "node-uuid";
import cls from "continuation-local-storage";
const myRequest = cls.createNamespace("my request");
export const oidc = new ExpressOIDC(
  Object.assign({
    issuer: config.oktaConfig.issuer,
    client_id: config.oktaConfig.clientId,
    client_secret: config.oktaConfig.clientSecret,
    appBaseUrl: config.oktaConfig.baseUrl,
    scope: "openid profile email offline_access",
  })
);

export default ({ app }: { app: express.Application }) => {
  app.use(
    session({
      secret: "somethingisfishy",
      resave: true,
      saveUninitialized: false,
    })
  );
  app.use(oidc.router);
  app.use(cors());
  app.set("view engine", "ejs");

  app.use(express.json({}));

  app.use(async function (req: any, res, next) {
    let userContext = req["userContext"];
    if (!userContext) {
      next();
      return;
    }

    let tokens = userContext["tokens"];
    if (!tokens) {
      next();
      return;
    }
    if (req["userContext"]["tokens"]["expires_at"] > Date.now() / 1000) {
      next();
      return;
    }
    const token = btoa(
      `${config.oktaConfig.clientId}:${config.oktaConfig.clientSecret}`
    );
    return request({
      uri: `${config.oktaConfig.issuer}/v1/token`,
      json: true,
      method: "POST",
      headers: {
        authorization: `Basic ${token}`,
      },
      form: {
        redirect_uri: "http://localhost:8888",
        scope: "offline_access openid",
        refresh_token: tokens["refresh_token"],
        grant_type: "refresh_token",
      },
    })
      .then((data: any) => {
        let newTokens = data;
        req["userContext"]["tokens"]["access_token"] =
          newTokens["access_token"];
        req["userContext"]["tokens"]["refresh_token"] =
          newTokens["refresh_token"];
        req["userContext"]["tokens"]["id_token"] = newTokens["id_token"];
        req["userContext"]["tokens"]["scope"] = newTokens["scope"];
        req["userContext"]["tokens"]["expires_at"] =
          Math.floor(Date.now() / 1000) + newTokens["expires_in"];
        next();
      })
      .catch((e) => {
        console.error(
          `Exception while attempting to get refresh access token: ${e.message} `
        );
        next();
      });
  });
  // Assigning UUID for each request
  app.use((req: Request, res: Response, next: NextFunction) => {
    myRequest.run(() => {
      myRequest.set("transactionId", uuid.v1());
      next();
    });
  });

  app.get("/", (req: any, res) => {
    if (req.userContext) {
      res.render("login", {
        accessToken: req?.userContext?.tokens?.access_token,
      });
    } else {
      res.send('Please <a href="/login">login</a>');
    }
  });

  // Load API routes
  app.use(config.api.prefix, routes());

  app.use(async (req, res, next) => {
    next(new NotFound());
  });

  app.use(((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      statusCode: err.status || 500,
      message: err.message,
    });
  }) as ErrorRequestHandler);
};
