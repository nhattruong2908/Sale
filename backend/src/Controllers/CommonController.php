<?php
class CommonController
{
    public function __construct() {}
    public function getData()
    {
        $rawBody = file_get_contents("php://input");
        $data = json_decode($rawBody, true);
        return $data ?? [];
    }
    public function responseValue(array $result = [], ?string $error = null)
    {
        if (isset($error)) {
            $format = [
                "status" => "false",
                "error" => $error
            ];
        } else {
            $format = [
                "status" => "success",
                "data" => $result
            ];
        }
        return  $format;
    }
    // Renders the standard {success, data|message} shape returned by every Service method
    public function respond(array $result): void
    {
        if (empty($result['success'])) {
            echo json_encode(["status" => "false", "error" => $result['error'] ?? 'Unknown error']);
            return;
        }

        if (array_key_exists('message', $result)) {
            echo json_encode(["status" => "success", "message" => $result['message']]);
            return;
        }

        echo json_encode(["status" => "success", "data" => $result['data'] ?? []]);
    }
}
