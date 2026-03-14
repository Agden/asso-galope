document.addEventListener('DOMContentLoaded', function () {

    const benevoleForm = document.getElementById('benevoleForm');

    if (benevoleForm) {
        benevoleForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Récupération des statuts cochés
            const statuts = Array.from(
                benevoleForm.querySelectorAll('input[name="statut[]"]:checked')
            ).map(cb => cb.value);

            if (statuts.length === 0) {
                alert('Veuillez sélectionner au moins un statut.');
                return;
            }

            // Objet envoyé EXACTEMENT comme pour dons
            const data = {
                nom: benevoleForm.nom.value,
                prenom: benevoleForm.prenom.value,
                dob: benevoleForm.dob.value,
                adresse: benevoleForm.adresse.value,
                cp: benevoleForm.cp.value,
                ville: benevoleForm.ville.value,
                telephone: benevoleForm.telephone.value,
                email: benevoleForm.email.value,
                statut: statuts
            };

            fetch('/back/send-famille.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .then(response => {
                if (response.success) {
                    alert('Merci pour votre inscription ! Nous vous contacterons bientôt.');
                    benevoleForm.reset();
                } else {
                    alert(response.error || 'Erreur lors de l’envoi.');
                }
            })
            .catch(() => {
                alert('Erreur lors de l’envoi. Merci de réessayer.');
            });
        });
    }

});