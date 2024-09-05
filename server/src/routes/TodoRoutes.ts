import { Router } from "express";
import {
  getTodos,
  createTodo,
  editTodo,
  deleteTodo,
  getTodoStatistics,
} from "../controllers/TodoController";

const router = Router();

router.get("/", getTodos);
router.get("/stats", getTodoStatistics);
router.post("/", createTodo);
router.patch("/:id", editTodo);
router.delete("/:id", deleteTodo);

export default router;
