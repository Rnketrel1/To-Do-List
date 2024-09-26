export const toDoHeader = document.querySelector(".to-do-header");
export const inbox = document.querySelector(".inbox");
export const today = document.querySelector(".today");
export const tomorrow = document.querySelector(".tomorrow");
export const projectButton = document.querySelector(".add-project-button");
export const addprojectContainer = document.querySelector(".add-project");
export const projectList = document.querySelector(".user-projects");
export const toDoInput = document.querySelector(".to-do-input");
export const addedToDosContainer = document.querySelector(".added-to-dos");
export const editContainer = document.querySelector(".edit-to-do");

import { saveProjectsToLocalStorage } from "./projects/addNewProject"; // Make sure the import path is correct

export function editAppear(toDo) {
  // Clear previous contents of editContainer
  editContainer.innerHTML = "";

  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Due:";
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = toDo.details.dueDate; // Set the input's value from the to-do's details

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority:";
  const prioritySelect = document.createElement("select");

  const options = ["Low", "Medium", "High"];
  options.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText.toLowerCase();
    option.textContent = optionText;
    prioritySelect.appendChild(option);
  });
  prioritySelect.value = toDo.details.priority; // Set the selected option based on the to-do's priority

  const notesLabel = document.createElement("label");
  notesLabel.textContent = "Notes:";
  const notesInput = document.createElement("input");
  notesInput.type = "text";
  notesInput.style.fontSize = "13px";
  notesInput.style.padding = "8px";
  notesInput.style.paddingBottom = "40vh";
  notesInput.placeholder = "Enter task notes here...";
  notesInput.value = toDo.details.notes; // Set the input's value from the to-do's notes

  editContainer.appendChild(dateLabel);
  editContainer.appendChild(dateInput);
  editContainer.appendChild(priorityLabel);
  editContainer.appendChild(prioritySelect);
  editContainer.appendChild(notesLabel);
  editContainer.appendChild(notesInput);

  // Add event listeners to save changes
  dateInput.addEventListener("change", (event) => {
    toDo.details.dueDate = event.target.value; // Update the due date in the to-do object
    saveProjectsToLocalStorage(); // Save to local storage
  });

  prioritySelect.addEventListener("change", (event) => {
    toDo.details.priority = event.target.value; // Update the priority in the to-do object
    saveProjectsToLocalStorage(); // Save to local storage
  });

  notesInput.addEventListener("input", (event) => {
    toDo.details.notes = event.target.value; // Update the notes in the to-do object
    saveProjectsToLocalStorage(); // Save to local storage
  });
}
