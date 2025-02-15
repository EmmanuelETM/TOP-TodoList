export function toggleComplete(projectId, todoId) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    const id = projects.findIndex(project => project.id == projectId);
    const project = projects[id].todos;

    project[todoId].status = project[todoId].status === "pending" ? "completed" : "pending"; 
    
    localStorage.setItem("projects", JSON.stringify(projects));
}