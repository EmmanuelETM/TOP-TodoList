import "./styles.css";
import { getTodos } from "./controllers/storage/getTodos";
import { createProject, CreateProject } from "./controllers/project";



if (!localStorage.getItem("projects")) {
    let defaultProject = createProject("default");
    localStorage.setItem("projects", JSON.stringify ([defaultProject]));
}


let project = JSON.parse(localStorage.getItem("projects"));
console.log(project);
// console.log(project);

// storeProjects({name: "poggers", todos: []})
