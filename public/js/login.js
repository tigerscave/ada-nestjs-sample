'use strict';

const url = new URL(window.origin + "/auth/login");

const loginButtonClicked = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const body = JSON.stringify({
    email,
    password
  });

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body
  })
}

const main = () => {
  document.getElementById('loginButton').addEventListener('click', loginButtonClicked)
};

window.addEventListener('DOMContentLoaded', main);