// 1. "Получение данных о пользователе"

// Реализуйте функцию getUserData, которая принимает идентификатор пользователя (ID) в качестве аргумента и использует fetch для получения данных о пользователе с заданным ID с удаленного сервера. Функция должна возвращать промис, который разрешается с данными о пользователе в виде объекта. Если пользователь с указанным ID не найден, промис должен быть отклонен с соответствующим сообщением об ошибке.

// Подсказка, с последовательностью действий:
// getUserData использует fetch для получения данных о пользователе с удаленного сервера. Если запрос успешен (с кодом 200), функция извлекает данные из ответа с помощью response.json() и возвращает объект с данными о пользователе. Если запрос неуспешен, функция отклоняет промис с сообщением об ошибке.

function getUserData(idUser) {
  let userInData = false;
  return new Promise(async function (resolve, reject) {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (response.ok) {
      const users = await response.json();
      users.forEach((element) => {
        if (element.id === idUser) {
          userInData = true;
          resolve(element);
        }
      });
    } else {
      reject("Ошибка HTTP: " + response.status);
    }
    if (!userInData) {
      reject(`Пользователя с номером ${idUser} нет в базе данных`);
    }
  });
}
getUserData(1).then(
  (response) => console.log(response),
  (error) => console.log(error)
);
getUserData(11).then(
  (response) => console.log(response),
  (error) => console.log(error)
);

// 2. "Отправка данных на сервер"
// Реализуйте функцию saveUserData, которая принимает объект с данными о
// пользователе в качестве аргумента и использует fetch для отправки этих данных
// на удаленный сервер для сохранения. Функция должна возвращать промис,
// который разрешается, если данные успешно отправлены, или отклоняется в случае
// ошибки.
// saveUserData использует fetch для отправки данных о пользователе на
// удаленный сервер для сохранения. Она отправляет POST-запрос на URL-адрес
// /users с указанием типа содержимого application/json и сериализует объект с
// данными о пользователе в JSON-строку с помощью JSON.stringify(). Если
// запрос успешен (с кодом 200), функция разрешает промис. Если запрос неуспешен,
// функция отклоняет промис с сообщением об ошибке.

function saveUserData(user) {
  return new Promise(async function (resolve, reject) {
    let response = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      resolve(response.status);
    } else {
      reject("Ошибка HTTP: " + response.status);
    }
  });
}

const user = {
  name: "John Smith",
  age: 30,
  email: "john@example.com",
};

saveUserData(user)
  .then(() => {
    console.log("User data saved successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });

//"Изменение стиля элемента через заданное время"
// Напишите функцию changeStyleDelayed, которая принимает идентификатор элемента и время задержки (в миллисекундах) в качестве аргументов. Функция должна изменить стиль элемента через указанное время.
// Пример использования функции

function generateRandomColor() {
  const hexCode = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCode[Math.floor(Math.random() * hexCode.length)];
  }
  return "#" + color;
}

function changeStyleDelayed(id, time) {
  const elem = document.querySelector(`#${id}`);
  setInterval(function timeOut() {
    elem.style.color = generateRandomColor();
  }, time);
}

changeStyleDelayed("myElement", 100); // Через 0.1 секунды изменяется цвет элемента с id 'myElement'"
