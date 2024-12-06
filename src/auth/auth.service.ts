import {injectable} from "inversify";
import {JwtPayload, sign, verify} from "jsonwebtoken";

@injectable()
export class AuthService {
  jwtSecret: string;
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'superDopeSecret123'
  }

  async signToken(payload: any): Promise<string> {
    const expTime = parseInt(process.env.JWT_EXPIRES_AT || '5000')

    return sign(payload, this.jwtSecret, {expiresIn: expTime});
  }

  async verifyToken(token: string) {
    try {
      return await verify(token, this.jwtSecret);
    } catch (e) {
      throw new Error("Unauthorized");
    }
  }
}
