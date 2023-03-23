import { Card } from "../components/Card";
import { myId, getApiResponse, openPopupBigImg } from "./script";
import { avatarButton, avatarContainer } from "./constant";

function setDisabledButton(popup) {
    const buttonSubmit = popup.querySelector('.popup__button-submit');
    buttonSubmit.classList.add('popup__button-submit_disabled');
    buttonSubmit.disabled = true;
}

function addAvatarButton() {
    avatarButton.style.visibility = 'visible';
    avatarContainer.removeEventListener('mouseover', removeAvatarButton);
}

function removeAvatarButton() {
    avatarButton.style.visibility = 'hidden';
    avatarContainer.removeEventListener('mouseout', addAvatarButton);
}

function createCard(element) {
    const createCard = new Card({
        nameValue: element.name,
        srcValue: element.link,
        likes: element.likes,
        ownerId: element.owner._id,
        cardId: element._id,
        myId: myId,
        template: '#element__template',
        handleCardClick: () => {
            openPopupBigImg.openPopup(element.name, element.link);
        },
        addLike: (cardId) => {
            getApiResponse(`/cards/likes/${cardId}`, 'PUT').response()
                .then(res => {
                    createCard.toggleLikeCounter(res.likes.length);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deleteLike: (cardId) => {
            return getApiResponse(`/cards/likes/${cardId}`, 'DELETE').response()
                .then(res => {
                    createCard.toggleLikeCounter(res.likes.length);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deleteCard: (cardId) => {
            getApiResponse(`/cards/${cardId}`, 'DELETE').response()
                .then((res) => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });
    return createCard.generate();
}

export { setDisabledButton, createCard, addAvatarButton, removeAvatarButton };