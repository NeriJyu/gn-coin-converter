import { app } from "../index";
import request from "supertest";
import UserRepositorie from "../repositories/user.repositorie";

describe("POST /users", () => {
  const userRepositorie = new UserRepositorie();

  it("should be able to create and return an user", async () => {
    const response = await request(app).post("/users").send({
      name: "Gustavo Neri",
      email: "gustavoneriroute@hotmail.com",
      password: "ABC123def456",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body.status).toBe("SUCCESS");
  });

  it("should able to return email not informed error", async () => {
    const response = await request(app).post("/users").send({
      name: "Gustavo Neri",
      email: "",
      password: "ABC123def456",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email was not informed!");
    expect(response.body.status).toBe("ERROR");
  });

  it("should able to return password not informed error", async () => {
    const response = await request(app).post("/users").send({
      name: "Gustavo Neri",
      email: "gustavoneriroute@hotmail.com",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Password was not informed!");
    expect(response.body.status).toBe("ERROR");
  });

  it("should able to return email already in use error", async () => {
    const response = await request(app).post("/users").send({
      name: "Gustavo Neri",
      email: "gustavoneriroute@hotmail.com",
      password: "ABC123def456",
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Email is already in use!");
    expect(response.body.status).toBe("ERROR");
  });

  afterAll(async () => {
    const lastUser = await userRepositorie.findLastUser();

    await userRepositorie.deleteUser(lastUser.Id);
  });
});
