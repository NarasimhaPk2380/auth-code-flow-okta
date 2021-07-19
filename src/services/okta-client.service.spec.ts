import { OktaClientService } from "./okta-client.service";
import { Client as OktaClient } from "@okta/okta-sdk-nodejs";
import { IRegisterData } from "../interfaces/IUser";
describe("OktaClientService", () => {
  let oktaClientService: OktaClientService;

  beforeEach(() => {
    oktaClientService = new OktaClientService();
  });

  it("Should create", () => {
    expect(oktaClientService).toBeTruthy();
  });

  it("Should check if it returns access token", async () => {
    oktaClientService.oktaClient = new OktaClient({
      orgUrl: "xyz",
      token: "abc",
    });
    oktaClientService.oktaClient.createUser = (data: any) => {
      return Promise.resolve({ ...data, id: "123" });
    };
    const createdUser = await oktaClientService.register({} as IRegisterData);
    expect(createdUser?.id).toBe("123");
  });
});
