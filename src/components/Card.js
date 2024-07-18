import api from "../utils/Api.js";
import { cardList } from "../utils/constants";

export default class Card {
  constructor(data, cardSelector, handleImageClick, currentUserId) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._id = data._id;
    this._likes = data.likes || [];
    this._currentUserId = currentUserId;

    console.log("Card Data:", data); // Debugging line
    console.log("Likes Array:", this._likes); // Debugging line

    this._isLiked = this._likes.some(
      (user) => user._id === this._currentUserId
    );
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
        this._handleImageClick(this._link, this._alt, this._name);
      });
  }

  async _handleLikeButton() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    try {
      if (this._isLiked) {
        const updatedCard = await api.unlikeCard(this._id);
        this._isLiked = updatedCard.likes.some(
          (user) => user._id === this._currentUserId
        );
        likeButton.classList.remove("card__like-button_active");
      } else {
        const updatedCard = await api.likeCard(this._id);
        this._isLiked = updatedCard.likes.some(
          (user) => user._id === this._currentUserId
        );
        likeButton.classList.add("card__like-button_active");
      }
    } catch (err) {
      console.error("Error liking/unliking card:", err);
    }
  }

  async _handleDeleteButton() {
    try {
      await api.deleteCard(this._id);
      this._cardElement.remove();
      this._cardElement = null;
    } catch (err) {
      console.error("Error deleting card:", err);
    }
  }

  getView() {
    const cardTemplate = document.querySelector(this._cardSelector);
    this._cardElement = cardTemplate.content.firstElementChild.cloneNode(true);

    // get card view
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardCaption = this._cardElement.querySelector(".card__caption");
    const likeButton = this._cardElement.querySelector(".card__like-button");

    cardImage.src = this._link;
    cardImage.alt = this._alt;
    cardCaption.textContent = this._name;

    if (this._isLiked) {
      likeButton.classList.add("card__like-button_active");
    }
    this._setEventListeners();
    return this._cardElement;
  }
}

export async function renderInitialCards(
  cardSelector,
  handleImageClick,
  currentUserId
) {
  try {
    const result = await api.getInitialCards();
    result.forEach((data) => {
      const card = new Card(
        data,
        cardSelector,
        handleImageClick,
        currentUserId
      );
      cardList.append(card.getView());
    });
  } catch (err) {
    console.error("Error loading initial cards:", err);
  }
}
