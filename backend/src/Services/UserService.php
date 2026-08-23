<?php
require_once __DIR__ . '/../Logic/UserLogic.php';

class UserService
{
    private $userLogic;

    public function __construct($conn)
    {
        $this->userLogic = new UserLogic($conn);
    }

    public function login($email, $password)
    {
        if (empty($email) || empty($password)) {
            return ['success' => false, 'httpCode' => 400, 'error' => 'Missing email or password'];
        }

        $user = $this->userLogic->login($email, $password);
        if (!$user) {
            return ['success' => false, 'httpCode' => 401, 'error' => 'Invalid login'];
        }

        return [
            'success' => true,
            'data' => [
                'token' => bin2hex(random_bytes(16)),
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'role' => $user['role'] ?? 'user',
                ],
            ],
        ];
    }

    public function getList(array $queryParam)
    {
        $result = $this->userLogic->getList($queryParam);
        if (!is_array($result)) {
            return ['success' => false, 'error' => $result];
        }
        return ['success' => true, 'data' => $result];
    }

    public function getDetail($id)
    {
        $result = $this->userLogic->getUserById($id);
        if (!$result) {
            return ['success' => false, 'error' => 'User not found'];
        }
        return ['success' => true, 'data' => $result];
    }

    public function addUser(array $data)
    {
        $name = $data['name'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        $birthday = $data['birthday'] ?? null;
        $sex = $data['sex'] ?? null;

        if (empty($name) || empty($email) || empty($password)) {
            return ['success' => false, 'error' => 'Missing required fields'];
        }

        $result = $this->userLogic->addUser($name, $email, $password, $birthday, $sex);
        if ($result !== true) {
            return ['success' => false, 'error' => $result];
        }
        return ['success' => true, 'message' => 'User added successfully'];
    }

    public function updateUser($id, array $data)
    {
        $name = $data['name'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        $birthday = $data['birthday'] ?? null;
        $sex = $data['sex'] ?? null;

        if (empty($name) || empty($email) || empty($password)) {
            return ['success' => false, 'error' => 'Missing required fields'];
        }

        $result = $this->userLogic->updateUser($id, $name, $email, $password, $birthday, $sex);
        if ($result !== true) {
            return ['success' => false, 'error' => $result];
        }
        return ['success' => true, 'message' => 'User updated successfully'];
    }

    public function deleteUser($id)
    {
        $result = $this->userLogic->deleteUser($id);
        if ($result !== true) {
            return ['success' => false, 'error' => $result];
        }
        return ['success' => true, 'message' => 'User deleted successfully'];
    }
}
