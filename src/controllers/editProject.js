export function editProject(projectId, data) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    const id = projects.findIndex(project => project.id == projectId);
    projects[id].name = data.projectTitle;
    projects[id].description = data.projectDescription;

    localStorage.setItem("projects", JSON.stringify(projects));
}
