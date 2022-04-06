const form = document.querySelector('#form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const loginData = Object.create(null);
  loginData.email = e.target.email.value;
  loginData.password = e.target.password.value;

  validateLoginData(loginData);
});

const validateLoginData = loginData => {
  if (validateField(loginData.email) && validateField(loginData.password)) {
    sendloginData(loginData);
  } else {
    alert('Oops! Parece que um dos campos não foi preenchido corretamente, confere aí pra gente');
  }
}

const validateField = field => {
  if (field.trim() !== "") {
    return true;
  }

  return false;
}

const sendloginData = loginData => {
  const url = `http://localhost:8080/api/v1/users/login/${loginData.email}/${loginData.password}`;

  fetch(url, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(response => {
    if (response.status === 500) {
      handleLoginError(response);
    }

    if (response.status === 200) {
      handleLoginSuccess(response);
    }
  });
}

const handleLoginError = response => {
  alert(`Hmm.. Olha só o que deu -> "${response.message}"\n\nMas não se preocupe, vamos te ajudar!\n\nPor favor, clique em OK`);

  const confirmed = confirm('Deixa eu te perguntar, tem certeza que seus dados de acesso estão corretos?\n\nCaso sim, por favor, clique em OK que a gente já continua\n\nAgora se bateu aquela dúvida clique em "Cancelar" para tentar novamente ;)');

  if (confirmed) {
    alert('Certo. Já avisei a equipe, vamos verificar seu caso e te retornar por e-mail, beleza?\n\nAh, não se preocupa que é rapidinho. Pode ficar numa nice :D');
  }
}

const handleLoginSuccess = response => {
  sessionStorage.setItem('advertise-token', response.body);
  alert('Dummy text: logado com sucesso!');
}