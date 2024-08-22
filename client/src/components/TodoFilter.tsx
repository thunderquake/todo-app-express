import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useSearchParams } from "react-router-dom";
import { TODO_TYPES } from "../constants/constants";

interface TodoFiltersProps {
  setTypes: (types: string[]) => void;
}

const TodoFilterMenu: React.FC<TodoFiltersProps> = ({ setTypes }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeParam = searchParams.get("type");

  const initialTypes =
    typeParam === "[]"
      ? TODO_TYPES
      : typeParam
      ? (() => {
          try {
            return JSON.parse(typeParam);
          } catch {
            return TODO_TYPES;
          }
        })()
      : TODO_TYPES;

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
    const sortedTODO_TYPES = [...TODO_TYPES].sort();

    const newParams: Params = {
      page: "1",
    };

    if (currentName) {
      newParams.name = currentName;
    }

    newParams.type =
      JSON.stringify(sortedNewSelectedTypes) ===
      JSON.stringify(sortedTODO_TYPES)
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
              renderValue={(selected) => (selected as string[]).join(", ")}
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
