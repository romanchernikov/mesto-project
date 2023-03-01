import '../../src/pages/index.css';
import { enableValidation, removeInputsErrors } from './validate';
import { handleAddCardFormSubmit, elementsContainer, createCard } from './card';
import { closePopup, openPopup } from './utils';
import { avatarForm, popupAddCard, popupEditForm, profileEditButton, addCardButton, validationConfig, avatarImage, profileName, profileHobby, buttonEditSubmit, nameEdit, hobbyEdit } from './constant';
import { avatarContainer, addAvatarButton, removeAvatarButton, openAvatarPopup, handleEditAvatar } from './avatar';
import { getProfileInfo, getCards, postProfileInfo } from './api';

let myId;

function fillProfileInputs() {
    nameEdit.value = profileName.innerText;
    hobbyEdit.value = profileHobby.innerText;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    buttonEditSubmit.textContent = 'Сохранение...';
    postProfileInfo(nameEdit.value.trim(), hobbyEdit.value.trim())
        .then(() => {
            profileName.innerText = nameEdit.value.trim();
            profileHobby.innerText = hobbyEdit.value.trim();
            removeInputsErrors(popupEditForm);
            closePopup(popupEditForm);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            buttonEditSubmit.textContent = 'Сохранить';
        })
}

popupAddCard.addEventListener('submit', handleAddCardFormSubmit);
profileEditButton.addEventListener('click', function () {
    fillProfileInputs();
    openPopup(popupEditForm);
});

popupEditForm.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});

Promise.all([getProfileInfo(), getCards()])
    .then(([userData, cards]) => {
        profileName.textContent = userData.name;
        profileHobby.textContent = userData.about;
        avatarImage.src = userData.avatar;
        myId = userData._id;
        cards.forEach(element => {
            elementsContainer.append(createCard(element.name, element.link, element.likes, element.owner._id, element._id));
        })
    })
    .catch(err => {
        console.log(err);
    })

avatarContainer.addEventListener('mouseover', addAvatarButton);
avatarContainer.addEventListener('mouseout', removeAvatarButton);
avatarContainer.addEventListener('click', openAvatarPopup);
avatarForm.addEventListener('submit', handleEditAvatar);


enableValidation(validationConfig);

export { myId };