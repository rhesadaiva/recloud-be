import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

/**
 * Check is valid email pattern
 * @param {string} email
 * @returns {Boolean} return if is valid or not
 */

const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

/**
 * comparePassword
 * @param {string} hashPassword
 * @param {string} password
 * @returns {Boolean} return True or False
 */
const comparePassword = (hashPassword, password) => {
  return bcrypt.compareSync(password, hashPassword);
};

/**
 * Gnerate Token
 * @param {string} id
 * @returns {string} token
 */
const generateToken = (id) => {
  const token = jwt.sign(
    {
      userId: id,
    },
    process.env.SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

/**
 * Create Timestamp
 * @returns {string} Timestamp
 */

const dateTimeNow = () => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -5)
    .replace("T", " ");

  return localISOTime;
};

/**
 * Generate Date Now
 * @returns {date} Date
 */

const dateNow = () => {
  const date = new Date().toISOString().slice(0, 10);

  return date.toString();
};

export {
  hashPassword,
  isValidEmail,
  comparePassword,
  generateToken,
  dateTimeNow,
  dateNow,
};
