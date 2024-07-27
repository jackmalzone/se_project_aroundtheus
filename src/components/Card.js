export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleCardDelete,
    api,
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._id = data._id;
    this._likes = data.likes || [];
    this._currentUserId = currentUserId;
    this._isLiked = this._likes.some(
      (user) => user._id === this._currentUserId
    );
    this._api = api;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    return cardTemplate.firstElementChild.cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this.toggleLike();
    });

    this._trashButton.addEventListener("click", () => {
      this._handleCardDelete(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._link, this._alt, this._name);
    });
  }

  async toggleLike() {
    try {
      let updatedCard;
      if (this._isLiked) {
        // UNLIKE
        updatedCard = await this._api.unlikeCard(this._id);
      } else {
        // LIKE
        updatedCard = await this._api.likeCard(this._id);
      }

      console.log("Updated Card after like/unlike:", updatedCard);

      // Check if the 'isLiked' property is present in the updatedCard object
      if (updatedCard.isLiked !== undefined) {
        this._isLiked = updatedCard.isLiked;
        this._updateLikeButton();
      } else {
        throw new Error("Updated card data is missing 'isLiked' property.");
      }
    } catch (err) {
      console.error("Error liking/unliking card:", err);
    }
  }

  _updateLikeButton() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  async deleteCard() {
    try {
      await this._api.deleteCard(this._id);
      this._cardElement.remove();
      this._cardElement = null;
    } catch (err) {
      console.error("Error deleting card:", err);
    }
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__delete-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardCaption = this._cardElement.querySelector(".card__caption");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._cardCaption.textContent = this._name;

    this._updateLikeButton();
    this._cardElement.dataset.id = this._id;
    this._setEventListeners();

    return this._cardElement;
  }
}
