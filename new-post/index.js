import { validateToken } from '../js/commom.js';

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
  console.log(post);
}