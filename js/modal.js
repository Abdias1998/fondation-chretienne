document.getElementById("openModalButton").addEventListener("click", function() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", function() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
});

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Votre code pour gérer l'inscription ici
    
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
});
