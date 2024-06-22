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

    // Debugging statements
    console.log("PopupForm:", this._popupForm);
    console.log("Inputs:", this._inputs);
  }

  _getInputValues() {
    console.log("Getting input values"); // Added debug statement

    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    console.log("Input Values:", this._inputValues); // Debugging statement
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    console.log("Setting event listeners"); // Added debug statement

    this._popupForm.removeEventListener("submit", this._submitHandler);
    this._submitHandler = (evt) => {
      evt.preventDefault();
      console.log("Form submitted"); // Added debug statement
      this._handleFormSubmit(this._getInputValues());
    };
    this._popupForm.addEventListener("submit", this._submitHandler);
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
