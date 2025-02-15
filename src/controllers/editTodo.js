export function editTodo(projectId, todoId, data) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    const id = projects.findIndex(project => project.id == projectId);
    const project = projects[id].todos;

    project[todoId].title = data.todoTitle;
    project[todoId].description = data.todoDescription;
    project[todoId].dueDate = data.dueDate;
    project[todoId].priority = data.priority;  

    localStorage.setItem("projects", JSON.stringify(projects));
}