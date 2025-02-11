import { Project } from "../models/projects"
import {storeProject } from "./storage/store"

export function createProject(name, description) {
    let id = crypto.randomUUID();
    const project =  new Project(id, name, description);
    storeProject(project);
}
