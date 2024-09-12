const endpoint = 'https://localhost:8000';

const getUserDetails = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/details/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

export default getUserDetails;
