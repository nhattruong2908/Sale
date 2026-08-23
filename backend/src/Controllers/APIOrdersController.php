<?php
require_once __DIR__ . '/../Services/OrderService.php';
require_once __DIR__ . '/../Controllers/CommonController.php';

use Sales\Config\Database;

class APIOrdersController
{
    protected $orderService;
    protected $commonController;

    public function __construct()
    {
        $database = new Database();
        $conn = $database->connect();
        $this->orderService = new OrderService($conn);
        $this->commonController = new CommonController();
    }

    public function addOrder()
    {
        $data = $this->commonController->getData();
        $result = $this->orderService->addOrder($data['user_id'] ?? null);
        $this->commonController->respond($result);
    }

    public function getListOrder()
    {
        $result = $this->orderService->getListOrder($_GET ?? []);
        $this->commonController->respond($result);
    }
}
