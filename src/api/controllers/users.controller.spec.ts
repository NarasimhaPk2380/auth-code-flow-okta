import { Request } from "express";
import { BadRequest } from "http-errors";
import {
  createMocks,
  mockNext,
  mockResponse,
} from "../../helpers/tests/mocking-funtions";
import { OktaClientService } from "../../services/okta-client.service";
import { ErrorHandlerInstance } from "../middlewares/error.middleware";
import { UsersController } from "./users.controller";
const availableMethodsInOktaClientSrvc: any = {
  register: {
    statusCode: 200,
    message: "Okta user has been created. Now you can login",
  },
};

describe("UsersController", () => {
  let usersController: UsersController;
  const OktaClientServiceMock = <jest.Mock<OktaClientService>>OktaClientService;
  const instanceOfOktaClientServiceMock = new OktaClientServiceMock();
  createMocks(
    instanceOfOktaClientServiceMock,
    availableMethodsInOktaClientSrvc,
    false
  );

  beforeEach(() => {
    usersController = new UsersController();
    usersController.oktaClientService = instanceOfOktaClientServiceMock;
  });

  it("Should create", () => {
    expect(usersController).toBeTruthy();
  });
  it("Should get the success response when user gets registered", async () => {
    const res = mockResponse();
    await usersController.registerOktaUser({} as Request, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 200,
      message: "Okta user has been created. Now you can login",
    });
  });
});

describe("UsersController for failure case", () => {
  let usersController: UsersController;
  const OktaClientServiceMock = <jest.Mock<OktaClientService>>OktaClientService;
  const instanceOfOktaClientServiceMock = new OktaClientServiceMock();
  createMocks(
    instanceOfOktaClientServiceMock,
    availableMethodsInOktaClientSrvc,
    true
  );

  beforeEach(() => {
    usersController = new UsersController();
    usersController.oktaClientService = instanceOfOktaClientServiceMock;
    jest.spyOn(ErrorHandlerInstance, "error").mockImplementation();
  });

  it("Should get failed the token data", async () => {
    const res = mockResponse();
    await usersController.registerOktaUser({} as Request, res, mockNext);
    expect(ErrorHandlerInstance.error).toHaveBeenCalled();
  });
});
