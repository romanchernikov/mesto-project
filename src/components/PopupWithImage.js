import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }
    openPopup(evt) {
        super.openPopup();

        this._zoomImage = document.querySelector('.popup__big-image');
        this._zoomImageText = document.querySelector('.popup__image-text');

        const srcImage = evt.target.getAttribute('src');
        const altImage = evt.target.getAttribute('alt');
        this._zoomImage.setAttribute('src', srcImage);
        this._zoomImage.setAttribute('alt', altImage);
        this._zoomImageText.innerText = altImage;
    }
}