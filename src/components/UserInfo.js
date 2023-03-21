export class UserInfo {
    constructor({ name, info, getInfo }) {
        this._name = document.querySelector(name);
        this._info = document.querySelector(info);
        this._getInfo = getInfo;
    }

    getUserInfo() {
        return this._getInfo();
    }

    setUserInfo() {
        this._name.textContent = this.getUserInfo().name;
        this._info.textContent = this.getUserInfo().about;
    }
}