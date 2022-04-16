import React from 'react';
import { Link } from "react-router-dom";
import * as auth from '../auth.js';

function Register() {
  return (

    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form">
        <label htmlFor="email" className="register__label">

          <input id="email" name="email" type="email" value="" placeholder="Email" className="register__field" /></label>
        <label htmlFor="password" className="register__label">


          <input id="password" name="password" type="password" value="" placeholder="Пароль" className="register__field" /> </label>
      </form>

      <button type="submit" className="register__button">Зарегистрироваться</button>
      <Link to="/sign-in"><button type="button" className="register__open-button">Уже зарегистрированы? Войти</button></Link>
    </div>
  )
}
export default Register;