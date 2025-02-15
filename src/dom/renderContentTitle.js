export function renderContentTitle(container) {
    container.innerText = "";
    let id = container.getAttribute("data-project-id");
    let data = JSON.parse(localStorage.getItem("projects"));
    let project = data.find(element => element.id === id);
    const todoDialog = document.querySelector(".todo-dialog");
    const editDialog = document.querySelector(".edit-project-dialog");
    const overlay = document.querySelector(".overlay");

    function handleAddTodo() {
        todoDialog.showModal();
        overlay.classList.add("active");
    }

    function handleEditProject() {
        editDialog.showModal();
        overlay.classList.add("active");

        const title = document.querySelector("#edit-project-title");
        const description = document.querySelector("#edit-project-description");

        title.value = project.name;
        description.value = project.description;
    }

    const contentTitle = document.createElement("div");
    const contentText = document.createElement("h1");
    const editProject = document.createElement("button");
    const editProjectIcon = document.createElement("i");
    const contentDescription = document.createElement("div");
    const addContainer = document.createElement("div");
    const addSpan = document.createElement("span");
    const addTodo = document.createElement("button"); 
    const hr = document.createElement("hr");

    // Content title
    contentText.textContent = project.name;
    contentText.classList.add("content-text");
    editProject.classList.add("edit-project");
    editProjectIcon.classList.add("fa-solid");
    editProjectIcon.classList.add("fa-pen-to-square");

    editProject.addEventListener("click", handleEditProject);

    editProject.appendChild(editProjectIcon);
    contentTitle.classList.add("content-title");
    contentTitle.appendChild(contentText);
    contentTitle.appendChild(editProject);

    //content description
    contentDescription.classList.add("content-description");
    contentDescription.textContent = project.description;

    //hr
    hr.classList.add("todo-hr");

    // add container
    addSpan.textContent = "0% completed";
    addTodo.textContent = "+ Add Todo";
    addTodo.classList.add("add-todo");

    addTodo.addEventListener("click", handleAddTodo);
    addContainer.classList.add("add-container");
    addContainer.appendChild(addSpan);
    addContainer.appendChild(addTodo);

    // content
    container.appendChild(contentTitle);
    container.appendChild(contentDescription);
    container.appendChild(addContainer);
    container.appendChild(hr);
}