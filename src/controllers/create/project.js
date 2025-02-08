import { Project } from "../../models/projects"

export function createProject(name) {
    return new Project(name);
}