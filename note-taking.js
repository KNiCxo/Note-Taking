// "New Note" and "Sort" button elements
const createNoteBtn = document.getElementById('createNote');
const sortBtn = document.getElementById('sort');

// Notes Div element
const notesDiv = document.getElementById('notesDiv');

// Counter for note total
let numNotes = JSON.parse(localStorage.getItem('numNotes'));
if (!numNotes) {
  numNotes = 0;
}

// Gives each note a unique ID
let noteIDCounter = JSON.parse(localStorage.getItem('noteIDCounter'));
if (!noteIDCounter) {
  noteIDCounter = 0;
}

// Array to store all notes
let noteArr = JSON.parse(localStorage.getItem('noteArr'));
if (!noteArr) {
  noteArr = [];
}

// Flag for when user is editing a note
let isEditing = false;

// Flag for whether notes are being sorted by newest of oldest
let sortNewest = true;

// Loads all existing notes (if there are any)
drawNotes();

// Runs createNote function when clicked
createNoteBtn.addEventListener('click', createNote);

// Sorts notes by newest or oldest when clicked
sortBtn.addEventListener('click', () => {
  // Sorts array
  let newNoteArr = []
  for (let i = noteArr.length - 1; i >= 0; i--) {
    newNoteArr.push(noteArr[i]);
  }

  // Changes button HTML
  if (sortNewest) {
    sortNewest = false;
    sortBtn.innerHTML = 'Sort: Oldest';
  } else {
    sortNewest = true;
    sortBtn.innerHTML = 'Sort: Newest';
  }

  // Stores sorted array into note array
  noteArr = newNoteArr;

  // Redraws note HTML
  notesDiv.innerHTML = '';
  drawNotes();
})

// Creates button functionality for each note node
function createEventListeners(noteID) {
  // Edits/Saves the new note when clicked
  document.querySelector(`.editBtn${noteID}`).addEventListener('click', () => {
    editNote(noteID);
  });

  // Deletes the new note when clicked
  document.querySelector(`.deleteBtn${noteID}`).addEventListener('click', () => {
    deleteNote(noteID);
  });

  // Edit and Delete buttons appear when hovering over the note
  document.querySelector(`.note${noteID}`).addEventListener('mouseover', event => {
    hover(event, isEditing, noteID);
  });
  
  // Edit and Delete buttons disappear when not hovering over the note
  document.querySelector(`.note${noteID}`).addEventListener('mouseout', event => {
    hover(event, isEditing, noteID);
  });
}

// Draws all existing notes onto the page
function drawNotes() {
  noteArr.forEach(index => {
    // Adds note HTML to the top of the Div
    const note = document.createElement('div');
    note.className = 'noteElement';
    note.classList.add(`note${index.noteID}`);
    note.dataset.noteNumber = index.noteID;
    note.innerHTML = 
    `<textarea class="textArea${index.noteID}" cols="35" rows="10" readOnly>${index.noteText}</textarea> 
    <button class="edit editBtn${index.noteID}">Edit</button> 
    <button class="delete deleteBtn${index.noteID}">Delete</button>`;
    notesDiv.prepend(note);

    // Creates Event Listeners for the Edit and Delete buttons and hides them
    createEventListeners(note.dataset.noteNumber);
    document.querySelector(`.editBtn${note.dataset.noteNumber}`).style.visibility = 'hidden';
    document.querySelector(`.deleteBtn${note.dataset.noteNumber}`).style.visibility = 'hidden';
  });
}

// Creates a new note
function createNote() {
  // Increaes note and noteID count
  numNotes++;
  noteIDCounter++;

  // Adds note HTML to the top of the Div
  const note = document.createElement('div');
  note.className = 'noteElement';
  note.classList.add(`note${noteIDCounter}`);
  note.dataset.noteNumber = noteIDCounter;
  note.innerHTML = 
  `<textarea class="textArea${noteIDCounter}" cols="35" rows="10"></textarea> 
   <button class="edit editBtn${noteIDCounter}">Save</button> 
   <button class="delete deleteBtn${noteIDCounter}">Delete</button>`;
  notesDiv.prepend(note);

  // Creates Event Listeners for the Edit and Delete buttons
  createEventListeners(note.dataset.noteNumber);

  // Sets isEditing to true so mouseover/mouseout effect doesn't work
  isEditing = true;

  // Prevents "New Note" and "Sort" button from being pressed
  createNoteBtn.disabled = true;
  sortBtn.disabled = true;
}

// Function to edit/save a note 
function editNote(noteNum) {
  // Gets elements of the Edit button being clicked and the note associated with it
  const editBtn = document.querySelector(`.editBtn${noteNum}`);
  const note = document.querySelector(`.textArea${noteNum}`);

  // If button is clicked and says "Edit", unlock note, change button to "Save", and lock "New Note" and "Sort" buttons
  // Else, save note, lock note, change button to "Edit", and unlock "New Note" and "Sort" buttons
  if (editBtn.innerHTML === 'Edit') {
    isEditing = true;
    note.readOnly = false;
    editBtn.innerHTML = 'Save';
    createNoteBtn.disabled = true;
    sortBtn.disabled = true;
  } else {
    // If numNotes > array length then it is a new note and should be pushed into the array
    // Else, store new note value in the array at the correct index
    if (numNotes > noteArr.length) {
      const noteText = note.value
      const noteID = noteIDCounter;

      // If notes are sorted by "Newest", then push to array
      // Else, add to the front of the array and redraw notes
      if (sortNewest) {
        noteArr.push({
          noteText,
          noteID
        });
      } else {
        noteArr.unshift({
          noteText,
          noteID
        });

        notesDiv.innerHTML = '';
        drawNotes();
      }
    } else {
      noteArr.forEach(index => {
        if (index.noteID == noteNum) {
          index.noteText = note.value
        }
      });
    }

    isEditing = false;
    note.readOnly = true;
    editBtn.innerHTML = 'Edit';
    createNoteBtn.disabled = false;
    sortBtn.disabled = false;
    
    // Saves values to storage
    localStorage.setItem('noteArr', JSON.stringify(noteArr));
    localStorage.setItem('numNotes', JSON.stringify(numNotes));
    localStorage.setItem('noteIDCounter', JSON.stringify(noteIDCounter));

    // *** TEMP LINE DELETE LATER *** \\
    console.log('notes in list');
    noteArr.forEach(index => console.log(`${index.noteText} ${index.noteID}`));
  }
}

// Deletes a new note, enables "New Note" and "Sort" button, and decreases note count
function deleteNote(noteNum) {
  document.querySelector(`.note${noteNum}`).remove();

  for (let i = 0; i < noteArr.length; i++) {
    if (noteArr[i].noteID == noteNum) {
      noteArr.splice(i, 1);
    }
  }

  createNoteBtn.disabled = false;
  sortBtn.disabled = false;
  numNotes--;

  // Saves values to storage
  localStorage.setItem('noteArr', JSON.stringify(noteArr));
  localStorage.setItem('numNotes', JSON.stringify(numNotes));

  // *** TEMP LINE DELETE LATER *** \\
  console.log('notes in list');
  noteArr.forEach(index => console.log(`${index.noteText} ${index.noteID}`));
}

// Shows or hides Edit and Delete buttons depending on event type
function hover(event, isEditing, noteNum) {
  if (!isEditing) {
    document.querySelector(`.editBtn${noteNum}`).style.visibility = (event.type === 'mouseover') ? 'visible' : 'hidden';
    document.querySelector(`.deleteBtn${noteNum}`).style.visibility = (event.type === 'mouseover') ? 'visible' : 'hidden';
  }
}