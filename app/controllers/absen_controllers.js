import {
  insertDataAbsenMasuk,
  insertDataAbsenKeluar,
} from "../models/absen_models";

import { dateTimeNow, dateNow } from "../helpers/helpers";

/**
 * Post Absen Masuk
 * @param {any} req
 * @param {any} res
 * @returns {object} Return Response
 */

const postAbsenMasuk = async (req, res) => {
  const { jns_absen_in, id_user } = req.body;

  try {
    await insertDataAbsenMasuk(
      dateTimeNow(),
      jns_absen_in,
      dateNow(),
      id_user,
      async (result, error) => {
        if (error) {
          return res.status(error.code).send(error);
        }

        return res.status(result.code).send(result);
      }
    );
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: `An error occured! - ${error.message}` });
  }
};

/**
 * Post Absen Keluar
 * @param {any} req
 * @param {any} res
 * @returns {object} Return Response
 */

const postAbsenKeluar = async (req, res) => {
  const { jns_absen_out, id_user } = req.body;

  try {
    await insertDataAbsenKeluar(
      dateTimeNow(),
      jns_absen_out,
      id_user,
      dateNow(),
      async (result, error) => {
        if (error) {
          return res.status(error.code).send(error);
        }
        return res.status(result.code).send(result);
      }
    );
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: `An error occured! - ${error.message}` });
  }
};

export { postAbsenMasuk, postAbsenKeluar };
