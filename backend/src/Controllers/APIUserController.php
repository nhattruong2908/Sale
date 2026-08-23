<?php
require_once __DIR__ . '/../Services/UserService.php';
require_once __DIR__ . '/../Controllers/CommonController.php';

use Sales\Config\Database;

class APIUserController
{
    protected $userService;
    protected $commonController;

    public function __construct()
    {
        $database = new Database();
        $conn = $database->connect();
        $this->userService = new UserService($conn);
        $this->commonController = new CommonController();
    }

    public function login()
    {
        $data = $this->commonController->getData();
        $result = $this->userService->login($data['email'] ?? null, $data['password'] ?? null);
        if (!empty($result['httpCode'])) {
            http_response_code($result['httpCode']);
        }
        $this->commonController->respond($result);
    }

    public function getList()
    {
        $result = $this->userService->getList($_GET ?? []);
        $this->commonController->respond($result);
    }

    public function getDetail(int $id)
    {
        $result = $this->userService->getDetail($id);
        $this->commonController->respond($result);
    }

    public function addUser()
    {
        $data = $this->commonController->getData();
        $result = $this->userService->addUser($data);
        $this->commonController->respond($result);
    }

    public function updateUser(int $id)
    {
        $data = $this->commonController->getData();
        $result = $this->userService->updateUser($id, $data);
        $this->commonController->respond($result);
    }

    public function deleteUser(int $id)
    {
        $result = $this->userService->deleteUser($id);
        $this->commonController->respond($result);
    }
}
