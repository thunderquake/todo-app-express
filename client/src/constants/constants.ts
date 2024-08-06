import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import PsychologyAltOutlinedIcon from "@mui/icons-material/PsychologyAltOutlined";
import { SvgIconComponent } from "@mui/icons-material";

export const QUERY_KEYS = {
  GET_TODOS_QUERY: "GET_TODOS_QUERY_KEY",
  POST_TODO_QUERY: "POST_TODO_QUERY_KEY",
  DELETE_TODO_QUERY: "DELETE_TODO_QUERY_KEY",
  EDIT_TODO_QUERY: "EDIT_TODO_QUERY_KEY",
};

export const TABLE_HEADERS = [
  "",
  "Name",
  "Description",
  "Created At",
  "Updated At",
  "",
];

export const TODO_TYPE_ICONS: Record<string, SvgIconComponent> = {
  Idea: LightbulbOutlinedIcon,
  Quote: FormatQuoteOutlinedIcon,
  Task: TaskOutlinedIcon,
  Thoughts: PsychologyAltOutlinedIcon,
};

export const ITEMS_PER_PAGE = 8;
