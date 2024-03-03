// drop down-----start
const optionMenu = document.querySelector(".select-menu"),
  selectBtn = optionMenu.querySelector(".select-btn"),
  options = optionMenu.querySelectorAll(".option"),
  sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active")
);

let wk_mngt1 = document.getElementById("wk_mngt1");
let wk_mngt2 = document.getElementById("wk_mngt2");
let wk_mngt3 = document.getElementById("wk_mngt3");
let wk_mngt4 = document.getElementById("wk_mngt4");

wk_mngt1.addEventListener("click", () => {
  checkUserAndRedirect("./pages/wk_mngt.html");
});
wk_mngt2.addEventListener("click", () => {
  checkUserAndRedirect("./pages/wk_mngt.html");
});
wk_mngt3.addEventListener("click", () => {
  checkUserAndRedirect("./pages/wk_mngt.html");
});
wk_mngt4.addEventListener("click", () => {
  checkUserAndRedirect("./pages/wk_mngt.html");
});

function checkUserAndRedirect(destination) {
  const storedUser = localStorage.getItem('mapiuser');
  if (!storedUser) {
    alert("Please log in first.");
    window.location.href = "./pages/login.html"; // Redirect to login page
  } else {
    window.location.href = destination; // Proceed to the specified destination
  }
}


let hreflink = document.getElementById("hrefLogin");
console.log("hreflink", hreflink);

// Check if user data is stored in localStorage
const storedUser = localStorage.getItem('mapiuser');

if (storedUser) {
  // Parse the user data from localStorage
  const user = JSON.parse(storedUser);
  console.log("user", user);

  // Extract user's email
  let useremail = user.email;
  console.log("useremail", useremail);

  // If email exists, extract username and set it as the text content of hrefLogin
  if (useremail) {
    const Uname = useremail.substring(0, useremail.indexOf("@"));
    console.log("username", Uname);
    hreflink.innerText = Uname;
  }
}
// Other code remains the same

let logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("mapiuser"); // Change from "email" to "mapiuser"
  alert("Logout Successful");
  window.location.href = "index.html";
});


