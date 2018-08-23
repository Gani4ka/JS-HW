'use strict'

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Напишите скрипт авторизации пользователя.
  
  Есть массив паролей зарегистрированных пользователей passwords. 
  
  При посещении страницы, необходимо попросить пользователя ввести свой пароль,
  после чего проверить содержит ли массив passwords пароль введенный пользователем.
  
  Пароль можно ввести не верно всего n раз, кол-во хранится в переменной attempts.
  Подсказка: используйте цикл do...while.
  Если был введен пароль который есть в массиве passwords, вывести alert 
  с текстом 'Добро пожаловать!' и прекратить спрашивать пароль в цикле.
  Если был введен не существующий пароль, отнять от лимита попыток единицу, 
  вывести alert с текстом "Неверный пароль, у вас осталось n попыток", 
  где n это оставшийся лимит. 
  
  После того как пользователь закрыл alert, запросить пароль снова. 
  Продолжать запрашивать пароль до тех пор, пока пользователь не введет 
  существующий пароль, не кончатся попытки или пока пользователь 
  не нажмет Cancel в prompt.
  Если закончились попытки, вывести alert с текстом "У вас закончились попытки, аккаунт заблокирован!"
  
  Если пользователь нажмет Cancel, прекратить выполнение цикла.
*/
const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attempts = 4;
let userPassword;
let passwordIsOk = false;
const arrLength = passwords.length;

do {
  userPassword = prompt('Enter your password');
  attempts -= 1;

  if (userPassword === null) {
    alert ('Cansel input');
  } else if (attempts === 0) {
    alert ('Attempts are end. Account is blocked');
  } else {
    for (let i = 0; i < arrLength; i += 1) {
      if (userPassword === passwords[i]) {
        alert('Hello');
          passwordIsOk = true;
          console.log(passwordIsOk);
          break;
      }
    }
    if (passwordIsOk === false) {
      alert (`Wrong input. Try again. You have ${attempts - 1} attempts`);
      if (attempts === 1) {
        break;
      }
    }
  }
  
} while (attempts !== 0 && userPassword !== null && passwordIsOk === false)

  