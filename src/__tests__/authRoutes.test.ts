import { app } from "../index";
import request from "supertest";

describe("POST /auth/login", () => {
  it("should be able to login", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "gustavoneri20@hotmail.com",
      password: "ABC123def456",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.status).toBe("OK");
  });

  it("should return invalid credentials error", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "gustavoneri20@hotmail.com99",
      password: "ABC123def45699",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
    expect(response.body.status).toBe("ERROR");
  });

  it("should return missing email error", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "",
      password: "ABC123def456",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing Parameters: E-mail");
    expect(response.body.status).toBe("ERROR");
  });

  it("should return missing password error", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "gustavoneri20@hotmail.com",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing Parameters: Password");
    expect(response.body.status).toBe("ERROR");
  });
});
