import "./styles/index.css";
import "./styles/content.css";
import "./styles/dialog.css";
import "./styles/sidebar.css";
import { renderProjects, renderSidebar } from "./ui/renderSidebar";
import { renderContent } from './ui/renderContent';
import { deleteProject } from "./controllers/storage/store";
import { createProject } from "./controllers/project";
import { createTodo } from "./controllers/todo";
import { getTodos } from "./controllers/storage/getTodos";


const App = (() => {
    const projectContainer = document.querySelector(".projects-container");
    const contentContainer = document.querySelector(".content");
    const projectsUl = document.createElement("ul");
    const projectDialog = document.querySelector(".project-dialog");
    const overlay = document.querySelector(".overlay");
    const addProject = document.querySelector(".add-project");
    const closeProject = document.querySelector(".close-project");
    const todoDialog = document.querySelector(".todo-dialog");
    const addTodo = document.querySelector(".add-todo");
    const closeTodo = document.querySelector(".close-todo");
    const projectDialogForm = document.querySelector(".project-dialog>form");
    const deleteProjectButtons = document.querySelectorAll('.delete-item');

    if (!localStorage.getItem("projects")) {
        localStorage.setItem("projects", JSON.stringify([]));
        createProject("Home", 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis atque amet et cum dolor quasi mollitia omnis necessitatibus');
    }

    function handleProjectForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataObj = Object.fromEntries(formData);

        createProject(dataObj.projectTitle, dataObj.projectDescription);
        renderSidebar(projectContainer, projectsUl);

        projectDialog.close();
        overlay.classList.remove("active");
        console.log(dataObj);
    }

    function handleLiClick(event) {
        const li = event.target.closest("li");
        if (!li || event.target.closest(".delete-item")) return;

        const projectId = li.getAttribute("data-project-id");
        contentContainer.setAttribute("data-project-id", projectId);
        renderContent(contentContainer);
    }

    function handleDeleteProject(event) {
        const deleteBtn = event.target.closest(".delete-item");
        if (!deleteBtn) return; 
    
        const li = deleteBtn.closest("li");
        const projectId = li.getAttribute("data-project-id");
    
        deleteProject(projectId);
        renderSidebar(projectContainer, projectsUl);
    }

    renderSidebar(projectContainer, projectsUl);

    addProject.addEventListener("click", () => {
        projectDialog.showModal();
        overlay.classList.add("active");
    })

    closeProject.addEventListener("click", () => {
        projectDialog.close();
        overlay.classList.remove("active");
    })

    deleteProjectButtons.forEach(button => {
        button.addEventListener("click", handleDeleteProject);
    });

    projectDialogForm.addEventListener("submit", handleProjectForm);

    addTodo.addEventListener("click", () => {
        todoDialog.showModal();
        overlay.classList.add("active");
    })

    closeTodo.addEventListener("click", () => {
        todoDialog.close();
        overlay.classList.remove("active");
    })

    projectsUl.addEventListener("click", handleLiClick);
    

    projectsUl.addEventListener("click", handleDeleteProject);


    

})();


//     const todo1 = createTodo("test", "we testing this shit", "tomorrow", "high", "pending");
// const todo2 = createTodo("test", "we testing this shit", "tomorrow", "high", "pending");
// storeTodo("kewl", todo1);
// storeTodo("kewl", todo2);
// let project = JSON.parse(localStorage.getItem("projects"));
// console.log(project);
// storeProject({name: "kewl", todos: []})