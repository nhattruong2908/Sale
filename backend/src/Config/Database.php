<?php
namespace Sales\Config;

use PDO;
use PDOException;

class Database
{
    private $host;
    private $port;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct()
    {
        $this->host = getenv('DB_HOST') ?: 'mysql';
        $this->port = getenv('DB_PORT') ?: '3306';
        $this->db_name = getenv('DB_DATABASE') ?: 'sales_db';
        $this->username = getenv('DB_USERNAME') ?: 'root';
        $this->password = getenv('DB_PASSWORD') ?: 'root';
    }

    public function connect()
    {
        $this->conn = null;

        try {
            $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->db_name};charset=utf8mb4";
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "❌ Connection error: " . $e->getMessage();
        }

        return $this->conn;
    }
}
