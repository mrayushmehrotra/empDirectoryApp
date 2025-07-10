import { Employee } from "../generated/prisma";

import JWT from "jsonwebtoken";
import { JWTUser } from "../interfaces";

const JWT_SECRET = "this is something secret";
class JWTService {
  public static generateTokenForUser(user: Employee) {
    const payload: JWTUser = {
      id: user?.id,
      name: user?.name,
    };
    const token = JWT.sign(payload, JWT_SECRET);
    return token;
  }
  public static decodeToken(token: string) {
    try {
      return JWT.verify(token, JWT_SECRET) as JWTUser;
    } catch (error) {
      return null;
    }
  }
}

export default JWTService;
