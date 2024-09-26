import "./styles.css";
// src/index.js
import {
  projects,
  loadProjectsFromLocalStorage,
  createInput,
} from "./projects/addNewProject";
import { updateToDoDisplay } from "./to-do's/genorate";
import { currentProjectIndex } from "./projects/currentProject";
import { updateHeader } from "./projects/updateHeader";

// Load existing projects from local storage
window.onload = function () {
  loadProjectsFromLocalStorage(); // Load projects from local storage
  if (projects.length > 0) {
    updateToDoDisplay(); // Display to-dos if projects exist
  }
};

// Update the to-do display for the current project when the application starts
if (currentProjectIndex !== null) {
  updateToDoDisplay();
}

// Optional: Set a default header for the to-do section
if (projects.length > 0) {
  updateHeader(projects[0].name); // Set the first project's name as the default header
}

// Event listener for adding new projects
document.querySelector(".add-project-button").addEventListener("click", () => {
  // Create the input for a new project
  createInput();
});

// If you need to handle other events, like selecting a project or adding to-dos, set them up here.
