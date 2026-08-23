<?php
class UserLogic
{
    private $conn;
    public function __construct($db)
    {
        $this->conn = $db;
    }
    public function login($email, $password)
    {
        $sql = "SELECT * FROM users WHERE email = :email AND password = :password";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            ':email' => $email,
            ':password' => $password
        ]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            return $result;
        } else {
            return false;
        }
    }
    public function getList(array $queryParam = [])
    {
        try {
            $page  = max(1, (int)($queryParam['page'] ?? 1));
            $limit = max(1, (int)($queryParam['limit'] ?? 10));
            $offset = ($page - 1) * $limit;
            $name = $queryParam['name'] ?? null;
            $where  = " WHERE del_flag = 0 ";
            $params = [];
            if (!empty($name)) {
                $where .= " and name like :name";
                $params[':name'] = '%' . $name . '%';
            }
            $sql = "SELECT * FROM users $where";
            $sql .= " order by id desc LIMIT :limit OFFSET :offset";
            $stmt = $this->conn->prepare($sql);
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
            $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
            $stmt->execute();

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $sqlCount = "select count(*) from users $where";
            $stmt = $this->conn->prepare($sqlCount);
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            $stmt->execute();
            $total = $stmt->fetchColumn();
            $resultCount = $total;

            return ['count' => $resultCount, 'data' => $result];
        } catch (Exception $ex) {
            return $ex->getMessage();
        }
    }
    public function getUserById($id)
    {
        try {
            $sql = "SELECT * FROM users WHERE del_flag = 0 and id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([':id' => $id]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $th) {
            return $th->getMessage();
        }
    }
    public function addUser($name, $email, $password, $birthday, $sex)
    {
        try {
            $this->conn->beginTransaction();
            $sql = "INSERT INTO users (name, email, password , birthday, sex,created_at,updated_at,del_flag)
            VALUES (:name, :email, :password, :birthday, :sex,:created_at,:updated_at,:del_flag)";
            $createDate = date('Y-m-d H:i:s');

            $stmt = $this->conn->prepare($sql);
            $result = $stmt->execute([
                ':name' => $name,
                ':email' => $email,
                ':password' => $password,
                ':birthday' => $birthday,
                ':sex' => $sex,
                ':created_at' => $createDate,
                ':updated_at' => null,
                ':del_flag' => 0
            ]);
            $this->conn->commit();

            return $result;
        } catch (PDOException $th) {
            $this->conn->rollBack();
            return $th->getMessage();
        }
    }
    public function updateUser($id, $name, $email, $password, $birthday, $sex)
    {
        try {
            $this->conn->beginTransaction();
            $sql = "UPDATE users SET name = :name, email = :email, password = :password,
                    birthday = :birthday, sex=:sex, updated_at = :updated_at WHERE id = :id";
            $updateDate = date('Y-m-d H:i:s');
            $stmt = $this->conn->prepare($sql);
            $result = $stmt->execute([
                ':id' => $id,
                ':name' => $name,
                ':email' => $email,
                ':password' => $password,
                ':birthday' => $birthday,
                ':updated_at' => $updateDate,
                ':sex' => $sex
            ]);
            $this->conn->commit();
            return $result;
        } catch (PDOException $th) {
            $this->conn->rollBack();
            return $th->getMessage();
        };
    }
    public function deleteUser($id)
    {
        try {
            $this->conn->beginTransaction();
            $sql = "UPDATE users SET del_flag = 1, updated_at = :updated_at WHERE id = :id";
            $updateDate = date('Y-m-d H:i:s');
            $stmt = $this->conn->prepare($sql);
            $result = $stmt->execute([
                ':id' => $id,
                ':updated_at' => $updateDate,
            ]);
            $this->conn->commit();
            return $result;
        } catch (PDOException $th) {
            $this->conn->rollBack();
            return $th->getMessage();
        };
    }
}
