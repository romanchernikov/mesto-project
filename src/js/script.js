import '../../src/pages/index.css';
import { enableValidation } from './validate';
import { handleAddCardFormSubmit } from './card';
import { popupAddCard, fillProfileInputs, handleProfileFormSubmit } from './utils';
import { openPopup, popupEditForm, profileEditButton, addCardButton } from './modal';
import { validationConfig } from './constant';
import { avatarContainer, addAvatarButton, removeAvatarButton, openAvatarPopup, handleEditAvatar, avatarForm } from './avatar';

popupAddCard.addEventListener('submit', handleAddCardFormSubmit);
profileEditButton.addEventListener('click', function () {
    fillProfileInputs();
    openPopup(popupEditForm);
});

popupEditForm.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});


avatarContainer.addEventListener('mouseover', addAvatarButton);
avatarContainer.addEventListener('mouseout', removeAvatarButton);
avatarContainer.addEventListener('click', openAvatarPopup);
avatarForm.addEventListener('submit', handleEditAvatar);


enableValidation(validationConfig);
