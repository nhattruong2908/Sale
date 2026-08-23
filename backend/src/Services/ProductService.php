<?php
require_once __DIR__ . '/../Logic/ProductLogic.php';

class ProductService
{
    private $productLogic;

    public function __construct($conn)
    {
        $this->productLogic = new ProductLogic($conn);
    }

    public function getList(array $queryParam)
    {
        $result = $this->productLogic->getProducts($queryParam);
        if (!is_array($result)) {
            return ['success' => false, 'error' => $result];
        }
        return ['success' => true, 'data' => $result];
    }

    public function getDetail($id)
    {
        $result = $this->productLogic->getProductById($id);
        if (!$result) {
            return ['success' => false, 'error' => 'Product not found'];
        }
        return ['success' => true, 'data' => $result];
    }

    public function addProduct(array $data)
    {
        $name = $data['name'] ?? null;
        $price = $data['price'] ?? null;

        if (empty($name) || $price === null) {
            return ['success' => false, 'error' => 'Missing required fields'];
        }

        $result = $this->productLogic->addProduct($name, $price);
        if ($result !== true) {
            return ['success' => false, 'error' => $result];
        }
        return ['success' => true, 'message' => 'Product added successfully'];
    }

    public function updateProduct($id, array $data)
    {
        $name = $data['name'] ?? null;
        $price = $data['price'] ?? null;

        if (empty($name) || $price === null) {
            return ['success' => false, 'error' => 'Missing required fields'];
        }

        $result = $this->productLogic->updateProduct($id, $name, $price);
        if ($result !== true) {
            return ['success' => false, 'error' => $result];
        }
        return ['success' => true, 'message' => 'Product updated successfully'];
    }

    public function deleteProduct($id)
    {
        $result = $this->productLogic->deleteProduct($id);
        if ($result !== true) {
            return ['success' => false, 'error' => $result];
        }
        return ['success' => true, 'message' => 'Product deleted successfully'];
    }
}
