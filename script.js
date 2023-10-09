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
        showMessage('Успешная авторизация!');
        
    } else {
        showMessage('Неверное имя пользователя или email.');
    }

};

function showMessage(text) {
    messageDiv.textContent = text;
   
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}