import { I_User } from "../interfaces/user.interfaces";
import UserRepositorie from "../repositories/user.repositorie";
import { encryptBearer } from "../utils/bearer.util";
import { comparePassword } from "../utils/hash.util";

class AuthController {
  private userRepositorie = new UserRepositorie();

  login(auth: I_User): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const userAuthData = await this.userRepositorie.findUserByEmail(
          auth.email
        );

        if (userAuthData) {
          const authUser = await comparePassword(auth, userAuthData.password);

          if (!authUser) throw { status: 401, message: "Invalid credentials" };

          const stringify = JSON.stringify(userAuthData);
          const bearer = encryptBearer(stringify);

          resolve(bearer);
        } else {
          throw { status: 401, message: "Invalid credentials" };
        }
      } catch (err: any) {
        let error = err;

        if (err?.status === 404)
          error = { status: 401, message: "Invalid credentials" };

        reject(error);
      }
    });
  }
}

export default AuthController;
