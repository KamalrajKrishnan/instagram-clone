import express from "express";
import dbconnect from "./Config/dbconfig.mjs";
import TodoController from "./Controller/TodoController.mjs";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.mjs";
const todoRoutes = express.Router();
const app = express();
app.use(
  cors({
    origin: process.env.REACT_ORIGIN_URL,
  })
);
app.use(express.json());

app.use(todoRoutes);
dotenv.config();
dbconnect();
app.use(errorHandler);
const todoController = new TodoController();

const PORT = process.env.NODE_SERVER_PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

todoRoutes.post("/api/createTodo", todoController.createTodo);
todoRoutes.get("/api/todoList", todoController.getTodo);
todoRoutes.delete("/api/deleteTodo/:id", todoController.deleteTodo);