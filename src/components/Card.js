export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleCardDelete,
    handleLikeButton,
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeButton = handleLikeButton;
    this._id = data._id;
    this._likes = data.likes || [];
    this._currentUserId = currentUserId;
    this._isLiked = this._likes.some(
      (user) => user._id === this._currentUserId
    );
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    return cardTemplate.firstElementChild.cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton(this);
    });

    this._trashButton.addEventListener("click", () => {
      this._handleCardDelete(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._link, this._alt, this._name);
    });
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

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    this._cardElement.dataset.id = this._id;
    this._setEventListeners();

    return this._cardElement;
  }
}
