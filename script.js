const profileEditButton = document.querySelector('.profile__edit-button');
const closeProfileEdit = document.querySelector('.popup__button-close');
const popupForm = document.querySelector('.popup');
const formElement = document.querySelector('.popup__body');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const nameInput = formElement.querySelector('.input__text_type_name');
const hobbyInput = formElement.querySelector('.input__text_type_hobby');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function open(popup) {
    popup.classList.add('popup_opened');
}
function close(popup) {
    popup.classList.remove('popup_opened');
}
function handleFormStart() {
    nameInput.value = profileName.innerText;
    hobbyInput.value = profileHobby.innerText;
}
profileEditButton.addEventListener('click', function () {
    handleFormStart();
    open(popupForm);
});
closeProfileEdit.addEventListener('click', function () {
    close(popupForm);
});
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.innerText = nameInput.value;
    profileHobby.innerText = hobbyInput.value;
    close(popupForm);
}
formElement.addEventListener('submit', handleFormSubmit);

function loadElement() {

    for (let i = 0; i < initialCards.length; i++) {
        const elementTemplate = document.querySelector('#element__tamplate').content;
        const elementsContainer = document.querySelector('.elements');
        const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
        cardElement.querySelector('.element__user-image').alt = initialCards[i].name;
        cardElement.querySelector('.element__user-image').src = initialCards[i].link;
        cardElement.querySelector('.element__image-title').innerText = initialCards[i].name;
        elementsContainer.append(cardElement);
    }
}
loadElement();

function addCard(nameValue, srcValue) {
    cardImage.setAttribute('src',)
}