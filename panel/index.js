import { validateToken } from '../js/commom.js';
// import { createPostsLayout } from '../js/util-methods.js';

const logout = document.querySelector('#logout');
const newPost = document.querySelector('#new-post');
const btnMenuMobile = document.querySelector('#btn-menu-mobile');
const menuMobile = document.querySelector('#menu-mobile');
const tabAllPosts = document.querySelector('#tab-all');
const tabYourPosts = document.querySelector('#tab-your-posts');
const divAllPosts = document.querySelector('#all-posts');
const divYourPosts = document.querySelector('#your-posts');

validateToken('../login');
tabAllPosts.classList.add('active');

logout.addEventListener('click', () => {
  const confirmed = confirm('Tem certeza que deseja sair?\n\nClique em OK para SIM ou clique em "Cancelar"');
  if (confirmed) {
    sessionStorage.removeItem('advertise-token');
    location.href = '../login';
  }
});

newPost.addEventListener('click', () => {
  location.href = '../new-post';
});

btnMenuMobile.addEventListener('click', () => {
  if (!menuMobile.classList.contains('menu-mobile-expanded')) {
    menuMobile.classList.add('menu-mobile-expanded');
  } else {
    menuMobile.classList.remove('menu-mobile-expanded');
  }
});

const changeTab = (fromTab, toTab, fromList, toList) => {
  fromTab.classList.remove('active');
  fromList.style.display = 'none';
  toTab.classList.add('active');
  toList.style.display = 'block';
}

tabAllPosts.addEventListener('click', () => changeTab(tabYourPosts, tabAllPosts, divYourPosts, divAllPosts));

tabYourPosts.addEventListener('click', () => changeTab(tabAllPosts, tabYourPosts, divAllPosts, divYourPosts));

function getAllPosts() {
  const url = 'http://localhost:8080/api/v1/posts';

  fetch(url, {
    headers: {
      'Authorization': sessionStorage.getItem('advertise-token')
    },
    method: 'GET'
  })
  .then(response => response.json())
  .then(response => loadPosts(response, divAllPosts));
}

getAllPosts();

function loadPosts(posts, divToLoadPosts) {
  posts.map(post => {
    const divPost = document.createElement('div');
    divPost.classList.add('post');

    const divLeft = document.createElement('div');
    divLeft.classList.add('left');

    const divRight = document.createElement('div');
    divRight.classList.add('right');

    const pTitle = document.createElement('p');
    pTitle.classList.add('title');
    pTitle.textContent = post.title;

    const pDescription = document.createElement('p');
    pDescription.textContent = post.description;

    const divActions = document.createElement('div');
    divActions.classList.add('actions');

    const buttonDetails = document.createElement('button');
    buttonDetails.textContent = 'Detalhes';

    const buttonEdit = document.createElement('button');
    buttonEdit.textContent = 'Editar';

    const buttonRemove = document.createElement('button');
    buttonRemove.classList.add('btn-remove');
    buttonRemove.textContent = 'Excluir';

    const pMonthYear = document.createElement('p');
    const iElement = document.querySelector('i');
    iElement.textContent = 'abr/2022';

    const pLocal = document.createElement('p');
    const iElementPLocal = document.createElement('i');
    iElementPLocal.textContent = 'Brasília - DF';

    divActions.append(buttonDetails, buttonEdit, buttonRemove);
    pMonthYear.append(iElement);
    pLocal.append(iElementPLocal);
    divRight.append(pMonthYear, pLocal);
    divLeft.append(pTitle, pDescription, divActions);
    divPost.append(divLeft, divRight);
    divToLoadPosts.append(divPost);
  });
}

// function getUserPosts() {
//   const url = 'http://localhost:8080/api/v1/posts/your-posts';

//   fetch(url, {
//     headers: {
//       'Authorization': sessionStorage.getItem('advertise-token')
//     },
//     method: 'GET'
//   })
//   .then(response => response.json())
//   .then(response => loadPosts(response, divYourPosts));
// }