import React from 'react';
import { useHistory } from 'react-router-dom'
import * as auth from '../auth.js';
import errorPic from '../images/Union2.png';

import InfoTooltip from './InfoTooltip.js';

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  function handleChangeEmail(e) {
    setEmail(e.target.value);

  }
  function handleChangePass(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail('');
          setPassword('');
          props.handleLogin();
          history.push('/');
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
    history.push('/sign-in');
  }
  return (
    <>
      <div className="register">
        <h2 className="register__title">Вход</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="register__label">
            <input id="email" name="email" type="email" value={email || ''} placeholder="Email" className="register__field" onChange={handleChangeEmail} />

          </label>
          <label htmlFor="password" className="register__label">
            <input id="password" name="password" type="password" value={password || ''} placeholder="Пароль" className="register__field" onChange={handleChangePass} />

          </label>
          <button type="submit" className="register__button">Войти</button>
        </form>
      </div>
      <InfoTooltip isOpen={isInfoTooltipOpen} text="Что-то пошло не так!
      Попробуйте ещё раз." link={errorPic} onClose={closeInfoTooltip} />
    </>
  )

}

export default Login;
