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
      return result(null, {
        code: 400,
        message: "Email or password is empty!",
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

    const queryText = `SELECT * FROM ${tblUsers} WHERE email = $1`;
    const values = [email];

    const { rows } = await connection.query(queryText, values);

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

export { processCheckLogin };
