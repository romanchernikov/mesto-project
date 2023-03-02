import { openPopup, closePopup } from "./utils";
import { postAvatar } from "./api";
import { avatarButton, avatarContainer, avatarInput, avatarPopup, buttonAvatarSubmit, avatarImage } from "./constant.js";
import { setDisabledButton } from "./validate";

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
            setDisabledButton(avatarPopup);
            closePopup(avatarPopup);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            buttonAvatarSubmit.textContent = 'Сохранить';
        })

}

export { avatarContainer, addAvatarButton, removeAvatarButton, openAvatarPopup, handleEditAvatar }