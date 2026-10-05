document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');

    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // ဒီနေရာမှာ alert('Login Successful!') အစား window.location.href ကို ပြောင်းလိုက်တာပါ
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = "Hp.html"; // <-- ဒီစာကြောင်းလေး ပြောင်းသွားတာပါ
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Signup Successful!');
    });
});