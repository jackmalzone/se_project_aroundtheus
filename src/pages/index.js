import "./index.css";
import api from "../utils/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import {
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
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    // Store the validator using the name of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

async function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  try {
    popupInstance.renderLoading(true, loadingText);
    await request();
    popupInstance.close();
  } catch (err) {
    console.error("Error in handleSubmit:", err);
  } finally {
    popupInstance.renderLoading(false);
  }
}

// USER INFO INIT
const userInfo = new UserInfo({
  nameSelector: profileName,
  aboutSelector: profileDescription,
  avatarSelector: profileAvatar,
});

let currentUserId = null;

function handleEditFormSubmit(inputValues) {
  async function makeRequest() {
    console.log("Updating profile with values:", inputValues);
    const updatedValues = {
      name: inputValues.name,
      about: inputValues.description,
    };
    const userData = await api.updateProfile(updatedValues);
    userInfo.setUserInfo(userData);
  }
  handleSubmit(makeRequest, profileEditPopup);
}

function handleAddFormSubmit(inputValues) {
  async function makeRequest() {
    console.log("Adding card with values:", inputValues);
    const cardData = await api.addCard(inputValues);
    const cardElement = createCard(cardData, currentUserId);
    cardSection.addItem(cardElement);
  }
  handleSubmit(makeRequest, profileAddPopup);
}

function handleAvatarFormSubmit(inputValues) {
  async function makeRequest() {
    console.log("Updating avatar with values:", inputValues);
    const userData = await api.updateAvatar(inputValues.link);
    userInfo.setUserInfo(userData);
  }
  handleSubmit(makeRequest, profileAvatarPopup);
}

function handleCardDelete(card) {
  confirmationPopup.open(() => {
    card
      .deleteCard()
      .then(() => {
        confirmationPopup.close();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  });
}

async function handleLikeButton(card) {
  try {
    if (card._isLiked) {
      // Unlike card using API
      const updatedCard = await api.unlikeCard(card._id);
      card._isLiked = updatedCard.likes.some(
        (user) => user._id === card._currentUserId
      );
      card._likeButton.classList.remove("card__like-button_active");
    } else {
      // Like card using API
      const updatedCard = await api.likeCard(card._id);
      card._isLiked = updatedCard.likes.some(
        (user) => user._id === card._currentUserId
      );
      card._likeButton.classList.add("card__like-button_active");
    }
  } catch (err) {
    console.error("Error liking/unliking card:", err);
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
const confirmationPopup = new PopupWithConfirmation("#confirmation-modal");

profileEditPopup.setEventListeners();
profileAddPopup.setEventListeners();
profileAvatarPopup.setEventListeners();
profilePreviewPopup.setEventListeners();
confirmationPopup.setEventListeners();

// SECTION INIT
const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item, currentUserId);
      cardSection.addItem(cardElement, true);
    },
  },
  ".cards__list"
);

// CREATE CARD
function createCard(data, currentUserId) {
  console.log("Creating card with data:", data);
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleCardDelete,
    handleLikeButton,
    currentUserId
  );
  return card.getView();
}

// IMAGE CLICK HANDLER
function handleImageClick(link, alt, name) {
  profilePreviewPopup.open(link, alt, name);
}

async function renderInitialCards() {
  try {
    const result = await api.getInitialCards();
    console.log("Fetched initial cards:", result);
    cardSection.renderItems(result);
  } catch (err) {
    console.error("Error loading initial cards:", err);
  }
}

// EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  console.log("User data for editing:", userData);
  profileEditPopup.setInputValues(userData); // Use setInputValues method
  formValidators["profile-edit-form"].resetValidation();
  profileEditPopup.open();
});

profileAddButton.addEventListener("click", () => {
  formValidators["profile-add-form"].resetValidation();
  profileAddPopup.open();
});

profileAvatarButton.addEventListener("click", () => {
  formValidators["profile-avatar-form"].resetValidation();
  profileAvatarPopup.open();
});

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded and parsed");
  try {
    const userInfoData = await api.getUserInfo();
    currentUserId = userInfoData._id;
    userInfo.setUserInfo({
      name: userInfoData.name,
      description: userInfoData.about,
      avatar: userInfoData.avatar,
    });

    console.log("USER ID:", currentUserId);

    await renderInitialCards();
  } catch (err) {
    console.error("Error during initial load:", err);
  }
});
