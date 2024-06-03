// function showInputError(
//   formElement,
//   inputElement,
//   { inputErrorClass, errorClass }
// ) {
//   const errorMessageElement = formElement.querySelector(
//     `#${inputElement.id}-error`
//   );
//   inputElement.classList.add(inputErrorClass);
//   errorMessageElement.textContent = inputElement.validationMessage;
//   errorMessageElement.classList.add(errorClass);
// }

// function hideInputError(
//   formElement,
//   inputElement,
//   { inputErrorClass, errorClass }
// ) {
//   const errorMessageElement = formElement.querySelector(
//     `#${inputElement.id}-error`
//   );
//   inputElement.classList.remove(inputErrorClass);
//   errorMessageElement.textContent = "";
//   errorMessageElement.classList.remove(errorClass);
// }

// function checkInputValidity(formElement, inputElement, options) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, options);
//   } else {
//     hideInputError(formElement, inputElement, options);
//   }
// }

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => !inputElement.validity.valid);
// }

// // disable submit button

// function toggleButtonState(
//   inputElements,
//   submitButton,
//   { inactiveButtonClass }
// ) {
//   if (hasInvalidInput(inputElements)) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//   } else {
//     submitButton.classList.remove(inactiveButtonClass);
//     submitButton.disabled = false;
//   }
// }

// function setEventListeners(formElement, options) {
//   const { inputSelector } = options;
//   const inputElements = [...formElement.querySelectorAll(inputSelector)];
//   const submitButton = formElement.querySelector(options.submitButtonSelector);

//   inputElements.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       checkInputValidity(formElement, inputElement, options);
//       toggleButtonState(inputElements, submitButton, options);
//     });
//   });

//   toggleButtonState(inputElements, submitButton, options);
// }

// function enableValidation(options) {
//   const formElements = [...document.querySelectorAll(options.formSelector)];

//   formElements.forEach((formElement) => {
//     formElement.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//     });

//     setEventListeners(formElement, options);
//   });
// }

// const config = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__submit-button_inactive",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__input-error_active",
// };

// enableValidation(config);
