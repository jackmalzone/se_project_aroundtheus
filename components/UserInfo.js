export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);

    // Debugging
    console.log("UserInfo Constructor:");
    console.log("Name Element:", this._nameElement);
    console.log("Job Element:", this._jobElement);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    console.log("Setting user info:", name, job);
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;

    // Debugging
    console.log("Updated Name Element:", this._nameElement.textContent);
    console.log("Updated Job Element:", this._jobElement.textContent);
  }
}
