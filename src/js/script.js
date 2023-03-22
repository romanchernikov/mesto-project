import '../../src/pages/index.css';
import {Card } from '../components/Card';
import { setDisabledButton } from './utils';
import {
    avatarForm,
    avatarImage,
} from './constant';
import { avatarContainer, addAvatarButton, removeAvatarButton, openAvatarPopup, handleEditAvatar } from './avatar';
import { Api } from "../components/Api";
import { FormValidator } from "../components/FormValidator";
import { Popup } from "../components/Popup";
import { Section } from '../components/Section';
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { PopupWithImage } from "../components/PopupWithImage";

let myId;

const getProfileInfo = new Api('/users/me');
const getCards = new Api('/cards');

Promise.all([getProfileInfo.response(), getCards.response()])
    .then(([userData, cards]) => {
        const cardList = new Section({
            items: cards,
            renderer: (element) => {
                myId = userData._id;
                const createCard = new Card({
                    nameValue: element.name,
                    srcValue: element.link,
                    likes: element.likes,
                    ownerId: element.owner._id,
                    cardId: element._id,
                    myId: myId,
                    template: '#element__template',
                    handleCardClick: (evt) => {
                        const popupImage = new PopupWithImage('[data-zoomImage]');
                        popupImage.openPopup(evt);
                        popupImage.setEventListeners();
                    },
                    addLike: (cardId) => {
                        const addLike = new Api(`/cards/likes/${cardId}`, 'PUT');
                        return addLike.response();
                    },
                    deleteLike: (cardId) => {
                        const delLike = new Api(`/cards/likes/${cardId}`, 'DELETE');
                        return delLike.response();
                    },
                    deleteCard: (cardId) => {
                        const delCard = new Api(`/cards/${cardId}`, 'DELETE');
                        return delCard.response();
                    }
                });
                const card = createCard.generate();
                cardList.addItem(card);
            }
        }, '.elements');
        cardList.renderer();

        const userInfo = new UserInfo({
            name: '.profile__name',
            info: '.profile__hobby',
            getInfo: () => {
                return {
                    name: userData.name,
                    about: userData.about
                };
            }
        });
        document.querySelector('#name-input').value = userInfo.getUserInfo().name;
        document.querySelector('#hobby-input').value = userInfo.getUserInfo().about;
        userInfo.setUserInfo();

        avatarImage.src = userData.avatar;
    })
    .catch(err => {
        console.log(err);
    });


const addCardForm = new PopupWithForm({
    selector: '[data-addCard]',
    submitForm: ({name, link}) => {
        document.querySelector('[name=add]').querySelector('.popup__button-submit').textContent = 'Сохранение...';
        const postCard = new Api('/cards', 'POST', JSON.stringify({
            name: name,
            link: link
        }));
        postCard.response().then(element => {
            setDisabledButton(document.querySelector('[data-addCard]'));
            addCardForm.closePopup();
            const cardList = new Section({
                items: Array(element),
                renderer: (element) => {
                    const createCard = new Card({
                        nameValue: element.name,
                        srcValue: element.link,
                        likes: element.likes,
                        ownerId: element.owner._id,
                        cardId: element._id,
                        myId: myId,
                        template: '#element__template',
                        handleCardClick: (evt) => {
                            const popupImage = new PopupWithImage('[data-zoomImage]');
                            popupImage.openPopup(evt);
                            popupImage.setEventListeners();
                        },
                        addLike: (cardId) => {
                            const addLike = new Api(`/cards/likes/${cardId}`, 'PUT');
                            return addLike.response();
                        },
                        deleteLike: (cardId) => {
                            const delLike = new Api(`/cards/likes/${cardId}`, 'DELETE');
                            return delLike.response();
                        },
                        deleteCard: (cardId) => {
                            const delCard = new Api(`/cards/${cardId}`, 'DELETE');
                            return delCard.response();
                        }
                    });
                    const card = createCard.generate();
                    cardList.addItem(card);
                }
            }, '.elements');
            cardList.renderer();
        }).catch(err => {
            console.log(err);
        })
            .finally(() => {
                document.querySelector('[name=add]').querySelector('.popup__button-submit').textContent = 'Сохранить';
            });
    }
});

document.querySelector('.add-button').addEventListener('click',  () => {
    const openPopup = new Popup('[data-addCard]');
    openPopup.openPopup();
    openPopup.setEventListeners();
});

document.querySelector('[data-addCard]').addEventListener('submit', (evt) => {
    evt.preventDefault();
    addCardForm.setEventListeners();
});



const editProfileSubmit = new PopupWithForm({
   selector: '[data-editForm]',
   submitForm: ({name, about}) => {
       document.querySelector('[name=edit]').querySelector('.popup__button-submit').textContent = 'Сохранение...';
       const postEditForm = new Api(`/users/me`, 'PATCH', JSON.stringify({
           name: name,
           about: about
       }));
       postEditForm.response()
           .then(userInfo => {
               setDisabledButton(document.querySelector('[data-editForm]'));
               editProfileSubmit.closePopup();

               const userInfoData = new UserInfo({
                   name: '.profile__name',
                   info: '.profile__hobby',
                   getInfo: () => {
                       return {
                           name: userInfo.name,
                           about: userInfo.about
                       };
                   }
               });
               userInfoData.setUserInfo();
           }).catch(err => {
           console.log(err);
       })
           .finally(() => {
               document.querySelector('[name=edit]').querySelector('.popup__button-submit').textContent = 'Сохранить';
           });
   }
});


document.querySelector('.profile__edit-button').addEventListener('click', function () {
    const openPopup = new Popup('[data-editForm]');
    openPopup.openPopup();
    openPopup.setEventListeners();

});


document.querySelector('[data-editForm]').addEventListener('submit', (evt) => {
    evt.preventDefault();
    editProfileSubmit.setEventListeners();
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

export { myId };