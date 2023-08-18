document.addEventListener("DOMContentLoaded", () => {
  const subscribeForm = document.getElementById("subscribeForm");
  const messageParagraph = document.getElementById("messageParagraph");
  const text = document.getElementById("text");

  subscribeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("emails");
    const email = emailInput.value;

    const nameInput = document.getElementById("names");
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
        nameInput.value = "";
        subscribeForm.style.display = "none";
        text.innerHTML =
          "<p>Merci de votre inscription à la Pensée La Grace Parle. Pour activer votre abonnement gratuit, la loi RGPD nous oblige à présent à vous demander de confirmer votre abonnement. Pour cela, il vous suffit de cliquer sur le lien suivant :</p>";

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
    }
  });
});
