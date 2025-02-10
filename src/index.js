import "./styles.css";
import "./index.css";
import { storeProject, storeTodo } from "./controllers/storage/store";
import { createProject } from "./controllers/project";
import { createTodo } from "./controllers/todo";
import { getTodos } from "./controllers/storage/getTodos";

const App = () => {
    const projectContainer = document.querySelector(".projects-container");
    const todosContainer = document.querySelector(".todos-container");
    const projectsUl = document.createElement("ul");

    if (!localStorage.getItem("projects")) {
        let home = createProject("Home");
        localStorage.setItem("projects", JSON.stringify([home]));
    }

    const renderProjects = () => {
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
            li.appendChild(projectDiv);
            li.appendChild(deleteButton);
            projectsUl.appendChild(li);
        });
    
        projectsUl.classList.add("projects-ul");
        projectContainer.appendChild(projectsUl);
    }

    const renderTodos = (projectName) => {
        const todos = getTodos(projectName);
        console.log(todos);
    }

    renderProjects();
    // renderTodos("default");


}

App();


//     const todo1 = createTodo("test", "we testing this shit", "tomorrow", "high", "pending");
// const todo2 = createTodo("test", "we testing this shit", "tomorrow", "high", "pending");
// storeTodo("kewl", todo1);
// storeTodo("kewl", todo2);
let project = JSON.parse(localStorage.getItem("projects"));
console.log(project);
// storeProject({name: "kewl", todos: []})