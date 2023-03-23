import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor({ selector, submitForm }) {
        super(selector);
        this._submitForm = submitForm;
        this._inputList = this._element.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._element.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup__button-submit')) {
                this._submitForm(this._getInputValues());
            }
        });
    }

    closePopup() {
        super.closePopup();
        this._element.querySelector('.popup__body').reset();
    }

}