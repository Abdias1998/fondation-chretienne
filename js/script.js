document.addEventListener("DOMContentLoaded", () => {
  const subscribeForm = document.getElementById("subscribeForm");
  const messageParagraph = document.getElementById("messageParagraph");

  subscribeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("emails");
    const email = emailInput.value;

    try {
      const response = await fetch(
        "https://backend-lagraceparle.onrender.com/api/v1/subscribe-donateur",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        messageParagraph.textContent = "Abonnement à la newsletter réussie !";
        emailInput.value = "";
      } else {
        const errorData = await response.json();
        console.error("Erreur de souscription:", errorData.message);
        messageParagraph.textContent =
          "Erreur de souscription: " + errorData.message;
      }
      console.log(response);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      messageParagraph.textContent =
        "Erreur lors de la requête. Veuillez réessayer plus tard.";
    }
  });
});
