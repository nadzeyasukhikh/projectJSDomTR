const loginForm = document.querySelector(".loginForm");
const emailInput = document.querySelector(".email");
const nameInput = document.querySelector(".name");

const messageDiv = document.createElement("div");
messageDiv.classList.add("popupMessage");
const url = "https://jsonplaceholder.typicode.com/users"

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    handleLogin()
})


    async function handleLogin(){

    const emailValue = emailInput.value;
    const nameValue = nameInput.value;

    const response = await fetch(url);
    const users = await response.json();

    const user = users.find(u => u.email === emailValue && u.name === nameValue);

    if (user) {
        showMessage('Успешная авторизация!', 'green');
        localStorage.setItem('userEmail', emailValue);
        localStorage.setItem('userName', nameValue);
    } else {
        showMessage('Неверное имя пользователя или email.', 'red');
    }

};




function showMessage(text, color) {
    messageDiv.textContent = text;
    messageDiv.style.backgroundColor = color;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}