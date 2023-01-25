const profileEditButton = document.querySelector('.profile__edit-button');
const closeProfileEdit = document.querySelector('[data-editFormClose]');
const popupEditForm = document.querySelector('[data-editForm]');

const addCardButton = document.querySelector('.add-button');
const closeAddCard = document.querySelector('[data-addCardClose]');
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
const zoomImageClose = document.querySelector('[data-zoomImageClose]');
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
function handleFormStart() {
    nameInput.value = profileName.innerText;
    hobbyInput.value = profileHobby.innerText;
}
profileEditButton.addEventListener('click', function () {
    handleFormStart();
    openPopup(popupEditForm);
});
closeProfileEdit.addEventListener('click', function () {
    closePopup(popupEditForm);
});
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.innerText = nameInput.value.trim();
    profileHobby.innerText = hobbyInput.value.trim();
    closePopup(popupEditForm);
}
popupEditForm.addEventListener('submit', handleFormSubmit);

addCardButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});
closeAddCard.addEventListener('click', function () {
    closePopup(popupAddCard);
});

function loadElement(nameValue, srcValue) {
    const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__user-image').alt = nameValue;
    cardElement.querySelector('.element__user-image').src = srcValue;
    cardElement.querySelector('.element__image-title').innerText = nameValue;
    cardElement.querySelector('.element__rating-icon').addEventListener('click', evt => {
        evt.target.classList.toggle('element__rating-icon_active');
    });
    cardElement.querySelector('.element__delete-icon').addEventListener('click', evt => {
        evt.target.closest('.element').remove();
    });
    cardElement.querySelector('.element__user-image').addEventListener('click', evt => {
        openPopup(popupZoomImage);
        const srcValue = evt.target.getAttribute('src');
        const altValue = evt.target.getAttribute('alt');
        zoomImage.setAttribute('src', srcValue);
        zoomImage.setAttribute('alt', altValue);
        zoomImageText.innerText = altValue;
    });
    return cardElement;
}
function initalizationCards() {
    initialCards.forEach((item) => {
        elementsContainer.append(loadElement(item.name, item.link));
    });
}

function addCardSubmit(evt) {
    evt.preventDefault();
    elementsContainer.prepend(loadElement(nameCardInput.value, linkCardInput.value));
    closePopup(popupAddCard);
}
popupAddCard.addEventListener('submit', addCardSubmit);

zoomImageClose.addEventListener('click', function () {
    closePopup(popupZoomImage);
});