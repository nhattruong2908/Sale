<?php

require_once __DIR__ . '/router.php';
require_once __DIR__ . '/../Controllers/APIUserController.php';
require_once __DIR__ . '/../Controllers/APIProductController.php';
require_once __DIR__ . '/../Controllers/APIOrdersController.php';

$router = new Router();

// User
$router->add('POST', 'User/login', [new APIUserController(), 'login']);
$router->add('GET', 'User/getList', [new APIUserController(), 'getList']);
$router->add('GET', 'User/getDetail/{id}', [new APIUserController(), 'getDetail']);
$router->add('POST', 'User/addUser', [new APIUserController(), 'addUser']);
$router->add('POST', 'User/updateUser/{id}', [new APIUserController(), 'updateUser']);
$router->add('POST', 'User/deleteUser/{id}', [new APIUserController(), 'deleteUser']);

// Product
$router->add('GET', 'Product/getList', [new APIProductController(), 'getList']);
$router->add('GET', 'Product/getDetail/{id}', [new APIProductController(), 'getDetail']);
$router->add('POST', 'Product/addProduct', [new APIProductController(), 'addProduct']);
$router->add('POST', 'Product/updateProduct/{id}', [new APIProductController(), 'updateProduct']);
$router->add('POST', 'Product/deleteProduct/{id}', [new APIProductController(), 'deleteProduct']);

// Order
$router->add('POST', 'Order/addOrder', [new APIOrdersController(), 'addOrder']);
$router->add('GET', 'Order/getListOrder', [new APIOrdersController(), 'getListOrder']);

return $router;
