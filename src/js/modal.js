import { closePopupEscape } from "./utils";

const popupEditForm = document.querySelector('[data-editForm]');
const popupAddCard = document.querySelector('[data-addCard]');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.add-button');

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
}

export { openPopup, closePopup, popupEditForm, popupAddCard, profileEditButton, addCardButton };