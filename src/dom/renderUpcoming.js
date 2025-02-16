import { allTodos } from "../controllers/allTodos.js";
import { renderFilteredTodos } from "./renderFilteredTodos.js";

export function renderUpcoming(titleContainer, todosContainer) {
    const todos = allTodos().upcoming;

    titleContainer.innerText = "";
    todosContainer.innerText = "";
    const contentTitle = document.createElement("div");
    const contentText = document.createElement("h1");
    const hr = document.createElement("hr");

    // Content title
    contentText.textContent = "Upcoming";
    contentText.classList.add("content-text");

    contentTitle.classList.add("content-title");
    contentTitle.appendChild(contentText);

    //hr
    hr.classList.add("todo-hr");

    // content
    titleContainer.appendChild(contentTitle);
    titleContainer.appendChild(hr);

    renderFilteredTodos(todosContainer, todos);
}