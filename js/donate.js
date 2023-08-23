const subjectSelect = document.getElementById("subject");
const footerText = document.getElementById("footerText");
subjectSelect.addEventListener("change", function () {
  const selectedValue = subjectSelect.value;
  if (selectedValue === "Don En Nature") {
    footerText.innerHTML = `
          <p style='text-align:justify'>Pour faire un don en nature au fondation, veuillez suivre ces étapes :</p>
          <ol>
            <li style='text-align:justify'>Remplissez le formulaire en choisissant l'option "Don et Soutien".</li>
            <li style='text-align:justify'>Indiquez dans le message les détails du don en nature que vous souhaitez offrir.</li>
           
            <li style='text-align:justify'> Nous vous contacterons pour coordonner la collecte du don en nature, en gardant à l'esprit l'amour et le respect qui unissent notre communauté chrétienne.</li>
            <li>Consulter le formulaire et suivez les étapes indiquez : <a href='contact.html#subscribeForm'>Remplissez le formulaire</a></li>
          </ol>
          <p style='text-align:justify'>Que Dieu vous bénisse abondamment pour votre engagement et votre sacrifice. Ensemble, nous faisons la différence dans le monde.</p>
        `;
  } else {
    footerText.innerHTML = ""; // Efface le texte si l'option n'est pas "Don En Nature"
  }
});
