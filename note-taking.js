// "New Note" button element
const createNoteBtn = document.getElementById('createNote');

// Notes Div element
const notesDiv = document.getElementById('notesDiv');

// Counter for note total
let numNotes = 0;

// Array to store all notes
let noteArr = [];

// Flag for when user is editing a note
let isEditing = false;

// Runs createNote function when clicked
createNoteBtn.addEventListener('click', createNote);

// Creates a new note
function createNote() {
  // Increaes note count
  numNotes++;

  // Adds note HTML to the top of the Div
  const note = document.createElement("div");
  note.className = "noteElement";
  note.classList.add(`note${numNotes}`);
  note.dataset.noteNumber = numNotes;
  note.innerHTML = 
  `<textarea class="textArea${numNotes}" cols="35" rows="10"></textarea> 
   <button class="edit editBtn${numNotes}">Save</button> 
   <button class="delete deleteBtn${numNotes}">Delete</button>`;
  notesDiv.prepend(note);

  // Saves the new note when clicked
  document.querySelector(`.editBtn${numNotes}`).addEventListener('click', () => {
    editNote(note.dataset.noteNumber);
  });

  // Deletes the new note when clicked
  document.querySelector(`.deleteBtn${numNotes}`).addEventListener('click', () => {
    deleteNote(note.dataset.noteNumber);
  });

  // Edit and Delete buttons appear when hovering over the note
  document.querySelector(`.note${numNotes}`).addEventListener('mouseover', (event) => {
    hover(event, isEditing, note.dataset.noteNumber);
  });
  
  // Edit and Delete buttons disappear when not hovering over the note
  document.querySelector(`.noteElement`).addEventListener('mouseout', (event) => {
    hover(event, isEditing, note.dataset.noteNumber);
  });

  // Sets isEditing to true so mouseover/mouseout effect doesn't work
  isEditing = true;

  // Prevents "New Note" button from being pressed
  createNoteBtn.disabled = true;
}

// Function to edit/save a note 
// *** TODO: Save changes made to a note *** \\
function editNote(noteNum) {
  // Gets note that was selected to be saved and "locks" it then pushes note text into array
  const note = document.querySelector(`.textArea${noteNum}`);
  note.readOnly = true;
  noteArr.push(note.value);

  // TEMP LINE DELETE LATER
  noteArr.forEach(index => console.log(index));

  // Hides Edit and Delete buttons
  document.querySelector(`.editBtn${noteNum}`).style.visibility = "hidden";
  document.querySelector(`.deleteBtn${noteNum}`).style.visibility = "hidden";

  // Sets isEditing to false and enabled "New Note" button
  isEditing = false;
  createNoteBtn.disabled = false;
}

// Deletes a new note, enables "New Note" button, and decreases note count
function deleteNote(noteNum) {
  document.querySelector(`.note${noteNum}`).remove();
  createNoteBtn.disabled = false;
  numNotes--;
}

// Shows or hides Edit and Delete buttons depending on event type
function hover(event, isEditing, noteNum) {
  if (!isEditing) {
    document.querySelector(`.editBtn${noteNum}`).style.visibility = (event.type === "mouseover") ? "visible" : "hidden";
    document.querySelector(`.deleteBtn${noteNum}`).style.visibility = (event.type === "mouseover") ? "visible" : "hidden";
  }
}