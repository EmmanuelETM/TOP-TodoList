import { Todo } from "../models/todo"
import { storeTodo } from "./storage/store";

export function createTodo(projectId, title, description, dueDate, priority, status) {
    const id = crypto.randomUUID();
    const todo = new Todo(id, title, description, dueDate, priority, status);
    storeTodo(projectId, todo);
}