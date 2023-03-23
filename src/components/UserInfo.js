export class UserInfo {
    constructor({ name, info, avatar }) {
        this._name = document.querySelector(name);
        this._info = document.querySelector(info);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo(){
        const  userData = {};
        userData.name = this._name.textContent;
        userData.about = this._info.textContent;

        return userData;
    }

    setUserInfo(name, about, avatar) {
        this._name.textContent = name;
        this._info.textContent = about;
        if (avatar) {
            this._avatar.src = avatar;
            this._avatar.alt = `Аватар пользователя ${name}`;
        }
    }
}