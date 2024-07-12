import { Api } from "../utils/Api.js";
import { cardList } from "../utils/constants";

export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._place = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._link, this._alt, this._place);
      });
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    const cardTemplate = document.querySelector(this._cardSelector);
    this._cardElement = cardTemplate.content.firstElementChild.cloneNode(true);

    // get card view
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardCaption = this._cardElement.querySelector(".card__caption");

    cardImage.src = this._link;
    cardImage.alt = this._alt;
    cardCaption.textContent = this._place;

    // set event listener
    this._setEventListeners();

    // return card
    return this._cardElement;
  }
}

export function renderInitialCards(cardSelector, handleImageClick) {
  Api.getInitialCards()
    .then((result) => {
      result.forEach((data) => {
        const card = new Card(data, cardSelector, handleImageClick);
        cardList.append(card.getView());
      });
    })
    .catch((err) => {
      console.error("Error loading initial cards:", err);
    });
}
