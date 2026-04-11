<?php

use App\Models\Entities\Common;
class Order extends Common{
    public $userId;
    public $code;
    public function __construct( $userId, $code,) {
        $this->userId = $userId;
        $this->code = $code;
    }
     public function getUserId() {
        return $this->userId;
    }

    public function setUserID($userId) {
        $this->userId = $userId;
    }
     public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }
}