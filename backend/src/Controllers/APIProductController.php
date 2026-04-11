 
<?php
require_once __DIR__ . '/../Models/function/ProductModel.php';
require_once __DIR__ . '/../Controllers/CommonController.php';

use Sales\Config\Database;

class APIProductController
{
    protected $conn;
    protected $productModel;
    protected $commonController;

    public function __construct()
    {
        // 🔥 KẾT NỐI DB 1 LẦN DUY NHẤT
        $database = new Database();
        $this->conn = $database->connect();
        // 🔥 KHỞI TẠO MODEL DÙNG CHUNG
        $this->productModel = new ProductModel($this->conn);
        $this->commonController = new CommonController();
    }
    public function addProduct()
    {
        $data = $this->commonController->getData();
        $name = $data['name'];
        $price = $data['price'];
        $result = $this->productModel->addProduct($name,$price);
        if ($result === true) {
            echo json_encode([
                "status" => "success",
                "message" => "Product added successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "false",
                "error" => $result
            ]);
        }
    }
        public function getList()
    {
        $listUser = [];
        $queryParam = $_GET ?? [];
        $listUser = $this->productModel->getProducts($queryParam);
        if (isset($listUer)) {
            echo json_encode([
                "status" => "success",
                "data" => $listUser
            ]);
        } else {
            echo json_encode([
                "status" => "fasle",
                "error" => $listUser
            ]);
        }
    }
     public function updateProduct(int $id){
        $data = $this->commonController->getData();
        $name = $data['name'];
        $price = $data['price'];
        $result = $this->productModel->updateProduct($id,$name, $price);
         if ($result === true) {
            echo json_encode([
                "status" => "success",
                "message" => "update user successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "false",
                "error" => $result
            ]);
        }
    }
    public function deleteProduct(int $id){
        $result = $this->productModel->deleteProduct($id);
         if ($result === true) {
            echo json_encode([
                "status" => "success",
                "message" => "delete user successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "false",
                "error" => $result
            ]);
        }
    }
   
}
