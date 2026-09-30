import TodoModel from "../Model/TodoModel.mjs";

class TodoService {
  	async createTodo(bodydata) {
		const existingTodo = await TodoModel.findOne({
			isActive: 1,
			title: bodydata.title.trim(),
		});

		if (existingTodo) {
			throw new Error("Todo already exists");
		}

		const newTodo = new TodoModel({
			...bodydata,
			title: bodydata.title.trim(),
			isActive: 1,
		});

		return await newTodo.save();
	}

  	async getTodo() {
      	try {
        	const todoData = await TodoModel.find({isActive: 1}).sort({ createdAt: -1 });;
        	return todoData;
      	}catch (error) {
        	throw error;
      	}
    }
  
    async deleteTodo(id) {
      	try {
        	const todoData = await TodoModel.findByIdAndUpdate(id, {isActive: 0}, { new: true });
        	return todoData;
      	} catch (error) {
        	throw error;
      	}
    }
}

export default TodoService;
