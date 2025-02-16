import { allTodos } from "../controllers/allTodos.js";
import { renderFilteredTodos } from "./renderFilteredTodos.js";

export function renderToday(titleContainer, todosContainer) {
    const todos = allTodos().today;

    titleContainer.innerText = "";
    todosContainer.innerText = "";
    const contentTitle = document.createElement("div");
    const contentText = document.createElement("h1");
    const hr = document.createElement("hr");

    contentText.textContent = "Today";
    contentText.classList.add("content-text");

    contentTitle.classList.add("content-title");
    contentTitle.appendChild(contentText);


    hr.classList.add("todo-hr");

    titleContainer.appendChild(contentTitle);
    titleContainer.appendChild(hr);

    renderFilteredTodos(todosContainer, todos);
}
