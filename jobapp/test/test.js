const data = { username: 'admin', password: 'admin' };

function getToken() {
  fetch('http://127.0.0.1:8000/api/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data),
        localStorage.setItem('accessToken', data.access),
        localStorage.setItem('refreshToken', data.refresh);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
