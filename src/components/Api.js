export class Api {
    constructor() {
        this.config = {
            baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
            headers: {
                authorization: 'fce8e61d-eaab-4977-ae1a-12e2aebdd94c',
                'Content-Type': 'application/json'
            }
        };
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    response(url, method, endpoint) {
        return fetch(`${this.config.baseUrl}${url}`, {method: method, body: endpoint, headers: this.config.headers}).then(this._checkResponse);
    }
}