import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    isActive:{
        type:Number,
        default:1
    }
  },
 
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;