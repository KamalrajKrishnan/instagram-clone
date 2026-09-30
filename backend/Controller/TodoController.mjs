import TodoService from "../Service/TodoService.mjs";
class TodoController{
    constructor() {
        this.todoService = new TodoService();
        this.createTodo = this.createTodo.bind(this);
        this.getTodo = this.getTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
      }
    
async createTodo(req, res) {
    const todobody = req.body;
    const { title } = req.body;

    try {
        await this.todoService.createTodo(todobody);

        return res.status(201).json({
            message: "Todo created successfully",
            valid: 1,
        });

    } catch (e) {
        console.error("Create Todo Error:", e);

        if (e.code === 11000) {
        return res.status(409).json({
            status: 409,
            message: `${title} Todo already exists`,
        });
        }

        // IMPORTANT: handle all other errors
        return res.status(500).json({
        status: 500,
        message: e.message || "Failed to create Todo",
        });
    }
}

    async getTodo(req, res) {
      try {
        const todoResult = await this.todoService.getTodo();
        return res.status(200).json({ message: "Success", data: todoResult });
      } catch (error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }

    async deleteTodo(req, res) {
      try {
       
        const {id} = req.params;
        const todoResult = await this.todoService.deleteTodo(id);
        if(!todoResult){
          return res.status(404).json({ message: "Unable to delete todo"});
        }
        return res.status(200).json({ message: "Success", data: todoResult });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: error.message,
        });
      }
    }
}
export default TodoController;