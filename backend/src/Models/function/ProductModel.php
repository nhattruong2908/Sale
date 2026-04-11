<?php
class ProductModel
{
    private $conn;
    public function __construct($db)
    {
        $this->conn = $db;
    }
    public function getProducts(array $queryParam = [])
    {
        try {
            $page  = max(1, (int)($queryParam['page'] ?? 1));
            $limit = max(1, (int)($queryParam['limit'] ?? 10));
            $offset = ($page - 1) * $limit;
            $name = $queryParam['name'];
            $where  = " WHERE del_flag = 0 ";
            $params = [];
            if (!empty($name)) {
                $where .= " and name like :name";
                $params[':name'] = '%' . $queryParam['name'] . '%';
            }
            $sql = "SELECT * FROM products $where";
            $sql .= " order by id desc LIMIT :limit OFFSET :offset";
            $stmt = $this->conn->prepare($sql);
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
            $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
            $stmt->execute();

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $sqlCount = "select count(*) from products $where";
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
    public function getProductById($id)
    {
        $sql = "SELECT * FROM products WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':id' => $id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result;
    }
    public function addProduct($name, $price)
    {
        try {
            $this->conn->beginTransaction();
            $sql = "INSERT INTO products (name, price, create_date,update_date,del_flag)
            VALUES (:name, :price, :create_date,:update_date,:del_flag)";
            $createDate = date('Y-m-d H:i:s');

            $stmt = $this->conn->prepare($sql);
            $result = $stmt->execute([
                ':name' => $name,
                ':price' => $price,
                ':create_date' => $createDate,
                ':update_date' => null,
                ':del_flag' => 0
            ]);
            $this->conn->commit();

            return $result;
        } catch (PDOException $th) {
            $this->conn->rollBack();
            return $th->getMessage();
        }
    }
    public function updateProduct($id, $name, $price)
    {
        try {
            $this->conn->beginTransaction();
            $sql = "UPDATE products SET name = :name, price = :price, update_date = :update_date WHERE id = :id";
            $updateDate = date('Y-m-d H:i:s');
            $stmt = $this->conn->prepare($sql);
            $result = $stmt->execute([
                ':id' => $id,
                ':name' => $name,
                ':price' => $price,
                ':update_date' => $updateDate,

            ]);
            $this->conn->commit();
            return $result;
        } catch (PDOException $th) {
            $this->conn->rollBack();
            return $th->getMessage();
        };
    }
    public function deleteProduct($id)
    {
        try {
            $this->conn->beginTransaction();
            $sql = "UPDATE products SET del_flag = 1, update_date = :update_date WHERE id = :id";
            $updateDate = date('Y-m-d H:i:s');
            $stmt = $this->conn->prepare($sql);
            $result = $stmt->execute([
                ':id' => $id,
                ':update_date' => $updateDate,
            ]);
            $this->conn->commit();
            return $result;
        } catch (PDOException $th) {
            $this->conn->rollBack();
            return $th->getMessage();
        };
    }
}
