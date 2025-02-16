export function percentage(todos) {
    if(todos.length === 0) return 0;
    const completed = todos.filter(todo => todo.status === "completed");
    return Math.floor((completed.length/todos.length)*100);
}