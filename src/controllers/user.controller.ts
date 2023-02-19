import { I_CreateUser, I_User } from "../interfaces/user.interfaces";
import UserRepositorie from "../repositories/user.repositorie";

class UserController {
  private userRepositorie = new UserRepositorie();

  findUserById(id: number): Promise<I_User> {
    return new Promise(async (resolve, reject) => {
      await this.userRepositorie
        .findUserById(id)
        .then((user) => resolve(user))
        .catch((err) => reject(err));
    });
  }

  createUser(user: I_CreateUser): Promise<I_User> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.userRepositorie.createUser(user);

        const lastUser = await this.userRepositorie.findLastUser();

        const createdUser = await this.userRepositorie.findUserById(
          lastUser.Id
        );

        resolve(createdUser);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default UserController;
