// src/to-do's/genorate.js
import { toDoInput, addedToDosContainer, editAppear } from "../dom";
import {
  projects,
  saveProjectsToLocalStorage,
} from "../projects/addNewProject";
import { currentProjectIndex } from "../projects/currentProject";

function toDoFactory(title) {
  return {
    title,
    details: {
      dueDate: "",
      priority: "",
      notes: "",
    },
  };
}

export function createList(name) {
  if (currentProjectIndex === null) {
    console.log("No project selected.");
    return; // Exit if no project is selected
  }

  const newToDo = toDoFactory(name);

  // Push the new to-do to the corresponding project's toDos array
  projects[currentProjectIndex].toDos.push(newToDo);

  // Save projects to local storage after adding a new to-do
  saveProjectsToLocalStorage();

  // Now display the to-do in the UI
  displayToDoInUI(newToDo); // Call to display the new to-do

  // Clear the input field
  toDoInput.value = "";
}

function displayToDoInUI(toDo) {
  const toDoContainer = document.createElement("div");
  const toDoName = document.createElement("p");
  const toDoCheck = document.createElement("input");
  toDoCheck.type = "checkbox";
  toDoName.textContent = toDo.title;

  toDoContainer.appendChild(toDoName);
  toDoContainer.appendChild(toDoCheck);
  toDoContainer.classList.add("to-do-container");
  addedToDosContainer.appendChild(toDoContainer);

  // Add event listener to the container for editing
  toDoContainer.addEventListener("click", () => {
    editAppear(toDo); // Pass the current to-do object
  });
}

export function updateToDoDisplay() {
  // Clear the current displayed to-dos
  addedToDosContainer.innerHTML = "";

  if (currentProjectIndex !== null) {
    const toDos = projects[currentProjectIndex].toDos; // Get the to-dos for the current project

    // Display each to-do in the UI
    toDos.forEach(displayToDoInUI);
  }
}

toDoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createList(toDoInput.value);
  }
});
