import { app } from "../index";
import request from "supertest";

describe("POST /exchange-rates/convert", () => {
  let auth: any;

  beforeAll(async () => {
    auth = await request(app).post("/auth/login").send({
      email: "gustavoneri20@hotmail.com",
      password: "ABC123def456",
    });
  });

  it("should convert values", async () => {
    const response = await request(app)
      .post("/exchange-rates/convert")
      .set("Authorization", `Bearer ${auth.body.data}`)
      .send({
        amount: "50",
        from: "BRL",
        to: "USD",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.status).toBe("SUCCESS");
  });

  it("should return missing amount error", async () => {
    const response = await request(app)
      .post("/exchange-rates/convert")
      .set("Authorization", `Bearer ${auth.body.data}`)
      .send({
        amount: "",
        from: "BRL",
        to: "USD",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing amount");
    expect(response.body.status).toBe("ERROR");
  });

  it("should return missing from error", async () => {
    const response = await request(app)
      .post("/exchange-rates/convert")
      .set("Authorization", `Bearer ${auth.body.data}`)
      .send({
        amount: "50",
        from: "",
        to: "USD",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing from");
    expect(response.body.status).toBe("ERROR");
  });

  it("should return missing to error", async () => {
    const response = await request(app)
      .post("/exchange-rates/convert")
      .set("Authorization", `Bearer ${auth.body.data}`)
      .send({
        amount: "50",
        from: "BRL",
        to: "",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing to");
    expect(response.body.status).toBe("ERROR");
  });

  it("should return unauthorized error", async () => {
    const response = await request(app)
      .post("/exchange-rates/convert")
      .set("Authorization", `Bearer wrongbearer`)
      .send({
        amount: "50",
        from: "BRL",
        to: "USD",
      });

    expect(response.status).toBe(401);
    expect(response.body.status).toBe("Unauthorized");
  });
});
