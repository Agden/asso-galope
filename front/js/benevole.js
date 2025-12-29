// récupération du formulaire
const benevoleForm = document.getElementById('benevoleForm');
//verification de sécurité
if (benevoleForm) {

// Ecoute de l'envoie du formulaire
benevoleForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche l'envoi classique du formulaire

    // Récupération des valeurs des champs du formulaire
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const adresse = document.getElementById('adresse').value;
    const cp = document.getElementById('cp').value;
    const ville = document.getElementById('ville').value;
    const telephone = document.getElementById('telephone').value;
    //recuperation des checkbox
    const choix = document.querySelectorAll('input[name="statut[]"]:checked');
    //transformation en tableau des valeurs des checkbox
    let resultats = [];
    choix.forEach(function(checkbox) {
        resultats.push(checkbox.value);
    });
    //verification si case cochée
    if (resultats.length === 0) {
        alert('Veuillez sélectionner au moins un choix');
        return;
    }
    //exemple d'affichage des données récupérées
    console.log(resultats);

    // Affichage d'un message de confirmation
    alert("Merci pour votre inscription en tant que bénévole, nous vous contacterons bientôt !");
});
}
