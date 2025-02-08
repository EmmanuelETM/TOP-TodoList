import Find from "./find";

export function getTodos(projectName) {
    const data = JSON.parse(localStorage.getItem("projects"));
    const index = Find(data, projectName);
    const todos = data[index].todos;
    return todos;
}