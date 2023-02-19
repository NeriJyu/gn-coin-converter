import { dbQuery, dbQueryFirst } from "../config/db";
import { I_CreateUser, I_User } from "../interfaces/user.interfaces";
import { hashPassword } from "../utils/hash.util";

class UserRepositorie {
  findUserByEmail(email: string): Promise<I_User> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!email) throw { status: 400, message: "Email was not informed!" };

        const userData = await dbQueryFirst(
          "SELECT * FROM users WHERE email = ?",
          [email]
        );

        if (!userData) throw { status: 404, message: "User not found!" };

        resolve(userData);
      } catch (err) {
        reject(err);
      }
    });
  }

  findUserById(id: number): Promise<I_User> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!id || id <= 0)
          throw { status: 400, message: "Id was not informed!" };

        const user = await dbQueryFirst("SELECT * FROM users WHERE id = ?", [
          id,
        ]);

        if (!user) throw { status: 404, message: "User not found!" };

        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  findLastUser(): Promise<{ Id: number }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user: any = await dbQuery(
          `SELECT seq AS Id FROM sqlite_sequence WHERE name = 'users'`
        );

        if (!user[0]) throw { status: 404, message: "User not found!" };

        resolve(user[0]);
      } catch (err) {
        reject(err);
      }
    });
  }

  createUser(user: I_CreateUser): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!user.email)
          throw { status: 400, message: "Email was not informed!" };
        if (!user.password)
          throw { status: 400, message: "Password was not informed!" };

        const hashedPassword = await hashPassword(user.password);

        user.password = hashedPassword;

        const createdUser = await dbQuery(
          "INSERT INTO users (name, email, password) VALUES(?, ?, ?)",
          [user.name, user.email, user.password]
        );

        resolve(createdUser);
      } catch (err: any) {
        let error = err;

        if (err?.errno === 19)
          error = {
            status: 409,
            message: "Email is already in use!",
          };

        reject(error);
      }
    });
  }

  deleteUser(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!id || id <= 0) throw { status: 400, message: "Id invalid!" };

        const deleteUser = await dbQueryFirst(
          "DELETE FROM users WHERE id = ?",
          [id]
        );

        resolve(deleteUser);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default UserRepositorie;
