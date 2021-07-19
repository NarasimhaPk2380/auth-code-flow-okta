import Container from "typedi";
import { DbTestService } from "../helpers/tests/db-handler";
import { bookData } from "../helpers/tests/mock-data";
import Book from "./books.model";

describe("Book Model Test", () => {
  const dbHandler: DbTestService = Container.get(DbTestService);

  beforeAll(async () => await dbHandler.connect());

  afterEach(async () => await dbHandler.deleteDatabase());

  afterAll(async () => await dbHandler.disconnect());

  it("Create & save user successfully", async () => {
    const book = new Book(bookData);
    const savedUser = await book.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(bookData.name);
    expect(savedUser.author.length).toBe(bookData.author.length);
    expect(savedUser.publisher).toEqual(bookData.publisher);
    expect(savedUser.price).toEqual(bookData.price);
  });

  it("Throw error when any one of the field is empty", async () => {
    const book = new Book({
      name: "TekLoon",
    });
    try {
      await book.save();
    } catch (e) {
      expect(e.message).toContain("publisher location is required");
      expect(e.message).toContain("publisher name is required");
      expect(e.message).toContain("publisher_id is required");
      expect(e.message).toContain("Price is required");
    }
  });
});
