import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import Header from './Header.js';
import AuthForm from './AuthForm.js';

function Register(props) {
    const [formValue, setFormValue] = useState({
        password: '',
        email: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        props.handleSubmit(formValue.email, formValue.password);
    }

    return (
        <>
            <Header headerStaus="register" />

            <AuthForm name="form-login" handleSubmit={handleSubmit} title="Регистрация" email={formValue.email} handleChange={handleChange}
                password={formValue.password} button={props.isLoading ? "Регистрация..." : "Зарегистрироваться"} >
                <p className="login__signature">
                    Уже зарегистрированы?
                    <Link to="/sign-in" className="login__signature_link"> Войти</Link>
                </p>
            </AuthForm>
        </>
    );
}

export default Register;