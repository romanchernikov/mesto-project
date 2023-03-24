import '../../src/pages/index.css';
import {
    buttonSubmitForm,
    buttonSubmitUserInfo,
    buttonAddCard,
    buttonEditProfile,
    buttonSubmitAvatar,
    inputName,
    inputHobby,
    avatarContainer, avatarInput
} from './constant';
import { Api} from "../components/Api";
import { FormValidator } from "../components/FormValidator";
import { Section } from '../components/Section';
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { PopupWithImage } from "../components/PopupWithImage";
import { Card } from "../components/Card";


//Создание экземпляров классов Апи, Секция, ПопапаКартинки.
export let myId;

export const getApiResponse =  new Api();

const sectionRender =  new Section({
    renderer: (element) => {
        const card = createCard(element);
        sectionRender.addCard(card);
    }
}, '.elements');

export const openPopupBigImg = new PopupWithImage('[data-zoomImage]');
openPopupBigImg.setEventListeners();


// Экземпляр пользователя.
const userInfo = new UserInfo({
    name: '.profile__name',
    info: '.profile__hobby',
    avatar: '.profile__avatar'
    }
);

//Получение и отрисовка карточек и профиля пользователя.
Promise.all([getApiResponse.response('/users/me'), getApiResponse.response('/cards')])
    .then(([userData, cards]) => {
        myId = userData._id;
        sectionRender.rendererCards(cards);
        userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
    })
    .catch(err => {
        console.log(err);
    });


//Попап добавление карточки.
const enableValidationAddCard = new FormValidator(
    {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button-submit',
        inactiveButtonClass: 'popup__button-submit_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
    },
    '[data-addCard]');
enableValidationAddCard.enableValidation();

const addCardForm = new PopupWithForm({
    selector: '[data-addCard]',
    submitForm: ({name, link}) => {
        buttonSubmitForm.textContent = 'Сохранение...';
        getApiResponse.response('/cards', 'POST', JSON.stringify({
            name: name,
            link: link
        }))
            .then(element => {
                enableValidationAddCard.setDisabledButton();
                sectionRender.rendererCard(element);
                addCardForm.closePopup();
            }).catch(err => {
            console.log(err);
            })
            .finally(() => {
                buttonSubmitForm.textContent = 'Сохранить';
            });
    }
});
addCardForm.setEventListeners();

buttonAddCard.addEventListener('click',  () => {
    addCardForm.openPopup();
});


//Попап редактирование профлиля
const enableValidationEditProfile = new FormValidator(
    {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button-submit',
        inactiveButtonClass: 'popup__button-submit_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
    },
    '[data-editForm]');
enableValidationEditProfile.enableValidation();

const editProfile = new PopupWithForm({
   selector: '[data-editForm]',
   submitForm: ({name, about}) => {
       buttonSubmitUserInfo.textContent = 'Сохранение...';
       getApiResponse.response(`/users/me`, 'PATCH', JSON.stringify({
           name: name,
           about: about
       }))
           .then(dataUser=> {
               enableValidationEditProfile.setDisabledButton();
               userInfo.setUserInfo(dataUser.name, dataUser.about);
               editProfile.closePopup();
           })
           .catch(err => {
           console.log(err);
           })
           .finally(() => {
               buttonSubmitUserInfo.textContent = 'Сохранить';
           });
   }
});
editProfile.setEventListeners();

buttonEditProfile.addEventListener('click', function () {
    editProfile.openPopup();

    const {name, about} = userInfo.getUserInfo();
    inputName.value = name;
    inputHobby.value = about;
});


//Ппопа редактирования автара.
const enableValidationAvatarEdit = new FormValidator(
    {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button-submit',
        inactiveButtonClass: 'popup__button-submit_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
    },
    '[data-editAvatar]');
enableValidationAvatarEdit.enableValidation();

const avatarEditForm = new PopupWithForm({
    selector: '[data-editAvatar]',
    submitForm: () => {
        buttonSubmitAvatar.textContent = 'Сохранение...';
        getApiResponse.response('/users/me/avatar', 'PATCH', JSON.stringify({
            avatar: avatarInput.value
        }))
            .then(element => {
                enableValidationAvatarEdit.setDisabledButton();
                userInfo.setUserInfo(element.name, element.about, element.avatar);
                avatarEditForm.closePopup();
            })
            .catch(err => {
            console.log(err);
            })
            .finally(() => {
                buttonSubmitAvatar.textContent = 'Сохранить';
            });
    }
});
avatarEditForm.setEventListeners();

avatarContainer.addEventListener('click', () => {
    avatarEditForm.openPopup();
});

//Создание экземпляра карточки
function createCard(element) {
    const createCard = new Card({
        nameValue: element.name,
        srcValue: element.link,
        likes: element.likes,
        ownerId: element.owner._id,
        cardId: element._id,
        myId: myId,
        template: '#element__template',
        handleCardClick: () => {
            openPopupBigImg.openPopup(element.name, element.link);
        },
        addLike: (cardId) => {
            getApiResponse.response(`/cards/likes/${cardId}`, 'PUT')
                .then(res => {
                    createCard.toggleLikeCounter(res.likes.length);
                    createCard.renderAddLike();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deleteLike: (cardId) => {
            return getApiResponse.response(`/cards/likes/${cardId}`, 'DELETE')
                .then(res => {
                    createCard.toggleLikeCounter(res.likes.length);
                    createCard.renderDeleteLike();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deleteCard: (cardId) => {
            getApiResponse.response(`/cards/${cardId}`, 'DELETE')
                .then((res) => {
                    createCard.deleteCard();
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });
    return createCard.generate();
}