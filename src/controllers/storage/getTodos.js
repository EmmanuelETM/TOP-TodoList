export function getTodos(projectId) {
    const data = JSON.parse(localStorage.getItem("projects"));
    const todos = data[projectId].todos;
    return todos;
}