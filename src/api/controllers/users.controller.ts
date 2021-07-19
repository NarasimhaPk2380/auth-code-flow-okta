import { NextFunction, Request, Response } from "express";
import { BadRequest } from "http-errors";
import { IRegisterData } from "../../interfaces/IUser";
import logger from "../../loaders/logger";
import { OktaClientService } from "../../services/okta-client.service";

export class UsersController {
  oktaClientService: OktaClientService;
  constructor() {
    this.oktaClientService = new OktaClientService();
  }
  async registerOktaUser(req: Request, res: Response, next: NextFunction) {
    try {
      logger.debug("Register Okta User Api invoked");
      await this.oktaClientService.register(req.body as IRegisterData);
      logger.debug("Okta User is created ");
      return res
        .json({
          statusCode: 200,
          message: "Okta user has been created. Now you can login",
        })
        .status(200);
    } catch (e) {
      logger.error(e.message);
      next(new BadRequest(e.errorCauses[0]?.errorSummary || e.message));
    }
  }
}
