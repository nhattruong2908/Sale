<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require __DIR__ . '/../vendor/autoload.php';

use Sales\Config\Database;

$db = new Database();
$conn = $db->connect();

if ($conn) {
    echo "✅ Connected to MySQL successfully!";
} else {
    echo "❌ Failed to connect to MySQL!";
}