//store projects
export function storeProjects(project) {
    const projects = JSON.parse(localStorage.getItem("projects"));
    let string = JSON.stringify([...projects, project])
    localStorage.setItem("projects", string);
}

//store Todos
export function storeTodos(projectName, todo) {
    const data = JSON.parse(localStorage.getItem("projects"));
    const index = Find(data, projectName);

    if(index === -1) {
        return;
    }

    data[index].todos = [...data[index].todos, todo];

    localStorage.setItem("projects", JSON.stringify(projects));
}