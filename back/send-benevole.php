<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Connexion DB
$host = 'mysql-ecoute-le.alwaysdata.net';
$db   = 'ecoute-le_dons';
$user = 'ecoute-le';
$pass = 'tT01122012?';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db;charset=utf8mb4",
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    // Message générique en production
    echo json_encode(["error" => "Service temporairement indisponible."]);
    exit;
}

// Lecture JSON
$data = json_decode(file_get_contents("php://input"), true);

// Vérification des champs requis
$required = ['nom','prenom','dob','adresse','cp','ville','telephone','email','statut'];
foreach ($required as $field) {
    if (!isset($data[$field]) || empty($data[$field])) {
        echo json_encode(["error" => "Veuillez remplir tous les champs requis."]);
        exit;
    }
}

// Conversion date
$date = DateTime::createFromFormat('d/m/Y', $data['dob']);
if (!$date) {
    echo json_encode(["error" => "Date de naissance invalide."]);
    exit;
}
$date_sql = $date->format('Y-m-d');

// statut tableau → string
$statut = is_array($data['statut']) ? implode(',', $data['statut']) : $data['statut'];

try {
    $stmt = $pdo->prepare("
        INSERT INTO benevole
        (nom, prenom, date_naissance, adresse, cp, ville, telephone, email, statut)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $data['nom'],
        $data['prenom'],
        $date_sql,
        $data['adresse'],
        $data['cp'],
        $data['ville'],
        $data['telephone'],
        $data['email'],
        $statut
    ]);

    echo json_encode(["success" => true]);

} catch (PDOException $e) {
    // Message générique côté utilisateur
    echo json_encode(["error" => "Une erreur est survenue lors de l’enregistrement."]);
}
