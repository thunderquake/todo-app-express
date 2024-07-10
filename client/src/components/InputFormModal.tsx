import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  MenuItem,
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface IFormInput {
  name: string;
  description: string;
  type: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  type: yup.string().required("Type is required"),
});

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
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
    defaultValues: { description: "", name: "", type: "task" },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data: IFormInput) => {
    console.log(data);
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
      <Modal open={open} onClose={handleClose}>
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
              defaultValue="task"
            >
              <MenuItem value="task">Task</MenuItem>
              <MenuItem value="quote">Quote</MenuItem>
              <MenuItem value="idea">Idea</MenuItem>
              <MenuItem value="thoughts">Thoughts</MenuItem>
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
      </Modal>
    </>
  );
};
