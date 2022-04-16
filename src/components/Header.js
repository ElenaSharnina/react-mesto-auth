import React from "react";
import { Route } from "react-router-dom";
import { Switch, Link } from "react-router-dom";
import logo from '../logo.svg';

function Header() {
  return (
    <Switch>
      <Route exact path="/">
        <div className="header">
          <img src={logo} className="header__logo" alt="Логотип Mesto" />
          <div className="header__info">
            <p className="header__email">Email</p>
            <button className="header__button" type="button">Выйти</button>
          </div>
        </div>
      </Route>
      <Route path="/sign-up">
        <div className="header">
          <img src={logo} className="header__logo" alt="Логотип Mesto" />
          <div className="header__info">
            <Link to="/sign-in" >
              <button className="header__button" type="button">Войти</button>
            </Link>
          </div>
        </div>
      </Route>
      <Route path="/sign-in" >
        <div className="header">
          <img src={logo} className="header__logo" alt="Логотип Mesto" />
          <div className="header__info">
            <Link to="/sign-up"> <button className="header__button" type="button">Регистрация</button>
            </Link>
          </div>
        </div>
      </Route>
    </Switch>
  )
}
export default Header;

