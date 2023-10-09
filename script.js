const loginForm = document.querySelector(".loginForm");
const emailInput = document.querySelector(".email");
const nameInput = document.querySelector(".name");

const orderForm = document.querySelector(".orderForm");
orderForm.style.display = "none";
const addressValue = document.querySelector('.address');
const priceValue = document.querySelector('.price');
const costValue = document.querySelector('.cost');
const urlPost = "https://jsonplaceholder.typicode.com/posts"

const messageDiv = document.createElement("div");
messageDiv.classList.add("popupMessage");
const url = "https://jsonplaceholder.typicode.com/users"

const usersFromLocalStorage = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

   

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    handleLogin()
})


    async function handleLogin(){

    const emailValue = emailInput.value;
    const nameValue = nameInput.value;

    const response = await fetch(url);
    const usersFromAPI = await response.json();
    

    const user = usersFromAPI.find(u => u.email === emailValue && u.name === nameValue);

    if (user) {
        showMessage('Успешная авторизация!');
        usersFromLocalStorage.push({ email: emailValue, name: nameValue });
        localStorage.setItem("users", JSON.stringify(usersFromLocalStorage));
        loginForm.style.display = "none"
        orderForm.style.display = "block"
        
    } else {
        showMessage('Неверное имя пользователя или email.');
    }

};


function showMessage(text) {
    messageDiv.textContent = text;
   
    document.body.append(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}


const actionsContainer = document.querySelector(".actions-container")



const actionButtons = document.querySelectorAll('.action-button');
actionButtons.forEach(button => button.style.display = 'none');



async function createOrder() {
    const orderData = {
        address: addressValue.value,
        price: priceValue.value,
        cost: costValue.value
}
const response = await fetch(urlPost, {
    method: 'POST',
    body: JSON.stringify(orderData),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
});


if (response.status === 201) {
    showMessage('Заказ успешно создан!');
    actionButtons.forEach(button => button.style.display = 'flex');
} else {
    showMessage('Ошибка при создании заказа.');
}
}

function englishInput(input) {
    if (!/^[a-zA-Z\s@]*$/.test(input.value)) {
        input.setCustomValidity('Пожалуйста, используйте только английские буквы.');
        input.reportValidity();
    } else {
        input.setCustomValidity(''); 
    }
}





function numerInput(input) {
    if (!/^\d+(\.\d+)?$/.test(input.value)) {  
        input.setCustomValidity('Пожалуйста, введите корректное число.');
        input.reportValidity();
    } else {
        input.setCustomValidity(''); 
    }
}



priceValue.addEventListener('input', function() {
    numerInput(this);
});

costValue.addEventListener('input', function() {
    numerInput(this);
});



nameInput.addEventListener('input', function() {
    englishInput(this);
});

