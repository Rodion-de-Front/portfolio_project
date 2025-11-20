let name = document.getElementById("name");
let age = document.getElementById("age");
let email = document.getElementById("email");
let message = document.getElementById("message");
let inputs = document.querySelectorAll("input, textarea");

let form = document.querySelector("form");
let button = document.getElementById("button");

let sideBar = document.getElementById("side-bar");
let allowForm = true;

const BOT_TOKEN = "8536852968:AAFD6mKh0Ic2CJpv4ujPi91eT6YWDvZzNtE";
const CHAT_ID = "892205925";

function sendForm() {
  // Проверяем, все ли поля заполнены
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      allowForm = false;
      break;
    }
  }

  if (!allowForm) {
    // Если какое-то поле не заполнено, выводим alert
    alert("Пожалуйста, введите все данные");
  } else {
    const tgMessage =
      "Новое сообщение от пользователя: \n\nИмя: " +
      name.value +
      "\nВозраст: " +
      age.value +
      "\nEmail: " +
      email.value +
      "\nСообщение: " +
      message.value;

    const data = {
      chat_id: CHAT_ID,
      text: tgMessage,
    };

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (
          data // Выводим сообщение об успешной отправке формы
        ) => (form.innerHTML = `<h1>Сообщение отправлено!</h1>`),
        // Скрываем кнопку отправки формы
        (button.style.display = "none")
      )
      .catch((err) => alert("Что-то пошло не так. Попробуйте позже."));

    // Очищаем все поля формы
    for (let k = 0; k < inputs.length; k++) {
      inputs[k].value = "";
    }
  }
}

function openSideBar() {
  sideBar.style.right = "0";
}

function closeSideBar() {
  sideBar.style.right = "-200px";
}
