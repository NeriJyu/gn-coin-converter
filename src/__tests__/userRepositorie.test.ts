import UserRepositorie from "../repositories/user.repositorie";

// Find user by email
describe("Find user by email", () => {
  const userRepositorie = new UserRepositorie();

  beforeAll(async () => {
    await userRepositorie.createUser({
      email: "usuariotestefindbyemail@hotmail.com",
      password: "ABC123def456",
      name: "Usuário Teste",
    });
  });

  it("should be able to find an user by email", async () => {
    const user = await userRepositorie.findUserByEmail(
      "usuariotestefindbyemail@hotmail.com"
    );

    expect(user.name).toBe("Usuário Teste");
    expect(user.email).toBe("usuariotestefindbyemail@hotmail.com");
  });

  it("should be able to show email not informed error", async () => {
    await expect(() => userRepositorie.findUserByEmail("")).rejects.toEqual({
      status: 400,
      message: "Email was not informed!",
    });
  });

  it("should be able to show user not found error", async () => {
    await expect(() =>
      userRepositorie.findUserByEmail("usuarionaocriado@hotmail.com")
    ).rejects.toEqual({
      status: 404,
      message: "User not found!",
    });
  });

  afterAll(async () => {
    const lasUser = await userRepositorie.findLastUser();

    await userRepositorie.deleteUser(lasUser.Id);
  });
});

// Find user by id
describe("Find user by id", () => {
  const userRepositorie = new UserRepositorie();
  let lastUser: any;

  beforeAll(async () => {
    await userRepositorie.createUser({
      email: "usuariotestefindbyid@hotmail.com",
      password: "ABC123def456",
      name: "Usuário Teste",
    });

    lastUser = await userRepositorie.findLastUser();
  });

  it("should be able to find an user by id", async () => {
    const user = await userRepositorie.findUserById(lastUser.Id);

    expect(user.name).toBe("Usuário Teste");
    expect(user.email).toBe("usuariotestefindbyid@hotmail.com");
  });

  it("should be able to show id not informed error", async () => {
    await expect(() => userRepositorie.findUserById(0)).rejects.toEqual({
      status: 400,
      message: "Id was not informed!",
    });
  });

  it("should be able to show user not found error", async () => {
    await expect(() => userRepositorie.findUserById(99852)).rejects.toEqual({
      status: 404,
      message: "User not found!",
    });
  });

  afterAll(async () => {
    await userRepositorie.deleteUser(lastUser.Id);
  });
});

// Find id of last created user
describe("Find if of last created user", () => {
  const userRepositorie = new UserRepositorie();
  let lastUser: any;

  beforeAll(async () => {
    await userRepositorie.createUser({
      email: "usuariotestefindlastuser@hotmail.com",
      password: "ABC123def456",
      name: "Usuário Teste",
    });

    lastUser = await userRepositorie.findLastUser();
  });

  it("should be able to find id of last created user", async () => {
    const user = await userRepositorie.findLastUser();

    expect(user.Id).toBe(lastUser.Id);
  });

  afterAll(async () => {
    await userRepositorie.deleteUser(lastUser.Id);
  });
});

// Create user
describe("Create user", () => {
  const userRepositorie = new UserRepositorie();

  it("should be able to create a new user", async () => {
    const user = await userRepositorie.createUser({
      email: "usuariotesteemail@hotmail.com",
      password: "ABC123def456",
      name: "Usuário Teste",
    });

    expect(user.length).toBe(0);
  });

  it("should be able to show email already in use error", async () => {
    await expect(() =>
      userRepositorie.createUser({
        email: "gustavoneri20@hotmail.com",
        password: "ABC123def456",
        name: "Usuário Teste",
      })
    ).rejects.toEqual({ status: 409, message: "Email is already in use!" });
  });

  it("should be able to show email not informed error", async () => {
    await expect(() =>
      userRepositorie.createUser({
        email: "",
        password: "ABC123def456",
        name: "Usuário Teste",
      })
    ).rejects.toEqual({ status: 400, message: "Email was not informed!" });
  });

  it("should be able to show password not informed error", async () => {
    await expect(() =>
      userRepositorie.createUser({
        email: "showPasswordError@hotmail.com",
        password: "",
        name: "Usuário Teste",
      })
    ).rejects.toEqual({ status: 400, message: "Password was not informed!" });
  });

  afterAll(async () => {
    const lastUser = await userRepositorie.findLastUser();

    await userRepositorie.deleteUser(lastUser.Id);
  });
});

// Delete user
describe("Delete user", () => {
  const userRepositorie = new UserRepositorie();
  let lastUser: any;

  beforeAll(async () => {
    await userRepositorie.createUser({
      email: "usuariotestefindlastuser@hotmail.com",
      password: "ABC123def456",
      name: "Usuário Teste",
    });

    lastUser = await userRepositorie.findLastUser();
  });

  it("should be able to delete an user", async () => {
    const user = await userRepositorie.deleteUser(lastUser.Id);

    expect(user).toBe(undefined);
  });

  it("should be able to show id invalid error", async () => {
    await expect(() => userRepositorie.deleteUser(0)).rejects.toEqual({
      status: 400,
      message: "Id invalid!",
    });
  });
});
