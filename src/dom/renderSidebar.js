export const renderSidebar = (container, ul) => {
    ul.innerText = "";
    const projects = JSON.parse(localStorage.getItem("projects"));

    projects.forEach(element => {
        const li = document.createElement("li");
        const deleteButton = document.createElement("button");
        const projectDiv = document.createElement("div");
        const p = document.createElement("p");
        const projectIcon = document.createElement("i");
        const deleteIcon = document.createElement("i");

        deleteButton.classList.add("delete-item");

        projectDiv.classList.add("project-button");

        projectIcon.classList.add("fa-solid");
        projectIcon.classList.add("fa-hashtag");

        deleteIcon.classList.add("fa-solid");
        deleteIcon.classList.add("fa-trash");

        deleteButton.appendChild(deleteIcon);
        p.textContent = element.name;
        
        projectDiv.appendChild(projectIcon);
        projectDiv.appendChild(p);

        li.classList.add("list-item");
        li.setAttribute("data-project-id", element.id);
        li.appendChild(projectDiv);
        li.appendChild(deleteButton);
        ul.appendChild(li);
    });

    ul.classList.add("projects-ul");
    container.appendChild(ul);
}


