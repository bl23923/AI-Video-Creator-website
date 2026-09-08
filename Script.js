// CREATE VIDEO

const createButton = document.getElementById("createVideo");
const videoIdea = document.getElementById("videoIdea");
const videoResult = document.getElementById("video-result");
const videoPreview = document.getElementById("video-preview");

createButton.addEventListener("click", function () {

    const idea = videoIdea.value.trim();

    if (idea === "") {
        videoResult.innerText = "⚠️ Please enter your video idea first.";
        videoPreview.style.display = "none";
        return;
    }

    videoResult.innerText = "🎬 Generating your video...";

    videoPreview.style.display = "none";

    setTimeout(function () {

    videoResult.innerText = "✅ Your video is ready!";

videoPreview.style.display = "block";


// SAVE VIDEO TO MY VIDEOS

const savedVideos =
    JSON.parse(localStorage.getItem("myVideos")) || [];

savedVideos.push({
    idea: idea,
    date: new Date().toLocaleString()
});

localStorage.setItem(
    "myVideos",
    JSON.stringify(savedVideos)
);

    }, 2000);
});


// TEMPLATE BUTTONS

const templateButtons = document.querySelectorAll(".template-card button");

templateButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const template = button.getAttribute("data-template");

        videoIdea.value = template;

        document.getElementById("create").scrollIntoView({
            behavior: "smooth"
        });

    });

});


// SCROLL TO CREATE

function scrollToCreate() {

    document.getElementById("create").scrollIntoView({
        behavior: "smooth"
    });

}


// LOGIN / SIGNUP

const loginButton = document.getElementById("loginButton");
const authModal = document.getElementById("authModal");
const closeButton = document.getElementById("closeButton");

const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");

const nameInput = document.getElementById("nameInput");
const authSubmit = document.getElementById("authSubmit");

const switchText = document.getElementById("switchText");
const switchButton = document.getElementById("switchButton");

const authMessage = document.getElementById("authMessage");

let isSignup = false;


// OPEN LOGIN

loginButton.addEventListener("click", function () {

    authModal.style.display = "flex";

    isSignup = false;

    updateAuthMode();

});


// CLOSE

closeButton.addEventListener("click", function () {

    authModal.style.display = "none";

});


// CLOSE WHEN CLICK OUTSIDE

authModal.addEventListener("click", function (event) {

    if (event.target === authModal) {
        authModal.style.display = "none";
    }

});


// SWITCH LOGIN / SIGNUP

switchButton.addEventListener("click", function () {

    isSignup = !isSignup;

    updateAuthMode();

});


// UPDATE AUTH FORM

function updateAuthMode() {

    authMessage.innerText = "";

    if (isSignup) {

        authTitle.innerText = "Create Account";

        authSubtitle.innerText =
            "Sign up to start creating amazing videos.";

        nameInput.style.display = "block";

        authSubmit.innerText = "Sign Up";

        switchText.innerHTML =
            'Already have an account? <span id="switchButton">Login</span>';

        document.getElementById("switchButton").addEventListener(
            "click",
            function () {
                isSignup = false;
                updateAuthMode();
            }
        );

    } else {

        authTitle.innerText = "Welcome Back";

        authSubtitle.innerText =
            "Login to continue creating amazing videos.";

        nameInput.style.display = "none";

        authSubmit.innerText = "Login";

        switchText.innerHTML =
            'Don\'t have an account? <span id="switchButton">Sign Up</span>';

        document.getElementById("switchButton").addEventListener(
            "click",
            function () {
                isSignup = true;
                updateAuthMode();
            }
        );
    }
}


// AUTH SUBMIT

authSubmit.addEventListener("click", function () {

    const email =
        document.getElementById("emailInput").value.trim();

    const password =
        document.getElementById("passwordInput").value.trim();

    if (isSignup) {

        const name = nameInput.value.trim();

        if (name === "" || email === "" || password === "") {
          
            authMessage.innerText =
                "⚠️ Please fill all fields.";

            return;
        }
localStorage.setItem("userName", name);
localStorage.setItem("userEmail", email);
localStorage.setItem("userPassword", password);
        authMessage.innerText =
            "✅ Account created successfully!";

    } else {

        if (email === "" || password === "") {

            authMessage.innerText =
                "⚠️ Please enter email and password.";

            return;
        }
const savedEmail = localStorage.getItem("userEmail");
const savedPassword = localStorage.getItem("userPassword");

if (email !== savedEmail || password !== savedPassword) {
    authMessage.innerText = "❌ Email ya password galat hai.";
    return;
}
        authMessage.innerText =
            "✅ Login successful!";

    }

});
// LOGIN STATUS

function updateLoginButton() {
    const savedName = localStorage.getItem("userName");

    if (savedName) {
        loginButton.innerText = "Logout (" + savedName + ")";
    } else {
        loginButton.innerText = "Login";
    }
}

updateLoginButton();
function updateWelcome() {
    const savedName = localStorage.getItem("userName");
    const userWelcome = document.getElementById("userWelcome");

    if (savedName) {
        userWelcome.innerText = "👋 Welcome, " + savedName;
        userWelcome.style.display = "block";
    } else {
        userWelcome.style.display = "none";
    }
}

updateWelcome();


// LOGOUT

loginButton.addEventListener("click", function () {

    const savedName = localStorage.getItem("userName");

    if (savedName) {
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPassword");

        loginButton.innerText = "Login";

        authMessage.innerText = "✅ Logged out successfully.";

        authModal.style.display = "flex";
    }

});
function updateDashboard() {
    const savedName = localStorage.getItem("userName");
    const dashboard = document.getElementById("dashboard");

    if (savedName) {
        dashboard.style.display = "grid";
    } else {
        dashboard.style.display = "none";
    }
}

updateDashboard();
function showMyVideos() {
    const savedName = localStorage.getItem("userName");
    const message = document.getElementById("dashboardMessage");

    if (savedName) {
        message.innerText = "📁 My Videos: अभी आपके कोई generated videos नहीं हैं।";
    }
}

function showProfile() {
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");
    const message = document.getElementById("dashboardMessage");

    if (savedName && savedEmail) {
        message.innerText =
            "👤 Name: " + savedName + " | 📧 Email: " + savedEmail;
    }
  function showMyVideos() {
    const message = document.getElementById("dashboardMessage");
    const savedVideos =
        JSON.parse(localStorage.getItem("myVideos")) || [];

    if (savedVideos.length === 0) {
        message.innerHTML =
            "📁 <strong>My Videos</strong><br><br>No videos created yet.";
        return;
    }

    let html = "<h3>📁 My Videos</h3>";

    savedVideos.forEach(function(video, index) {
        html += `
            <div class="my-video-item">
                <strong>🎬 Video ${index + 1}</strong>
                <p>${video.idea}</p>
                <small>Created: ${video.date}</small>
            </div>
        `;
    });

    message.innerHTML = html;
  }
}
