import { Router } from "express";
import { createTask, getTasks, deleteTask} from "../controllers/server.controller";
import {checkSchema, param} from "express-validator";
import {createTaskSchema, deleteTaskSchema} from "../validation/createTaskSchema";

const router = Router();

router.get('/api/task', getTasks)
router.post('/api/task-create', checkSchema(createTaskSchema), createTask)
router.delete('/api/task/:id',param('id', 'invalid uuid').isUUID(), deleteTask)
export default router;