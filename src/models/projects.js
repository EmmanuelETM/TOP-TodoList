export class Project {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.todos = [];
    }

    getTodos() {
        return this.todos;
    }

    addTodos(todo) {
        this.todos.push(todo)
    }
}


