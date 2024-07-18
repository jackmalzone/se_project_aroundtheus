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
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitHandler = async (evt) => {
      evt.preventDefault();

      try {
        await this._handleFormSubmit(this._getInputValues());
        this.close();
      } catch (err) {
        console.error("Error submitting form:", err);
      } finally {
        this.renderLoading(false);
      }
    };
    this._popupForm.addEventListener("submit", this._submitHandler);
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
