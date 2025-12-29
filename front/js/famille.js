const familleForm = document.getElementById('familleForm');

//verification du formulaire avant envoi
if (familleForm) {
    //ecoute de l'evenement submit
    familleForm.addEventListener('submit', function(event) {
        event.preventDefault(); //empecher l'envoi par defaut

        //recuperation des champs du formulaire
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const dob = document.getElementById('dob').value;
        const adresse = document.getElementById('adresse').value;
        const cp = document.getElementById('cp').value;
        const ville = document.getElementById('ville').value;
        const telephone = document.getElementById('telephone').value;
        const email = document.getElementById('email').value;

        console.log({nom, prenom, dob, adresse, cp, ville, telephone, email});
        
        //message pour l'utilisateur
        alert("Merci pour votre inscription comme famille d'accueil, nous vous contacterons prochainement.");
    })
}