
<?php
$data = json_decode(file_get_contents("php://input"), true);
$expression = $data['expression'];
try {
    $result = eval("return $expression;");
    echo json_encode(['result' => $result]);
} catch (Exception $e) {
    echo json_encode(['result' => 'Error']);
}
?>
