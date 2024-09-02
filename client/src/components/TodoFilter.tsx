import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Checkbox,
  FormControl,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TODO_TYPES } from "../constants/constants";
import { parseTodoTypes } from "../helpers/parseTodoTypes";

interface TodoFiltersProps {
  setTypes: (types: string[]) => void;
}

const TodoFilterMenu: React.FC<TodoFiltersProps> = ({ setTypes }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeParam = searchParams.get("type");

  const initialTypes = useMemo(
    () =>
      typeParam === "[]"
        ? TODO_TYPES
        : typeParam
        ? typeParam && parseTodoTypes(typeParam)
        : TODO_TYPES,
    [typeParam]
  );

  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    let newSelectedTypes = event.target.value as string[];

    if (newSelectedTypes.length === 0) {
      newSelectedTypes = TODO_TYPES;
    }

    setSelectedTypes(newSelectedTypes);
    setTypes(newSelectedTypes);
    const currentName = searchParams.get("name");

    type Params = {
      page: string;
      type?: string;
      name?: string;
    };

    const sortedNewSelectedTypes = [...newSelectedTypes].sort();
    const sortedTodoTypes = [...TODO_TYPES].sort();

    const newParams: Params = {
      page: "1",
    };

    if (currentName) {
      newParams.name = currentName;
    }

    newParams.type =
      JSON.stringify(sortedNewSelectedTypes) === JSON.stringify(sortedTodoTypes)
        ? "[]"
        : JSON.stringify(newSelectedTypes);

    setSearchParams(newParams);
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        sx={{
          margin: "10px",
          marginLeft: "4px",
        }}
      >
        <FilterListIcon
          htmlColor={"white"}
          sx={{ bgcolor: "primary.main", padding: "4px", borderRadius: "100%" }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <FormControl fullWidth>
            <Select
              multiple
              value={selectedTypes}
              onChange={handleChange}
              input={<OutlinedInput label="Filter by Type" />}
              renderValue={(selected: string[]) => selected.join(", ")}
            >
              {TODO_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={selectedTypes.indexOf(type) > -1} />
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TodoFilterMenu;
