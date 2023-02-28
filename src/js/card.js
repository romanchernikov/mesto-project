import { closePopup, openPopup } from "./modal";
import { popupAddCard, myId } from "./utils";
import { removeInputsErrors, setDisabledButton } from "./validate";
import { getCards, postCard, delCard, addLike, delLike } from "./api";
const formAdd = document.forms.add;
const nameCardAdd = formAdd.elements.nameCard;
const linkCardAdd = formAdd.elements.linkCard;
const elementTemplate = document.querySelector('#element__template').content;
const elementsContainer = document.querySelector('.elements');
const buttonAddSubmit = formAdd.querySelector('.popup__button-submit');
const popupZoomImage = document.querySelector('[data-zoomImage]');
const zoomImage = document.querySelector('.popup__big-image');
const zoomImageText = document.querySelector('.popup__image-text');

getCards()
    .then(res => {
        res.forEach(element => {
            elementsContainer.append(createCard(element.name, element.link, element.likes, element.owner._id, element._id));
        })
    })

function createCard(nameValue, srcValue, likes, ownerId, cardId) {
    const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
    const userImage = cardElement.querySelector('.element__user-image');
    const likesCounter = cardElement.querySelector('.element__like-counter');
    const deleteIcon = cardElement.querySelector('.element__delete-icon');
    const ratingIcon = cardElement.querySelector('.element__rating-icon');
    userImage.alt = nameValue;
    userImage.src = srcValue;
    cardElement.querySelector('.element__image-title').innerText = nameValue;

    //лайки
    if (likes.length > 0) {
        likesCounter.textContent = likes.length;
    } else if (likes.length === 0) {
        likesCounter.textContent = 0;
    }
    function checkLikes(evt) {
        if (!evt.target.classList.contains('element__rating-icon_active')) {
            addLike(cardId)
                .then(res => {
                    ratingIcon.classList.add('element__rating-icon_active');
                    likesCounter.textContent = res.likes.length;
                })
        } else {
            delLike(cardId)
                .then(res => {
                    ratingIcon.classList.remove('element__rating-icon_active');
                    likesCounter.textContent = res.likes.length;
                })
        }
    }
    likes.forEach(element => {
        if (element._id === myId) {
            ratingIcon.classList.add('element__rating-icon_active');
        }
    })

    ratingIcon.addEventListener('click', checkLikes);

    //удаление
    if (myId === ownerId) {
        deleteIcon.style.visibility = 'visible';
    }

    deleteIcon.addEventListener('click', evt => {
        delCard(cardId)
            .then(() => {
                evt.target.closest('.element').remove();
            })
            .catch(err => {
                console.log(err);
            })

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
    buttonAddSubmit.textContent = 'Сохранение...';
    postCard(nameCardAdd.value.trim(), linkCardAdd.value.trim())
        .then(element => {
            elementsContainer.prepend(createCard(element.name, element.link, element.likes, element.owner._id, element._id));
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            buttonAddSubmit.textContent = 'Сохранить';
        })

    evt.target.reset();
    removeInputsErrors(popupAddCard);
    setDisabledButton(popupAddCard);
    closePopup(popupAddCard);
}

export { handleAddCardFormSubmit };