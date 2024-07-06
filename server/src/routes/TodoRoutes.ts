import { Router } from "express";
import {
  getTodos,
  createTodo,
  editTodo,
  deleteTodo,
} from "../controllers/TodoController";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/:id", editTodo);
router.delete("/:id", deleteTodo);

export default router;
