import { NextFunction } from "express";
import { Client as OktaClient } from "@okta/okta-sdk-nodejs";
import { OktaAuth } from "@okta/okta-auth-js";

export const createJestSpy = (instance: any, method: string, value: any) => {
  jest
    .spyOn(instance, method)
    .mockImplementationOnce(() => Promise.resolve(value));
};

export const createJestRejectedSpy = (
  instance: any,
  method: string,
  value: any
) => {
  jest.spyOn(instance, method).mockImplementationOnce(() => {
    throw new Error("Failed");
  });
};

export const createMocks = (
  instance: any,
  methodsJson: any,
  failureCase: boolean
) => {
  for (let key in methodsJson) {
    if (!failureCase && key) {
      createJestSpy(instance, key, methodsJson[key]);
    } else {
      createJestRejectedSpy(instance, key, methodsJson[key]);
    }
  }
};

export const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
export const mockNext: NextFunction = jest.fn();

export const oktaClient = new OktaClient({
  orgUrl: "asda",
  token: "asdad",
});

oktaClient.createUser = (data: any) => {
  return Promise.resolve({ ...data, id: "123" });
};

oktaClient.getSession = (data: any) => {
  return Promise.resolve({ ...data, login: "hello@gmail.com", id: "123" });
};
oktaClient.createSession = (data: any) => {
  return Promise.resolve({
    login: "hello@gmail.com",
    id: "123",
    userId: "1234",
    ...data,
  });
};

export const oktaAuthClient = new OktaAuth({
  issuer: "https://yourOktaDomain.com/oauth2/default",
  tokenManager: {
    storage: {
      getItem: (key) => {},
      setItem: (key, val) => {},
    },
  },
});
oktaAuthClient.signIn = (data: any) => {
  return Promise.resolve({ sessionToken: "123", ...data });
};
