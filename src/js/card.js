import { closePopup, openPopup } from "./modal";
import { popupAddCard } from "./utils";
import { initialCards } from "./constant";
import { removeInputsErrors, setDisabledButton } from "./validate";

const formAdd = document.forms.add;
const nameCardAdd = formAdd.elements.nameCard;
const linkCardAdd = formAdd.elements.linkCard;
const elementTemplate = document.querySelector('#element__template').content;
const elementsContainer = document.querySelector('.elements');
const popupZoomImage = document.querySelector('[data-zoomImage]');
const zoomImage = document.querySelector('.popup__big-image');
const zoomImageText = document.querySelector('.popup__image-text');

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
    removeInputsErrors(popupAddCard);
    setDisabledButton(popupAddCard);
    closePopup(popupAddCard);
}

export { initalizationCards, handleAddCardFormSubmit };