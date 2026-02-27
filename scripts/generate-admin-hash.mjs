import crypto from "crypto";

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/generate-admin-hash.mjs <password>");
  process.exit(1);
}

const iterations = 120000;
const salt = crypto.randomBytes(16);
const digest = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512");

console.log(`pbkdf2$${iterations}$${salt.toString("base64")}$${digest.toString("base64")}`);
