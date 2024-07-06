import { TodoBody, UpdateTodoBody } from "../types/todoTypes";
import pool from "../../todosDb";

export const getTodosService = async () => {
  const result = await pool.query("SELECT * FROM todos");
  return result.rows;
};

export const createTodoService = async ({
  name,
  description,
  type,
}: TodoBody) => {
  const result = await pool.query(
    `INSERT INTO todos (name, description, type) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [name, description, type]
  );
  return result.rows[0];
};

export const editTodoService = async (
  uuid: string,
  updateBody: UpdateTodoBody
) => {
  const fieldsToUpdate: string[] = [];
  const values: (boolean | string)[] = [];

  for (const [key, value] of Object.entries(updateBody)) {
    fieldsToUpdate.push(`${key}=$${values.length + 1}`);
    values.push(value);
  }
  values.push(uuid);

  const result = await pool.query(
    `UPDATE todos 
     SET ${fieldsToUpdate.join(", ")}, updated_at = CURRENT_TIMESTAMP
     WHERE id=$${values.length}
     RETURNING *`,
    values
  );

  return result.rows[0];
};

export const deleteTodoService = async (uuid: string) => {
  await pool.query(
    `DELETE FROM todos 
     WHERE id = $1
     RETURNING *`,
    [uuid]
  );

  return "Deleted!";
};
