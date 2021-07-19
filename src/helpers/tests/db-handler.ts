import "reflect-metadata";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Service } from "typedi";

@Service()
export class DbTestService {
  mongod = MongoMemoryServer.create();

  async connect() {
    const uri = (await this.mongod).getUri();
    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri, mongooseOpts);
  }

  async disconnect() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    (await this.mongod).stop();
  }
  async deleteDatabase() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}
