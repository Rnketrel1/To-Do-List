import { projects } from "./addNewProject";

export let currentProjectIndex = null; // Export this variable

export function changeProject(project) {
  currentProjectIndex = projects.indexOf(project); // Set the current project index
}
