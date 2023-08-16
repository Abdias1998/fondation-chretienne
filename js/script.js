document.addEventListener("DOMContentLoaded", () => {
  const subscribeForm = document.getElementById("subscribeForm");

  subscribeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("email");
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
        alert("Subscription successful!");
        emailInput.value = "";
      } else {
        const errorData = await response.json();
        console.error("Erreur de souscription:", errorData);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  });
});
