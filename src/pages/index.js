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
  profileAvatar,
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
  avatarSelector: profileAvatar,
});

let currentUserId;

async function handleEditFormSubmit(data) {
  try {
    profileEditPopup.renderLoading(true);
    await api.updateProfile({
      name: data.name,
      about: data.description,
    });

    userInfo.setUserInfo({
      name: data.name,
      about: data.description,
    });

    profileEditForm.reset();
    profileEditFormValidator.disableButton();
    profileEditPopup.close();
  } catch (err) {
    console.error("Error updating profile:", err);
  } finally {
    profileEditPopup.renderLoading(false);
  }
}

async function handleAddFormSubmit(data) {
  try {
    profileAddPopup.renderLoading(true);
    const cardData = await api.addCard({
      name: data.place,
      link: data.link,
    });

    const cardElement = createCard(cardData, currentUserId);
    cardSection.addItem(cardElement);

    profileAddForm.reset();
    profileAddFormValidator.disableButton();
    profileAddPopup.close();
  } catch (err) {
    console.error("Error adding card:", err);
  } finally {
    profileAddPopup.renderLoading(false);
  }
}

async function handleAvatarFormSubmit(data) {
  try {
    profileAvatarPopup.renderLoading(true);
    await api.updateAvatar(data.link);

    userInfo.setUserInfo({
      avatar: data.link,
    });

    profileAvatarForm.reset();
    profileAvatarFormValidator.disableButton();
    profileAvatarPopup.close();
  } catch (err) {
    console.error("Error updating avatar:", err);
  } finally {
    profileAvatarPopup.renderLoading(false);
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
      const cardElement = createCard(item, currentUserId);
      cardSection.addItem(cardElement, true);
    },
  },
  ".cards__list"
);

// CREATE CARD
function createCard(data, currentUserId) {
  console.log("Creating card with user ID:", currentUserId);
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    currentUserId
  );
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
    currentUserId = userInfoData._id;
    userInfo.setUserInfo(userInfoData);

    console.log("Current User ID:", currentUserId);

    const initialCardsData = await api.getInitialCards();

    console.log("Initial Cards Data:", initialCardsData);

    initialCardsData.forEach((data) => {
      console.log("Card Data:", data);
      const cardElement = createCard(data, currentUserId);
      cardSection.addItem(cardElement);
    });
  } catch (err) {
    console.error("Error during initial load:", err);
  }
});

// Initial render
cardSection.renderItems();
