const form = document.querySelector('#form');

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