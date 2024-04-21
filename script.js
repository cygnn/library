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

function displayBooks(){
    removeAllChildNodes(content);
    for(let i = 0; i < myLibrary.length; i++){
        console.table(myLibrary[i])

        //makes the card to appear in html
        const card = document.createElement('div')
        card.classList.add('card')
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        card.dataset.index = i;

        //creates title
        const bookTitle = document.createElement('p');
        bookTitle.classList.add('title');
        bookTitle.textContent = myLibrary[i].title;
        cardBody.appendChild(bookTitle);

        //creates author
        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('author');
        bookAuthor.textContent = myLibrary[i].author;
        cardBody.appendChild(bookAuthor);

        //creates pages
        const bookPages = document.createElement('p');
        bookPages.classList.add('pages');
        bookPages.textContent = myLibrary[i].pages;
        cardBody.appendChild(bookPages);

        const cardButtons = document.createElement('div');
        cardButtons.classList.add('card-buttons');

        //create buttons
        const status = document.createElement('button');
        myLibrary[i].isRead === true ? status.textContent = 'Finished' : status.textContent ='Not Finished'
        status.classList.add("status")

        status.addEventListener("click", () => {
            if(status.textContent === 'Not Finished'){
                myLibrary[status.parentElement.parentElement.dataset.index].isRead = true;
                displayBooks();
            }
            else{
                myLibrary[status.parentElement.parentElement.dataset.index].isRead = false
                displayBooks();
            }
        })

        const removeBtn = document.createElement('button');
        removeBtn.classList.add(`remove`);
        removeBtn.textContent = 'Remove';
        cardButtons.appendChild(status);
        cardButtons.appendChild(removeBtn);

        card.appendChild(cardBody);
        card.appendChild(cardButtons)
        content.appendChild(card);

        const del = document.querySelectorAll(".remove");
        del.forEach(delBtn => {
            delBtn.addEventListener('click', () => {
                content.removeChild(delBtn.parentElement.parentElement)
                myLibrary.splice(delBtn.parentElement.parentElement.dataset.index,1);
                displayBooks();
            })
        })
    }
}

const addBook = document.querySelector(".addBook");
const dialog = document.querySelector("dialog");
const submitBtn = document.querySelector(".add");
const form = document.querySelector("form");
const content = document.querySelector(".content");

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
    dialog.close();
    displayBooks();
})

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}