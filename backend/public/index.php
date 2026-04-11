<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);
require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/Routes/api.php';
require __DIR__ . '/../src/Controllers/APIUserController.php';
require __DIR__ . '/../src/Controllers/APIProductController.php';
require __DIR__ . '/../src/Controllers/APIOrdersController.php';
require __DIR__ . '/../src/Routes/router.php';
use Sales\Config\Database;
$db = new Database();
$conn = $db->connect();

$router = new Router();

$router->add('POST',   'User/login',        [new APIUserController(), 'login']);
$router->add('GET',    'User/getList',      [new APIUserController(), 'getList']);
$router->add('POST',   'User/addUser',      [new APIUserController(), 'addUser']);
$router->add('GET',   'User/getDetail/{id}',      [new APIUserController(), 'getDetail']);
$router->add('POST',    'User/updateUser/{id}', [new APIUserController(), 'updateUser']);
$router->add('POST', 'User/deleteUser/{id}', [new APIUserController(), 'deleteUser']);
// $router->add('GET',    'Product/getProducts',      [new APIProductController(), 'getProducts']);
// $router->add('POST',   'Product/addProducts',      [new APIProductController(), 'addProduct']);
// $router->add('POST',    'Product/updateProducts/{id}', [new APIProductController(), 'updateProduct']);
// $router->add('POST', 'Product/deleteProducts/{id}', [new APIProductController(), 'deleteProduct']);
$router->add('POST', 'Order/addOrder', [new APIOrdersController(), 'addOrder']);

$router->dispatch();