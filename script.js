const profileEditButton = document.querySelector('.profile__edit-button');
const popupForm = document.querySelector('.popup');
function editProfile() {
    popupForm.classList.add('popup_opened');
}
profileEditButton.addEventListener('click', editProfile);

const closeProfileEdit = document.querySelector('.popup__button-close');
function closeEditProfile() {
    popupForm.classList.remove('popup_opened');
}
closeProfileEdit.addEventListener('click', closeEditProfile);
//console.log(closeProfileEdit);

const formElement = document.querySelector('.popup__body');

const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const nameInput = formElement.querySelector('.input__text_type_name');
const hobbyInput = formElement.querySelector('.input__text_type_hobby');

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileHobby.textContent = hobbyInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);

