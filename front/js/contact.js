// Récupération du formulaire
const form = document.getElementById('contactForm');

// Ecoute de l'envoie du formulaire
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche l'envoi classique du formulaire
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Affichage d'un message de confirmation
    alert("merci pour votre message, nous vous répondrons rapidement")
});
