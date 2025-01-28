import crypto from "crypto";
export class TokenUtil {
  generateTokenString(length: number) {
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2));

    let token = randomBytes.toString("hex");

    return token.slice(0, length);
  }
  generateTokenNumber(length: number) {
    const chars = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars.charAt(randomIndex);
    }
    return result;
  }
}
export const tokenUtil = new TokenUtil();
