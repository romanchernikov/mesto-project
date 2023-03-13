import { closePopup, openPopup } from "./utils";
import { myId } from "./script";
import { setDisabledButton } from "./validate";
import {
    buttonAddSubmit,
    elementsContainer,
    elementTemplate,
    linkCardAdd,
    nameCardAdd,
    popupAddCard,
    popupZoomImage,
    zoomImage,
    zoomImageText
} from "./constant";
import { Api } from "../components/Api";
import { Popup } from "../components/Popup";

export class Card {
    constructor(nameValue, srcValue, likes, ownerId, cardId, myId) {
        this._name = nameValue;
        this._srcValue = srcValue;
        this._likes = likes;
        this._ownerId = ownerId;
        this._cardId = cardId;
        this._myId = myId;
    }

    _getElement() {
        return elementTemplate.querySelector( '.element' ).cloneNode( true );
    }

    generate() {
        this._element = this._getElement();

        this._element.querySelector('.element__image-title').innerText = this._name;
        this._userImage = this._element.querySelector('.element__user-image');
        this._likesCounter = this._element.querySelector('.element__like-counter');
        this._deleteIcon = this._element.querySelector('.element__delete-icon');
        this._ratingIcon = this._element.querySelector('.element__rating-icon');

        this._userImage.alt = this._name;
        this._userImage.src = this._srcValue;

        this._renderDeleteIcon();
        this._setEventListener();
        this._renderLikes();
        this._checkMyLike();

        return this._element;
    }

    //лайки
    _renderLikes() {
        if (this._likes.length > 0) {
            this._likesCounter.textContent = this._likes.length;
        } else if (this._likes.length === 0) {
            this._likesCounter.textContent = 0;
        }
    }

    _checkMyLike() {
        this._likes.forEach(element => {
            if (element._id === myId) {
                this._ratingIcon.classList.add('element__rating-icon_active');
            }
        });
    }

    _checkLikes(evt) {
        if (!evt.target.classList.contains('element__rating-icon_active')) {
            const addLike = new Api(`/cards/likes/${this._cardId}`, 'PUT');
            addLike.response().then(res => {
                this._ratingIcon.classList.add('element__rating-icon_active');
                this._likesCounter.textContent = res.likes.length;
            })
                .catch(err => {
                    console.log(err);
                });
        } else {
            const delLike = new Api(`/cards/likes/${this._cardId}`, 'DELETE');
            delLike.response().then(res => {
                this._ratingIcon.classList.remove('element__rating-icon_active');
                this._likesCounter.textContent = res.likes.length;
            })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    //удаление
    _renderDeleteIcon() {
        if (this._myId === this._ownerId) {
            this._deleteIcon.style.visibility = 'visible';
        }
    }

    //обработчики
    _setEventListener() {
        this._ratingIcon.addEventListener('click', (evt) => {
            this._checkLikes(evt);
        });

        this._deleteIcon.addEventListener('click', evt => {
            const delCard = new Api(`/cards/${this._cardId}`, 'DELETE');
            delCard.response().then(() => {
                evt.target.closest('.element').remove();
            })
                .catch(err => {
                    console.log(err);
                });
        });

        this._userImage.addEventListener('click', evt => {
            const avc = new Popup(popupZoomImage);
            avc.openPopup();
            avc.setEventListeners();
            // openPopup(popupZoomImage);
            const srcImage = evt.target.getAttribute('src');
            const altImage = evt.target.getAttribute('alt');
            zoomImage.setAttribute('src', srcImage);
            zoomImage.setAttribute('alt', altImage);
            zoomImageText.innerText = altImage;
        });
    }
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    buttonAddSubmit.textContent = 'Сохранение...';
    const postCard = new Api ('/cards', 'POST', JSON.stringify({
        name: nameCardAdd.value.trim(),
        link: linkCardAdd.value.trim()
    }));
    return postCard.response().then(element => {
        evt.target.reset();
        setDisabledButton(popupAddCard);
        const closePopup = new Popup(popupAddCard);
        closePopup.closePopup();
        // closePopup(popupAddCard);
        const createCard = new Card(element.name, element.link, element.likes, element.owner._id, element._id, myId);
        const card = createCard.generate();
        elementsContainer.prepend(card);
    })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            buttonAddSubmit.textContent = 'Сохранить';
        });
}

export { handleAddCardFormSubmit, elementsContainer };