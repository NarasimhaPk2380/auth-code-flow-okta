import { Server } from "http";
import promiseRequest from "request-promise";
import request from "supertest";
import mongoose from "mongoose";
import config from "./config";
import btoa from "btoa";
import { bookData, reviewData } from "./helpers/tests/mock-data";

async function getToken() {
  const token = btoa(
    `${config.oktaConfig.clientId}:${config.oktaConfig.clientSecret}`
  );
  return await promiseRequest({
    uri: `https://dev-93177823.okta.com/oauth2/aus18dhu9vfoE8nye5d7/v1/token`,
    json: true,
    method: "POST",
    headers: {
      authorization: `Basic ${token}`,
    },
    form: {
      grant_type: "client_credentials",
      scope: `${config.oktaConfig.scope}`,
    },
  });
}

describe("GET /api/books to handle the failure cases", () => {
  let server: Server;
  let accessToken: string =
    "Bearer eyJraWQiOiJQV3NFUDk5NXYyci1CbG1ORzBWTGdTTHpmMVp4WVMtN0hNWVlndUFtSkM0IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjRNclFlcEkwZWdwSG1RSXp4QTdWTUxlYmYwUmhJNllCcjAtMDZkTTE3aTAub2FyMnloYjllNVFmTWp2MWw1ZDYiLCJpc3MiOiJodHRwczovL2Rldi05MzE3NzgyMy5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2MjY2OTQ3MzYsImV4cCI6MTYyNjY5NTAzNiwiY2lkIjoiMG9hMTVicndud2Rna3hEb1c1ZDciLCJ1aWQiOiIwMHUxNWI0dGdudUl6WXdDejVkNyIsInNjcCI6WyJvcGVuaWQiLCJvZmZsaW5lX2FjY2VzcyIsInByb2ZpbGUiLCJlbWFpbCJdLCJzdWIiOiJubWFyZWxsYUBwa2dsb2JhbC5jb20ifQ.QOi64fCwnQk04gTXfKPydwVuheSTM6vuo4hbJXi8xB8K9VFTQheCpmNZWovMzVOMRb8uJGjFdgMpDT3b7hRI4v9QfFUeMOKz6OT_i_XSvvZQ7FcTJL7r9zeuv20StLzvlK1ICrMWS5C6wBiafU5LF_Gd3eoMoHM9nKNkes7g0PtTIafnwsYVGhd0Jti6AkGDbXAFvsTi8OoDq33IkLcO6R-lCNVoK0nuHTbJfbJbTIm6BeciIYjQB6Rk4HMw0PkCVMakVbiLzguD-8XgePoRl9hP5dOHDuTpowlAFM-X-YXg74kXbsDNW3e2EPq9uaznDmXl4e5XiJmmO7Gu1W74oQ";
  beforeEach(async () => {
    server = require("./app");
    try {
      if (!accessToken) {
        const tokenData = await getToken();
        accessToken = `Bearer ${tokenData?.access_token}`;
      }
    } catch (e) {
      console.log(e);
    }
  });
  afterAll((done) => {
    mongoose.connection.close();
    done();
  });

  it("should throw error not found", (done) => {
    request(server).get("/api").expect(404, done);
  });

  it("responds to /", (done) => {
    request(server)
      .get("/api/books/")
      .set({ Authorization: accessToken })
      .expect(200, done);
  });

  it("should validate schema", (done) => {
    request(server)
      .post("/api/books")
      .set({ Authorization: accessToken })
      .then((data) => {
        expect(data.body.message).toContain('"name" is required');
        done();
      });
  });

  it("should get error when Authorisation is not provided", (done) => {
    request(server)
      .get("/api/books")
      .then((data) => {
        expect(data.body).toEqual({
          statusCode: 400,
          message: "You must send an Authorization header",
        });
        done();
      });
  });

  it("should get error when Authorisation does not have Bearer in it", (done) => {
    request(server)
      .get("/api/books")
      .set({ Authorization: "accessToken" })
      .then((data) => {
        expect(data.body).toEqual({
          statusCode: 400,
          message: "Expected a Bearer token",
        });
        done();
      });
  });

  it("should throw error when book id is invalid for retriving books", (done) => {
    request(server)
      .get("/api/books/546")
      .set({ Authorization: accessToken })
      .then((data) => {
        console.log(data.body);
        expect(data.body).toEqual({
          statusCode: 404,
          message: "BookId is not found",
        });
        done();
      });
  });
  it("should throw error when book id is invalid for update", (done) => {
    request(server)
      .put("/api/books/546")
      .send(bookData)
      .set({ Authorization: accessToken })
      .then((data) => {
        expect(data.body).toEqual({
          statusCode: 404,
          message: "BookId is not found",
        });
        done();
      });
  });

  it("should throw error when book id is invalid for delete", (done) => {
    request(server)
      .delete("/api/books/546")
      .set({ Authorization: accessToken })
      .then((data) => {
        expect(data.body).toEqual({
          statusCode: 404,
          message: "BookId is not found",
        });
        done();
      });
  });

  it("should throw error when book id is invalid for reviews", (done) => {
    request(server)
      .get("/api/books/546/reviews")
      .set({ Authorization: accessToken })
      .then((data) => {
        expect(data.body).toEqual({
          statusCode: 404,
          message: "BookId is not found",
        });
        done();
      });
  });
  it("should throw error when book id is invalid for review to create", (done) => {
    request(server)
      .post("/api/books/546/reviews")
      .send(reviewData)
      .set({ Authorization: accessToken })
      .then((data) => {
        expect(data.body).toEqual({
          statusCode: 404,
          message: "BookId is not found",
        });
        done();
      });
  });
  it("should throw error when book_id or review_id is invalid to get review", (done) => {
    request(server)
      .get("/api/books/546/reviews/324")
      .set({ Authorization: accessToken })
      .then((data) => {
        console.log(data.body);
        expect(data.body).toEqual({
          statusCode: 404,
          message: "Either BookId or Review Id is not found",
        });
        done();
      });
  });

  it("should throw error when book_id or review_id is invalid to update review", (done) => {
    request(server)
      .put("/api/books/546/reviews/324")
      .send(reviewData)
      .set({ Authorization: accessToken })
      .then((data) => {
        expect(data.body).toEqual({
          statusCode: 404,
          message: "Either BookId or Review Id is not found",
        });
        done();
      });
  });
  it("should throw error when book_id or review_id is invalid to delete review", (done) => {
    request(server)
      .delete("/api/books/546/reviews/324")
      .set({ Authorization: accessToken })
      .then((data) => {
        expect(data.body).toEqual({
          statusCode: 404,
          message: "Either BookId or Review Id is not found",
        });
        done();
      });
  });
});
