export const initialCards = [
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

// API
export const apiConfig = {
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authToken: "06257429-d905-4d9f-95bb-18862a4fbeb9",
};

export const cardTemplate = document.querySelector("#card-template").content;

// Elements
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileAddModal = document.querySelector("#profile-add-modal");
export const profileAvatarModal = document.querySelector(
  "#profile-avatar-modal"
);
export const profilePreviewModal = document.querySelector(
  "#profile-preview-modal"
);
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const profileAddForm = profileAddModal.querySelector(".modal__form");
export const profileAvatarForm =
  profileAvatarModal.querySelector(".modal__form");
export const cardList = document.querySelector(".cards__list");

// Buttons
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditButtonClose = profileEditModal.querySelector(
  "#modal-button-close"
);
export const profileAddButtonClose = profileAddModal.querySelector(
  "#modal-button-close"
);
export const profileAddButton = document.querySelector("#profile-add-button");
export const profileAvatarButton = document.querySelector(
  "#profile-avatar-button"
);
export const profileAvatarButtonClose = profileAvatarModal.querySelector(
  "#modal-button-close"
);
export const profilePreviewButtonClose = profilePreviewModal.querySelector(
  "#modal-button-close"
);
export let isMouseDownOnModal = false;

// Profile Data
export const profileName = "#profile-name";
export const profileDescription = "#profile-description";
export const cardPreviewImage =
  profilePreviewModal.querySelector(".modal__image");
export const cardPreviewCaption =
  profilePreviewModal.querySelector(".modal__heading");

// Form Data
export const profileInputName = document.querySelector("#modal-input-name");
export const profileInputDescription = document.querySelector(
  "#modal-input-description"
);
export const profileInputPlace =
  profileAddForm.querySelector("#modal-input-place");
export const profileInputLink =
  profileAddForm.querySelector("#modal-input-link");

// Validation settings
export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__submit-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};
