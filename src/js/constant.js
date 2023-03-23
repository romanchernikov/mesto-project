const avatarImage = document.querySelector('.profile__avatar');

const avatarPopup = document.querySelector('[data-editAvatar]');
const avatarForm = document.forms.avatarEdit;
const avatarInput = avatarForm.elements.avatar;
const avatarContainer = document.querySelector('.profile__avatar-container');
const avatarButton = document.querySelector('.profile__avatar-edit');
const buttonAvatarSubmit = avatarForm.querySelector('.popup__button-submit');


const addCardForm = document.forms.add;
const buttonSubmitForm = addCardForm.querySelector('.popup__button-submit');

const editUserForm = document.forms.edit;
const buttonSubmitUserInfo = editUserForm.querySelector('.popup__button-submit');

const editAvatarForm = document.forms.avatarEdit;
const buttonSubmitAvatar = editAvatarForm.querySelector('.popup__button-submit');

const buttonAddCard = document.querySelector('.add-button');
const submitButtonAddCard = document.querySelector('[data-addCard]');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const submitButtonEditProfile = document.querySelector('[data-editForm]');

const inputName = document.querySelector('#name-input');
const inputHobby = document.querySelector('#hobby-input');


export { buttonAvatarSubmit, avatarButton, avatarContainer, avatarInput, avatarPopup,  avatarImage, avatarForm, buttonSubmitForm, buttonSubmitUserInfo, buttonAddCard, submitButtonAddCard, buttonEditProfile, submitButtonEditProfile, inputName, inputHobby, buttonSubmitAvatar };