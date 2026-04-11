<?php
require_once __DIR__ . '/../Models/function/UserModel.php';
require_once __DIR__ . '/../Controllers/CommonController.php';

use Sales\Config\Database;

class APIUserController
{
    protected $conn;
    protected $userModel;
    protected $commonController;

    public function __construct()
    {
        // 🔥 KẾT NỐI DB 1 LẦN DUY NHẤT
        $database = new Database();
        $this->conn = $database->connect();
        // 🔥 KHỞI TẠO MODEL DÙNG CHUNG
        $this->userModel = new UserModel($this->conn);
        $this->commonController = new CommonController();
    }
    public function login()
    {
        $data = $this->commonController->getData();

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (empty($email) || empty($password)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing email or password"]);
            return;
        }

        $user = $this->userModel->login($email, $password);

        if (!$user) {
            echo json_encode(["error" => "Invalid login"]);
            return;
        }

        echo json_encode([
            "status" => "success",
            "user" => [
                "id" => $user["id"],
                "name" => $user["name"],
                "email" => $user["email"]
            ]
        ]);
    }
    public function getList()
    {
        $listUser = [];
        $queryParam = $_GET ?? [];
        $listUser = $this->userModel->getList($queryParam);
        if (isset($listUser)) {
            echo json_encode( $this->commonController->responseValue($listUser));
        } else {
            echo json_encode([
                "status" => "fasle",
                "error" => $listUser
            ]);
        }
    }
    public function getDetail(int $id)
    {
      
        $result = $this->userModel->getUserById($id);
        if (!$result) {
            echo json_encode([
                "status" => "fasle",
                "data" => []
            ]);
        } else {
            echo json_encode([
                "status" => "success",
                "data" => $result
            ]);
        }
    }
    public function addUser()
    {
        $data = $this->commonController->getData();
        $name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];
        $birthday = $data['birthday'];
        $sex = $data['sex'];
        $result = $this->userModel->addUser($name, $email, $password, $birthday, $sex);
        if ($result === true) {
            echo json_encode([
                "status" => "success",
                "message" => "User added successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "false",
                "error" => $result
            ]);
        }
    }
    public function updateUser(int $id)
    {
        $data = $this->commonController->getData();
        $name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];
        $birthday = $data['birthday'];
        $sex = $data['sex'];
        $result = $this->userModel->updateUser($id, $name, $email, $password, $birthday, $sex);
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
    public function deleteUser(int $id)
    {
        $result = $this->userModel->deleteUser($id);
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
