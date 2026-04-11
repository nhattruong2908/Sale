<?php
class OrdersModel
{
    private $conn;
    public function __construct($db)
    {
        $this->conn = $db;
    }
    public function addOrder($userId)
    {
        try {
            $this->conn->beginTransaction();
            $code = $this->genOrderCode();
            $sql = "INSERT INTO orders (user_id, code,create_date) VALUES (:user_id, :code, NOW())";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([
                ':user_id' => $userId,
                ':code' => $code,
            ]);
            $this->conn->commit();
            return true;
        } catch (Exception $ex) {
            $this->conn->rollBack();
            return $ex->getMessage();
        }
    }
    public function getListOrder(array $queryParam = []) {
         try {
            $page  = max(1, (int)($queryParam['page'] ?? 1));
            $limit = max(1, (int)($queryParam['limit'] ?? 10));
            $offset = ($page - 1) * $limit;
            $code = $queryParam['code'];
            $where  = " WHERE del_flag = 0 ";
            $params = [];
            if (!empty($code)) {
                $where .= " and code like :code";
                $params[':code'] = '%' . $queryParam['code'] . '%';
            }
            $sql = "SELECT * FROM orders $where";
            $sql .= " order by id desc LIMIT :limit OFFSET :offset";
            $stmt = $this->conn->prepare($sql);
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
            $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
            $stmt->execute();

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $sqlCount = "select count(*) from orders $where";
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
    private function genOrderCode()
    {
        $prefix = 'ORD-';
        $date = date('Ymdhis');

        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $random = '';
        for ($i = 0; $i < 6; $i++) {
            $random .= $chars[random_int(0, strlen($chars) - 1)];
        }

        return $prefix . $date . '-' . $random;
    }
}
