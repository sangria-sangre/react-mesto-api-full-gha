export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    //Показать сообщение об ошибке

    _showInputError(inputElement) {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);

        errorElement.classList.add(this._config.errorClass);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._config.inputErrorClass);
    }

    //Cкрыть сообщение об ошибке

    _hideInputError(inputElement) {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);

        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
        inputElement.classList.remove(this._config.inputErrorClass);
    }

    //Сбросить сообщение об ошибке

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        })
    }

    //Проверка инпута
    //Если есть инпут с ошибкой, показать ошибку, и наоборот

    _checkInputValidity(inputElement) {

        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    }

    //Проверка всех инпутов на ошибку

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    //Активация или дизактивация кнопки по результатам проверки инпутов

    _toggleButtonState() {

        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    //Повесить обработчик на все инпуты

    _setEventListeners() {

        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });

    }

    //Повесить обработчик на элемент

    enableValidation() {
        this._setEventListeners();
    }

}