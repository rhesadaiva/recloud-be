import pool from "./db_conn";

export default {
  /**
   * DB Query
   * @params { object } req
   * @params { object } res
   * @returns { object } object
   */

  query(queryText, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(queryText, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
