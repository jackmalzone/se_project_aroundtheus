const initialCards = [
  {
    place: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    alt: "Sunset view of Yosemite Valley with El Capitan visible, river flowing in the foreground surrounded by dense pine trees.",
  },
  {
    place: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    alt: "Calm waters of Lake Louise reflecting the surrounding mountains under a soft blue sky.",
  },
  {
    place: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    alt: "Sunburst peaking over the silhouette of the Bald Mountains at sunrise, casting a warm glow across the hazy, layered ridges.",
  },
  {
    place: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    alt: "Starry night sky over the jagged peaks of Latemar mountain range with remnants of snow highlighting its rugged terrain.",
  },
  {
    place: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    alt: "Twilight hues casting a soft glow on the peaks of Vanoise National Park, reflected in the still waters of a mountain lake.",
  },
  {
    place: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    alt: "Wooden boats moored at a dock on Lago di Braies with towering Dolomite mountains reflecting in the crystal-clear lake water.",
  },
];

// console.log(initialCards);

// ELEMENTS

// Wrappers
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profilePreviewModal = document.querySelector("#profile-preview-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileAddForm = profileAddModal.querySelector(".modal__form");
const cardList = document.querySelector(".cards__list");

// Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditButtonClose = profileEditModal.querySelector(
  "#modal-button-close"
);
const profileAddButtonClose = profileAddModal.querySelector(
  "#modal-button-close"
);
const profileModalButtonSave = document.querySelector("#modal-button-save");
const profileAddButton = document.querySelector("#profile-add-button");

const profilePreviewButtonClose = profilePreviewModal.querySelector(
  "#modal-button-close"
);

// Profile Data
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");

// Form Data
const profileInputName = document.querySelector("#modal-input-name");
const profileInputDescription = document.querySelector(
  "#modal-input-description"
);
const profileInputPlace = profileAddForm.querySelector("#modal-input-place");
const profileInputLink = profileAddForm.querySelector("#modal-input-link");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
// const modalTemplate = document.querySelector("#modal-template").content;

// FUNCTIONS

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

// EVENT HANDLERS

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closeModal(profileEditModal);
  // console.log("Form submitted, no refresh!");
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const place = profileInputPlace.value;
  const link = profileInputLink.value;
  renderCard({ place, link }, cardList);
  closeModal(profileAddModal);
  // console.log("Form submitted, no refresh!");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardCaption = cardElement.querySelector(".card__caption");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardPreviewClose = cardElement.querySelector(".modal__close");

  const cardPreviewImage = cardElement.querySelector(".modal__preview");
  const cardPreviewCaption = cardElement.querySelector(".modal__heading");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", () => {
    openModal(profilePreviewModal);
  });
  // cardPreviewClose.addEventListener("click", () => {
  //   profilePreviewModal.classList.toggle("modal_opened");
  // });

  // cardPreviewImage.src = cardData.link;
  // cardPreviewImage.alt = cardData.alt;
  // cardPreviewCaption.textContent = cardData.place;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;
  cardCaption.textContent = cardData.place;
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
  openModal(profileEditModal);
});
profileEditButtonClose.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditForm.addEventListener("submit", handleEditFormSubmit);

profileAddButton.addEventListener("click", () => openModal(profileAddModal));
profileAddButtonClose.addEventListener("click", () =>
  closeModal(profileAddModal)
);
profileAddForm.addEventListener("submit", handleAddFormSubmit);

profilePreviewButtonClose.addEventListener("click", () =>
  closeModal(profilePreviewModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardList));

const profileLikeButton = document.querySelectorAll("#card-like-button");
