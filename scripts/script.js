const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('[data-editForm]');
const closePopupButtons = document.querySelectorAll('.popup__button-close');
const addCardButton = document.querySelector('.add-button');
const popupAddCard = document.querySelector('[data-addCard]');
const nameCardInput = document.querySelector('.input__text_type_name-card');
const linkCardInput = document.querySelector('.input__text_type_link-card');

const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const elementTemplate = document.querySelector('#element__template').content;
const elementsContainer = document.querySelector('.elements');
const nameInput = document.querySelector('.input__text_type_name');
const hobbyInput = document.querySelector('.input__text_type_hobby');

const popupZoomImage = document.querySelector('[data-zoomImage]');
const zoomImage = document.querySelector('.popup__big-image');
const zoomImageText = document.querySelector('.popup__image-text');

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
initalizationCards();

function openPopup(popup) {
    popup.classList.add('popup_opened');
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
function fillProfileInputs() {
    nameInput.value = profileName.innerText;
    hobbyInput.value = profileHobby.innerText;
}
profileEditButton.addEventListener('click', function () {
    fillProfileInputs();
    openPopup(popupEditForm);
});
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.innerText = nameInput.value.trim();
    profileHobby.innerText = hobbyInput.value.trim();
    closePopup(popupEditForm);
}
popupEditForm.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});

function createCard(nameValue, srcValue) {
    const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
    const userImage = cardElement.querySelector('.element__user-image');
    userImage.alt = nameValue;
    userImage.src = srcValue;
    cardElement.querySelector('.element__image-title').innerText = nameValue;
    cardElement.querySelector('.element__rating-icon').addEventListener('click', evt => {
        evt.target.classList.toggle('element__rating-icon_active');
    });
    cardElement.querySelector('.element__delete-icon').addEventListener('click', evt => {
        evt.target.closest('.element').remove();
    });
    userImage.addEventListener('click', evt => {
        openPopup(popupZoomImage);
        const srcImage = evt.target.getAttribute('src');
        const altImage = evt.target.getAttribute('alt');
        zoomImage.setAttribute('src', srcImage);
        zoomImage.setAttribute('alt', altImage);
        zoomImageText.innerText = altImage;
    });
    return cardElement;
}
function initalizationCards() {
    initialCards.forEach((item) => {
        elementsContainer.append(createCard(item.name, item.link));
    });
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    elementsContainer.prepend(createCard(nameCardInput.value, linkCardInput.value));
    evt.target.reset();
    closePopup(popupAddCard);
}
popupAddCard.addEventListener('submit', handleAddCardFormSubmit);

closePopupButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});