export const validateToken = pathToRedirect => {
  const token = sessionStorage.getItem('advertise-token');
  const url = `http://localhost:8080/api/v1/token/${token}`;
  fetch(url, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(response => {
    handleValidateTokenResponse(response, pathToRedirect);
  });
}

const handleValidateTokenResponse = (response, pathToRedirect) => {
  if (response.status !== 200) {
    alert('iiiihhh, sua sessão expirou!')
    sessionStorage.clear();
    location.href = pathToRedirect;
  }
}