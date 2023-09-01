const whatsappCheckbox = document.getElementById("whatsappCheckbox");
const phoneNumberField = document.getElementById("phoneNumberField");
const phoneNumberInput = document.getElementById("phoneNumber");

whatsappCheckbox.addEventListener("change", function () {
  if (whatsappCheckbox.checked) {
    phoneNumberField.style.display = "block";
    phoneNumberInput.required = true;
  } else {
    phoneNumberField.style.display = "none";
    phoneNumberInput.required = false;
  }
});
