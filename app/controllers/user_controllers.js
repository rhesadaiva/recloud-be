import { insertNewUser, deleteDataUser } from "../models/user_models";

/**
 * Post New Users
 * @param {object} req
 * @param {object} res
 */

const postNewUsers = async (req, res) => {
  const { email, password } = req.body;

  try {
    await insertNewUser(email, password, async (result, error) => {
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

/**
 * Delete User
 * @param {object} req
 * @param {object} res
 */

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteDataUser(id, async (result, error) => {
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

export { postNewUsers, deleteUser };
