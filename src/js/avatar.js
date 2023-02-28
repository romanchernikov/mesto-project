import { openPopup, closePopup } from "./modal";
import { postAvatar } from "./api";

const avatarPopup = document.querySelector('[data-editAvatar]');
const avatarForm = document.forms.avatarEdit;
const avatarInput = avatarForm.elements.linkAvatar;
const avatarContainer = document.querySelector('.profile__avatar-container');
const avatarButton = document.querySelector('.profile__avatar-edit');
const avatarImage = document.querySelector('.profile__avatar');
const buttonAvatarSubmit = avatarForm.querySelector('.popup__button-submit');

console.log(avatarInput);
function addAvatarButton() {
    avatarButton.style.visibility = 'visible';
    avatarContainer.removeEventListener('mouseover', removeAvatarButton);
}

function removeAvatarButton() {
    avatarButton.style.visibility = 'hidden';
    avatarContainer.removeEventListener('mouseout', addAvatarButton);
}

function openAvatarPopup() {
    openPopup(avatarPopup);
}

function handleEditAvatar(evt) {
    evt.preventDefault();
    buttonAvatarSubmit.textContent = 'Сохранение...';
    postAvatar(avatarInput.value)
        .then(res => {
            avatarImage.src = res.avatar;
            evt.target.reset();
            closePopup(avatarPopup);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            buttonAvatarSubmit.textContent = 'Сохранить';
        })

}

export { avatarContainer, addAvatarButton, removeAvatarButton, openAvatarPopup, handleEditAvatar, avatarForm }