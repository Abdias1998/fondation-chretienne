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

    const sexeInput = document.getElementById("sexe");
    const sexe = sexeInput.value;
    const paysInput = document.getElementById("pays");
    const pays = paysInput.value;

    const nameInput = document.getElementById("names");
    const names = nameInput.value;

    const telSelect = document.getElementById("tel");
    const tel = telSelect.value;

    const messageSelect = document.getElementById("message");
    const message = messageSelect.value;

    try {
      const response = await fetch(
        "https://backend-lagraceparle.onrender.com/api/v2/testimonial",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            names,
            tel,
            message,
            sexe,
            pays,
          }),
        }
      );

      if (response.ok) {
        messageParagraph.textContent = `
        Nous vous remercions sincèrement d'avoir partagé votre témoignage avec nous. Nous tenons à vous informer que nous avons bien reçu votre demande et que nous allons la prendre en compte dans nos publications de témoignage.`;
        messageParagraph.classList.remove("error");
        messageParagraph.classList.add("success");

        nameInput.value = "";
        phoneNumberInput.value = "";
        messageSelect.value = "";
        sexeInput.value = "";
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
