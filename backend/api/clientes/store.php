<?php
require_once '../../header_config.php';
require_once '../../class/Cliente.class.php';

$data = json_decode(file_get_contents('php://input'));

$cliente = new Cliente;
$cliente->store($data);

if($cliente->getError() != null){
    $return_arr = $cliente->getError();
}else{
    $return_arr = $cliente->getResponse();
}

echo json_encode($return_arr);

?>