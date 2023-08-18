document.addEventListener("DOMContentLoaded", () => {
  const subscribeForm = document.getElementById("subscribeForm");
  const messageParagraph = document.getElementById("messageParagraph");
  const submitButton = document.querySelector('button[type="submit"]');

  subscribeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Désactiver le formulaire et le bouton de soumission
    subscribeForm.classList.add("disabled");
    submitButton.disabled = true;

    const emailInput = document.getElementById("emails");
    const email = emailInput.value;

    // Récupérer les valeurs des champs "name", "audio" et "video"
    const nameInput = document.getElementById("name");
    const names = nameInput.value;

    const audioSelect = document.getElementById("audio");
    const audio = audioSelect.value;

    const videoSelect = document.getElementById("video");
    const video = videoSelect.value;

    try {
      const response = await fetch(
        "https://backend-lagraceparle.onrender.com/api/v1/subscribe-donateur",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, names, audio, video }),
        }
      );

      if (response.ok) {
        messageParagraph.textContent = "Abonnement à la newsletter réussi !";
        messageParagraph.classList.remove("error");
        messageParagraph.classList.add("success");
        emailInput.value = "";
        nameInput.value = ""; // Réinitialiser la valeur du champ "name"
        audioSelect.value = ""; // Réinitialiser la valeur du champ "name"
        videoSelect.value = ""; // Réinitialiser la valeur du champ "name"

        // Réactiver le formulaire et le bouton de soumission après 3 secondes (3000 ms)
        setTimeout(() => {
          subscribeForm.classList.remove("disabled");
          submitButton.disabled = false;
          messageParagraph.textContent = "";
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Erreur de souscription:", errorData.message);
        messageParagraph.textContent =
          "Erreur de souscription: " + errorData.message;
        messageParagraph.classList.remove("success");
        messageParagraph.classList.add("error");

        // Réactiver le formulaire et le bouton de soumission
        subscribeForm.classList.remove("disabled");
        submitButton.disabled = false;
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      messageParagraph.textContent =
        "Erreur lors de la requête. Veuillez réessayer plus tard." * error;
      messageParagraph.classList.remove("success");
      messageParagraph.classList.add("error");

      // Réactiver le formulaire et le bouton de soumission
      subscribeForm.classList.remove("disabled");
      submitButton.disabled = false;
    }
  });
});
