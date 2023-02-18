import '../../src/pages/index.css';

const overlay = document.querySelectorAll('.popup');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('[data-editForm]');
const addCardButton = document.querySelector('.add-button');
const popupAddCard = document.querySelector('[data-addCard]');
const formAdd = document.forms.add;
const nameCardAdd = formAdd.elements.nameCard;
const linkCardAdd = formAdd.elements.linkCard;

const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const elementTemplate = document.querySelector('#element__template').content;
const elementsContainer = document.querySelector('.elements');
const formEdit = document.forms.edit;
const nameEdit = formEdit.elements.nameEdit;
const hobbyEdit = formEdit.elements.hobbyEdit;

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
function closePopupEscape(evt) {
    if (evt.key === "Escape") {
        const popupOpen = document.querySelector('.popup_opened');
        closePopup(popupOpen);
    }
}
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
    popup.querySelector('.popup__body').reset();
}
function fillProfileInputs() {
    nameEdit.value = profileName.innerText;
    hobbyEdit.value = profileHobby.innerText;
}
profileEditButton.addEventListener('click', function () {
    fillProfileInputs();
    openPopup(popupEditForm);
});
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.innerText = nameEdit.value.trim();
    profileHobby.innerText = hobbyEdit.value.trim();
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
    elementsContainer.prepend(createCard(nameCardAdd.value, linkCardAdd.value));
    evt.target.reset();
    closePopup(popupAddCard);
}
popupAddCard.addEventListener('submit', handleAddCardFormSubmit);

overlay.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
            closePopup(popup);
        }
    });
});

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};
const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.valueMissing) {
        inputElement.setCustomValidity("Вы пропустили это поле.");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button-submit_disabled');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button-submit_disabled');
    }


};
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button-submit');
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__body'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

        });
        setEventListeners(formElement);
    });
};
enableValidation();




