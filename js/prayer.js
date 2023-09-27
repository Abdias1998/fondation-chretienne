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
document.addEventListener("DOMContentLoaded", () => {
  const subscribeForm = document.getElementById("subscribeForm");
  const messageParagraph = document.getElementById("messageParagraph");

  const submit = document.getElementById("submitButton");
  const ancienTexteBouton = submit.textContent; // Sauvegarde du texte original du bouton

  subscribeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Mettre à jour le texte du bouton pendant la requête
    submit.textContent = "Envoi en cours...";
    submit.disabled = true; // Désactiver le bouton pendant la requête

    const paysInput = document.getElementById("pays");
    const pays = paysInput.value;

    const nameInput = document.getElementById("names");
    const names = nameInput.value;

    const subjectSelect = document.getElementById("subject");
    const subject = subjectSelect.value;

    const messageSelect = document.getElementById("message");
    const message = messageSelect.value;

    const tel = phoneNumberInput.value;

    try {
      const response = await fetch(
        "https://backend-lagraceparle.onrender.com/api/v2/prayer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // email,
            names,
            subject,
            message,
            tel,
            // sexe,
            pays,
          }),
        }
      );

      if (response.ok) {
        messageParagraph.textContent = `
        Nous vous remercions sincèrement d'avoir partagé votre demande de prière avec nous. Nous tenons à vous informer que nous avons bien reçu votre demande et que nous allons la prendre en compte dans nos prières.
        
        Que la paix de Dieu qui dépasse toute compréhension vous remplisse et que Sa grâce abonde dans votre vie.`;
        messageParagraph.classList.remove("error");
        messageParagraph.classList.add("success");
        nameInput.value = "";
        subjectSelect.value = "";
        phoneNumberInput.value = "";
        messageSelect.value = "";

        paysInput.value = "";

        setTimeout(() => {
          messageParagraph.textContent = "";
        }, 40000);
      } else {
        const errorData = await response.json();
        console.error("Erreur de souscription:", errorData.message);
        messageParagraph.textContent = errorData.message;
        messageParagraph.classList.remove("success");
        messageParagraph.classList.add("error");
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      messageParagraph.textContent = error;
      messageParagraph.classList.remove("success");
      messageParagraph.classList.add("error");
    } finally {
      // Réactiver le bouton et rétablir le texte original
      submit.disabled = false;
      submit.textContent = ancienTexteBouton;
      subscribeForm.style.display = "none";
    }
  });
});
