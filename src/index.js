import { format } from "date-fns";

//Dom functions
import { renderSidebar } from "./dom/renderSidebar.js";
import { renderContentTitle } from './dom/renderContentTitle.js';
import { renderTodos } from "./dom/renderTodos.js";
import { renderToday } from "./dom/renderToday.js";
import { renderUpcoming } from "./dom/renderUpcoming.js";
import { renderCompleted } from "./dom/renderCompleted.js";
//Controllers
import { deleteProject, deleteTodo } from "./controllers/store.js";
import { createProject } from "./controllers/createProject.js";
import { createTodo } from "./controllers/createTodo.js";
import { editProject } from "./controllers/editProject.js";
import { editTodo } from "./controllers/editTodo.js";
import { getTodo } from "./controllers/getTodo.js";
import { toggleComplete } from "./controllers/toggleComplete.js";

//css
import "./styles/index.css";
import "./styles/content.css";
import "./styles/dialog.css";
import "./styles/sidebar.css";
import { renderLate } from "./dom/renderLate.js";

const App = (() => {
    const projectContainer = document.querySelector(".projects-container");
    const contentContainer = document.querySelector(".content-container");
    const todosContainer = document.querySelector(".todo-container");
    const sidebarList = document.querySelector(".sidebar-list");
    const projectsUl = document.createElement("ul");
    const projectDialog = document.querySelector(".project-dialog");
    const projectEditDialog = document.querySelector(".edit-project-dialog");
    const overlay = document.querySelector(".overlay");
    const addProject = document.querySelector(".add-project");
    const closeProject = document.querySelector(".close-project");
    const closeEditProject = document.querySelector(".close-edit-project");
    const todoDialog = document.querySelector(".todo-dialog");
    const editTodoDialog = document.querySelector(".edit-todo-dialog");
    const closeTodo = document.querySelector(".close-todo");
    const closeEditTodo = document.querySelector(".close-edit-todo");
    const projectDialogForm = document.querySelector(".project-dialog>form");
    const dialogs = document.querySelectorAll("dialog")

    if (!localStorage.getItem("projects")) {
        localStorage.setItem("projects", JSON.stringify([]));
        createProject("Home", 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis atque amet et cum dolor quasi mollitia omnis necessitatibus');
    }

    //Event Handlers

    function handleSidebarList(event) {
        if(event.target.classList.contains("today-todos")) {
            renderToday(contentContainer, todosContainer);
        }
        else if (event.target.classList.contains("upcoming-todos")) {
            renderUpcoming(contentContainer, todosContainer);
        }
        else if (event.target.classList.contains("completed-todos")) {
            renderCompleted(contentContainer, todosContainer);
        }
        else if (event.target.classList.contains("late-todos")) {
            renderLate(contentContainer, todosContainer);
        }
    }

    function handleProjectForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataObj = Object.fromEntries(formData);

        createProject(dataObj.projectTitle, dataObj.projectDescription);
        renderSidebar(projectContainer, projectsUl);

        projectDialog.close();
        overlay.classList.remove("active");
        event.target.reset();
    }

    function handleEditProjectForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataObj = Object.fromEntries(formData);
        const id = contentContainer.getAttribute("data-project-id");
        editProject(id, dataObj);
        renderContentTitle(contentContainer);
        renderSidebar(projectContainer, projectsUl);
        projectEditDialog.close();
        overlay.classList.remove("active");
        event.target.reset();
    }

    function handleTodoForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataObj = Object.fromEntries(formData);
        const projectId = contentContainer.getAttribute("data-project-id");

        createTodo(projectId, dataObj.todoTitle, dataObj.todoDescription, dataObj.dueDate, dataObj.priority, "pending");
        renderTodos(todosContainer);
        
        todoDialog.close();
        event.target.reset();
    }

    function handleLiClick(event) {
        const li = event.target.closest("li");
        if (!li || event.target.closest(".delete-item")) return;

        const projectId = li.getAttribute("data-project-id");
        contentContainer.setAttribute("data-project-id", projectId);
        todosContainer.setAttribute("data-project-id", projectId);
        renderContentTitle(contentContainer);
        renderTodos(todosContainer);
    }

    function handleDeleteProject(event) {
        const deleteBtn = event.target.closest(".delete-item");
        if (!deleteBtn) return; 
    
        const li = deleteBtn.closest("li");
        const projectId = li.getAttribute("data-project-id");
    
        deleteProject(projectId);
        renderSidebar(projectContainer, projectsUl);
    }

    function handleDeleteTodo(event) {
        const todoItem = event.target.closest(".todo-item");
        if(!todoItem || !event.target.closest(".delete-todo")) return;

        const projectId = event.currentTarget.getAttribute("data-project-id");
        const todoId = todoItem.getAttribute("data-todo-id");

        deleteTodo(projectId, todoId);
        renderTodos(todosContainer);
    }

    const handleEditTodoForm = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataObj = Object.fromEntries(formData);
        
        const projectId = contentContainer.getAttribute("data-project-id")
        const todoIndex = editTodoDialog.getAttribute("data-id");

        editTodo(projectId, todoIndex, dataObj);
        renderTodos(todosContainer);

        editTodoDialog.close();
        event.target.reset();
    }

    const handleEditTodo = (event) => {
        const todoItem = event.target.closest(".todo-item");
        if(!todoItem || !event.target.closest(".edit-todo")) return;
        const projectId = event.currentTarget.getAttribute("data-project-id");
        const todoId = todoItem.getAttribute("data-todo-id");
        const [index, todo] = getTodo(projectId, todoId);

        editTodoDialog.setAttribute("data-id", index);
        editTodoDialog.showModal();
        overlay.classList.add("active");

        const title = document.querySelector("#edit-todo-title");
        const description = document.querySelector("#edit-todo-description");
        const date = document.querySelector("#edit-due-date");
        const priority = document.querySelector("#edit-priority");

        title.value = todo.title;
        description.value = todo.description;
        date.value = todo.dueDate;
        priority.value = todo.priority
    };

    function handleToggleComplete(event) {
        const todoItem = event.target.closest(".todo-item");
        if(!todoItem || !event.target.closest(".check")) return;
        const projectId = event.currentTarget.getAttribute("data-project-id");
        const todoId = todoItem.getAttribute("data-todo-id");
        const [index,] = getTodo(projectId, todoId);
        
        toggleComplete(projectId, index);
        renderTodos(todosContainer);
    }

    function init() {
        renderSidebar(projectContainer, projectsUl);
        renderToday(contentContainer, todosContainer);

        addProject.addEventListener("click", () => {
            projectDialog.showModal();
            overlay.classList.add("active");
        })
    
        closeProject.addEventListener("click", () => {
            projectDialog.close();
        })
    
        closeEditProject.addEventListener("click", () => {
            projectEditDialog.close();
        })
    
        projectDialogForm.addEventListener("submit", handleProjectForm);
    
        projectEditDialog.addEventListener("submit", handleEditProjectForm);
    
        todoDialog.addEventListener("submit", handleTodoForm);
    
        editTodoDialog.addEventListener("submit", handleEditTodoForm);
    
        closeTodo.addEventListener("click", () => {
            todoDialog.close();
        })
    
        closeEditTodo.addEventListener("click", () => {
            editTodoDialog.close();
        })

        sidebarList.addEventListener("click", handleSidebarList);
    
        projectsUl.addEventListener("click", handleLiClick);
        projectsUl.addEventListener("click", handleDeleteProject);
    
        todosContainer.addEventListener("click", handleEditTodo);
        todosContainer.addEventListener("click", handleDeleteTodo);
        todosContainer.addEventListener("click", handleToggleComplete);

        dialogs.forEach((dialog) => {
            dialog.addEventListener("close", () => {
                overlay.classList.remove("active");
            })
        })
    }

    return {init};
})();

App.init();