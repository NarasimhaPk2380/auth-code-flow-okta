import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development"; // default as development
const envAvailable = dotenv.config();

if (envAvailable.error) {
  throw new Error("Couldn't find .env file");
}

const MONGODB_ATLAS_URL =
  "mongodb+srv://narasimha:narasimha@123@cluster0.jt1gk.mongodb.net/bookStore?retryWrites=true&w=majority";

export default {
  port: process.env.PORT || 8888, // PORT

  databaseURL: process.env.MONGODB_URI || MONGODB_ATLAS_URL,

  logs: {
    level: process.env.LOG_LEVEL || "silly", // LOGS
  },
  api: {
    prefix: "/api", // ROUTE LEVEL API
  },
  oktaConfig: {
    domain: process.env.OKTA_DOMAIN || "https://dev-93177823.okta.com",
    clientId: process.env.CLIENT_ID || "0oa15brwnwdgkxDoW5d7",
    clientSecret:
      process.env.CLIENT_SECRET || "3lIXZAUmiHPO5Cy_z_cyAWgGs-aS1fRJpLbU-5B5",
    baseUrl: process.env.SERVER_URL || "http://localhost:8888",
    issuer:
      process.env.ISSUER || "https://dev-93177823.okta.com/oauth2/default",
    scope: process.env.SCOPE || "authorise",
    apiToken:
      process.env.OKTA_APP_TOKEN ||
      "00O7mtxN0SE0mzFhVrlKxhhmoAss6PHXtcNlOmEYBm",
  },
};
