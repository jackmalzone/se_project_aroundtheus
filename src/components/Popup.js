export default class Popup {
  constructor(popupSelector) {
    // console.log("Popup selector:", popupSelector); // Debugging line
    this._popupElement = document.querySelector(popupSelector);
    // console.log("Popup element:", this._popupElement); // Debugging line
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._isMouseDownOnModal = false;
  }

  // Other methods...

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleMouseDown(event) {
    if (event.target.classList.contains("modal_opened")) {
      this._isMouseDownOnModal = true;
    } else {
      this._isMouseDownOnModal = false;
    }
  }

  _handleMouseUp(event) {
    if (
      this._isMouseDownOnModal &&
      event.target.classList.contains("modal_opened")
    ) {
      this.close(event.target);
    }
    this._isMouseDownOnModal = false;
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", this._handleMouseDown);
    this._popupElement.addEventListener("mouseup", this._handleMouseUp);
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => this.close());
  }
}
