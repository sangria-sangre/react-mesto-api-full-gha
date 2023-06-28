import logo from '../images/logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {

    function onSignOut() {
        localStorage.removeItem('jwt');
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Лого-Место" />
            <nav className="nav">
                <ul>
                    <li className={props.headerStaus === "profile" ? "nav__item_active" : "nav__item"} >
                        <p className="nav__email" >{props.email}</p>
                        <Link className="nav__link" onClick={onSignOut} to="/sign-in" >
                            Выйти
                        </Link>
                    </li>
                    <li className={props.headerStaus === "login" ? "nav__item_active" : "nav__item"} >
                        <Link className="nav__link" to="/sign-up">
                            Регистрация
                        </Link>
                    </li>
                    <li className={props.headerStaus === "register" ? "nav__item_active" : "nav__item"} >
                        <Link className="nav__link" to="/sign-in">
                            Войти
                        </Link>
                    </li>
                </ul>
            </nav >
        </header >
    );
}

export default Header;