<?php
require_once __DIR__ . '/../Logic/OrderLogic.php';

class OrderService
{
    private $orderLogic;

    public function __construct($conn)
    {
        $this->orderLogic = new OrderLogic($conn);
    }

    public function addOrder($userId)
    {
        if (empty($userId)) {
            return ['success' => false, 'error' => 'Missing user_id'];
        }

        $result = $this->orderLogic->addOrder($userId);
        if ($result !== true) {
            return ['success' => false, 'error' => $result];
        }
        return ['success' => true, 'message' => 'Order added successfully'];
    }

    public function getListOrder(array $queryParam)
    {
        $result = $this->orderLogic->getListOrder($queryParam);
        if (!is_array($result)) {
            return ['success' => false, 'error' => $result];
        }
        return ['success' => true, 'data' => $result];
    }
}
