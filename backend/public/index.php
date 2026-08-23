<?php

// =========================
// CORS
// =========================

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigin = getenv('CORS_ALLOWED_ORIGIN');

if ($origin === $allowedOrigin) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: " . getenv('CORS_ALLOWED_METHODS'));
header("Access-Control-Allow-Headers: " . getenv('CORS_ALLOWED_HEADERS'));
header("Access-Control-Allow-Credentials: true");

// CORS Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}


// =========================
// Application
// =========================

require __DIR__ . '/../vendor/autoload.php';

header('Content-Type: application/json');

$router = require __DIR__ . '/../src/Routes/api.php';

$router->dispatch();