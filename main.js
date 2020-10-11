// Setting variables needed to show login screen on first load only and to login/change screens
const login = document.querySelector(".login");
const form = document.querySelector(".login__form");
const dashboard = document.querySelector(".dashboard")

const nameInput = document.querySelector("#name");
const nameOutput = document.querySelector(".user__name");

// Event listener, function occurs on form submit
form.addEventListener('submit', function (e) {
    // Prevent default action of submit
    e.preventDefault();

    // If/else statement to validate form input.
    if (nameInput.value === 0 || nameInput.value === '') {
        // If input value is 0 or an empty string, it shows the user an error message.
        const parent = form.parentNode;
        const error = document.createElement('p');
        const errorMsg = document.createTextNode('ENTER YOUR NAME TO CONTINUE');

        error.appendChild(errorMsg);
        parent.insertBefore(error, form);

    } else {
        // Switch to dashboard on login by toggling "hidden" class
        login.classList.toggle("hidden");
        dashboard.classList.toggle("hidden");

        // Grab username from input, save it to localStorage and replace default string in user__name span.
        localStorage.setItem('username', nameInput.value);
        const username = localStorage.getItem('username');
        const usernameOutput = document.createTextNode(username);
        nameOutput.replaceChild(usernameOutput, nameOutput.lastChild);
    }
});

// Only show login screen on first load