'use strict';

const url = new URL(window.origin + "/books");

const onAddBookButtonClicked = () => {
  const title = document.getElementById('bookTitle').value;
  const desc = document.getElementById('bookDesc').value;
  const body = JSON.stringify(
    {
      title,
      description: desc,
      author: ""
    }
  );
  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body
  })
    .then((res) => {
      console.log(res)
      console.log(res.json().then(r => console.log(r)))
      alert("book created!");
      window.location.href = "../books";
    })
    .catch(err => {
      console.warn(err)
    })
}

const main = () => {
  document.getElementById('addBookButton').addEventListener('click', onAddBookButtonClicked);
}

window.addEventListener('DOMContentLoaded', main);