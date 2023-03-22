function setDisabledButton(popup) {
    const buttonSubmit = popup.querySelector('.popup__button-submit');
    buttonSubmit.classList.add('popup__button-submit_disabled');
    buttonSubmit.disabled = true;
}

export { setDisabledButton };