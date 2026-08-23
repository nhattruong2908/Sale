<?php
class Router {
    private array $routes = [];

    public function add(string $method, string $path, callable $handler): void
    {
        $this->routes[] = [
            'method'  => strtoupper($method),
            'path'    => $path,
            'handler' => $handler
        ];
    }

   public function dispatch(): void
{
    $method = $_SERVER['REQUEST_METHOD'];

    // Lấy URL path
    $uri = trim(
        parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH),
        '/'
    );

    // Bỏ prefix "api/"
    if (str_starts_with($uri, 'api/')) {
        $uri = substr($uri, 4);
    }

    foreach ($this->routes as $route) {

        // Check HTTP method
        if ($method !== $route['method']) {
            continue;
        }

        // Chuyển {id} thành regex
        $pattern = preg_replace(
            '#\{(\w+)\}#',
            '(?P<$1>[^/]+)',
            $route['path']
        );

        $pattern = '#^' . trim($pattern, '/') . '$#';

        // Match route
        if (preg_match($pattern, $uri, $matches)) {

            // Lấy parameter
            $params = array_filter(
                $matches,
                'is_string',
                ARRAY_FILTER_USE_KEY
            );

            // Gọi Controller
            call_user_func_array(
                $route['handler'],
                array_values($params)
            );

            return;
        }
    }

    // Không tìm thấy route
    http_response_code(404);

    echo json_encode([
        'error' => 'Route not found',
        'method' => $method,
        'uri' => $uri
    ]);
}
}