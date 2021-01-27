import { processCheckLogin } from "../models/user_models";

/**
 * Login
 * @param {object} req
 * @param {object} res
 */

const doLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    await processCheckLogin(email, password, async (result, error) => {
      if (error) {
        return res.status(error.code).send(error);
      } else {
        return res.status(result.code).send(result);
      }
    });
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: `An error occured - ${error.message}` });
  }
};

export { doLogin };
