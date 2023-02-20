import { closePopup, popupEditForm, popupAddCard } from "./modal";

const overlay = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const formEdit = document.forms.edit;
const nameEdit = formEdit.elements.nameEdit;
const hobbyEdit = formEdit.elements.hobbyEdit;

function closePopupEscape(evt) {
    if (evt.key === "Escape") {
        const popupOpen = document.querySelector('.popup_opened');
        closePopup(popupOpen);
    }
}

function fillProfileInputs() {
    nameEdit.value = profileName.innerText;
    hobbyEdit.value = profileHobby.innerText;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.innerText = nameEdit.value.trim();
    profileHobby.innerText = hobbyEdit.value.trim();
    closePopup(popupEditForm);
}

overlay.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
            closePopup(popup);
            removeInputsErrors(popup);
        }
    });
});

function removeInputsErrors(popup) {
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));
    fillProfileInputs();
    inputList.forEach((inputElement) => {
        inputElement.classList.remove('popup__input_type_error');
        popup.querySelectorAll('.popup__input-error').forEach((spanElement) => {
            spanElement.classList.remove('popup__input-error_active');
        });
    });
};

export { closePopupEscape, popupAddCard, fillProfileInputs, handleProfileFormSubmit };