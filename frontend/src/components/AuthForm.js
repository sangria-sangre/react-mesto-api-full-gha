function AuthForm(props) {
    return (
        <form className="login__form" action="get" name={props.name} noValidate onSubmit={props.handleSubmit} >
                <h1 className="login__title">{props.title}</h1>
                <input className="login__input login__input_email" id="email-input" type="email" name="email" noValidate
                    placeholder="Email" required value={props.email} onChange={props.handleChange} />
                <span className="login__input-error email-input-error"></span>

                <input className="login__input login__input_password" id="password-input" type="text" name="password" noValidate
                    placeholder="Пароль" required value={props.password} onChange={props.handleChange} minLength="5" maxLength="40" />
                <span className="login__input-error password-input-error"></span>
                <button className="login__btn" type="submit">{props.button}</button>
                {props.children}
            </form>
    );
}

export default AuthForm;