'use strict';

const url = new URL(window.origin + "/books");

const displayBooks = (books) => {
  const bookListEl = document.getElementById("bookList");
  while (bookListEl.firstChild) {
    bookListEl.removeChild(bookListEl.firstChild);
  }
  books.forEach(book => {
    const listNode = document.createElement("LI");
    const textNode = document.createTextNode(book.title);
    listNode.appendChild(textNode);

    bookListEl.appendChild(listNode);
  })
}

const main = async () => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `bearer ${sessionStorage.getItem("token")}`,
    },
  })
  if(res.status === 200) {
    const data = await res.json();
    displayBooks(data.books)
  } else {
    alert(res.statusText)
    window.location = "/auth/login"
  }
}

window.addEventListener('DOMContentLoaded', main);