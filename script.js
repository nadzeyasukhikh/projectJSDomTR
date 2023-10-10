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

//    авторизация

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    handleLogin()
})

// сравниваем с сервером

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
        priceValue.value = "";
        addressValue.value = "";
        costValue.value = "";
        
    } else {
        showMessage('Неверное имя пользователя или email.');
    }

};

// это наш див для всплывающих сообщений,сюда же добавила грузилку

function showMessage(text, isLoader = false) {
    if (isLoader) {
        messageDiv.innerHTML = `<div class="ring">Loading
        <span></span>
      </div>`;
    } else {
        messageDiv.textContent = text;
    }
    document.body.append(messageDiv);
    if (!isLoader) {
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// это наша форма заказа, здесь, после нажатия на "создать",
// отправляется запрос и появляются кнопки ниже  (проверка в инпутах ниже)

const createBtn = document.querySelector(".createBtn");
createBtn.addEventListener("click", createOrder);

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
    exitBtn.style.display = "flex"
    
} else {
    showMessage('Ошибка при создании заказа.');
}
}

// здесь форма заказа для заполнения
const actionsContainer = document.querySelector(".actions-container")

const actionButtons = document.querySelectorAll('.action-button');
actionButtons.forEach(button => button.style.display = 'none');
const exitBtn = document.querySelector(".exit-btn")
exitBtn.style.display = "none"

// здесь наша кнопка выхода,отправляет на главную страницу
exitBtn.addEventListener("click", () =>{
    loginForm.style.display = "block";
    orderForm.style.display = "none"
    actionButtons.forEach(button => button.style.display = 'none');
    exitBtn.style.display = "none"
    emailInput.value = "";
    nameInput.value = "";
})



// это валидация наших инпутов
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


// здесь отсылается запрос по кнопкам 
async function handleActionButtonClick(message) {
    showMessage(null, true); 
    
        const response = await fetch(urlPost);
        const data = await response.json();

        // здесь меняем как хотим,я выбрала первый пост
        const postData = `
        ${message}
         Title: ${data[0].title} 
        Body: ${data[0].body}
        `;
        showMessage(postData);
   
}



const actionPay = document.querySelector('.action-button[action="pay"]');
const actionSend = document.querySelector('.action-button[action="send"]');
const actionAccept = document.querySelector('.action-button[action="accept"]');
const actionComplete = document.querySelector('.action-button[action="complete"]');

actionPay.addEventListener('click', () => handleActionButtonClick('Заказ оплачен'));
actionSend.addEventListener('click', () => handleActionButtonClick('Заказ отправлен, ожидайте'));
actionAccept.addEventListener('click', () => handleActionButtonClick('Заказ принят'));
actionComplete.addEventListener('click', () => handleActionButtonClick('Заказ завершен'));

