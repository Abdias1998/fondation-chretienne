document.addEventListener("DOMContentLoaded", () => {
  const subscribeForm = document.getElementById("subscribeForm");
  const messageParagraph = document.getElementById("messageParagraph");
  const text = document.getElementById("text");
  const textLong = document.getElementById("textLong");
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
        textLong.style.display = "none";
        text.innerHTML =
          "<p>Merci beaucoup pour votre inscription. </p>" +
          "<p>Votre email a été ajouté à notre liste de contacts mais doit être confirmé. Dans quelques minutes, vous recevrez un email contenant un lien de confirmation. Veuillez cliquer sur le bouton bleu afin de confirmer votre abonnement.</p>" +
          "<p>Nous espérons que vous serez encouragé par la Pensée de La Grâce Parle.</p>" +
          "<p>Votre équipe La Grâce Parle</p>";

        setTimeout(() => {
          messageParagraph.textContent = "";
        }, 5000);
      } else {
        const errorData = await response.json();
        console.error("Erreur de souscription:", errorData.message);
        messageParagraph.textContent = errorData.message;
        messageParagraph.classList.remove("success");
        messageParagraph.classList.add("error");
      }
    } catch (error) {
      messageParagraph.textContent = error;
      messageParagraph.classList.remove("success");
      messageParagraph.classList.add("error");
    } finally {
      // Réactiver le bouton et rétablir le texte original
      submit.disabled = false;
      submit.textContent = ancienTexteBouton;
    }
  });
});

// Fonction pour extraire les paramètres d'URL en JavaScript
// function getParameterByName(name, url) {
//   if (!url) url = window.location.href;
//   name = name.replace(/[\[\]]/g, "\\$&");
//   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//     results = regex.exec(url);
//   if (!results) return null;
//   if (!results[2]) return "";
//   return decodeURIComponent(results[2].replace(/\+/g, " "));
// }

// Récupérez la valeur du paramètre d'URL "id2"
// var id2 = getParameterByName("id2");
// if (id2) {
//   // Affichez la valeur dans la console
//   console.log("Valeur de id2 : " + id2);

//   // Effectuez une requête GET vers l'URL backend avec id2
//   var backendUrl = `https://backend-lagraceparle.onrender.com/api/v1/subscribe-confirm/${id2}`;

//   // Utilisation de la méthode fetch pour effectuer la requête GET
//   fetch(backendUrl)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("La requête a échoué");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Réponse du backend :", data);
//     })
//     .catch((error) => {
//       console.error("Erreur lors de la requête :", error);
//     });
// }
