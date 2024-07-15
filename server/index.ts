import express from "express";
import router from "./src/routes/TodoRoutes";
import { errorHandleMiddleware } from "./src/middlewares/handleError.middleware";
import * as cors from "cors";


const app = express();
const port = process.env.PORT || 3000;


app.use(cors.default());

app.use(express.json());

app.use("/todos", router);
app.use("/todos", errorHandleMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
