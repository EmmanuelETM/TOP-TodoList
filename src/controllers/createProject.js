import { Project } from "../models/projects.js"
import {storeProject } from "./store.js"

export function createProject(name, description) {
    let id = crypto.randomUUID();
    const project =  new Project(id, name, description);
    storeProject(project);
}
