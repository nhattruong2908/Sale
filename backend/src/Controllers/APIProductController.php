<?php
require_once __DIR__ . '/../Services/ProductService.php';
require_once __DIR__ . '/../Controllers/CommonController.php';

use Sales\Config\Database;

class APIProductController
{
    protected $productService;
    protected $commonController;

    public function __construct()
    {
        $database = new Database();
        $conn = $database->connect();
        $this->productService = new ProductService($conn);
        $this->commonController = new CommonController();
    }

    public function getList()
    {
        $result = $this->productService->getList($_GET ?? []);
        $this->commonController->respond($result);
    }

    public function getDetail(int $id)
    {
        $result = $this->productService->getDetail($id);
        $this->commonController->respond($result);
    }

    public function addProduct()
    {
        $data = $this->commonController->getData();
        $result = $this->productService->addProduct($data);
        $this->commonController->respond($result);
    }

    public function updateProduct(int $id)
    {
        $data = $this->commonController->getData();
        $result = $this->productService->updateProduct($id, $data);
        $this->commonController->respond($result);
    }

    public function deleteProduct(int $id)
    {
        $result = $this->productService->deleteProduct($id);
        $this->commonController->respond($result);
    }
}
