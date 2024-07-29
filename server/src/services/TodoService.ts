import { TodoBody, UpdateTodoBody } from "../types/todoTypes";
import pool from "../../todosDb";

interface GetTodosOptions {
  itemsPerPage?: number;
  page?: number;
}

export const getTodosService = async ({
  itemsPerPage = 10,
  page = 1,
}: GetTodosOptions = {}) => {
  const offset = (page - 1) * itemsPerPage;
  const query = `SELECT * FROM todos LIMIT $1 OFFSET $2`;
  const countQuery = `SELECT COUNT(*) FROM todos`;

  const result = await pool.query(query, [itemsPerPage, offset]);
  const countResult = await pool.query(countQuery);

  return {
    todos: result.rows,
    totalCount: Number(countResult.rows[0].count),
  };
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
