import React, { useState } from 'react';
import Header from './Header.js'
import AuthForm from './AuthForm.js';


function Login(props) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    function onLogin(token) {
        localStorage.setItem('jwt', token);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(formValue.email, formValue.password, onLogin);
        setFormValue({ email: '', password: '' });
    }

    return (
        <>
            <Header headerStaus="login" />

            <AuthForm name="form-login" handleSubmit={handleSubmit} title="Вход" email={formValue.email} handleChange={handleChange}
                password={formValue.password} button={props.isLoading ? "Выполняется вход..." : "Вход"} />
        </>
    );

}

export default Login;