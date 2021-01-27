import moment from "moment";
import connection from "../connection";
import uuidv4 from "uuid/v4";
import {
  hashPassword,
  isValidEmail,
  comparePassword,
  generateToken,
} from "../helpers/helpers";

const tblUsers = "alibaba_dev.td_users";

/**
 * Create New User
 * @param {string} email
 * @param {string} password
 * @return {object} result return response
 */

const insertNewUser = async (email, password, result) => {
  try {
    // Check if data empty
    if (!email || !password) {
      result(null, { code: 400, message: "Email or password is empty!" });
    }

    // Check email pattern
    const checkEmailPattern = isValidEmail(email);

    if (!checkEmailPattern) {
      result(null, { code: 400, message: "Please input a valid email!" });
    }

    // Hash password
    const hashProcess = hashPassword(password);

    const queryText = `INSERT INTO
    ${tblUsers} (id, email, password, created_date, modified_date)
    VALUES($1, $2, $3, $4, $5)
    returning *`;

    const values = [
      uuidv4(),
      email,
      hashProcess,
      moment(new Date()),
      moment(new Date()),
    ];

    const { rows } = await connection.query(queryText, values);

    // Create Token
    const getToken = generateToken(rows[0].id);

    return result({ code: 201, token: getToken, data: rows[0].id }, null);
  } catch (error) {
    if (error.routine === "_bt.check_unique") {
      result(null, { code: 400, message: "User already exist!" });
    }
    result(null, {
      code: 500,
      message: `An error occured - ${error.message}`,
    });
  }
};

/**
 * Check user login
 * @param {string} email
 * @param {string} password
 * @returns {object} result
 */

const processCheckLogin = async (email, password, result) => {
  try {
    // Check if input is empty
    if (!email || !password) {
      result(null, { code: 400, message: "Email or password is empty!" });
    }

    // Check email pattern
    const checkEmailPattern = isValidEmail(email);

    if (!checkEmailPattern) {
      result(null, { code: 400, message: "Please input a valid email!" });
    }

    const queryText = `SELECT * FROM ${tblUsers} WHERE email = $1`;
    const values = [email];

    const { rows } = await db.query(queryText, values);

    // User not found
    if (rows.length < 0) {
      return res
        .status(400)
        .send({ message: "The credentials you provided is incorrect" });
    }

    // Compare Password
    const processComparePassword = comparePassword(rows[0].password, password);

    // If password not identical
    if (!processComparePassword) {
      return res
        .status(400)
        .send({ message: "The credentials you provided is incorrect" });
    }

    // Generate Token
    const getToken = generateToken(rows[0].id);
    return result({ code: 200, token: getToken });
  } catch (error) {
    return result(null, {
      code: 500,
      message: `An error occured - ${error.message}`,
    });
  }
};

/**
 * Delete an user
 * @param {*} id
 * @param {*} result
 */
const deleteDataUser = async (id, result) => {
  const deleteQuery = `DELETE FROM ${tblUsers} WHERE id=$1 returning *`;
  const values = [id];
  try {
    const { rows } = await db.query(deleteQuery, values);
    if (rows.length < 0) {
      return result(null, { code: 400, message: "User Not Found" });
    }
    return result({ code: 204, message: "deleted" }, null);
  } catch (error) {
    return result(null, {
      code: 500,
      message: `An error occured - ${error.message}`,
    });
  }
};

/**
 * Check exist user
 * @param {string} id
 * @returns {boolean}
 */
const checkUser = async (id) => {
  const queryText = `SELECT * FROM ${tblUsers} WHERE id=$1`;
  const values = [id];

  try {
    const { rows } = await connection.query(queryText, values);

    if (rows.length < 0) {
      return false;
    }

    return true;
  } catch (error) {
    return { code: 500, message: `An error occured - ${error.message}` };
  }
};

export { insertNewUser, deleteDataUser, processCheckLogin, checkUser };
