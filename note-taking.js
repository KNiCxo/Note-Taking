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
function editNote(noteNum) {
  // Gets elements of the Edit button being clicked and the note associated with it
  const editBtn = document.querySelector(`.editBtn${noteNum}`);
  const note = document.querySelector(`.textArea${noteNum}`);

  // If button is clicked and says 'Edit", unlock note, change button to 'Save', and lock 'New Note' button
  // Else, save note, lock note, change button to 'Edit', and unlock 'New Note' button
  if (editBtn.innerHTML === 'Edit') {
    isEditing = true;
    note.readOnly = false;
    editBtn.innerHTML = 'Save';
    createNoteBtn.disabled = true;
  } else {
    // If numNotes > array length then it is a new note and should be pushed into the array
    // Else, store new note value in the array at the correct index
    if (numNotes > noteArr.length) {
      const noteText = note.value
      const noteID = noteNum;
      noteArr.push({
        noteText,
        noteID
      });
    } else {
      noteArr.forEach(index => {
        if (index.noteID === noteNum) {
          index.noteText = note.value
        }
      });
    }

    isEditing = false;
    note.readOnly = true;
    editBtn.innerHTML = 'Edit';
    createNoteBtn.disabled = false;
    // *** TEMP LINE DELETE LATER *** \\
    console.log('notes in list');
    noteArr.forEach(index => console.log(`${index.noteText} ${index.noteID}`));
  }
}

// Deletes a new note, enables "New Note" button, and decreases note count
function deleteNote(noteNum) {
  document.querySelector(`.note${noteNum}`).remove();
  for (let i = 0; i < noteArr.length; i++) {
    if (noteArr[i].noteID == noteNum) {
      noteArr.splice(i, 1);
    }
  }
  createNoteBtn.disabled = false;
  numNotes--;
  // *** TEMP LINE DELETE LATER *** \\
  console.log('notes in list');
  noteArr.forEach(index => console.log(`${index.noteText} ${index.noteID}`));
}

// Shows or hides Edit and Delete buttons depending on event type
function hover(event, isEditing, noteNum) {
  if (!isEditing) {
    document.querySelector(`.editBtn${noteNum}`).style.visibility = (event.type === "mouseover") ? "visible" : "hidden";
    document.querySelector(`.deleteBtn${noteNum}`).style.visibility = (event.type === "mouseover") ? "visible" : "hidden";
  }
}