import connection from "../connection";

const tblUsers = "alibaba.td_users";

const checkIsLoginUser = async (email, result) => {
  const queryText = `SELECT fl_is_login from ${tblUsers} WHERE email=$1 `;
  const values = [email];

  try {
    const { rows } = await connection.query(queryText, values);

    if (rows[0].fl_is_login === false) {
      return result(null, { code: 400, message: "Username not found!" });
    }

    return result({ code: 200, data: rows[0] });
  } catch (error) {
    return result(null, {
      code: 500,
      message: `An error occured - ${error.message}`,
    });
  }
};

const updateStatusLoginUser = async (email, is_login, result) => {
  const queryText = `UPDATE ${tblUsers} SET fl_is_login = $1 WHERE email = $2 RETURNING *`;

  const values = [is_login, email];

  try {
    const { rows } = await connection.query(queryText, values);

    if (rows.length < 1) {
      return result(null, { code: 400, data: null });
    }

    return result({ code: 200, message: "Update status success!" });
  } catch (error) {
    return result(null, {
      code: 500,
      message: `An error occured - ${error.message}`,
    });
  }
};
