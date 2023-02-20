import { closePopupEscape } from "./utils";

const popupEditForm = document.querySelector('[data-editForm]');
const popupAddCard = document.querySelector('[data-addCard]');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.add-button');

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.classList.remove('popup__input_type_error');
        popup.querySelectorAll('.popup__input-error').forEach((spanElement) => {
            spanElement.classList.remove('popup__input-error_active');
        });
    });

}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
    popup.querySelector('.popup__body').reset();
}

export { openPopup, closePopup, popupEditForm, popupAddCard, profileEditButton, addCardButton };