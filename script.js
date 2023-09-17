const buttons = document.querySelectorAll('.button');
const noteContainer = document.getElementById('note-container');
const comboContainer = document.getElementById('combo-container');

let comboCount = 0;

function pushButton(button) {
    button.style.transform = 'translateY(3px)';
}

  function releaseButton(button) {
    button.style.transform = 'translateY(0)';
}
  
document.addEventListener('keydown', function (event) {
  if (event.key === 'd') {
    pushButton(buttons[0]);
    checkNoteHit(0);
  } else if (event.key === 'f') {
    pushButton(buttons[1]);
    checkNoteHit(1);
  } else if (event.key === 'j') {
    pushButton(buttons[2]);
    checkNoteHit(2);
  } else if (event.key === 'k') {
    pushButton(buttons[3]);
    checkNoteHit(3);
  }
});

document.addEventListener('keyup', function (event) {
  if (event.key === 'd') {
    releaseButton(buttons[0]);
  } else if (event.key === 'f') {
    releaseButton(buttons[1]);
  } else if (event.key === 'j') {
    releaseButton(buttons[2]);
  } else if (event.key === 'k') {
    releaseButton(buttons[3]);
  }
});

function createNote() {
  const columnIndex = Math.floor(Math.random() * 4);
  const column = document.querySelectorAll('.column')[columnIndex];

  const note = document.createElement('div');
  note.classList.add('note');
  note.dataset.buttonIndex = columnIndex;
  column.appendChild(note);
}
function moveNotes() {
    const notes = document.querySelectorAll('.note');
  
    notes.forEach((note) => {
      const buttonIndex = note.dataset.buttonIndex;
      const button = buttons[buttonIndex];
      const noteRect = note.getBoundingClientRect();
      const containerRect = noteContainer.getBoundingClientRect();
  
      const translateY = containerRect.bottom - noteRect.bottom + noteRect.height + 1000;
  
      note.style.transform = `translateY(${translateY}px)`;
  
      if (noteRect.bottom > containerRect.bottom) {
        if (note.hit) {
          note.remove();
        } else {
          note.classList.add("missed")
          comboCount = 0;
          comboCount.textContent = comboCount
        }
      }
    });
  }

function checkNoteHit(buttonIndex) {
    const column = document.querySelectorAll('.column')[buttonIndex];
    const note = column.lastElementChild;
  
    if (!note) return;
  
    const noteRect = note.getBoundingClientRect();
    const buttonRect = buttons[buttonIndex].getBoundingClientRect();
    const range = 40;
  
    if (
      noteRect.top <= buttonRect.bottom &&
      noteRect.bottom >= buttonRect.top &&
      Math.abs(noteRect.left - buttonRect.left) <= range
    ) {
      note.classList.add('hit');
      note.hit = true;
      comboCount++;
      comboContainer.textContent = comboCount;
    }
  }
  
setInterval(() => {
  createNote();
}, 500);

function animate() {
  moveNotes();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
