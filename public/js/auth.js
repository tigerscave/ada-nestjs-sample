'use strict';

const url = new URL(window.origin + "/auth/register");

const signUpButtonClicked = () => {
  const user_name = document.getElementById('userName').value;
  const email = document.getElementById('email').value;
  const photo_url = document.getElementById('photoUrl').value;
  const password = document.getElementById('password').value;

  const body = JSON.stringify({
    user_name,
    email,
    photo_url,
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
  document.getElementById('signUp').addEventListener('click', signUpButtonClicked)
};

window.addEventListener('DOMContentLoaded', main);