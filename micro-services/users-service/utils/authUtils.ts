// utils/authUtils.ts
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hachage d'un mot de passe avec un sel
 * @param password - Le mot de passe en clair
 * @returns Le mot de passe haché
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

/**
 * Comparaison d'un mot de passe en clair avec un mot de passe haché
 * @param password - Le mot de passe en clair
 * @param hashedPassword - Le mot de passe haché
 * @returns Un boolean indiquant si les mots de passe correspondent
 */
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
