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
  let accessToken: string;
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
