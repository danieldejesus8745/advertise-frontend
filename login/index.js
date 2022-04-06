const form = document.querySelector('#form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const loginData = Object.create(null);
  loginData.email = e.target.email.value;
  loginData.password = e.target.password.value;

  validateLoginData(loginData);
});

const validateLoginData = loginData => {
  if (loginData.email !== undefined && loginData.email !== "") {
    if (loginData.email !== undefined && loginData.email !== "") {
      //
    } else {
      alert('Oops! Parece que tem um probleminha com o campo Senha, confere aí pra gente');
    }
  } else {
    alert('Oops! Parece que tem um probleminha com o campo E-mail, confere aí pra gente');
  }
}

const sendloginData = loginData => {
  const url = 'http://localhost:8080/api/v1/users';

  fetch(url, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(response => console.log(response));
}