import { Todo } from "../models/todo.js"
import { storeTodo } from "./store.js";

export function createTodo(projectId, title, description, dueDate, priority, status) {
    const id = crypto.randomUUID();
    const todo = new Todo(id, title, description, dueDate, priority, status);
    storeTodo(projectId, todo);
}
