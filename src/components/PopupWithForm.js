import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor({selector, submitForm}) {
        super(selector);
        this._submitForm = submitForm;
    }

    _getInputValues() {
        this._inputList = this._selector.querySelectorAll('.popup__input');

        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    _getElement() {
        const formElement = this._selector.querySelector('.popup__body');

        return formElement;
    }

    rem() {
        this._element.removeEventListener('submit', this._send.bind(this));
    }

    _send(evt) {
        evt.preventDefault();
        this._submitForm(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._element = this._getElement();
        this._element.addEventListener('submit', this._send.bind(this));
    }

    // setEventListeners() {
    //     super.setEventListeners();
    //     this._selector.addEventListener('submit', (evt) => {
    //         this._send(evt)
    //     });
    // }

    closePopup() {
        super.closePopup();
        // this._selector.reset()
    }

}