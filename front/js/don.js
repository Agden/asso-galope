document.addEventListener('DOMContentLoaded', function () {

    /* DON PAR VIREMENT*/
    const virementForm = document.getElementById('virementForm');

    if (virementForm) {
        virementForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const data = {
                type: 'virement',
                nom: virementForm.nom.value.trim(),
                adresse: virementForm.adresse.value.trim(),
                cp: virementForm.cp.value.trim(),
                ville: virementForm.ville.value.trim(),
                email: virementForm.email.value.trim(),
                montant: virementForm.montant.value.trim()
            };

            // Vérification minimale
            if (!data.nom || !data.adresse || !data.cp || !data.ville || !data.email || !data.montant) {
                alert('Veuillez remplir tous les champs requis.');
                return;
            }

            fetch('/back/send-famille.php', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(response => {
                if (response.success) {
                    alert('Merci pour votre proposition de don par virement ! Nous vous contacterons par mail.');
                    virementForm.reset();
                } else {
                    alert(response.error || 'Erreur lors de l’envoi.');
                }
            })
            .catch(() => {
                alert('Erreur lors de l’envoi. Merci de réessayer.');
            });
        });
    }

    /* DON PAR CARTE BANCAIRE
       (SIMULATION UNIQUEMENT) */
    const cbForm = document.getElementById('cb-form');

    if (cbForm) {
        cbForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Aucune donnée bancaire n’est envoyée au serveur
            alert('Merci pour votre don par carte bancaire ! (Simulation)');
            cbForm.reset();
        });
    }

});