const createNoteBtn = document.getElementById("createNote");
const notesDiv = document.getElementById("notesDiv");

let numNotes = 0;
let noteArr = [];

let isEditing = false;

createNoteBtn.addEventListener('click', createNote);

function createNote() {
  numNotes++;

  notesDiv.innerHTML = `<div class="noteElement note${numNotes}" data-note-number="${numNotes}"><textarea class="textArea${numNotes}" cols="35" rows="10"></textarea> <button class="edit editBtn${numNotes}">Save</button> <button class="delete deleteBtn${numNotes}">Delete</button></div>` + notesDiv.innerHTML;

  document.querySelectorAll(`.noteElement`).forEach((note) => {
    note.addEventListener('mouseover', () => {
      const noteNum = note.dataset.noteNumber;
      if (!isEditing) {
        document.querySelector(`.editBtn${noteNum}`).style.visibility = "visible";
        document.querySelector(`.deleteBtn${noteNum}`).style.visibility = "visible";
      }
    });
  
    note.addEventListener('mouseout', () => {
      const noteNum = note.dataset.noteNumber;
      if (!isEditing) {
        document.querySelector(`.editBtn${noteNum}`).style.visibility = "hidden";
        document.querySelector(`.deleteBtn${noteNum}`).style.visibility = "hidden";
      }
    });
  });

  document.querySelector(`.editBtn${numNotes}`).addEventListener('click', () => {
    saveNote(numNotes);
  });

  document.querySelector(`.deleteBtn${numNotes}`).addEventListener('click', () => {
    deleteNote(numNotes);
  });

  isEditing = true;
  createNoteBtn.disabled = true;
  loadText();
}

function saveNote(noteNum) {
  const note = document.querySelector(`.textArea${noteNum}`);
  note.readOnly = true;
  noteArr.push(note.value);
  noteArr.forEach(index => console.log(index));

  document.querySelector(`.editBtn${noteNum}`).style.visibility = "hidden";
  document.querySelector(`.deleteBtn${noteNum}`).style.visibility = "hidden";

  isEditing = false;
  createNoteBtn.disabled = false;
}

function deleteNote(noteNum) {
  document.querySelector(`.note${noteNum}`).remove();
  createNoteBtn.disabled = false;
  numNotes--;
}

function loadText() {
  for (let i = 0; i < numNotes - 1; i++) {
    document.querySelector(`.textArea${i+1}`).value = noteArr[i];
  }
}