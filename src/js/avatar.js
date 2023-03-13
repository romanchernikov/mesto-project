import { openPopup, closePopup } from "./utils";
import { avatarButton, avatarContainer, avatarInput, avatarPopup, buttonAvatarSubmit, avatarImage } from "./constant.js";
import { setDisabledButton } from "./validate";
import { Api } from "../components/Api";
import { Popup } from "../components/Popup";

function addAvatarButton() {
    avatarButton.style.visibility = 'visible';
    avatarContainer.removeEventListener('mouseover', removeAvatarButton);
}

function removeAvatarButton() {
    avatarButton.style.visibility = 'hidden';
    avatarContainer.removeEventListener('mouseout', addAvatarButton);
}

function openAvatarPopup() {
    const openPopup = new Popup(avatarPopup);
    openPopup.openPopup();
    openPopup.setEventListeners();
    // openPopup(avatarPopup);
}

function handleEditAvatar(evt) {
    evt.preventDefault();
    buttonAvatarSubmit.textContent = 'Сохранение...';
    const postAvatar = new Api('/users/me/avatar', 'PATCH', JSON.stringify({
        avatar: avatarInput.value
    }));
      return postAvatar.response().then(res => {
            avatarImage.src = res.avatar;
            evt.target.reset();
            setDisabledButton(avatarPopup);
            const closePopup = new Popup(avatarPopup);
            closePopup.closePopup();
            // closePopup(avatarPopup);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            buttonAvatarSubmit.textContent = 'Сохранить';
        });
}

export { avatarContainer, addAvatarButton, removeAvatarButton, openAvatarPopup, handleEditAvatar }