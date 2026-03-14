<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

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
    echo json_encode(["error" => "Service temporairement indisponible."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['type']) || $data['type'] !== 'virement') {
    echo json_encode(["error" => "Type de don non pris en charge."]);
    exit;
}

$required = ['nom','adresse','cp','ville','email','montant'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        echo json_encode(["error" => "Veuillez remplir tous les champs requis."]);
        exit;
    }
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO dons (nom, adresse, cp, ville, email, montant)
        VALUES (?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $data['nom'],
        $data['adresse'],
        $data['cp'],
        $data['ville'],
        $data['email'],
        $data['montant']
    ]);

    echo json_encode(["success" => true]);

} catch (PDOException $e) {
    echo json_encode(["error" => "Une erreur est survenue lors de l’enregistrement du don."]);
}