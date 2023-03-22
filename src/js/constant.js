const avatarImage = document.querySelector('.profile__avatar');

const avatarPopup = document.querySelector('[data-editAvatar]');
const avatarForm = document.forms.avatarEdit;
const avatarInput = avatarForm.elements.linkAvatar;
const avatarContainer = document.querySelector('.profile__avatar-container');
const avatarButton = document.querySelector('.profile__avatar-edit');
const buttonAvatarSubmit = avatarForm.querySelector('.popup__button-submit');


export { buttonAvatarSubmit, avatarButton, avatarContainer, avatarInput, avatarPopup,  avatarImage, avatarForm };