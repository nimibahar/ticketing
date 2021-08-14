import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const asyncScrypt = promisify(scrypt);

export class PasswordService {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await asyncScrypt(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedStoredPassword, salt] = storedPassword.split(".");
    const buf = (await asyncScrypt(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedStoredPassword;
  }
}
