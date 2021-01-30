import connection from "../connection";

const tblAbsen = "alibaba.td_absen";

/**
 * Insert data absen masuk
 * @param {string} waktu_masuk
 * @param {string} jenis_absen_masuk
 * @param {date} tanggal_absen
 * @param {number} id_user
 * @param {object} result
 */

const insertDataAbsenMasuk = async (
  waktu_masuk,
  jenis_absen_masuk,
  tanggal_absen,
  id_user,
  result
) => {
  const queryText = `INSERT INTO ${tblAbsen} (waktu_masuk,jenis_absen_masuk,tanggal_absen,id_user) VALUES ($1,$2,$3,$4) RETURNING * `;
  const values = [waktu_masuk, jenis_absen_masuk, tanggal_absen, id_user];

  try {
    const { rows } = await connection.query(queryText, values);

    if (rows.length > 0) {
      return result({ code: 200, data: rows[0] }, null);
    }
  } catch (error) {
    return result(null, {
      code: 500,
      message: `An error occured in models - ${error.message}`,
    });
  }
};

/**
 * Insert Data Absen Keluar
 * @param {date} waktu_keluar
 * @param {string} jenis_absen_keluar
 * @param {number} id_user
 * @param {date} tanggal_absen
 * @param {object} result
 */

const insertDataAbsenKeluar = async (
  waktu_keluar,
  jenis_absen_keluar,
  id_user,
  tanggal_absen,
  result
) => {
  const queryText = `UPDATE ${tblAbsen} SET waktu_keluar=$1,jenis_absen_keluar=$2 WHERE id_user=$3 and tanggal_absen=$4 RETURNING *`;
  const values = [waktu_keluar, jenis_absen_keluar, id_user, tanggal_absen];

  try {
    const { rows } = await connection.query(queryText, values);

    if (rows.length > 0) {
      return result({ code: 200, data: rows[0] }, null);
    }
  } catch (error) {
    return result(null, {
      code: 500,
      message: `An error occured in models - ${error.message}`,
    });
  }
};

export { insertDataAbsenMasuk, insertDataAbsenKeluar };
