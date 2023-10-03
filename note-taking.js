// "New Note" button element
const createNoteBtn = document.getElementById("createNote");

// Notes Div element
const notesDiv = document.getElementById("notesDiv");

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
  notesDiv.innerHTML = 
  `<div class="noteElement note${numNotes}" data-note-number="${numNotes}">
    <textarea class="textArea${numNotes}" cols="35" rows="10"></textarea> 
    <button class="edit editBtn${numNotes}">Save</button> 
    <button class="delete deleteBtn${numNotes}">Delete</button>
  </div>` + notesDiv.innerHTML;

  // Edit and Delete buttons appear/disappear when hovering/not hovering over the note
  document.querySelectorAll(`.noteElement`).forEach((note) => {
    note.addEventListener('mouseover', () => {
      // Gets note number from the note HTML
      const noteNum = note.dataset.noteNumber;

      // If user is editing a note, mouseover effect won't work
      if (!isEditing) {
        document.querySelector(`.editBtn${noteNum}`).style.visibility = "visible";
        document.querySelector(`.deleteBtn${noteNum}`).style.visibility = "visible";
      }
    });
  
    note.addEventListener('mouseout', () => {
      // Gets note number from the note HTML
      const noteNum = note.dataset.noteNumber;

      // If user is editing a note, mouseout effect won't work 
      if (!isEditing) {
        document.querySelector(`.editBtn${noteNum}`).style.visibility = "hidden";
        document.querySelector(`.deleteBtn${noteNum}`).style.visibility = "hidden";
      }
    });
  });

  // Saves the new note when clicked
  document.querySelector(`.editBtn${numNotes}`).addEventListener('click', () => {
    saveNote(numNotes);
  });

  // Deletes the new note when clicked
  document.querySelector(`.deleteBtn${numNotes}`).addEventListener('click', () => {
    deleteNote(numNotes);
  });

  // Sets isEditing to true so mouseover/mouseout effect doesn't work
  isEditing = true;

  // Prevents  "New Note" button from being pressed
  createNoteBtn.disabled = true;

  // Load all of the text into each note element
  loadText();
}

// Saves a new note 
// *** TODO: Save changes made to a note *** \\
function saveNote(noteNum) {
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

// Deletes a new note, enabled "Neew Note" button, and decreases note count
function deleteNote(noteNum) {
  document.querySelector(`.note${noteNum}`).remove();
  createNoteBtn.disabled = false;
  numNotes--;
}

// Loads the note text into their respective textarea elements
function loadText() {
  for (let i = 0; i < numNotes - 1; i++) {
    document.querySelector(`.textArea${i+1}`).value = noteArr[i];
  }
}