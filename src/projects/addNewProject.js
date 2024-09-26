// src/projects/addNewProject.js
import { projectButton, addprojectContainer, projectList } from "../dom";
import { updateHeader } from "./updateHeader";
import { changeProject } from "./currentProject";
import { updateToDoDisplay } from "../to-do's/genorate";
import { deleteProject } from "./deleteProject";

let inputFieldCreated = false;
export const projects = []; // Array to hold project objects

// Function to load projects from local storage
export function loadProjectsFromLocalStorage() {
  const storedProjects = localStorage.getItem("projects");
  if (storedProjects) {
    const parsedProjects = JSON.parse(storedProjects);
    parsedProjects.forEach((project) => {
      projects.push(project);
      displayProject(project); // Display the project in the UI
    });
  }
}

// Function to create an input field for new project
export function createInput() {
  if (inputFieldCreated) return; // Prevent multiple inputs

  inputFieldCreated = true;
  projectButton.textContent = ""; // Clear button text
  const addedInput = document.createElement("input");
  addedInput.placeholder = "Enter Project Name";
  addprojectContainer.appendChild(addedInput); // Add input field to DOM

  addedInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      executeInput(addedInput); // Execute input on enter key
    }
  });
}

// Function to execute the input and create a new project
export function executeInput(input) {
  if (!input.value.trim()) return; // Validate input: prevent empty project names
  createdProject(input.value); // Create new project
  projectButton.textContent = "+"; // Reset button text
  input.remove(); // Remove input field after project creation
  inputFieldCreated = false;
}

// Function to create a new project
export function createdProject(name) {
  const newProject = { name, toDos: [] }; // Create a new project object
  projects.push(newProject); // Add to projects array
  saveProjectsToLocalStorage(); // Save projects to local storage

  // Display the newly created project without duplicating
  displayProject(newProject);

  const projectIndex = projects.length - 1; // Get the index of the new project

  // Event listener for project click
  projectList.lastChild.addEventListener("click", () => {
    updateHeader(name);
    changeProject(projects[projectIndex]); // Change to the selected project
    updateToDoDisplay(); // Update displayed to-dos for the selected project
  });
}

// Function to display a project in the UI
export function displayProject(project) {
  const addedContainer = document.createElement("div");
  addedContainer.classList.add("project-lists");

  const deleteContainer = document.createElement("div");
  deleteContainer.classList.add("delete-container");

  // Create a paragraph for the project name
  const projectName = document.createElement("p");
  projectName.textContent = project.name; // Set the project name
  addedContainer.appendChild(projectName);
  addedContainer.appendChild(deleteContainer);

  // Create a delete button
  const deleteButton = document.createElement("i");
  deleteButton.className = "fa-solid fa-trash-can";
  deleteContainer.appendChild(deleteButton);

  deleteButton.classList.add("delete-project");
  addedContainer.appendChild(deleteButton);

  // Attach event listener to the delete button
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent triggering project selection
    console.log("Delete button clicked for project:", project);
    deleteProject(project, addedContainer);
  });

  // Attach click event for project selection
  addedContainer.addEventListener("click", () => {
    updateHeader(project.name);
    const projectIndex = projects.indexOf(project);
    changeProject(projects[projectIndex]);
    updateToDoDisplay(); // Update the displayed to-dos for the selected project
  });

  projectList.appendChild(addedContainer); // Append to the project list
}

// Function to save projects to local storage
export function saveProjectsToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects)); // Save projects to local storage
}

// Event listener for the project button
projectButton.addEventListener("click", createInput);
