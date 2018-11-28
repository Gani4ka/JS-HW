"use strict";
/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.

  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/
class UserInfo {
  constructor(parentNode) {
    this.parentNode = parentNode;
    // this.tableIsShown = false;
    //result
    this.result = null;
    this.resultTable = null;
    this.table = null;
    //buttons
    this.btnGetAllusers = null;
    this.btnGetUserByID = null;
    this.btnAddUser = null;
    this.btnRemove = null;
    this.btnUpdate = null;
    //inputs
    this.inputIdGet = null;
    this.inputIdDel = null;
    this.inputIdGet = null;
    this.inputNameAdd = null;
    this.inputAgeAdd = null;
    this.inputIdPut = null;
    this.inputNamePut = null;
    this.inputAgePut = null;
    //forms
    this.formAllUsers = null;
    this.formGet = null;
    this.formDel = null;
    this.formAll = null;
    this.formAdd = null;
    this.formPut = null;
  }
  createLayout() {
    //result
    this.result = document.createElement('p');
    this.resultTable = document.createElement('p');
    this.table = document.createElement('table');
    //buttons
    this.btnGetAllusers = document.createElement('button');
    this.btnGetUserByID = document.createElement('button');
    this.btnAddUser = document.createElement('button');
    this.btnRemove = document.createElement('button');
    this.btnUpdate = document.createElement('button');
    //inputs
    this.inputIdGet = document.createElement('input');
    this.inputIdDel = document.createElement('input');
    this.inputIdGet = document.createElement('input');
    this.inputNameAdd = document.createElement('input');
    this.inputAgeAdd = document.createElement('input');
    this.inputIdPut = document.createElement('input');
    this.inputNamePut = document.createElement('input');
    this.inputAgePut = document.createElement('input');
    //forms
    this.formAllUsers = document.createElement('form');
    this.formGet = document.createElement('form');
    this.formDel = document.createElement('form');
    this.formAdd = document.createElement('form');
    this.formPut = document.createElement('form');

    //Add classes
    this.btnGetAllusers.classList.add('mdc-btn');
    this.btnGetUserByID.classList.add('mdc-btn');
    this.btnAddUser.classList.add('mdc-btn');
    this.btnRemove.classList.add('mdc-btn');
    this.btnUpdate.classList.add('mdc-btn');

    this.formAllUsers.classList.add('search-form');
    this.formGet.classList.add('search-form');
    this.formDel.classList.add('search-form');
    this.formAdd.classList.add('search-form');
    this.formPut.classList.add('search-form');

    //Atributes
    this.inputIdGet.placeholder = 'Enter user id';
    this.inputIdDel.placeholder = 'Enter user id';
    this.inputNameAdd.placeholder = 'Enter user name';
    this.inputAgeAdd.placeholder = 'Enter user age';
    this.inputIdPut.placeholder = 'Enter user id';
    this.inputNamePut.placeholder = 'Enter user name';
    this.inputAgePut.placeholder = 'Enter user age';

    //Text content
    this.btnGetAllusers.textContent = 'All users';
    this.btnGetUserByID.textContent = 'Show user';
    this.btnAddUser.textContent = 'Add user';
    this.btnRemove.textContent = 'Remove user';
    this.btnUpdate.textContent = 'Update user';

    //Append children
    this.formAllUsers.append(this.btnGetAllusers);
    this.formGet.append(this.inputIdGet, this.btnGetUserByID);
    this.formDel.append(this.inputIdDel, this.btnRemove);
    this.formAdd.append(this.inputNameAdd, this.inputAgeAdd, this.btnAddUser);
    this.formPut.append(this.inputIdPut, this.inputNamePut, this.inputAgePut, this.btnUpdate);

    this.parentNode.append(this.formAllUsers, this.formGet, this.formDel, this.formAdd, this.formPut, this.result, this.resultTable);

    //Add events
    this.btnGetAllusers.addEventListener('click', this.getAllUsers.bind(this));
    this.btnGetUserByID.addEventListener('click', this.getUserById.bind(this));
    this.btnAddUser.addEventListener('click', this.addUser.bind(this));
    this.btnRemove.addEventListener('click', this.removeUser.bind(this));
    this.btnUpdate.addEventListener('click', this.updateUser.bind(this));
  }

  //=== Handler GETAllUsers
  getAllUsers() {
    event.preventDefault();
    
    fetch('https://test-users-api.herokuapp.com/users')
      .then(response => { if (response.ok) return response.json() })
      .then(data => {
          let tableHeadRow = document.createElement('tr');
          let tableHeadId = document.createElement('th');
          let tableHeadName = document.createElement('th');
          let tableHeadAge = document.createElement('th');
          tableHeadId.textContent = 'ID';
          tableHeadName.textContent = 'NAME';
          tableHeadAge.textContent = 'AGE';
          tableHeadRow.append(tableHeadId, tableHeadName, tableHeadAge);
          this.table.innerHTML = '';

          data.data.forEach(user => {
            let row = document.createElement('tr');
            row.innerHTML = `<td>${user.id}</td><td>${user.name}</td><td>${user.age}</td>`;
            this.table.append(row);
          })
          this.resultTable.append(this.table);
        }
      )
      .catch(reject => this.result.textContent = 'some error')
  }
  
//=== Handler GETUserByID
  getUserById(id) {
    event.preventDefault();
    id = this.inputIdGet.value;
    console.log(id);
    fetch(`https://test-users-api.herokuapp.com/users/${id}`)
      .then(response => { if (response.ok) return response.json() })
      .then(data => this.result.textContent = `id: ${data.data.id}, name: ${data.data.name}, age: ${data.data.age}`)
      .catch(error => this.result.textContent = 'some error')
  }
//=== Handler ADDUser
  addUser(event, name, age) {
    event.preventDefault();
    const userName = this.inputNameAdd.value;
    const userAge = this.inputAgeAdd.value;
    fetch('https://test-users-api.herokuapp.com/users/', {
      method: 'POST',
      body: JSON.stringify({ name: `${userName}`, age: Number(`${userAge}`) }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => this.result.textContent = `New user is added. id: ${data.data._id}, name: ${data.data.name}, age: ${data.data.age}`)
      .catch(error => this.result.textContent = 'some error');
  }
//=== Handler RemoveUser
  removeUser(id) {
    event.preventDefault();
    const userId = this.inputIdDel.value;
    fetch(`https://test-users-api.herokuapp.com/users/${userId}`, {
      method: 'DELETE',
    })
      .then(response => { if (response.ok) return response.json() })
      .then(data => this.result.textContent = `User with id: ${data.data.id}, name: ${data.data.name}, age: ${data.data.age} is deleted.`)
      .catch(error => this.result.textContent = 'some error');
  }
//=== Handler UpdateUser
  updateUser() {
    event.preventDefault();
    const userId = this.inputIdPut.value;
    const userName = this.inputNamePut.value;
    const userAge = this.inputAgePut.value;
    fetch(`https://test-users-api.herokuapp.com/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ name: `${userName}`, age: Number(`${userAge}`) }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => { if (response.ok) return response.json() })
      .then(data => this.result.textContent = `User with id: ${data.data.id} is updated: name: ${data.data.name}, age: ${data.data.age}.`)
      .catch(error => this.result.textContent = 'some error');
  }
}

const container = document.querySelector('.container');
const userInfo = new UserInfo(container);
userInfo.createLayout();