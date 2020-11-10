function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
const myLibrary = [
  new Book('Lord of the Rings', 'Tolkien', 298, true),
  new Book('Don Quixote', 'Cervantes', 436, false),
  new Book('Hammlet', 'Shakespeare', 569, true),
  new Book('One hundred years', 'Gabriel Garcia Marquez', 328, false),
  new Book('In search of lost time', 'Marcel Proust', 128, true),
  new Book('Mountains of Madness', 'H.P Lovecraft', 20, false),
  new Book('War and peace', 'Leo Tolstoy', 368, true),
  new Book('Lolita', 'Vladimir Nabokov', 1878, false),
  new Book('Crime and punishment', 'Fyodor Dostoyevsky', 156, false),
  new Book('Pride and prejudice', 'Jane Austen', 300, true),
];

const dropzone = document.getElementById('drop-zone');

function displayBooks(array) {
  array.forEach((element) => {
    const myBook = document.createElement('div');
    if (element.read === true) {
      myBook.innerHTML = `<h2 class="book-title">${element.title}</h2><ul class="book-info"><li class="">by ${element.author}</li><li class="">${element.pages} pages</li><li class="">Read</li></ul><div class='relative'><i class="fas fa-trash-alt"></i>`;
    } else {
      myBook.innerHTML = `<h2 class="book-title">${element.title}</h2><ul class="book-info"><li class="">by ${element.author}</li><li class="">${element.pages} pages</li><li class="">Not read yet</li></ul><div class='relative'><i class="fas fa-trash-alt"></i>`;
    }
    myBook.classList.add('grid-item');
    myBook.classList.add('draggable');
    myBook.setAttribute('draggable', 'true');
    dropzone.appendChild(myBook);
    myBook.addEventListener('dragstart', () => {
      myBook.classList.add('dragging');
    });
    myBook.addEventListener('dragend', () => {
      myBook.classList.remove('dragging');
    });
    const deleteButton = myBook.lastChild.lastChild;
    deleteButton.addEventListener('click', () => {
      const parent = deleteButton.parentElement.parentElement;
      parent.remove();
    });
  });
}

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

displayBooks(myLibrary);
