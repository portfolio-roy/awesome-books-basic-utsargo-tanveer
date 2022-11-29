/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */

// Create A constructor class for book object. Object should have:
//  1. Book name/title
//  2. Book author
//  3. A unique id to identify the book (we can use Math.random() to generate the id)
function genId(length) {
  let id = '';
  let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let charLength = chars.length;
  for ( let i = 0; i < length; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return id;
}

class BookInfo {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.bookId = genId(8);
  }
}

// Create a class for the collection. This class will contain:

//  a function to remove books

class Collection {
  //  1. a constructor for book data
  constructor() {
    // create an array of BookInfos
    this.bookData = [];
  }

  //  a function to add books
  addBook(singleBook) {
    // push BookInfo to bookData
    this.bookData.push(singleBook);
    // save it to localStorage
    localStorage.setItem('BookList', JSON.stringify(this.bookData));
    // add to the webpage
    addToPage(singleBook);
  }

  deleteBook(bookId) {
    // get the book element by id
    const bookElement = document.getElementById(bookId);
    bookElement.remove();
    this.bookData = this.bookData.filter((bookObject) => bookObject.bookId !== bookId);
    localStorage.setItem('BookList', JSON.stringify(this.bookData));
  }
}
const collection = new Collection();
// Create a function tp get the from inputs
function readInput() {
  // get book title from the input
  const title = document.getElementById('book-title');
  // get book title from the input
  const author = document.getElementById('book-author');
  // create a book object
  const singleBook = new BookInfo(title.value, author.value);
  // reset the form
  title.value = '';
  author.value = '';
  return singleBook;
}
// Create a function to add data to the page
function addToPage(bookObject) {
  let liColor = '';
  if (collection.bookData.indexOf(bookObject) === 0){
    liColor = 'gray';
  } else if (collection.bookData.indexOf(bookObject) % 2 !== 0){
    liColor = 'white';
  } else {
    liColor = 'gray';
  }
  const bookList = document.getElementById('book-list');
  const singleBook = document.createElement('li');
  singleBook.classList.add(liColor)
  singleBook.classList.add('single-book')
  singleBook.setAttribute('id', bookObject.bookId);
  singleBook.innerHTML = `<p>${bookObject.title}</p>
                    <p>${bookObject.author}</p>`;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'Delete';
  deleteBtn.addEventListener('click', () => collection.deleteBook(bookObject.bookId));
  singleBook.appendChild(deleteBtn);
  bookList.appendChild(singleBook);
}

// Code for add button
const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', () => {
  const singleBook = readInput();
  collection.addBook(singleBook);
});

// construct the collection ont the page using data from local storage
window.onload = () => {
  collection.bookData = JSON.parse(localStorage.getItem('BookList' || '[]'));
  if (collection.bookData === null) {
    collection.bookData = [];
    return;
  }

  collection.bookData.forEach((singleBook) => addToPage(singleBook));
};
