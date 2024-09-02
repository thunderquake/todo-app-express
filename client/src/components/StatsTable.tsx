import BarChartIcon from "@mui/icons-material/BarChart";
import {
  Box,
  Button,
  CircularProgress,
  Grow,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useGetTodoStatisticsQuery from "../api/todo_service/getTodoStats";

const TodoTypeModal = () => {
  const {
    data: stats,
    isError,
    isFetching,
    refetch,
  } = useGetTodoStatisticsQuery();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    refetch();
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <BarChartIcon
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
          <Box
            maxWidth={"100vw"}
            maxHeight={"100vh"}
            position={"fixed"}
            width={400}
            borderRadius={"4px"}
            bgcolor={"background.paper"}
            boxShadow={24}
            p={4}
            sx={{ transform: "translate(0, -50%)", overflowY: "auto" }}
          >
            <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
              Todo types
            </Typography>
            {isFetching ? (
              <CircularProgress />
            ) : isError ? (
              <Typography color="error">Failed to load data</Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, fontSize: "16px" }}>
                        Type
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontWeight: 700, fontSize: "16px" }}
                      >
                        Quantity
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats &&
                      Array.isArray(stats) &&
                      stats.map(({ type, quantity }) => (
                        <TableRow key={type}>
                          <TableCell>{type}</TableCell>
                          <TableCell align="right">{quantity}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "16px" }}
            >
              Close
            </Button>
          </Box>
        </Grow>
      </Modal>
    </>
  );
};

export default TodoTypeModal;
