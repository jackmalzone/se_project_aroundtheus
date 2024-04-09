const initialCards = [
  {
    name: "Yosemite Valley",
    link: "../images/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "../images/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "../images/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "../images/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "../images/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "../images/lago.jpg",
  },
];

// ELEMENTS

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButtonClose = document.querySelector(
  "#profile-edit-button-close"
);

profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
});

profileEditButtonClose.addEventListener("click", () => {
  profileEditModal.classList.remove("modal_opened");
});

console.log(initialCards);
