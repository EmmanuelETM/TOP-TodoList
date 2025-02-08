import { Todo } from "../../models/todo"

export function createTodo(title, description, dueDate, priority, status) {
    return new Todo(title, description, dueDate, priority, status);
}