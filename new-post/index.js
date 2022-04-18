import { validateToken, thereIsTokenSaved } from '../js/commom.js';

const form = document.querySelector('#form');

validateToken('../login');

form.addEventListener('submit', e => {
  e.preventDefault();

  const post = Object.create(null);
  post.title = e.target.title.value;
  post.description = e.target.description.value;

  sendPost(post);
});

const sendPost = post => {
  if (thereIsTokenSaved()) {
    const url = `http://localhost:8080/api/v1/posts`;
    const token = sessionStorage.getItem('advertise-token');

    fetch(url, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(response => console.log(response));
  } else {
    alert('Token não encontrado')
    location.href = '../login';
  }  
}