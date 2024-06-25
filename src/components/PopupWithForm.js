import Popup from "./Popup.js";
import {} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach((input) => {
      console.log(`Input Name: ${input.name}, Input Value: ${input.value}`);
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.removeEventListener("submit", this._submitHandler);
    this._submitHandler = (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    };
    this._popupForm.addEventListener("submit", this._submitHandler);
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
