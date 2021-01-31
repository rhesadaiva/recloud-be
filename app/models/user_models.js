import moment from "moment";
import connection from "../connection";
import { hashPassword, isValidEmail } from "../helpers/helpers";

const tblUsers = "alibaba.td_users";

/**
 * Create New User
 * @param {string} email
 * @param {string} password,
 * @param {string} nama,
 * @param {number} role,
 * @return {object} result return response
 */

const insertNewUser = async (email, password, nama_user, role, result) => {
  try {
    // Check if data empty
    if (!email || !password || !nama_user || !role) {
      return result(null, {
        code: 400,
        message: "Field is empty!",
      });
    }

    // Check email pattern
    const checkEmailPattern = isValidEmail(email);

    if (!checkEmailPattern) {
      return result(null, {
        code: 400,
        message: "Please input a valid email!",
      });
    }

    // Hash password
    const hashProcess = hashPassword(password);

    const queryText = `INSERT INTO
    ${tblUsers} (email, password, nama_user, fl_is_verified, fl_role, created_at, modified_at)
    VALUES($1, $2, $3, $4,$5,$6,$7)
    returning *`;

    const values = [
      email,
      hashProcess,
      nama_user,
      "N",
      role,
      moment(new Date()),
      moment(new Date()),
    ];

    // Insert new data
    const { rows } = await connection.query(queryText, values);
    return result({ code: 201, data: rows[0] }, null);

    // catch
  } catch (error) {
    if (error.routine === "_bt.check_unique") {
      return result(null, { code: 400, message: "User already exist!" });
    }
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
    const { rows } = await connection.query(deleteQuery, values);
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

export { insertNewUser, deleteDataUser, checkUser };
