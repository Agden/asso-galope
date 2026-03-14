const familleForm = document.getElementById('familleForm');

if (familleForm) {
    familleForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const data = {
            nom: document.getElementById('nom').value.trim(),
            prenom: document.getElementById('prenom').value.trim(),
            dob: document.getElementById('dob').value.trim(),
            adresse: document.getElementById('adresse').value.trim(),
            cp: document.getElementById('cp').value.trim(),
            ville: document.getElementById('ville').value.trim(),
            telephone: document.getElementById('telephone').value.trim(),
            email: document.getElementById('email').value.trim()
        };

        try {
            const response = await fetch('/back/send-famille.php', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                alert("Merci pour votre inscription comme famille d'accueil !");
                familleForm.reset();
            } else {
                alert(result.error || "Une erreur est survenue.");
            }

        } catch (error) {
            console.error("Erreur réseau :", error);
            alert("Erreur de connexion au serveur.");
        }
    });
}