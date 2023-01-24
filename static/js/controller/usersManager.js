export {initModals}
import {dataHandler} from "../data/dataHandler.js";

async function initModals(){
    const login = document.querySelector('#login-btn')
    login.addEventListener('click', loginMain)
    const register = document.querySelector('#register-btn')
    register.addEventListener('click', registerMain)
}

const modal = document.getElementById("myModal");
let table = document.getElementById("modal-table");
const btn = document.getElementsByClassName("myBtn");
const span = document.getElementsByClassName("close");
const title = document.getElementById('modal-title');

async function loginMain(){
    title.innerHTML = `<h1>login page</h1>
        <label for="username">Username: </label>
        <input type="text" name="username" id="username" required><br><br>
        <label for="password">Password: </label>
        <input type="password" name="password" id="password" required><br><br>
        <button id="modal-login-btn">Login</button>`
    modal.style.display = "block";
    const modal_login = document.querySelector('#modal-login-btn')
    modal_login.addEventListener('click', () =>
        dataHandler.loginAttempt(
        document.querySelector('#username').value,
        document.querySelector('#password').value)
    )
}
async function registerMain(){
    title.innerHTML = `<h1>Registration page</h1>
                <label>User name:
                <input id="user-register" name="user-name" type="text" maxlength="20" required>
                </label>
                <br><br>
                <label>Password:
                    <input id="password-register" name="password" type="password" minlength="6" required>
                </label>
                <br><br>
                <label>Confirm password:
                    <input id="password-register-confirm" name="confirm-password" type="password" required>
                </label>
                <br><br>
                <button id="modal-register-btn">Register</button>`
    modal.style.display = "block";
    const modal_register = document.querySelector('#modal-register-btn')
    modal_register.addEventListener('click', async () =>  {
        const username = document.querySelector('#user-register').value
        const password = document.querySelector('#password-register').value
        const password_confirm = document.querySelector('#password-register-confirm').value
         // && !dataHandler.is_user_exist('username')
        if (password === password_confirm){
        await dataHandler.register(username, password)
        }})
}

    for (let i = 0; i < span.length; i++){
    span[i].onclick = function() {
    modal.style.display = "none";
}
}
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
