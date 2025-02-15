export function renderCompleted(titleContainer, todoContainer) {
    titleContainer.innerText = "";
    todoContainer.innerText = "";
    let id = titleContainer.getAttribute("data-project-id");
    let data = JSON.parse(localStorage.getItem("projects"));
    let project = data.find(element => element.id === id);

    const todoDialog = document.querySelector(".todo-dialog");
    const editDialog = document.querySelector(".edit-project-dialog");
    const overlay = document.querySelector(".overlay");
    const contentTitle = document.createElement("div");
    const contentText = document.createElement("h1");
    const hr = document.createElement("hr");

    // Content title
    contentText.textContent = "Completed";
    contentText.classList.add("content-text");

    contentTitle.classList.add("content-title");
    contentTitle.appendChild(contentText);

    //hr
    hr.classList.add("todo-hr");

    // content
    titleContainer.appendChild(contentTitle);
    titleContainer.appendChild(hr);
}