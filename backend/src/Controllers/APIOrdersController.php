<?php
require_once __DIR__ . '/../Controllers/CommonController.php';
require_once __DIR__ . '/../Models/function/OrdersModel.php';
use Sales\Config\Database;

class APIOrdersController
{
    protected $conn;
    protected $ordersModel;
    protected $commonController;
    public function __construct()
    {
        // 🔥 KẾT NỐI DB 1 LẦN DUY NHẤT
        $database = new Database();
        $this->conn = $database->connect();
        // 🔥 KHỞI TẠO MODEL DÙNG CHUNG
        $this->ordersModel = new OrdersModel($this->conn);
        $this->commonController = new CommonController();
    }
    public function addOrder()
    {
        $data = $this->commonController->getData();
        $user_id = $data['user_id'];
        $result = $this->ordersModel->addOrder($user_id);
        if ($result === true) {
            echo json_encode([
                "status" => "success",
                "message" => "order added successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "false",
                "error" => $result
            ]);
        }
    }

    public function getListOrder()
    {
        $listOrder = [];
        $queryParam = $_GET ?? [];
        $listOrder = $this->ordersModel->getListOrder($queryParam);
        if (isset($listOrder)) {
            echo json_encode( $this->commonController->responseValue($listOrder));
        } else {
            echo json_encode([
                "status" => "fasle",
                "error" => $listOrder
            ]);
        }
    }

    public function updateOrder($id)
    {
        // Logic to update an order by ID
    }

    public function deleteOrder($id)
    {
        // Logic to delete an order by ID
    }
}
