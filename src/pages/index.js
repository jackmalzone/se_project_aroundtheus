import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationSettings,
  profileEditForm,
  profileAddForm,
  profileEditButton,
  profileAddButton,
  profileName,
  profileDescription,
  profileInputName,
  profileInputDescription,
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

function handleEditFormSubmit(data) {
  userInfo.setUserInfo({
    name: data.title,
    job: data.description,
  });

  profileEditForm.reset();
  profileEditFormValidator.disableButton();
  profileEditPopup.close();
}

function handleAddFormSubmit(data) {
  const cardData = {
    place: data.place,
    link: data.link,
    alt: `Image of ${data.place}`,
  };
  const cardElement = createCard(cardData);

  cardSection.addItem(cardElement);
  profileAddForm.reset();
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
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement, true);
    },
  },
  ".cards__list"
);

// CREATE CARD
function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

// IMAGE CLICK HANDLER
function handleImageClick(link, alt, place) {
  profilePreviewPopup.open(link, alt, place);
}

// EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  profileInputName.value = userData.name;
  profileInputDescription.value = userData.job;

  profileEditFormValidator.resetValidation();
  profileEditPopup.open();
});

profileAddButton.addEventListener("click", () => {
  profileAddPopup.open();
});

// // Initial render
cardSection.renderItems();

// Will add needs corrected in future
