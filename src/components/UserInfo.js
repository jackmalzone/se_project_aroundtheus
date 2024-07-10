import Api from "../utils/Api.js";

export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, job, avatar }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._avatarElement.src = avatar;
  }
}

updateUserInfo() {
  Api.getUserInfo()
    .then(userInfo => {
      this.setUserInfo({
        name: userInfo.name,
        about: userInfo.about,
        avatar: userInfo.avatar,
      });
    })
    .catch(err => {
      console.error(err);
    });
}
