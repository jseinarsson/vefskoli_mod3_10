// Setting variables needed to show login screen on first load only and to login/change screens
const login = document.querySelector(".login");
const form = document.querySelector(".login__form");
const dashboard = document.querySelector(".dashboard")

const nameInput = document.querySelector("#name");
const nameOutput = document.querySelector(".user__name");

form.addEventListener('submit', function (e) {
    // Prevent default action of submit
    e.preventDefault();

    // Switch to dashboard on login by toggling "hidden" class
    login.classList.toggle("hidden");
    dashboard.classList.toggle("hidden");

    // Grab username from input and replace default string in user__name span.
    const nameInputText = document.createTextNode(nameInput.value)
    nameOutput.replaceChild(nameInputText, nameOutput.lastChild);
});