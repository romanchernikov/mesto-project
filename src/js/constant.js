const avatarForm = document.forms.avatarEdit;
const avatarInput = avatarForm.elements.avatar;
const avatarContainer = document.querySelector('.profile__avatar-container');

const addCardForm = document.forms.add;
const buttonSubmitForm = addCardForm.querySelector('.popup__button-submit');

const editUserForm = document.forms.edit;
const buttonSubmitUserInfo = editUserForm.querySelector('.popup__button-submit');

const editAvatarForm = document.forms.avatarEdit;
const buttonSubmitAvatar = editAvatarForm.querySelector('.popup__button-submit');

const buttonAddCard = document.querySelector('.add-button');

const buttonEditProfile = document.querySelector('.profile__edit-button');

const inputName = document.querySelector('#name-input');
const inputHobby = document.querySelector('#hobby-input');


export { avatarContainer, avatarInput, avatarForm, buttonSubmitForm, buttonSubmitUserInfo, buttonAddCard, buttonEditProfile, inputName, inputHobby, buttonSubmitAvatar };