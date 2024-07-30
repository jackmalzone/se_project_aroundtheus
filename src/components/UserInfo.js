export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }, api) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._api = api;

    if (!this._nameElement) {
      console.error(`Element not found for selector: ${nameSelector}`);
    }
    if (!this._aboutElement) {
      console.error(`Element not found for selector: ${aboutSelector}`);
    }
    if (!this._avatarElement) {
      console.error(`Element not found for selector: ${avatarSelector}`);
    }
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (about) this._aboutElement.textContent = about;
    if (avatar) this._avatarElement.src = avatar;
  }

  async updateUserInfo() {
    try {
      const userInfo = await api.getUserInfo();
      this.setUserInfo({
        name: userInfo.name,
        about: userInfo.about,
        avatar: userInfo.avatar,
      });
    } catch (err) {
      console.error(err);
    }
  }
}
