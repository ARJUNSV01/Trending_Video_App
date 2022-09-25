import jwt from "jsonwebtoken";

const generateToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
};
export default generateToken;
