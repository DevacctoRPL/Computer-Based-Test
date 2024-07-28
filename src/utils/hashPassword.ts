import * as crypto from "crypto"

export const hashPassword = async (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto
      .createHash("sha256")
      .update(password)
      .digest("hex") // Hanya berikan encoding di sini
      .then((hash: string) => resolve(hash))
      .catch((err: Error | null) => reject(err))
  })
}
