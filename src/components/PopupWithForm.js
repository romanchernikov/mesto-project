import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor({ selector, submitForm }) {
        super(selector);
        this._submitForm = submitForm;
    }

    _getElement() {
        return this._selector.querySelector('.popup__body');
    }

    _getInputValues() {
        this._inputList = this._selector.querySelectorAll('.popup__input');

        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._element = this._getElement();
        this._submitForm(this._getInputValues());
    }

    closePopup() {
        super.closePopup();
        this._element.reset();
    }

}