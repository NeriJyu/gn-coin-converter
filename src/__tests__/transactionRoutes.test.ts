import { app } from "../index";
import request from "supertest";

describe("GET /transactions", () => {
  it("should be able to return transactions by user id", async () => {
    const response = await request(app)
      .get("/transactions")
      .query({ user_id: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.status).toBe("SUCCESS");
  });

  it("should be able to return user id invalid error", async () => {
    const response = await request(app)
      .get("/transactions")
      .query({ user_id: 0 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User Id invalid!");
    expect(response.body.status).toBe("ERROR");
  });

  it("should be able to return missing user id error", async () => {
    const response = await request(app).get("/transactions").query({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing Parameters: user_id");
    expect(response.body.status).toBe("ERROR");
  });
});
