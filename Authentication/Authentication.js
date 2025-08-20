// ================= LOGIN =================
const loginForm = document.getElementById('loginForm');
const loginEmailInput = document.getElementById('loginEmail');
const loginPasswordInput = document.getElementById('loginPassword');

const loginEmailError = document.getElementById('emailError');
const loginPasswordError = document.getElementById('passwordError');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmailInput.value)) {
        loginEmailError.textContent = "Please enter a valid email.";
        valid = false;
    } else {
        loginEmailError.textContent = "";
    }

    // Password validation
    if (loginPasswordInput.value === "") {
        loginPasswordError.textContent = "Password cannot be empty.";
        valid = false;
    } else {
        loginPasswordError.textContent = "";
    }

    //Login if user is valid and exist
    if (valid) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(
            u => u.email === loginEmailInput.value && u.password === loginPasswordInput.value
        );

        if (user) {
           window.open("../Home/Home.html", "_self");
            confirm(`Welcome back, ${user.name}!`);
        } else {
            alert("Invalid email or password.");
        }
    }
});

// ================= REGISTER =================
const registerForm = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const registerEmailInput = document.getElementById('registerEmail');
const registerPasswordInput = document.getElementById('registerPassword');

const nameError = document.getElementById('nameError');
const registerEmailError = document.getElementById('registerEmailError');
const registerPasswordError = document.getElementById('registerPasswordError');

registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    // Name validation
    const nameRegex = /^[a-zA-Z\s]{3,50}$/;
    if (!nameRegex.test(nameInput.value)) {
        nameError.textContent = "Name must be 3-50 letters only.";
        valid = false;
    } else {
        nameError.textContent = "";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmailInput.value)) {
        registerEmailError.textContent = "Please enter a valid email.";
        valid = false;
    } else {
        registerEmailError.textContent = "";
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;
    if (!passwordRegex.test(registerPasswordInput.value)) {
        registerPasswordError.textContent =
            "Password must be at least 5 characters with 1 uppercase, 1 lowercase, and a number.";
        valid = false;
    } else {
        registerPasswordError.textContent = "";
    }

    // Add user if valid
    if (valid) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const emailExists = users.some(user => user.email === registerEmailInput.value);
        if (emailExists) {
            alert("This email is already registered!");
            return;
        }

        users.push({
            name: nameInput.value,
            email: registerEmailInput.value,
            password: registerPasswordInput.value,
        });

        localStorage.setItem('users', JSON.stringify(users));
        alert("Registration successful!");

        // Redirect to login
        window.open("http://127.0.0.1:5500/../Home/Home.html", "_self");
    }
});
