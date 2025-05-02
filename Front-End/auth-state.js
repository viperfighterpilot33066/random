import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvBjMwPgEiTfLKei-irOPzWbXYvDSZmYo",
  authDomain: "fir-practice-13a0a.firebaseapp.com",
  projectId: "fir-practice-13a0a",
  storageBucket: "fir-practice-13a0a.firebasestorage.app",
  messagingSenderId: "637216269386",
  appId: "1:637216269386:web:695bdf613fdf543abcf2b3",
  measurementId: "G-RX6F55WEXD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Global auth state observer
onAuthStateChanged(auth, (user) => {
  const status = document.getElementById("status");
  if (status) {
    if (user) {
      status.innerText = "Logged in"; // Changed to hide actual name
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
  }
});

export { auth };
