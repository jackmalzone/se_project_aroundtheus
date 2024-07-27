import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  open(handleConfirmation) {
    this._handleConfirmation = handleConfirmation;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleConfirmation) {
        this._handleConfirmation();
      }
    });
  }
}
