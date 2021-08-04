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
    "Bearer eyJraWQiOiJQV3NFUDk5NXYyci1CbG1ORzBWTGdTTHpmMVp4WVMtN0hNWVlndUFtSkM0IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlhhUDlPUDZ2UnpQZjhvS2xsZm96Q3k3cTJlZUx2clF5ZUZSdTJ0M0taOXMub2FyMzhua2J1OE1OdFFIYlg1ZDYiLCJpc3MiOiJodHRwczovL2Rldi05MzE3NzgyMy5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2Mjc5Nzg1NDQsImV4cCI6MTYyNzk4MjE0NCwiY2lkIjoiMG9hMTVicndud2Rna3hEb1c1ZDciLCJ1aWQiOiIwMHUxNWI0dGdudUl6WXdDejVkNyIsInNjcCI6WyJvZmZsaW5lX2FjY2VzcyIsInByb2ZpbGUiLCJvcGVuaWQiLCJlbWFpbCJdLCJzdWIiOiJubWFyZWxsYUBwa2dsb2JhbC5jb20ifQ.J5_KQEUmdg_bWhQFtcYdS5Oy5hi6zSkZmg1VJvJKEZB7KuYtbi9ygL8yqn1BsnOhCskKg6jGHtdGc4OG13vdMW-VP200bIFiPbb18XH2oMz-OCqPbSFKufARuzDuavv_APl39N0vF0z_Nto1-gy22eHYCvUlHINX8374r_fQMd5O9P6UYB5N1qf8SOGypuce7Mh19sx_8qGe4hVsBjziyS_AOVSFt-o6TZ5BJrjhmJDxzf_x4Dy0JXC6DEwABepa8_gbhcDKjB87mDN0fFaW6kIHYb7YBO6YujRDVHYz5coGY7kheRISCEYlMwMqn9vd6Q4qRR0sz0VOU2nz_ECnQw";
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
        // console.log(data.body);
        expect(data.body.message).toBe("BookId is not found");
        done();
      });
  });
  it("should throw error when book id is invalid for update", (done) => {
    request(server)
      .put("/api/books/546")
      .send(bookData)
      .set({ Authorization: accessToken })
      .then((data) => {
        expect(data.body.message).toBe("BookId is not found");
        done();
      });
  });

  it("should throw error when book id is invalid for delete", (done) => {
    request(server)
      .delete("/api/books/546")
      .set({ Authorization: accessToken })
      .then((data) => {
        expect(data.body.message).toBe("BookId is not found");
        done();
      });
  });

  it("should throw error when book id is invalid for reviews", (done) => {
    request(server)
      .get("/api/books/546/reviews")
      .set({ Authorization: accessToken })
      .then((data) => {
        expect(data.body.message).toBe("BookId is not found");
        done();
      });
  });
  it("should throw error when book id is invalid for review to create", (done) => {
    request(server)
      .post("/api/books/546/reviews")
      .send(reviewData)
      .set({ Authorization: accessToken })
      .then((data) => {
        expect(data.body.message).toBe("BookId is not found");
        done();
      });
  });
  it("should throw error when book_id or review_id is invalid to get review", (done) => {
    request(server)
      .get("/api/books/546/reviews/324")
      .set({ Authorization: accessToken })
      .then((data) => {
        // console.log(data.body);
        expect(data.body.message).toBe(
          "Either BookId or Review Id is not found"
        );
        done();
      });
  });

  it("should throw error when book_id or review_id is invalid to update review", (done) => {
    request(server)
      .put("/api/books/546/reviews/324")
      .send(reviewData)
      .set({ Authorization: accessToken })
      .then((data) => {
        expect(data.body.message).toBe(
          "Either BookId or Review Id is not found"
        );
        done();
      });
  });
  it("should throw error when book_id or review_id is invalid to delete review", (done) => {
    request(server)
      .delete("/api/books/546/reviews/324")
      .set({ Authorization: accessToken })
      .then((data) => {
        expect(data.body.message).toBe(
          "Either BookId or Review Id is not found"
        );
        done();
      });
  });
});
