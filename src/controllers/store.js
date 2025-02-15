
// Store projects 
function storeProject(project) {
    const projects = JSON.parse(localStorage.getItem("projects"));
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
}

// Delete project
function deleteProject(projectId) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    projects = projects.filter(project => project.id !== projectId);
    
    localStorage.setItem("projects", JSON.stringify(projects));
}

// Store Todo 
function storeTodo(projectId, todo) {
    let data = JSON.parse(localStorage.getItem("projects"));

    data = data.map(project => {
        if (project.id === projectId) {
            project.todos.push(todo);
        }
        return project;
    });

    localStorage.setItem("projects", JSON.stringify(data));
}

// Delete Todo
function deleteTodo(projectId, todoId) {
    let data = JSON.parse(localStorage.getItem("projects"));

    data = data.map(project => {
        if (project.id === projectId) {
            project.todos = project.todos.filter(todo => todo.id !== todoId);
        }
        return project;
    });

    localStorage.setItem("projects", JSON.stringify(data));
}


export { storeProject, deleteProject, storeTodo, deleteTodo };