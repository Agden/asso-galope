document.addEventListener('DOMContentLoaded', function () {

    const denonceForm = document.getElementById('denonceForm');

    if (denonceForm) {
        denonceForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const data = {
                email: denonceForm.email.value.trim(),
                ville: denonceForm.ville.value.trim(),
                cp: denonceForm.cp.value.trim(),
                telephone: denonceForm.telephone.value.trim(), // facultatif
                message: document.getElementById('message').value.trim()
            };

            // Champs réellement obligatoires
            if (!data.email || !data.ville || !data.cp || !data.message) {
                alert('Veuillez remplir tous les champs obligatoires du formulaire.');
                return;
            }

            fetch('/back/send-famille.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .then(response => {
                if (response.success) {
                    alert("Merci pour votre message, nous vous contacterons rapidement.");
                    denonceForm.reset();
                } else {
                    alert(response.error || 'Erreur lors de l’envoi.');
                }
            })
            .catch(() => {
                alert('Erreur lors de l’envoi. Merci de réessayer.');
            });
        });
    }
})