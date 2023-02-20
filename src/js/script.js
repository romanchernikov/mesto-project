import '../../src/pages/index.css';
import { enableValidation } from './validate';
import { initalizationCards, handleAddCardFormSubmit } from './card';
import { popupAddCard, fillProfileInputs, handleProfileFormSubmit } from './utils';
import { openPopup, popupEditForm, profileEditButton, addCardButton } from './modal';
import { validationConfig } from './constant';

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

enableValidation(validationConfig);


