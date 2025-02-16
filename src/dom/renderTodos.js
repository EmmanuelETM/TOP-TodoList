import { format, addDays, compareDesc } from "date-fns";
import {percentage} from "../controllers/percentage.js"

export function renderTodos(projectId, container) {
    container.innerText = "";
    let data = JSON.parse(localStorage.getItem("projects"));
    let project = data.find(element => element.id === projectId);
    let todos = project.todos;

    //percentage in content title
    const span = document.querySelector(".percentage");
    let number = percentage(todos);
    span.innerText = `${number}% completed`

    todos.sort((a, b) => {
        return compareDesc(new Date(a.dueDate), new Date(b.dueDate));
    });
    
    todos.sort(a => {
        return a.status === "completed" ? 1 : -1;
    });

    todos.forEach(todo => {
        const todoItem = document.createElement("div");
        const titleContainer = document.createElement("div");
        const checkSpan = document.createElement("span");
        const checkIcon = document.createElement("i");
        const todoData = document.createElement("div");
        const title = document.createElement("h4");
        const dueDate = document.createElement("p");
        const buttonContainers = document.createElement("div");
        const editTodo = document.createElement("button");
        const editIcon = document.createElement("i");
        const deleteTodo = document.createElement("button");
        const deleteIcon = document.createElement("i");
        const description = document.createElement("div");
        const p = document.createElement("p");
        
        checkSpan.classList.add("check");
        checkIcon.classList.add("fa-solid");
        checkIcon.classList.add("fa-circle-check");

        title.textContent = todo.title;
        dueDate.textContent = format(addDays(new Date(todo.dueDate), 1), "MMMM dd yyyy");
        dueDate.classList.add("date");

        p.textContent = todo.description;
        description.append(p);
        description.classList.add("todo-description");

        todoData.classList.add("todo-data");
        todoData.appendChild(title);
        todoData.appendChild(description);
        todoData.appendChild(dueDate);

        titleContainer.classList.add("title-container");
        titleContainer.appendChild(checkSpan);
        titleContainer.appendChild(todoData);

        editTodo.classList.add("edit-todo");
        editIcon.classList.add("fa-solid");
        editIcon.classList.add("fa-pen-to-square");
        editTodo.appendChild(editIcon);

        deleteTodo.classList.add("delete-todo");
        deleteIcon.classList.add("fa-solid");
        deleteIcon.classList.add("fa-trash");
        deleteTodo.appendChild(deleteIcon);

        buttonContainers.classList.add("todo-buttons");
        buttonContainers.appendChild(editTodo);
        buttonContainers.appendChild(deleteTodo);

        todoItem.classList.add("todo-item");
        if(todo.priority === "High") {
            todoItem.classList.add("high-priority");
        } else if(todo.priority === "Medium") {
            todoItem.classList.add("medium-priority");
        }

        if(todo.status === "completed") {
            todoItem.classList.add("completed");
            checkSpan.classList.add("checked");
            checkSpan.appendChild(checkIcon);
        }
        
        todoItem.setAttribute("data-todo-id", todo.id);
        todoItem.setAttribute("data-project-id", projectId);
        todoItem.appendChild(titleContainer);
        todoItem.appendChild(buttonContainers);

        container.appendChild(todoItem);
    });



}
