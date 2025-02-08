export class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    getTodos() {
        return this.todos;
    }

    addTodos(todo) {
        this.todos.push(todo)
    }
}


