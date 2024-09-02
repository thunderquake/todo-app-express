import { TODO_TYPES } from "../constants/constants";

export const parseTodoTypes = (typeParam: string) => {
  try {
    return JSON.parse(typeParam);
  } catch {
    return TODO_TYPES;
  }
};
