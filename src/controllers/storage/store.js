import Find  from "./find";
//store projects
function storeProject(project) {
    const projects = JSON.parse(localStorage.getItem("projects"));
    let string = JSON.stringify([...projects, project])
    localStorage.setItem("projects", string);
}

//store Todos
function storeTodo(projectName, todo) {
    const data = JSON.parse(localStorage.getItem("projects"));
    const index = Find(data, projectName);

    if(index === -1) {
        return;
    }

    data[index].todos = [...data[index].todos, todo];

    localStorage.setItem("projects", JSON.stringify(data));
}

export { storeProject, storeTodo }