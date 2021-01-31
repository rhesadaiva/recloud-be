import {
  getDetailTaskById,
  getTaskByUserDate,
  insertNewTask,
  updateDataTask,
  deleteDataTask,
  updateKirimTask,
  updatePersetujuanTask,
  updatePenolakanTask,
} from "../models/task_models";

/**
 * Get All Task By User and Date
 * @param {number} req
 * @param {object} res
 */
const getTaskAll = async (req, res) => {
  const { id_user, task_date } = req.query;

  try {
    await getTaskByUserDate(id_user, task_date, async (result, error) => {
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
 * Get Detail Task
 * @param {object} req
 * @param {object} res
 */
const getTaskDetail = async (req, res) => {
  const { id_task } = req.params;

  try {
    await getDetailTaskById(id_task, async (result, error) => {
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
 * Post a task
 * @param {object} req
 * @param {object} res
 */
const postTask = async (req, res) => {
  const {
    nama_task,
    uraian_task,
    task_start,
    task_end,
    task_duration,
    task_date,
    assignee_id,
    assignor_id,
  } = req.body;

  try {
    await insertNewTask(
      nama_task,
      uraian_task,
      task_start,
      task_end,
      task_duration,
      task_date,
      assignee_id,
      assignor_id,
      async (result, error) => {
        if (error) {
          return res.status(error.code).send(error);
        } else {
          return res.status(result.code).send(result);
        }
      },
    );
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: `An error occured - ${error.message}` });
  }
};

/**
 * Put a task
 * @param {object} req
 * @param {object} res
 */
const putTask = async (req, res) => {
  const {
    nama_task,
    uraian_task,
    task_start,
    task_end,
    task_duration,
    task_date,
    assignor_id,
  } = req.body;

  const { id_task } = req.params;

  try {
    await updateDataTask(
      nama_task,
      uraian_task,
      task_start,
      task_end,
      task_duration,
      task_date,
      assignor_id,
      id_task,
      async (result, error) => {
        if (error) {
          return res.status(error.code).send(error);
        } else {
          return res.status(result.code).send(result);
        }
      },
    );
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: `An error occured - ${error.message}` });
  }
};

/**
 * Delete a task
 * @param {object} req
 * @param {object} res
 */
const deleteTask = async (req, res) => {
  const { id_task } = req.params;

  try {
    await deleteDataTask(id_task, async (result, error) => {
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
 * Send a task
 * @param {object} req
 * @param {object} res
 */
const sendTask = async (req, res) => {
  const { id_task } = req.params;

  try {
    await updateKirimTask(id_task, async (result, error) => {
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
 * Approve a task
 * @param {object} req
 * @param {object} res
 */
const approveTask = async (req, res) => {
  const { keterangan_task } = req.body;
  const { id_task } = req.params;

  try {
    await updatePersetujuanTask(
      keterangan_task,
      id_task,
      async (result, error) => {
        if (error) {
          return res.status(error.code).send(error);
        } else {
          return res.status(result.code).send(result);
        }
      },
    );
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: `An error occured - ${error.message}` });
  }
};

/**
 * Reject a task
 * @param {object} req
 * @param {object} res
 */
const rejectTask = async (req, res) => {
  const { keterangan_task } = req.body;
  const { id_task } = req.params;

  try {
    await updatePenolakanTask(
      keterangan_task,
      id_task,
      async (result, error) => {
        if (error) {
          return res.status(error.code).send(error);
        } else {
          return res.status(result.code).send(result);
        }
      },
    );
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: `An error occured - ${error.message}` });
  }
};

export {
  getTaskAll,
  getTaskDetail,
  postTask,
  putTask,
  deleteTask,
  sendTask,
  approveTask,
  rejectTask,
};
