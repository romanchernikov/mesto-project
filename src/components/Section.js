export class Section {
    constructor({ renderer }, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    rendererCards(cards) {
        cards.forEach(item => {
            this._renderer(item);
        });
    }

    rendererCard(card) {
        this._renderer(card);
    }

    addCard(element) {
        this._container.prepend(element);
    }
}