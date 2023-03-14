import '../../src/pages/index.css';
// import { enableValidation } from './validate';
import { handleAddCardFormSubmit, elementsContainer, Card } from './card';
import { closePopup, openPopup } from './utils';
import { fillProfileInputs } from './modal';
import { overlays, avatarForm, popupAddCard, popupEditForm, profileEditButton, addCardButton, validationConfig, avatarImage, profileName, profileHobby, buttonEditSubmit, nameEdit, hobbyEdit } from './constant';
import { avatarContainer, addAvatarButton, removeAvatarButton, openAvatarPopup, handleEditAvatar } from './avatar';
import { Api } from "../components/Api";
import { FormValidator } from "../components/FormValidator";
import { Popup } from "../components/Popup";
import { Section } from '../components/Section';

let myId;

// overlays.forEach((popup) => {
// popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
//         closePopup(popup);
//     }
// });
// });

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    buttonEditSubmit.textContent = 'Сохранение...';
    const postProfileInfo = new Api('/users/me', 'PATCH', JSON.stringify({
        name: nameEdit.value.trim(),
        about: hobbyEdit.value.trim()
    }));
    return postProfileInfo.response().then(() => {
        profileName.innerText = nameEdit.value.trim();
        profileHobby.innerText = hobbyEdit.value.trim();
        const closePopup = new Popup(popupEditForm);
        closePopup.closePopup();
        // closePopup(popupEditForm);
    })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            buttonEditSubmit.textContent = 'Сохранить';
        });
}

popupAddCard.addEventListener('submit', handleAddCardFormSubmit);
profileEditButton.addEventListener('click', function () {
    const openPopup = new Popup(popupEditForm);
    openPopup.openPopup();
    openPopup.setEventListeners();
    fillProfileInputs();
    // openPopup(popupEditForm);
});

popupEditForm.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', function () {
    const openPopup = new Popup(popupAddCard);
    openPopup.openPopup();
    openPopup.setEventListeners();
    // openPopup(popupAddCard);
});

const getProfileInfo = new Api('/users/me');
const getCards = new Api('/cards');

Promise.all([getProfileInfo.response(), getCards.response()])
    .then(([userData, cards]) => {
        const cardList = new Section({
            items: cards,
            renderer: (element) => {
                myId = userData._id;
                const createCard = new Card(element.name, element.link, element.likes, element.owner._id, element._id, myId);
                const card = createCard.generate();
                cardList.addItem(card);
            }
        }, '.elements');
        cardList.renderer();
        profileName.textContent = userData.name;
        profileHobby.textContent = userData.about;
        avatarImage.src = userData.avatar;

        // myId = userData._id;
        // cards.forEach(element => {
        //     const createCard = new Card(element.name, element.link, element.likes, element.owner._id, element._id, myId);
        //     const card = createCard.generate();
        //     elementsContainer.prepend(card);
        // });
    })
    .catch(err => {
        console.log(err);
    });

avatarContainer.addEventListener('mouseover', addAvatarButton);
avatarContainer.addEventListener('mouseout', removeAvatarButton);
avatarContainer.addEventListener('click', openAvatarPopup);
avatarForm.addEventListener('submit', handleEditAvatar);

const enableValidation = new FormValidator(
    {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button-submit',
        inactiveButtonClass: 'popup__button-submit_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
    },
    '.popup__body');

enableValidation.enableValidation();

// enableValidation(validationConfig);

export { myId };

console.log('попробуем так');