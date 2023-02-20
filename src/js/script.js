import '../../src/pages/index.css';
import { enableValidation } from './validate';
import { initalizationCards, handleAddCardFormSubmit } from './card';
import { popupAddCard, fillProfileInputs, handleProfileFormSubmit } from './utils';
import { openPopup, popupEditForm, profileEditButton, addCardButton } from './modal';


initalizationCards();
popupAddCard.addEventListener('submit', handleAddCardFormSubmit);
profileEditButton.addEventListener('click', function () {
    fillProfileInputs();
    openPopup(popupEditForm);
});
popupEditForm.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});
enableValidation({
    formSelector: '.popup__body',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});



