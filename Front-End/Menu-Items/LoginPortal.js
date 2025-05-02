// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvBjMwPgEiTfLKei-irOPzWbXYvDSZmYo",
  authDomain: "fir-practice-13a0a.firebaseapp.com",
  projectId: "fir-practice-13a0a",
  storageBucket: "fir-practice-13a0a.firebasestorage.app",
  messagingSenderId: "637216269386",
  appId: "1:637216269386:web:695bdf613fdf543abcf2b3",
  measurementId: "G-RX6F55WEXD"
};

console.log("Initializing Firebase with config:", firebaseConfig); // Debugging log

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized:", app); // Debugging log
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Register new user
window.register = function () {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  console.log("Attempting to register user with email:", email); // Debugging log

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User created successfully:", userCredential.user); // Debugging log
      return updateProfile(userCredential.user, {
        displayName: name
      });
    })
    .then(() => {
      alert("Registration successful!");
      showLogin();
    })
    .catch((error) => {
      console.error("Error during registration:", error); // Debugging log
      alert(error.message);
    });
};

// Login existing user
window.login = function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  console.log("Attempting login with email:", email);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Login successful:", user);
      document.getElementById("status").innerText = `Hello, ${user.displayName || user.email}`;
      document.getElementById("login-form").style.display = 'none';
      document.getElementById("logo-container").style.display = 'block';
      window.location.href = "../index.html"; // Redirect to homepage after login
    })
    .catch((error) => {
      console.error("Login error:", error);
      document.getElementById("status").innerText = "Login failed";
      alert(`Login failed: ${error.message}`);
    });
};

// Reset password
window.resetPassword = function () {
  const email = document.getElementById("reset-email").value;
  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent!");
      showLogin();
    })
    .catch((error) => {
      alert(error.message);
    });
};

// Logout user
window.logout = function () {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully.");
      document.getElementById("login-form").style.display = 'block';
      document.getElementById("logo-container").style.display = 'none';
      window.location.href = "../index.html"; // Redirect to homepage after logout
    })
    .catch((error) => {
      alert(error.message);
    });
};

// Display auth state
onAuthStateChanged(auth, (user) => {
  const status = document.getElementById("status");
  if (user) {
    status.innerText = `Hello, ${user.displayName || user.email}`;
    if (window.location.pathname.includes('LoginPortal.html')) {
      document.getElementById("login-form").style.display = 'none';
      document.getElementById("logo-container").style.display = 'block';
    }
  } else {
    status.innerText = "Not logged in";
    if (window.location.pathname.includes('LoginPortal.html')) {
      document.getElementById("login-form").style.display = 'block';
      document.getElementById("logo-container").style.display = 'none';
    }
  }
});
