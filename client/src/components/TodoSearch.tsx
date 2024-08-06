import React, { useEffect, useMemo, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
import SearchIcon from "@mui/icons-material/Search";
import { Fade, InputAdornment, Tooltip } from "@mui/material";

interface TodoSearchBarProps {
  setSearchTerm: (term: string) => void;
}

const TodoSearchBar: React.FC<TodoSearchBarProps> = ({ setSearchTerm }) => {
  const [, setSearchParams] = useSearchParams();

  const changeSearchParams = (searchName: string) => {
    setSearchTerm(searchName);
    setSearchParams({
      page: "1",
      ...(searchName.length > 0 ? { name: searchName } : {}),
    });
  };

  const debouncedChangeSearchParams = useMemo(() => {
    return debounce(changeSearchParams, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value.trimStart();
    debouncedChangeSearchParams(searchName);
  };

  useEffect(() => {
    return () => {
      debouncedChangeSearchParams.cancel();
    };
  }, [debouncedChangeSearchParams]);

  return (
    <Tooltip
      title="Search by name"
      arrow
      placement="left"
      disableInteractive
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
    >
      <TextField
        id="filled-search"
        label="Search"
        type="search"
        variant="standard"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Tooltip>
  );
};
export default TodoSearchBar;
