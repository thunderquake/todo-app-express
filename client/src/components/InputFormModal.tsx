import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../helpers/validation";
import {
  TextField,
  MenuItem,
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  Grow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import usePostTodoMutation from "../api/todo_service/postTodo";

interface IFormInput {
  name: string;
  description: string;
  type: string;
}

const modalStyle = {
  maxWidth: "100vw",
  maxHeight: "100%",
  position: "fixed",
  transform: "translate(0, -50%)",
  overflowY: "auto",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

export const InputFormModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: { description: "", name: "", type: "Task" },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate } = usePostTodoMutation();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    mutate(data);
    handleClose();
    reset();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <AddIcon
          htmlColor={"white"}
          sx={{ bgcolor: "primary.main", padding: "4px", borderRadius: "100%" }}
        />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grow in={open}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2" id="modal-title">
              Input Todo
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Description"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Type"
                select
                {...register("type")}
                error={!!errors.type}
                helperText={errors.type?.message}
                fullWidth
                margin="normal"
                defaultValue="Task"
              >
                <MenuItem value="Task">Task</MenuItem>
                <MenuItem value="Quote">Quote</MenuItem>
                <MenuItem value="Idea">Idea</MenuItem>
                <MenuItem value="Thoughts">Thoughts</MenuItem>
              </TextField>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ padding: "8px", marginTop: "16px" }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Grow>
      </Modal>
    </>
  );
};
