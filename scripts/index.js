console.log("Hello, World!");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "../images/yosemite.jpg",
    alt: "Sunset view of Yosemite Valley with El Capitan visible, river flowing in the foreground surrounded by dense pine trees.",
  },
  {
    name: "Lake Louise",
    link: "../images/lake-louise.jpg",
    alt: "Calm waters of Lake Louise reflecting the surrounding mountains under a soft blue sky.",
  },
  {
    name: "Bald Mountains",
    link: "../images/bald-mountains.jpg",
    alt: "Sunburst peaking over the silhouette of the Bald Mountains at sunrise, casting a warm glow across the hazy, layered ridges.",
  },
  {
    name: "Latemar",
    link: "../images/latemar.jpg",
    alt: "Starry night sky over the jagged peaks of Latemar mountain range with remnants of snow highlighting its rugged terrain.",
  },
  {
    name: "Vanoise National Park",
    link: "../images/vanoise.jpg",
    alt: "Twilight hues casting a soft glow on the peaks of Vanoise National Park, reflected in the still waters of a mountain lake.",
  },
  {
    name: "Lago di Braies",
    link: "../images/lago.jpg",
    alt: "Wooden boats moored at a dock on Lago di Braies with towering Dolomite mountains reflecting in the crystal-clear lake water.",
  },
];

// console.log(initialCards);

// ELEMENTS

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalButtonClose = document.querySelector("#modal-button-close");
const profileModalButtonSave = document.querySelector("#modal-button-save");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileInputName = document.querySelector("#modal-input-name");
const profileInputDescription = document.querySelector(
  "#modal-input-description"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// FUNCTIONS

function closeModal() {
  profileEditModal.classList.remove("modal_opened");
}

// EVENT HANDLERS

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closeModal();
  console.log("Form submitted, no refresh!");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardCaption = cardElement.querySelector(".card__caption");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;
  cardCaption.textContent = cardData.name;
  console.log(cardData);
  return cardElement;
}

// EVENT LISTENERS

profileEditButton.addEventListener("click", () => {
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileModalButtonClose.addEventListener("click", closeModal);

profileEditForm.addEventListener("submit", handleFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
});
