import React from 'react';
;

function Login() {

  return (
    <>
      <>
        <div className="register">
          <h2 className="register__title">Вход</h2>
          <form className="register__form">
            <label htmlFor="email" className="register__label">

              <input id="email" name="email" type="email" value="" placeholder="Email" className="register__field" /></label>
            <label htmlFor="password" className="register__label">


              <input id="password" name="password" type="password" value="" placeholder="Пароль" className="register__field" /> </label>
          </form>

          <button type="submit" className="register__button">Войти</button>
        </div>    </>
    </>
  )

}

export default Login;
