import { checkResponse } from "./utils";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
    headers: {
        authorization: 'fce8e61d-eaab-4977-ae1a-12e2aebdd94c',
        'Content-Type': 'application/json'
    }
};

function getProfileInfo() {
    return fetch(`${config.baseUrl}/users/me`, config)
        .then(checkResponse)
}

function getCards() {
    return fetch(`${config.baseUrl}/cards`, config)
        .then(checkResponse)
}

function postProfileInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then(checkResponse)
}

function postCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(checkResponse)
}

function delCard(id) {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(checkResponse)
}

function postAvatar(link) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
        .then(checkResponse)
}

function addLike(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(checkResponse)
}

function delLike(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(checkResponse)
}


export { getProfileInfo, getCards, postProfileInfo, postCard, delCard, postAvatar, addLike, delLike };

