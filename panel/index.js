const logout = document.querySelector('#logout');

logout.addEventListener('click', () => {
  const confirmed = confirm('Tem certeza que deseja sair?\n\nClique em OK para SIM ou clique em "Cancelar"');
  if (confirmed) {
    sessionStorage.removeItem('advertise-token');
    location.href = '../login';
  }
});