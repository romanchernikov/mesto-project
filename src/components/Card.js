import { myId } from "../js/script";

export class Card {
    constructor( { nameValue, srcValue, likes, ownerId, cardId, myId, template, handleCardClick, addLike, deleteLike, deleteCard }) {
        this._name = nameValue;
        this._srcValue = srcValue;
        this._likes = likes;
        this._ownerId = ownerId;
        this._cardId = cardId;
        this._myId = myId;
        this._template = document.querySelector(template).content;
        this._handleCardClick = handleCardClick;
        this._addLike = addLike;
        this._deleteLike = deleteLike;
        this._deleteCard = deleteCard;
    }

    _getElement() {
        return this._template.querySelector('.element').cloneNode(true);
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
            this._addLike(this._cardId).then(res => {
                this._ratingIcon.classList.add('element__rating-icon_active');
                this._likesCounter.textContent = res.likes.length;
            })
                .catch(err => {
                    console.log(err);
                });
        } else {
            this._deleteLike(this._cardId).then(res => {
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
            this._deleteCard(this._cardId).then(() => {
                evt.target.closest('.element').remove();
            })
                .catch(err => {
                    console.log(err);
                });
        });

        this._userImage.addEventListener('click', evt => {
            this._handleCardClick(evt);
        });
    }
}