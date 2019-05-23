let url = new URL(window.origin + "/books");


const onEditButtonClicked = () => {
  console.log("onEditButtonClicked")
  document.getElementById("info").style.display = "none";
  document.getElementById("edit").style.display = "unset";
}

const onUpdateButtonClicked = (e) => {
  const id = e.target.value;
  const title = document.getElementById('bookTitle').value;
  const description = document.getElementById('bookDesc').value;
  const params = {
    bookID: id,
    title,
    description
  };
  url.search = new URLSearchParams(params);

  console.log(url)
  fetch(url, {
    method: "PUT"
  })
    .then(res => {
      alert("book updated!");
      window.location.href = "../books";
      console.log(res);
      console.log(res.body);
    })
    .catch(err => {
      console.log(err);
    });
}

const onDeleteButtonClicked = (e) => {
  const id = e.target.value
  const params = { bookID: id };
  url.search = new URLSearchParams(params)

  console.log(url)
  fetch(url, {
    method: "DELETE"
  })
    .then(res => {
      alert("book deleted!");
      window.location.href = "../books";
      console.log(res);
      console.log(res.body);
      console.log(res.json());

      // WARN: error occured
      res.json().then(r => console.log(r))
    })
    .catch(err => {
      console.log(err);
    });
}

const main = () => {
  document.getElementById("edit").style.display = "none";
  const editButton = document.getElementById("editButton");
  editButton.addEventListener('click', onEditButtonClicked);

  const deleteButton = document.getElementById("deleteButton");
  deleteButton.addEventListener('click', onDeleteButtonClicked);

  const updateButton = document.getElementById("updateButton");
  updateButton.addEventListener('click', onUpdateButtonClicked);
}

window.addEventListener('DOMContentLoaded', main);