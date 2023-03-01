import { overlays } from "./constant";
import { closePopup } from "./utils";

overlays.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
            closePopup(popup);
        }
    });
});