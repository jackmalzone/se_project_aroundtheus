import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ link, alt, place }) {
    this._image.src = link;
    this._image.alt = alt;
    this._caption.textContent = place;
    super.open();
  }
}
