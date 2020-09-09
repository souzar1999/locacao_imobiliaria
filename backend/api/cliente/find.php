<?php
header('Content-Type: application/json');

require_once '../../class/Cliente.class.php';

$id = $_GET['id'];

$cliente = new Cliente;
$cliente->find($id);

if($cliente->getError() != null){
    $return_arr = $cliente->getError();
}else{
    $return_arr = $cliente->getResponse();
}

echo json_encode($return_arr);

?>