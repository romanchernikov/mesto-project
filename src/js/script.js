import '../../src/pages/index.css';
import { createCard, setDisabledButton, addAvatarButton, removeAvatarButton } from './utils';
import {
    avatarForm,
    buttonSubmitForm,
    buttonSubmitUserInfo,
    buttonAddCard,
    submitButtonAddCard,
    buttonEditProfile,
    buttonSubmitAvatar,
    submitButtonEditProfile,
    inputName,
    inputHobby,
    avatarContainer, avatarInput
} from './constant';
import { Api } from "../components/Api";
import { FormValidator } from "../components/FormValidator";
import { Section } from '../components/Section';
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { PopupWithImage } from "../components/PopupWithImage";


//Создание экземпляров классов Апи, Секция, ПопапаКартинки.
export let myId;

export const getApiResponse = (url, method, endpoint) => new Api(url, method, endpoint);

const sectionRender = (cards) => new Section({
    items: cards,
    renderer: (element) => {
        const card = createCard(element);
        sectionRender(cards).addItem(card);
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
Promise.all([getApiResponse('/users/me').response(), getApiResponse('/cards').response()])
    .then(([userData, cards]) => {
        myId = userData._id;
        sectionRender(cards).renderer();
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

const addCardForm = new PopupWithForm({
    selector: '[data-addCard]',
    submitForm: ({name, link}) => {
        buttonSubmitForm.textContent = 'Сохранение...';
        getApiResponse('/cards', 'POST', JSON.stringify({
            name: name,
            link: link
        })).response()
            .then(element => {
            setDisabledButton(document.querySelector('[data-addCard]'));
            sectionRender(Array(element)).renderer();
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
    enableValidationAddCard.enableValidation();
});

submitButtonAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
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

const editProfile = new PopupWithForm({
   selector: '[data-editForm]',
   submitForm: ({name, about}) => {
       buttonSubmitUserInfo.textContent = 'Сохранение...';
       getApiResponse(`/users/me`, 'PATCH', JSON.stringify({
           name: name,
           about: about
       })).response()
           .then(dataUser=> {
               setDisabledButton(document.querySelector('[data-editForm]'));
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
    enableValidationEditProfile.enableValidation();

    const {name, about} = userInfo.getUserInfo();
    inputName.value = name;
    inputHobby.value = about;
});

submitButtonEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
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

const avatarEditForm = new PopupWithForm({
    selector: '[data-editAvatar]',
    submitForm: () => {
        buttonSubmitAvatar.textContent = 'Сохранение...';
        getApiResponse('/users/me/avatar', 'PATCH', JSON.stringify({
            avatar: avatarInput.value
        })).response()
            .then(element => {
                setDisabledButton(document.querySelector('[data-editAvatar]'));
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
    enableValidationAvatarEdit.enableValidation();
});

avatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
});

avatarContainer.addEventListener('mouseover', addAvatarButton);
avatarContainer.addEventListener('mouseout', removeAvatarButton);