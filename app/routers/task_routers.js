import {
  getTaskAll,
  getTaskDetail,
  postTask,
  putTask,
  deleteTask,
  sendTask,
  approveTask,
  rejectTask,
} from "../controllers/task_controllers";

import express from "express";

const router = express.Router();

router.get("/task", getTaskAll);
router.get("/task/:id_task", getTaskDetail);
router.post("/task", postTask);
router.put("/task/:id_task", putTask);
router.delete("/task/:id_task", deleteTask);
router.post("/task/send/:id_task", sendTask);
router.post("/task/approve/:id_task", approveTask);
router.post("/task/reject/:id_task", rejectTask);

export default router;
