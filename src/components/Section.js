export class Section {
    constructor({ items, renderer }, selector) {
        this._initialArray = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }
    renderer() {
        this._initialArray.forEach(item => {
            this._renderer(item);
        });
    }
    addItem(element) {
        this._container.append(element);
    }
}