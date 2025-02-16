import { renderTodos } from "./renderTodos.js";
import { renderFilteredTodos } from "./renderFilteredTodos.js";
import { allTodos } from "../controllers/allTodos.js";

export function refreshView(projectId, todosContainer) {
    const view = document.body.getAttribute("data-view");

    if (view === "project") {
        renderTodos(projectId, todosContainer)
    }

    let todos = [];
    switch (view) {
        case "today":
            todos = allTodos().today;
            break;
        case "late":
            todos = allTodos().late;
            break;
        case "upcoming":
            todos = allTodos().upcoming;
            break;
        case "completed":
            todos = allTodos().completed;
            break;
        default:
            return;
    }

    renderFilteredTodos(todosContainer, todos);
}