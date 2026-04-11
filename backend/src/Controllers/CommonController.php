<?php
class CommonController
{
    public function __construct() {}
    public function getData()
    {
        $rawBody = file_get_contents("php://input");
        $data = json_decode($rawBody, true);
        return $data;
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
}
