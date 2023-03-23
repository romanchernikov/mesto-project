import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._zoomImage = document.querySelector('.popup__big-image');
        this._zoomImageText = document.querySelector('.popup__image-text');
    }
    openPopup(name, link) {
        super.openPopup();

        this._zoomImage.setAttribute('src', link);
        this._zoomImage.setAttribute('alt', name);
        this._zoomImageText.innerText = name;
    }
}