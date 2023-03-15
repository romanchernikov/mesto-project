function closePopupEscape(evt) {
    if (evt.key === "Escape") {
        const popupOpen = document.querySelector('.popup_opened');
        closePopup(popupOpen);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
}

function setDisabledButton(popup) {
    const buttonSubmit = popup.querySelector('.popup__button-submit');
    buttonSubmit.classList.add('popup__button-submit_disabled');
    buttonSubmit.disabled = true;
}

export { closePopup, closePopupEscape, openPopup, setDisabledButton };