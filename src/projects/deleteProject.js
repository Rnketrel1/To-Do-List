// src/projects/deleteProject.js

import { projects, saveProjectsToLocalStorage } from "./addNewProject";
import { projectList } from "../dom";

export function deleteProject(project, container) {
  // Check if the project is defined and exists in the projects array
  const projectIndex = projects.indexOf(project);

  if (projectIndex > -1) {
    projects.splice(projectIndex, 1); // Remove the project from the projects array
    saveProjectsToLocalStorage(); // Update local storage

    if (container) {
      // Ensure the container is not undefined
      // Check if container has a parent node before attempting to remove it
      if (container.parentNode) {
        projectList.removeChild(container); // Remove the project container from the UI
      } else {
        console.error("Container has no parent node:", container);
      }
    } else {
      console.error("Container is undefined");
    }
  } else {
    console.error("Project not found:", project);
  }
}
