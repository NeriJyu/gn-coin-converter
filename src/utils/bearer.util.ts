import jwt from "jsonwebtoken";

export const encryptBearer = (bearer: string) => {
  const token = jwt.sign({ bearer }, process.env.JWT_TOKEN || "", {
    expiresIn: "2h",
  });

  return token;
};

export const decryptBearer = (token: string) => {
  if (!process.env.JWT_TOKEN) throw new Error("Missing environment variable");

  const decoded = jwt.verify(token, process.env.JWT_TOKEN);

  return decoded;
};

export const isValid = async (bearer: string) => {
  if (!process.env.JWT_TOKEN) throw new Error("Missing environment variable");

  let valid;

  await jwt.verify(bearer, process.env.JWT_TOKEN, (err) => {
    if (err) valid = false;
    else valid = true;
  });

  return valid;
};
