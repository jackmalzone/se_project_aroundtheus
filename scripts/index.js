const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    alt: "Sunset view of Yosemite Valley with El Capitan visible, river flowing in the foreground surrounded by dense pine trees.",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    alt: "Calm waters of Lake Louise reflecting the surrounding mountains under a soft blue sky.",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    alt: "Sunburst peaking over the silhouette of the Bald Mountains at sunrise, casting a warm glow across the hazy, layered ridges.",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    alt: "Starry night sky over the jagged peaks of Latemar mountain range with remnants of snow highlighting its rugged terrain.",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    alt: "Twilight hues casting a soft glow on the peaks of Vanoise National Park, reflected in the still waters of a mountain lake.",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    alt: "Wooden boats moored at a dock on Lago di Braies with towering Dolomite mountains reflecting in the crystal-clear lake water.",
  },
];

// console.log(initialCards);

// ELEMENTS

// Wrappers
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");

// Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalButtonClose = document.querySelector("#modal-button-close");
const profileModalButtonSave = document.querySelector("#modal-button-save");

// Profile Data
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");

// Form Data
const profileInputName = document.querySelector("#modal-input-name");
const profileInputDescription = document.querySelector(
  "#modal-input-description"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
// const modalTemplate = document.querySelector("#modal-template").content;

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
  // console.log("Form submitted, no refresh!");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardCaption = cardElement.querySelector(".card__caption");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;
  cardCaption.textContent = cardData.name;
  // console.log(cardData);
  return cardElement;
}

// function getModalElement(modalImageForm) {
//   let modalElement = modalTemplate.cloneNode(true);
//   const modalInputName = modalElement.querySelector("#modal-input-one");
//   const modalInputURL = modalElement.querySelector("#modal-input-two");
//   modalInputName.value = modalImageForm.textContent;
//   modalInputURL.value = modalImageForm.textContent;
//   return modalElement;
// }

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
