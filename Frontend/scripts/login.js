document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formcontainer');

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const payload = {
          email: email,
          password: password
      };

      fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Login failed');
          }
          return response.json();
      })
      .then(data => {
          // Store user data and access token in localStorage
          localStorage.setItem('mapiuser', JSON.stringify(data.user));
          localStorage.setItem('accessToken', data.access_token);

          alert(data.message)

          // Redirect to the index page or perform any other actions
           window.location.assign("../index.html");
      })
      .catch(error => {
          console.error('Login error:', error);
          alert('Login failed. Please check your email and password.');
      });
  });
});
