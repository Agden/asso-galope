// récuperation du formulaire
const denonceForm = document.getElementById('denonceForm');

//verification du formulaire avant envoi
if (denonceForm) {
    denonceForm.addEventListener('submit', function (event) {
        // empecher l'envoi du formulaire
        event.preventDefault();

        // récuperation des champs du formulaire
        const email = document.getElementById('email').value;
        const ville = document.getElementById('ville').value;
        const cp = document.getElementById('cp').value;
        const telephone = document.getElementById('telephone').value;
        const message = document.getElementById('message').value;

        // vérification des champs
        if (!email || !ville || !cp || !telephone || !message) {
            alert('Veuillez remplir tous les champs du formulaire.');
            return;
        }
        // test console
        console.log ({email, ville, cp, telephone, message});

        //message user
        alert("Merci pour votre message, nous vous contacterons rapidement");
    });
}