 <?php

use App\Models\Entities\Common;

 class Product extends Common{

    public $name;
    public $price;
    public $description;
    public function __construct( $name, $price, $description) {
        $this->name = $name;
        $this->price = $price;
        $this->description = $description;
    }


    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getPrice() {
        return $this->price;
    }

    public function setPrice($price) {
        $this->price = $price;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
 }
