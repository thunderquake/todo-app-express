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

const TodoFilterMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [SearchParams, setSearchParams] = useSearchParams();

  const initialTypes = JSON.parse(SearchParams.get("type") || "[]");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const newSelectedTypes = event.target.value as string[];
    setSelectedTypes(newSelectedTypes);
    setSearchParams({ type: JSON.stringify(newSelectedTypes) });
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
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
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
