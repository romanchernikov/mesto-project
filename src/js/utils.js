function checkResponse(res) {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}

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

export { closePopup, closePopupEscape, openPopup, checkResponse };