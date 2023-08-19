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

    const emailInput = document.getElementById("emails");
    const email = emailInput.value;

    const nameInput = document.getElementById("names");
    const names = nameInput.value;

    const subjectSelect = document.getElementById("subject");
    const subject = subjectSelect.value;

    const messageSelect = document.getElementById("message");
    const message = messageSelect.value;

    try {
      const response = await fetch(
        "https://backend-lagraceparle.onrender.com/api/v2/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, names, subject, message }),
        }
      );

      if (response.ok) {
        messageParagraph.textContent = `Nous avons reçu votre message ${names}, nous vous reviendrons au plus vite.`;
        messageParagraph.classList.remove("error");
        messageParagraph.classList.add("success");
        emailInput.value = "";
        nameInput.value = "";
        subject.value = "";
        messageSelect.value = "";

        setTimeout(() => {
          messageParagraph.textContent = "";
        }, 5000);
      } else {
        const errorData = await response.json();
        console.error("Erreur de souscription:", errorData.message);
        messageParagraph.textContent =
          "Erreur de souscription: " + errorData.message;
        messageParagraph.classList.remove("success");
        messageParagraph.classList.add("error");
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      messageParagraph.textContent =
        "Erreur lors de la requête. Veuillez réessayer plus tard. " + error;
      messageParagraph.classList.remove("success");
      messageParagraph.classList.add("error");
    } finally {
      // Réactiver le bouton et rétablir le texte original
      submit.disabled = false;
      submit.textContent = ancienTexteBouton;
    }
  });
});
