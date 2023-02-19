import { isValid } from "../utils/bearer.util";

export const authMidleware = async (header: string) => {
  const [type, token] = header.split(" ");

  if (!type) return false;
  if (!token) return false;
  if (type != "Bearer") return false;

  return await isValid(token);
};
