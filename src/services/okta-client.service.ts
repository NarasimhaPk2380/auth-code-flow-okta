import { Client as OktaClient } from "@okta/okta-sdk-nodejs";
import config from "../config";
import { Service } from "typedi";
import { IRegisterData, IRegistrationResponse } from "../interfaces/IUser";

const oktaClient = new OktaClient({
  orgUrl: config.oktaConfig.domain,
  token: config.oktaConfig.apiToken,
});

@Service()
export class OktaClientService {
  oktaClient!: OktaClient;

  constructor() {
    this.oktaClient = oktaClient;
  }

  async register(registerData: IRegisterData): Promise<IRegistrationResponse> {
    const { email, firstName, lastName, password } = registerData;
    const createdUser = await this.oktaClient.createUser({
      profile: { email, login: email, firstName, lastName },
      credentials: { password: { value: password } },
    });
    return createdUser;
  }
}
