const overlays = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const formEdit = document.forms.edit;
const nameEdit = formEdit.elements.nameEdit;
const hobbyEdit = formEdit.elements.hobbyEdit;
const buttonEditSubmit = formEdit.querySelector('.popup__button-submit');
const avatarImage = document.querySelector('.profile__avatar');
const popupEditForm = document.querySelector('[data-editForm]');
const popupAddCard = document.querySelector('[data-addCard]');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.add-button');

const formAdd = document.forms.add;
const nameCardAdd = formAdd.elements.nameCard;
const linkCardAdd = formAdd.elements.linkCard;
const elementTemplate = document.querySelector('#element__template').content;
const elementsContainer = document.querySelector('.elements');
const buttonAddSubmit = formAdd.querySelector('.popup__button-submit');
const popupZoomImage = document.querySelector('[data-zoomImage]');
const zoomImage = document.querySelector('.popup__big-image');
const zoomImageText = document.querySelector('.popup__image-text');

const avatarPopup = document.querySelector('[data-editAvatar]');
const avatarForm = document.forms.avatarEdit;
const avatarInput = avatarForm.elements.linkAvatar;
const avatarContainer = document.querySelector('.profile__avatar-container');
const avatarButton = document.querySelector('.profile__avatar-edit');
const buttonAvatarSubmit = avatarForm.querySelector('.popup__button-submit');

const validationConfig = {
    formSelector: '.popup__body',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};


export { buttonAvatarSubmit, avatarButton, avatarContainer, avatarInput, avatarPopup, zoomImageText, zoomImage, popupZoomImage, buttonAddSubmit, elementsContainer, elementTemplate, linkCardAdd, nameCardAdd, validationConfig, overlays, profileName, profileHobby, nameEdit, hobbyEdit, buttonEditSubmit, avatarImage, popupEditForm, popupAddCard, profileEditButton, addCardButton, avatarForm };