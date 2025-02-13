export function renderTodos(container) {
    container.innerText = "";
    let id = container.getAttribute("data-project-id");
    let data = JSON.parse(localStorage.getItem("projects"));
    let project = data.find(element => element.id === id);
    let todos = project.todos;

    todos.forEach(todo => {
        const todoItem = document.createElement("div");
        const titleContainer = document.createElement("div");
        const checkSpan = document.createElement("span");
        const checkIcon = document.createElement("i");
        const titleDate = document.createElement("div");
        const title = document.createElement("h4");
        const dueDate = document.createElement("p");
        const buttonContainers = document.createElement("div");
        const editTodo = document.createElement("buttoon");
        const editIcon = document.createElement("i");
        const deleteTodo = document.createElement("button");
        const deleteIcon = document.createElement("i");
        
        checkSpan.classList.add("check");
        checkIcon.classList.add("fa-solid");
        checkIcon.classList.add("fa-circle-check");
        checkSpan.appendChild(checkIcon);

        title.textContent = todo.title;
        dueDate.textContent = todo.dueDate;
        titleDate.classList.add("title-date");
        titleDate.appendChild(title);
        titleDate.appendChild(dueDate);

        titleContainer.classList.add("title-container");
        titleContainer.appendChild(checkSpan);
        titleContainer.appendChild(titleDate);

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
        todoItem.setAttribute("data-todo-id", todo.id);
        todoItem.appendChild(titleContainer);
        todoItem.appendChild(buttonContainers);

        container.appendChild(todoItem);
    });

}
