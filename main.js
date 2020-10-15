// LOGIN

// Setting variables needed to show login screen on first load only and to login/change screens
const login = document.querySelector(".login");
const form = document.querySelector(".login__form");
const dashboard = document.querySelector(".dashboard")

const nameInput = document.querySelector("#name");
const nameOutput = document.querySelector("#nameOutput");

// Only show login screen on first load
window.onload = function (e) {
    if (!('repeatVisitor' in localStorage)) {
        // If repeatVisitor does not exist then create a localstorage item called repeatVisitor and set it to true
        localStorage.setItem("repeatVisitor", true);
    } else {
        // If repeatVisitor exists, hide the login screen, pick up the username stored in the localStorage and display the dashboard
        login.classList.toggle("hidden");
        dashboard.classList.toggle("hidden");

        const username = localStorage.getItem('username');
        const welcomeBackUser = document.createTextNode(`Welcome back ${username}`);
        nameOutput.replaceChild(welcomeBackUser, nameOutput.lastChild);
    }

    // Run the function loadPath, which theoretically brings up the correct items for each path
    function loadPath() {
        const currentPath = (window.location.pathname);
    
        pages.forEach(function (page) {
            page.classList.remove('active');
        });
    
        if (currentPath === '/' || currentPath === '/currentplanet') {
            console.log(window.location.pathname);
            const currentPlanet = document.getElementById('currentplanet');
            currentPlanet.classList.add('active');
        } else if (currentPath === '/solarsystem') {
            const solarSystem = document.getElementById('solarsystem');
            solarSystem.classList.add('active');
        } else if (currentPath === '/travellog') {
            const travelLog = document.getElementById('travellog');
            travelLog.classList.add('active');
        }
    }

    loadPath();
}

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
        const welcomeUser = document.createTextNode(`Welcome ${username}`);
        nameOutput.replaceChild(welcomeUser, nameOutput.lastChild);
    }
});

// DASHBOARD NAVIGATION

const navItems = document.querySelectorAll(".nav__item");
const pages = document.querySelectorAll(".page")

// For each navigation item, run this function to check for a click event, return the proper page and push an url change
navItems.forEach(function (link) {
    // Takes the href attribute from each link and grabs the corresponding section by it's matching id
    const linkName = link.getAttribute('href');
    const loadPage = document.getElementById(linkName);

    link.addEventListener('click', function (e) {
        // Prevents default link behavior
        e.preventDefault();
        
        // Pushes url
        history.pushState(linkName, null, linkName);

        // Iterate through and remove active class from each page/state
        pages.forEach(function (page) {
            page.classList.remove('active');
        });
        // Add active class to the page being loaded
        loadPage.classList.add('active');

        //console.log(window.location.pathname);
    });
});

// Makes browser back/forward buttons work
window.onpopstate = function (e) {
    console.log(e.state);
    const loadPage = document.getElementById(e.state);
    
    pages.forEach(function (page) {
        page.classList.remove('active');
    });

    loadPage.classList.add('active');
}

// Travel log
const logInput = document.querySelector('.log__input');
const logOutput = document.querySelector('.log__output');

logInput.addEventListener('submit', function (e) {
    e.preventDefault();

    // Grab text from textarea and time at submit
    const logTextArea = document.querySelector('.log__text');
    let today = new Date();
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    let date = today.getDate();
    let month = months[today.getMonth()];
    let year = today.getFullYear();

    const submitDate = document.createTextNode(`${month} ${date}, ${year}`);
    const logText = document.createTextNode(logTextArea.value);
    
    // Create new list item
    const newListItem = document.createElement('li');
    newListItem.classList.add('log__entry');

    const newListParagraphTime = document.createElement('p');
    newListParagraphTime.classList.add('entry__timestamp');
    newListParagraphTime.appendChild(submitDate);
    newListItem.appendChild(newListParagraphTime);

    const newListParagraphText = document.createElement('p');
    newListParagraphText.classList.add('entry__text');
    newListParagraphText.appendChild(logText);
    newListItem.appendChild(newListParagraphText);

    // Add list item to DOM
    logOutput.appendChild(newListItem);
})

// Return today's date
const dateOutput = document.querySelector("#dateOutput");

function currentDate() {
    // Create an output with longform date as text string
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = new Date();

    let hour = today.getHours();
    let minute = today.getMinutes();

    let day = days[today.getDay()];
    let date = today.getDate();
    let month = months[today.getMonth()];
    let year = today.getFullYear();

    const currentDateOutput = document.createTextNode(`${hour}:${minute} ${day}, ${month} ${date}, ${year}`);
    
    // Add currentDateOutput as textnode to object in DOM
    dateOutput.replaceChild(currentDateOutput, dateOutput.lastChild);
}

// Set interval to run currentDate function every 5 seconds
setInterval(currentDate, 5000);