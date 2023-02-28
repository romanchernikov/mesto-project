import { closePopup, popupEditForm, popupAddCard } from "./modal";
import { removeInputsErrors } from "./validate";
import { getProfileInfo, postProfileInfo } from './api';

const overlay = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const formEdit = document.forms.edit;
const nameEdit = formEdit.elements.nameEdit;
const hobbyEdit = formEdit.elements.hobbyEdit;
const buttonEditSubmit = formEdit.querySelector('.popup__button-submit');
// const 
const avatarImage = document.querySelector('.profile__avatar');

let myId;

function checkResponse(res) {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}

getProfileInfo()
    .then(data => {
        profileName.textContent = data.name;
        profileHobby.textContent = data.about;
        avatarImage.src = data.avatar;
        myId = data._id;
    })
    .catch(err => {
        console.log(err);
    })

function closePopupEscape(evt) {
    if (evt.key === "Escape") {
        const popupOpen = document.querySelector('.popup_opened');
        closePopup(popupOpen);
    }
}

function fillProfileInputs() {
    nameEdit.value = profileName.innerText;
    hobbyEdit.value = profileHobby.innerText;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.innerText = nameEdit.value.trim();
    profileHobby.innerText = hobbyEdit.value.trim();
    buttonEditSubmit.textContent = 'Сохранение...';
    postProfileInfo(nameEdit.value.trim(), hobbyEdit.value.trim())
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            buttonEditSubmit.textContent = 'Сохранить';
        })
    removeInputsErrors(popupEditForm);
    closePopup(popupEditForm);
}

overlay.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
            closePopup(popup);
        }
    });
});

export { closePopupEscape, popupAddCard, fillProfileInputs, handleProfileFormSubmit, checkResponse, myId };