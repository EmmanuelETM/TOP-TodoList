export function allTodos() {
    let todos = [];
    let projects = JSON.parse(localStorage.getItem("projects"));

    projects.forEach(element => {
        element.todos.forEach(todo => {
            todos.push(todo);
        });
    });
    
    return todos;
}