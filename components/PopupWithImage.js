import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".modal__image");
    this._caption = this._popup.querySelector(".modal__heading");
  }

  open({ link, alt, place }) {
    this._image.src = link;
    this._image.alt = alt;
    this._caption.textContent = place;
    super.open();
  }
}
