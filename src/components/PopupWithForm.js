import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText =
      this._submitButton.childNodes[0].textContent.trim();
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues(data) {
    console.log("Setting input values with data:", data);
    this._inputs.forEach((input) => {
      input.value = data[input.name] || "";
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .catch((err) => console.error("Error submitting form:", err))
        .finally(() => this.renderLoading(false));
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.childNodes[0].textContent = "Saving...";
    } else {
      this._submitButton.childNodes[0].textContent = this._submitButtonText;
    }
  }
}
