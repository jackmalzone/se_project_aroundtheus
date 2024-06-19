import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/section.js";
import PopupWithImage from "../components/popupwithimage.js";
import PopupWithForm from "../components/popupwithform.js";
import UserInfo from "../components/userinfo.js";
import {
  initialCards,
  validationSettings,
  cardTemplate,
  profileEditModal,
  profileAddModal,
  profilePreviewModal,
  profileEditForm,
  profileAddForm,
  cardList,
  profileEditButton,
  profileEditButtonClose,
  profileAddButton,
  profileAddButtonClose,
  profilePreviewButtonClose,
  profileName,
  profileDescription,
  cardPreviewImage,
  cardPreviewCaption,
  profileInputName,
  profileInputDescription,
  profileInputPlace,
  profileInputLink,
} from "../utils/constants.js";
// import { create } from "lodash";
// import { profile } from "console";

// FORM VALIDATION INIT
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

// USER INFO INIT
const userInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileDescription,
});

// FORM SUBMIT HANDLERS
// function handleProfileFormSubmit(data) {
//   userInfo.setUserInfo(data);
//   profileEditPopup.close();
// }

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  userInfo.setUserInfo({
    name: profileInputName.value,
    job: profileInputDescription.value,
  });
  profileEditForm.reset();
  profileEditFormValidator.resetValidation();
  profileEditFormValidator.disableButton();
  profileEditPopup.close();
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const data = {
    place: profileInputPlace.value,
    link: profileInputLink.value,
    alt: `Image of ${profileInputPlace.value}`,
  };
  const cardElement = createCard(data);
  cardList.addItem(cardElement);
  profileAddForm.reset();
  profileAddFormValidator.resetValidation();
  profileAddFormValidator.disableButton();
  profileAddPopup.close();
}

// POPUP INIT
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleEditFormSubmit
);
const profileAddPopup = new PopupWithForm(
  "#profile-add-modal",
  handleAddFormSubmit
);
const profilePreviewPopup = new PopupWithImage("#profile-preview-modal");

profileEditPopup.setEventListeners();
profileAddPopup.setEventListeners();
profilePreviewPopup.setEventListeners();

// SECTION INIT
const CardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      CardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

// CREATE CARD
function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

// function renderCard(cardData, wrapper) {
//   const card = new Card(cardData, "#card-template", handleImageClick);
//   const cardElement = card.getView();
//   wrapper.prepend(cardElement);
// }

// Event Handlers

// IMAGE CLICK HANDLER
function handleImageClick(data) {
  profilePreviewPopup.open(data);
}

console.log(profileName, profileDescription); // Should log "#profile-name", "#profile-description"
console.log(userInfo._nameElement, userInfo._jobElement); // Should log the DOM elements or null if not found

// EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileInputName.value = userData.name;
  profileInputDescription.value = userData.job;
  profileEditFormValidator.resetValidation();
  profileEditPopup.open();
});

profileEditButtonClose.addEventListener("click", () =>
  profileEditPopup.close()
);
profileEditForm.addEventListener("submit", handleEditFormSubmit);

profileAddButton.addEventListener("click", () => {
  profileAddFormValidator.resetValidation();
  profileAddForm.reset();
  profileAddFormValidator.disableButton();
  profileAddPopup.open();
});

profileAddButtonClose.addEventListener("click", () => profileAddPopup.close());
profileAddForm.addEventListener("submit", handleAddFormSubmit);

profilePreviewButtonClose.addEventListener("click", () =>
  profilePreviewPopup.close()
);

profilePreviewModal.addEventListener("click", (event) => {
  if (event.target === profilePreviewModal) {
    profilePreviewPopup.close();
  }
});

// // Initial render
CardSection.renderItems();
