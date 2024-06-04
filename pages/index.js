import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// Initial card data
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

// Elements
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
const profileAddButton = document.querySelector("#profile-add-button");
const profilePreviewButtonClose = profilePreviewModal.querySelector(
  "#modal-button-close"
);

// Profile Data
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const cardPreviewImage = profilePreviewModal.querySelector(".modal__image");
const cardPreviewCaption = profilePreviewModal.querySelector(".modal__heading");

// Form Data
const profileInputName = document.querySelector("#modal-input-name");
const profileInputDescription = document.querySelector(
  "#modal-input-description"
);
const profileInputPlace = profileAddForm.querySelector("#modal-input-place");
const profileInputLink = profileAddForm.querySelector("#modal-input-link");

// Validation settings
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__submit-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

const profileEditFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const profileAddFormValidator = new FormValidator(
  validationSettings,
  profileAddForm
);

profileEditFormValidator.enableValidation();
profileAddFormValidator.enableValidation();

// Functions
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeClose);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeClose);
}

function handleEscapeClose(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function handleImageClick(link, alt, place) {
  cardPreviewImage.src = link;
  cardPreviewImage.alt = alt;
  cardPreviewCaption.textContent = place;
  openModal(profilePreviewModal);
}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  wrapper.prepend(cardElement);
}

// Event Handlers
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closeModal(profileEditModal);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const place = profileInputPlace.value;
  const link = profileInputLink.value;
  renderCard({ place, link }, cardList);
  closeModal(profileAddModal);
}

// Event Listeners
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

// Close modal when clicking outside of it
document.querySelectorAll(".modal-overlay").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

profilePreviewModal.addEventListener("click", (event) => {
  if (event.target === profilePreviewModal) {
    closeModal(profilePreviewModal);
  }
});

// Initial render
initialCards.forEach((cardData) => renderCard(cardData, cardList));
