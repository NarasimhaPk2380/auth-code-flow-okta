import Container from "typedi";
import { DbTestService } from "../helpers/tests/db-handler";
import { reviewData } from "../helpers/tests/mock-data";
import Review from "./review.model";

describe("Review Model Test", () => {
  const dbHandler: DbTestService = Container.get(DbTestService);

  beforeAll(async () => await dbHandler.connect());

  afterEach(async () => await dbHandler.deleteDatabase());

  afterAll(async () => await dbHandler.disconnect());

  it("Create & save user successfully", async () => {
    const review = new Review(reviewData);
    const savedReview = await review.save();

    expect(savedReview._id).toBeDefined();
    expect(savedReview.reviewer).toBe(reviewData.reviewer);
    expect(savedReview.message).toBe(reviewData.message);
  });

  it("Throw error when any one of the field is empty", async () => {
    const review = new Review({});
    try {
      await review.save();
    } catch (e) {
      expect(e.message).toContain("Reviewer is required");
      expect(e.message).toContain("Message is required");
    }
  });
});
