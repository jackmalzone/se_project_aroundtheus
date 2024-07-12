import Api from "../utils/Api.js";

export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.src = avatar;
  }

  updateUserInfo() {
    Api.getUserInfo()
      .then((userInfo) => {
        this.setUserInfo({
          name: userInfo.name,
          about: userInfo.about,
          avatar: userInfo.avatar,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
