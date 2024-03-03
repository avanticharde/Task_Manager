let form = document.getElementById("formcontainer");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let payload = {
    username: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    accountname: document.getElementById("accountname").value,
  };

  fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      console.log(res)
      if (!res.ok) {
        throw new Error("Registration failed. Please try again.");
      }
      return res.json();
    })
    .then((data) => {
      alert(data.message);
      // Clear the form after successful registration
      document.getElementById("fullname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("accountname").value = "";
      window.location.href= "login.html"
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message);
    });
});


// Retrieve user details from localStorage
// const storedUser = localStorage.getItem('mapiuser');

// console.log(storedUser)

// // // Check if storedUser is not null before parsing
// // if (storedUser !== null) {
// //     // Parse the JSON string back to an object
// //     const user = JSON.parse(storedUser);
    
//     // Access the user details
//     console.log(user.username);
//     let useremail = user.email
  