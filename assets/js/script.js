// Define Book function constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
// Fill the library with the first books
let myLibrary = [];

if (localStorage.key('myLibrary')) {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
} else {
  myLibrary = [
    new Book('The Hobbit', 'J.R.R. Tolkien', 310, false),
    new Book('Don Quixote', 'Miguel de Cervantes', 863, false),
    new Book('Hamlet', 'William Shakespeare', 164, false),
    new Book('In search of lost time', 'Marcel Proust', 4215, false),
  ];
}

/** Generates a book card. Adding Drag and Drop functionality, a delete button for the card
 *  and read/unread button interaction. */
const dropzone = document.getElementById('drop-zone');

function addDragDrop(div) {
  div.addEventListener('dragstart', () => {
    div.classList.add('dragging');
  });
  div.addEventListener('dragend', () => {
    div.classList.remove('dragging');
  });
}

function addDeleteButton(div) {
  const deleteButton = div.lastChild.lastChild;
  deleteButton.addEventListener('click', () => {
    const parent = deleteButton.parentElement.parentElement;
    const bookTitle = parent.children[0].textContent;
    const updateLibrary = myLibrary.filter((book) => (book.title !== bookTitle));
    myLibrary = updateLibrary;
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    parent.remove();
  });
}

function addReadButton(div) {
  const button = div.children[1].children[2].children[0];
  button.addEventListener('click', () => {
    if (button.classList.contains('read')) {
      button.classList.remove('read');
      button.classList.add('not-read');
      // eslint-disable-next-line no-param-reassign
      button.textContent = 'Unread';
      const bookTitle = div.children[0].textContent;
      const bookIndex = myLibrary.findIndex((book) => (book.title === bookTitle));
      myLibrary[bookIndex].read = false;
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    } else {
      button.classList.remove('not-read');
      button.classList.add('read');
      // eslint-disable-next-line no-param-reassign
      button.textContent = 'Read';
      const bookTitle = div.children[0].textContent;
      const bookIndex = myLibrary.findIndex((book) => (book.title === bookTitle));
      myLibrary[bookIndex].read = true;
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    }
  });
}

function createBookCard(book) {
  const bookDiv = document.createElement('div');
  if (book.read === true) {
    bookDiv.innerHTML = `<h2 class="book-title">${book.title}</h2><ul class="book-info"><li>by ${book.author}</li><li>${book.pages} pages</li><li><button class='read read-button'>Read</button></li></ul><div class='relative'><i class="fas fa-trash-alt"></i></div>`;
  } else {
    bookDiv.innerHTML = `<h2 class="book-title">${book.title}</h2><ul class="book-info"><li>by ${book.author}</li><li>${book.pages} pages</li><li><button class='not-read read-button'>Unread</button></li></ul><div class='relative'><i class="fas fa-trash-alt"></i></div>`;
  }
  bookDiv.classList.add('grid-item');
  bookDiv.classList.add('draggable');
  bookDiv.setAttribute('draggable', 'true');
  dropzone.appendChild(bookDiv);

  addDragDrop(bookDiv);
  addDeleteButton(bookDiv);
  addReadButton(bookDiv);
}

// First display when the page is loaded
function displayBooks(array) {
  array.forEach((book) => {
    createBookCard(book);
  });
}

displayBooks(myLibrary);

// Button and emerging window for adding a new book through the page
const addNewBook = document.querySelector('.menu-title');
const formWindow = document.querySelector('.emerging-window');

addNewBook.addEventListener('click', () => {
  formWindow.classList.toggle('hidden');
});

// Adding a book through the form
const addBookButton = document.getElementById('form-button');

addBookButton.addEventListener('click', () => {
  const myForm = document.getElementById('add-book_form');
  const title = document.getElementById('form-title').value;
  const author = document.getElementById('form-author').value;
  const pages = document.getElementById('form-pages').value;
  const read = document.getElementById('form-read').checked;
  if (title === '' || author === '' || pages === '') {
    return;
  }
  // eslint-disable-next-line radix
  myLibrary.push(new Book(title, author, parseInt(pages), read));
  createBookCard(myLibrary[myLibrary.length - 1]);
  myForm.reset();
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  formWindow.classList.toggle('hidden');
});

const closeWindow = document.querySelector('.fa-times');

closeWindow.addEventListener('click', () => formWindow.classList.toggle('hidden'));

// Drag and drop interaction for the book cards
function swapNodes(a, b) {
  const allItems = [...document.querySelectorAll('.draggable')];
  const positionDragged = allItems.indexOf(a) + 1;
  const positionTarget = allItems.indexOf(b) + 1;
  dropzone.insertBefore(a, allItems[positionTarget]);
  dropzone.insertBefore(b, allItems[positionDragged]);
}

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('draggable')) e.target.classList.add('draggingover');
  if (e.target.parentElement.classList.contains('draggable')) e.target.parentElement.classList.add('draggingover'); // Check if we drag over any child node
  if (e.target.parentElement.parentElement.classList.contains('draggable')) e.target.parentElement.parentElement.classList.add('draggingover'); // Check if we drag over any child node
});

dropzone.addEventListener('dragleave', (e) => {
  if (e.target.classList !== undefined) e.target.classList.remove('draggingover');
  if (e.target.parentElement.classList !== undefined) e.target.parentElement.classList.remove('draggingover');
  if (e.target.parentElement.parentElement.classList !== undefined) e.target.parentElement.parentElement.classList.remove('draggingover');
});

dropzone.addEventListener('drop', (e) => {
  const target = document.querySelector('.draggingover');
  const dragged = document.querySelector('.dragging');
  swapNodes(dragged, target);
  if (e.target.classList !== undefined) e.target.classList.remove('draggingover');
  if (e.target.parentElement.classList !== undefined) e.target.parentElement.classList.remove('draggingover');
  if (e.target.parentElement.parentElement.classList !== undefined) e.target.parentElement.parentElement.classList.remove('draggingover');
});
