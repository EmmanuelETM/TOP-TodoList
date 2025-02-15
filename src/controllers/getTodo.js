export function getTodo(projectId, todoId) {
    let data = JSON.parse(localStorage.getItem("projects"));
    let project = data.find(element => element.id === projectId);
    let todo = project.todos.find(element => element.id === todoId);
    let index = project.todos.findIndex(element => element.id === todoId);
    return [index, todo];
}