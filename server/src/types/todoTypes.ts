export type TodoBody = { name: string; description: string; type: string };

export type UpdateTodoBody = Partial<TodoBody>;
