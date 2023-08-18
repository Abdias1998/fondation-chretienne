// document.addEventListener("DOMContentLoaded", () => {
//   const subscribeForm = document.getElementById("subscribeForm");
//   const messageParagraph = document.getElementById("messageParagraph");

//   subscribeForm.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const emailInput = document.getElementById("emails");
//     const email = emailInput.value;

//     try {
//       const response = await fetch(
//         "https://backend-lagraceparle.onrender.com/api/v1/subscribe-donateur",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         }
//       );

//       if (response.ok) {
//         messageParagraph.textContent = "Abonnement à la newsletter réussie !";
//         messageParagraph.classList.remove("error");
//         messageParagraph.classList.add("success");
//         emailInput.value = "";
//       } else {
//         const errorData = await response.json();
//         console.error("Erreur de souscription:", errorData.message);
//         messageParagraph.textContent =
//           "Erreur de souscription: " + errorData.message;
//         messageParagraph.classList.remove("success");
//         messageParagraph.classList.add("error");
//       }
//       console.log(response);
//     } catch (error) {
//       console.error("Erreur lors de la requête:", error);
//       messageParagraph.textContent =
//         "Erreur lors de la requête. Veuillez réessayer plus tard.";
//       messageParagraph.classList.remove("success");
//       messageParagraph.classList.add("error");
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const subscribeForm = document.getElementById("subscribeForm");
  const messageParagraph = document.getElementById("messageParagraph");

  subscribeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("emails");
    const email = emailInput.value;

    // Récupérer les valeurs des champs "name", "audio" et "video"
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
        nameInput.value = ""; // Réinitialiser la valeur du champ "name"

        // Efface le message après 3 secondes (3000 ms)
        setTimeout(() => {
          messageParagraph.textContent = "";
        }, 3000);
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
        "Erreur lors de la requête. Veuillez réessayer plus tard." * error;
      messageParagraph.classList.remove("success");
      messageParagraph.classList.add("error");
    }
  });
});
