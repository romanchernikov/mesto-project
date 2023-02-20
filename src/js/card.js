import { closePopup, openPopup } from "./modal";
import { popupAddCard } from "./utils";

const formAdd = document.forms.add;
const nameCardAdd = formAdd.elements.nameCard;
const linkCardAdd = formAdd.elements.linkCard;

const elementTemplate = document.querySelector('#element__template').content;
const elementsContainer = document.querySelector('.elements');

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

function initalizationCards() {
    initialCards.forEach((item) => {
        elementsContainer.append(createCard(item.name, item.link));
    });
}

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

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    elementsContainer.prepend(createCard(nameCardAdd.value, linkCardAdd.value));
    evt.target.reset();
    closePopup(popupAddCard);
}

export { initalizationCards, handleAddCardFormSubmit };