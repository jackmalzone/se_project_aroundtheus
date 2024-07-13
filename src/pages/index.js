import "./index.css";
import api from "../utils/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  baseUrl,
  authToken,
  initialCards,
  validationSettings,
  profileEditForm,
  profileAddForm,
  profileAvatarForm,
  profileEditButton,
  profileAddButton,
  profileAvatarButton,
  profileName,
  profileDescription,
  profileInputName,
  profileInputDescription,
} from "../utils/constants.js";

// FORM VALIDATION INIT
const profileEditFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const profileAddFormValidator = new FormValidator(
  validationSettings,
  profileAddForm
);

const profileAvatarFormValidator = new FormValidator(
  validationSettings,
  profileAvatarForm
);

profileEditFormValidator.enableValidation();
profileAddFormValidator.enableValidation();
profileAvatarFormValidator.enableValidation();

// USER INFO INIT
const userInfo = new UserInfo({
  nameSelector: profileName,
  aboutSelector: profileDescription,
});

async function handleEditFormSubmit(data) {
  try {
    await api.updateProfile({
      name: data.title,
      about: data.description,
    });

    userInfo.setUserInfo({
      name: data.title,
      about: data.description,
    });

    profileEditForm.reset();
    profileEditFormValidator.disableButton();
    profileEditPopup.close();
  } catch (err) {
    console.error("Error updating profile:", err);
  }
}

async function handleAddFormSubmit(data) {
  try {
    const cardData = await api.addCard({
      name: data.name,
      link: data.link,
    });

    const cardElement = createCard(cardData);
    cardSection.addItem(cardElement);

    profileAddForm.reset();
    profileAddFormValidator.disableButton();
    profileAddPopup.close();
  } catch (err) {
    console.error("Error adding card:", err);
  }
}

async function handleAvatarFormSubmit(data) {
  try {
    await api.updateAvatar(data.avatar);

    userInfo.setUserInfo({
      avatar: data.avatar,
    });

    profileAvatarForm.reset();
    profileAvatarFormValidator.disableButton();
    profileAvatarPopup.close();
  } catch (err) {
    console.error("Error updating avatar:", err);
  }
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

const profileAvatarPopup = new PopupWithForm(
  "#profile-avatar-modal",
  handleAvatarFormSubmit
);

const profilePreviewPopup = new PopupWithImage("#profile-preview-modal");

profileEditPopup.setEventListeners();
profileAddPopup.setEventListeners();
profileAvatarPopup.setEventListeners();
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
function handleImageClick(link, alt, name) {
  profilePreviewPopup.open(link, alt, name);
}

// EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  profileInputName.value = userData.name;
  profileInputDescription.value = userData.about;

  profileEditFormValidator.resetValidation();
  profileEditPopup.open();
});

profileAddButton.addEventListener("click", () => {
  profileAddPopup.open();
});

profileAvatarButton.addEventListener("click", () => {
  profileAvatarPopup.open();
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const userInfoData = await api.getUserInfo();
    userInfo.setUserInfo(userInfoData);

    const initialCardsData = await api.getInitialCards();
    initialCardsData.forEach((data) => {
      const cardElement = createCard(data);
      cardSection.addItem(cardElement);
    });
  } catch (err) {
    console.error("Error during initial load:", err);
  }
});

// // Initial render
cardSection.renderItems();

// Will add needs corrected in future
