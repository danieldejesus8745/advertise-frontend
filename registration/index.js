const form = document.querySelector('#form');
const selectState = document.querySelector('#state');
const selectCity = document.querySelector('#city');

form.addEventListener('submit', e => {
  e.preventDefault();

  const newUser = Object.create(null);
  newUser.name = e.target.name.value;
  newUser.email = e.target.email.value;
  newUser.password = e.target.password.value;
  newUser.state = e.target.state.value;
  newUser.city = e.target.city.value;

  validateStateAndCity(newUser);
});

const validateStateAndCity = newUser => {
  if (newUser.state === 'select') {
    alert('Selecione seu estado');
  } else {
    if (newUser.city === 'select') {
      alert('Selecione sua cidade');
    } else {
      sendNewUser(newUser);
    }
  }
}

const sendNewUser = newUser => {
  const url = 'http://localhost:8080/api/v1/users';

  fetch(url, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(newUser)
  })
  .then(response => response.json())
  .then(response => console.log(response));
}

selectState.addEventListener('change', () => {
  const uf = document.querySelector('#state').value;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;

  fetch(url)
      .then(response => response.json())
      .then(response => {
          const cities = response.map(city => city.nome);

          cities.sort();

          loadCitiesList(cities);
      });
});

const loadCitiesList = cities => {
  selectCity.removeAttribute('disabled');
  selectCity.innerHTML = '';
  const select = document.createElement('option');
  select.setAttribute('value', 'select');
  select.textContent = 'Selecione sua cidade';
  selectCity.append(select);

  cities.map(city => {
      const option = document.createElement('option');

      option.setAttribute('value', city);

      option.textContent = city;

      selectCity.append(option);
  });
}