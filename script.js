const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = Boolean(isRead);
}

function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook)
}

const addBook = document.querySelector(".addBook");
const dialog = document.querySelector("dialog");
const submitBtn = document.querySelector(".add");
const form = document.querySelector("form");

addBook.addEventListener("click", () => {
    dialog.showModal();
})

submitBtn.addEventListener("click", () => {
    event.preventDefault();
    let title = form.title.value;
    let author = form.author.value;
    let pages = form.pages.value;
    addBookToLibrary(title, author, pages)
    console.table(myLibrary)
})

