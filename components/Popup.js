import { isMouseDownOnModal } from "../utils/constants.js";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
  }

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
      isMouseDownOnModal = true;
    } else {
      isMouseDownOnModal = false;
    }
  }

  _handleMouseUp(event) {
    if (isMouseDownOnModal && event.target.classList.contains("modal_opened")) {
      closeModal(event.target);
    }
    isMouseDownOnModal = false;
  }

  _handleImageClick(link, alt, place) {
    cardPreviewImage.src = link;
    cardPreviewImage.alt = alt;
    cardPreviewCaption.textContent = place;
    open();
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", this._handleMouseDown);
    this._popupElement.addEventListener("mouseup", this._handleMouseUp);
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => this.close());
  }
}
