import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".modal__image");
    this._place = this._popupElement.querySelector(
      ".modal__heading_type_preview"
    );
  }

  open(link, alt, place) {
    this._image.src = link;
    this._image.alt = alt;
    this._place.textContent = place;
    super.open();
  }
}
