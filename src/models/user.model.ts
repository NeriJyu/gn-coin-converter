import { dbQuery, dbQueryFirst } from "../config/db";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

const insertUser = async (user: User) => {
  await dbQuery("INSERT INTO users (name, email, password) VALUES(?, ?, ?)", [
    user.name,
    user.email,
    user.password,
  ]);

  let createdUser: any = await dbQuery(
    `SELECT seq AS Id FROM sqlite_sequence WHERE name = 'users'`
  );

  return getUser(createdUser[0].Id);
};

const listUsers = async () => {
  const users = await dbQuery("SELECT * FROM users");

  return users as User[];
};

const getUser = async (id: number) => {
  const user = await dbQueryFirst("SELECT * FROM users WHERE id = ?", [id]);

  console.log("user: ", user);

  return user as User | undefined;
};

const deleteUser = async (id: number) => {
  const user = await dbQueryFirst("DELETE FROM users WHERE id = ?", [id]);

  return user as User | undefined;
};

export const userModel = {
  insertUser,
  listUsers,
  getUser,
  deleteUser,
};
