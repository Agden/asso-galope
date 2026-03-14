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
    echo json_encode(["error" => "Service temporairement indisponible."]);
    exit;
}

// Lecture JSON
$data = json_decode(file_get_contents("php://input"), true);

// Champs requis (sans téléphone)
$required = ['email','ville','cp','message'];
foreach ($required as $field) {
    if (!isset($data[$field]) || trim($data[$field]) === '') {
        echo json_encode(["error" => "Veuillez remplir tous les champs obligatoires."]);
        exit;
    }
}

// Téléphone facultatif
$telephone = isset($data['telephone']) && trim($data['telephone']) !== ''
    ? $data['telephone']
    : null;

try {
    $stmt = $pdo->prepare("
        INSERT INTO denonce
        (email, ville, cp, telephone, message)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $data['email'],
        $data['ville'],
        $data['cp'],
        $telephone,
        $data['message']
    ]);

    echo json_encode(["success" => true]);

} catch (PDOException $e) {
    echo json_encode(["error" => "Une erreur est survenue lors de l’envoi du message."]);
}