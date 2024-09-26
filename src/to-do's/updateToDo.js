import { editAppear, editContainer } from "../dom";

export function displayItems(toDo) {
  editContainer.innerHTML = ""; // Clear previous edit fields
  editAppear(); // Call function to show edit fields

  // Populate the edit fields with the toDo's current details
  const dateInput = editContainer.querySelector('input[type="date"]');
  const prioritySelect = editContainer.querySelector("select");
  const notesInput = editContainer.querySelector('input[type="text"]');

  dateInput.value = toDo.details.dueDate;
  prioritySelect.value = toDo.details.priority;
  notesInput.value = toDo.details.notes;

  // Update toDo's details when inputs change
  dateInput.addEventListener("change", (event) => {
    toDo.details.dueDate = event.target.value;
  });

  prioritySelect.addEventListener("change", (event) => {
    toDo.details.priority = event.target.value;
  });

  notesInput.addEventListener("input", (event) => {
    toDo.details.notes = event.target.value;
  });
}
