function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
};

function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = '';
  errorMessageElement.classList.remove(errorClass);
};

function checkInputValidity(formElement, inputElement, options) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

function hasInvalidInput(inputList) {
  return inputList.every((inputElement) => !inputElement.validity.valid);
}

// disableButton

// enableButton

function toggleButtonState(inputElements, submitButton, {inactiveButtonClass}) {
  if(hasInvalidInput(inputElements) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  } 

  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(".modal__button");
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("change", (evt) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    }
  };
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, options);

    // look for all inputs inside the form
    // loop throughh all the inputs to see if valid
    // if all inputs are not valid
    // get validation message
    // add error class to input
    // display error message
    // disable submit button
    // if inputs are valid
    // enable button
    // reset error messages
  });
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__submit-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

enableValidation(config);
