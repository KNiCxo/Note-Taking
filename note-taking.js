const createNoteBtn = document.getElementById("createNote");
const notesDiv = document.getElementById("notesDiv");
let numNotes = 0;
let noteArr = [];

createNoteBtn.addEventListener('click', createNote);

function createNote() {
  numNotes++;

  notesDiv.innerHTML = `<div class="noteElement note${numNotes}"><textarea class="textArea${numNotes}" cols="35" rows="10"></textarea> <button class="save saveBtn${numNotes}">Save</button> <button class="delete deleteBtn${numNotes}">Delete</button></div>` + notesDiv.innerHTML;

  document.querySelector(`.saveBtn${numNotes}`).addEventListener('click', () => {
    saveNote(numNotes);
  });

  document.querySelector(`.deleteBtn${numNotes}`).addEventListener('click', () => {
    deleteNote(numNotes);
  });

  createNoteBtn.disabled = true;

  loadText();
}

function saveNote(noteNum) {
  const note = document.querySelector(`.textArea${noteNum}`);
  note.readOnly = true;
  noteArr.push(note.value);
  noteArr.forEach(index => console.log(index));


  document.querySelector(`.saveBtn${noteNum}`).style.display = "none";
  document.querySelector(`.deleteBtn${noteNum}`).style.display = "none";
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