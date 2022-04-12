const logout = document.querySelector('#logout');
const newPost = document.querySelector('#new-post');
const btnMenuMobile = document.querySelector('#btn-menu-mobile');
const menuMobile = document.querySelector('#menu-mobile');

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