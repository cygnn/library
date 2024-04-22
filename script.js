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
        //myLibrary[i].isRead === true ? : 
        if(myLibrary[i].isRead === true){
            status.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>'
            status.classList.add('read') 
        }
        else if (myLibrary[i].isRead === false){
            status.innerHTML ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460.775 460.775"><path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g></svg>'
            status.classList.add('notRead');
        }

        status.classList.add("status")

        status.addEventListener("click", () => {
            if(status.classList.contains('notRead')){
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
        removeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>';
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
    form.reset();
    displayBooks();
})

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}