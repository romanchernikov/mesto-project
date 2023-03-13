export class Api {
    constructor(url, method, endpoint) {
        this.config = {
            baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
            headers: {
                authorization: 'fce8e61d-eaab-4977-ae1a-12e2aebdd94c',
                'Content-Type': 'application/json'
            },
            method: method,
            body: endpoint,
        };
        this.url = url;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    response() {
        return fetch(`${this.config.baseUrl}${this.url}`, this.config).then(this._checkResponse);
    }
}