import React from 'react';
import successPic from '../images/Union.png';
import errorPic from '../images/Union2.png';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import * as auth from '../auth.js';

import InfoTooltip from './InfoTooltip.js';

function Register() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(true);

  function handleChangeEmail(e) {
    setEmail(e.target.value);

  }
  function handleChangePass(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    auth.register(email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true);
          setIsInfoTooltipOpen(true);

        } else {
          setIsSuccess(false);
          setIsInfoTooltipOpen(true);

        }
      });
  }
  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
    if (isSuccess) {
      history.push('/sign-in');
    }
  }
  return (

    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit} >
        <label htmlFor="email" className="register__label">

          <input id="email" name="email" type="email" value={email} placeholder="Email" className="register__field" onChange={handleChangeEmail} minLength="6" maxLength="20" /></label>
        <label htmlFor="password" className="register__label">


          <input id="password" name="password" type="password" value={password} placeholder="Пароль" className="register__field" onChange={handleChangePass} minLength="6" maxLength="20" /> </label>
        <button type="submit" className="register__button">Зарегистрироваться</button>
      </form>


      <Link to="/sign-in"><button type="button" className="register__open-button">Уже зарегистрированы? Войти</button></Link>
      {isSuccess ?
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeInfoTooltip} text="Вы успешно зарегистрировались!" link={successPic} /> :
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeInfoTooltip} text="Что-то пошло не так!
      Попробуйте ещё раз." link={errorPic} />}
    </div>

  )
}
export default Register;