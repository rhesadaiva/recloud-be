import connection from "../connection";

const tblTask = "alibaba.td_task";
const tblUsers = "alibaba.td_users";
const tblRefStatus = "alibaba.tr_status_task";

/**
 * Get List Task By User and Date
 * @param {number} id_user
 * @param {string} task_date
 * @returns {object} result
 */
const getTaskByUserDate = async (id_user, task_date, result) => {
  const queryText = `SELECT a.id_task, a.nama_task,a.uraian_task ,a.task_date ,a.task_start ,a.task_end, a.task_duration , a.fl_status_task,
  (SELECT nama_user from ${tblUsers} b WHERE a.assignee_id = b.id) AS pemilik_tugas, 
  (SELECT nama_user from ${tblUsers} b WHERE a.assignor_id = b.id) AS pemberi_tugas, 
  (SELECT ur_status_task from ${tblRefStatus} c WHERE a.fl_status_task = c.kd_status_task) AS task_status
  from ${tblTask} a WHERE assignee_id = $1 AND task_date = $2;`;
  const values = [id_user, task_date];

  try {
    const { rows } = await connection.query(queryText, values);

    if (rows.length < 1) {
      return result(null, {
        code: 404,
        message: "Data Task empty!",
        data: null,
      });
    }

    return result({ code: 200, message: "Data Task Found!", data: rows });
  } catch (error) {
    return result(null, {
      code: 500,
      message: `An error occured - ${error.message}`,
    });
  }
};

/**
 * Get Detail Task By Id Task
 * @param {number} id_task
 * @returns {object} result
 */
const getDetailTaskById = async (id_task, result) => {
  const queryText = `SELECT * FROM ${tblTask} WHERE id_task=$1`;
  const values = [id_task];

  try {
    const { rows } = await connection.query(queryText, values);

    if (rows.length < 1) {
      return result(null, {
        code: 404,
        message: "Data Task not found!",
        data: null,
      });
    }

    return result({ code: 200, message: "Data Task Found!", data: rows[0] });
  } catch (error) {
    return result(null, {
      code: 500,
      message: `An error occured - ${error.message}`,
    });
  }
};

/**
 * Insert New Task
 * @param {string} nama_task
 * @param {string} uraian_task
 * @param {string} task_start
 * @param {string} task_end
 * @param {string} task_duration
 * @param {string} task_date
 * @param {number} assignee_id
 * @param {number} assignor_id
 * @param {string} fl_status_task
 * @returns {object} result
 */
const insertNewTask = async (
  nama_task,
  uraian_task,
  task_start,
  task_end,
  task_duration,
  task_date,
  assignee_id,
  assignor_id,
  result,
) => {
  const queryText = `INSERT INTO ${tblTask} (nama_task,
    uraian_task,
    task_start,
    task_end,
    task_duration,
    task_date,
    assignee_id,
    assignor_id,
    fl_status_task) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;

  const values = [
    nama_task,
    uraian_task,
    task_start,
    task_end,
    task_duration,
    task_date,
    assignee_id,
    assignor_id,
    10,
  ];

  try {
    const { rows } = await connection.query(queryText, values);

    if (rows.length < 1) {
      return result(null, { code: 400, message: null });
    }

    return result({ code: 201, message: "Data Task Saved!", data: rows[0] });
  } catch (error) {
    return result(null, {
      code: 500,
      message: `An error occured - ${error.message}`,
    });
  }
};

/**
 * Update Task By Id Task
 * @param {string} nama_task
 * @param {string} uraian_task
 * @param {string} task_start
 * @param {string} task_end
 * @param {string} task_duration
 * @param {string} task_date
 * @param {number} assignor_id
 * @param {number} id_task
 * @returns {object} result
 */
const updateDataTask = async (
  nama_task,
  uraian_task,
  task_start,
  task_end,
  task_duration,
  task_date,
  assignor_id,
  id_task,
  result,
) => {
  const queryText = `UPDATE ${tblTask} SET 
  nama_task=$1,uraian_task=$2,task_start=$3,task_end=$4,task_duration=$5,task_date=$6,assignor_id=$7 WHERE id_task=$8 
  RETURNING *`;

  const values = [
    nama_task,
    uraian_task,
    task_start,
    task_end,
    task_duration,
    task_date,
    assignor_id,
    id_task,
  ];

  try {
    const { rows } = await connection.query(queryText, values);

    if (rows.length < 1) {
      return result(null, { code: 400, message: null });
    }

    return result({ code: 200, message: "Data Task Updated!", data: rows[0] });
  } catch (error) {
    return result(null, {
      code: 500,
      message: `An error occured - ${error.message}`,
    });
  }
};

/**
 * Delete Task
 * @param {number} id_task
 * @returns {object} result
 */
const deleteDataTask = async (id_task, result) => {
  const queryText = `DELETE FROM ${tblTask} WHERE id_task=$1 RETURNING *`;
  const values = [id_task];

  try {
    const { rows } = await connection.query(queryText, values);

    if (rows.length < 1) {
      return result(null, { code: 400, message: null });
    }

    return result({ code: 204, message: "Data Task Deleted!", data: null });
  } catch (error) {
    return result(null, {
      code: 500,
      message: `An error occured - ${error.message}`,
    });
  }
};

/**
 * Kirim Task
 * @param {number} id_task
 * @returns {object} result
 */
const updateKirimTask = async (id_task, result) => {
  const queryText = `UPDATE ${tblTask} SET fl_status_task=$1 WHERE id_task=$2 RETURNING *`;
  const values = [20, id_task];

  try {
    const { rows } = await connection.query(queryText, values);

    if (rows.length < 1) {
      return result(null, { code: 400, message: null });
    }

    return result({ code: 200, message: "Data Task Sent!", data: rows[0] });
  } catch (error) {
    return result(null, {
      code: 500,
      message: `An error occured - ${error.message}`,
    });
  }
};

/**
 * Update Status Task menjadi Setuju
 * @param {string} keterangan_task
 * @param {number} id_task
 * @returns {object} result
 */

const updatePersetujuanTask = async (keterangan_task, id_task, result) => {
  const queryText = `UPDATE ${tblTask} SET keterangan_setuju_atasan=$1,fl_status_task=$2 WHERE id_task=$3 RETURNING *`;
  const values = [keterangan_task, 30, id_task];

  try {
    const { rows } = await connection.query(queryText, values);

    if (rows.length < 1) {
      return result(null, { code: 400, message: null });
    }

    return result({ code: 200, message: "Data Task Updated!", data: rows[0] });
  } catch (error) {
    return result(null, {
      code: 500,
      message: `An error occured - ${error.message}`,
    });
  }
};

/**
 * Update Status Task menjadi Tolak
 * @param {string} keterangan_task
 * @param {number} id_task
 * @returns {object} result
 */

const updatePenolakanTask = async (keterangan_task, id_task, result) => {
  const queryText = `UPDATE ${tblTask} SET keterangan_tolak_atasan=$1,fl_status_task=$2 WHERE id_task=$3 RETURNING *`;
  const values = [keterangan_task, 40, id_task];

  try {
    const { rows } = await connection.query(queryText, values);

    if (rows.length < 1) {
      return result(null, { code: 400, message: null });
    }

    return result({ code: 200, message: "Data Task Updated!", data: rows[0] });
  } catch (error) {
    return result(null, {
      code: 500,
      message: `An error occured - ${error.message}`,
    });
  }
};

export {
  getDetailTaskById,
  getTaskByUserDate,
  insertNewTask,
  updateDataTask,
  deleteDataTask,
  updatePersetujuanTask,
  updatePenolakanTask,
  updateKirimTask,
};
