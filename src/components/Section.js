export class Section {
    constructor({ renderer, rendererOneCard }, selector) {
        this._renderer = renderer;
        this._rendererOneCard = rendererOneCard;
        this._container = document.querySelector(selector);
    }

    rendererCards(cards) {
        cards.forEach(item => {
            this._renderer(item);
        });
    }

    rendererCard(card) {
        this._rendererOneCard(card);
    }

    addInitialCards(element) {
        this._container.append(element);
    }

    addCard(element) {
        this._container.prepend(element);
    }
}