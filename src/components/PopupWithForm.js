import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor({selector, callback}) {
        super(selector);
        this._callback = callback;
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

    setEventListeners() {
        super.setEventListeners();
        this._callback()
        this._element = this._getElement();

        // this._element.addEventListener('submit', this._send.bind(this));
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