<?php
header('Content-Type: application/json');

require_once '../../class/Cliente.class.php';

$id = $_GET['id'];
$data = json_decode(file_get_contents('php://input'));

$cliente = new Cliente;
$cliente->update($id, $data);

if($cliente->getError() != null){
    $return_arr = $cliente->getError();
}else{
    $return_arr = $cliente->getResponse();
}

echo json_encode($return_arr);

?>