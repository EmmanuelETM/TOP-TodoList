import "./styles/index.css";
import "./styles/content.css";
import "./styles/dialog.css";
import "./styles/sidebar.css";
import { storeProject, storeTodo } from "./controllers/storage/store";
import { renderProjects } from "./ui/render_projects";
import { createProject } from "./controllers/project";
import { createTodo } from "./controllers/todo";
import { getTodos } from "./controllers/storage/getTodos";

const App = () => {
    const projectContainer = document.querySelector(".projects-container");
    const todosContainer = document.querySelector(".todos-container");
    const projectsUl = document.createElement("ul");
    const projectDialog = document.querySelector(".project-dialog");
    const overlay = document.querySelector(".overlay");
    const addProject = document.querySelector(".add-project");
    const closeProject = document.querySelector(".close-project");
    const todoDialog = document.querySelector(".todo-dialog");
    const addTodo = document.querySelector(".add-todo");
    const closeTodo = document.querySelector(".close-todo");


    if (!localStorage.getItem("projects")) {
        let home = createProject("Home");
        localStorage.setItem("projects", JSON.stringify([home]));
    }

    renderProjects(projectContainer, projectsUl);
    // renderTodos("default");

    addProject.addEventListener("click", () => {
        projectDialog.showModal();
        overlay.classList.add("active");
    })

    closeProject.addEventListener("click", () => {
        projectDialog.close();
        overlay.classList.remove("active");
    })

    addTodo.addEventListener("click", () => {
        todoDialog.showModal();
        overlay.classList.add("active");
    })

    closeTodo.addEventListener("click", () => {
        todoDialog.close();
        overlay.classList.remove("active");
    })

}

App();


//     const todo1 = createTodo("test", "we testing this shit", "tomorrow", "high", "pending");
// const todo2 = createTodo("test", "we testing this shit", "tomorrow", "high", "pending");
// storeTodo("kewl", todo1);
// storeTodo("kewl", todo2);
// let project = JSON.parse(localStorage.getItem("projects"));
// console.log(project);
// storeProject({name: "kewl", todos: []})