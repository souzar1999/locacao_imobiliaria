<?php
header('Content-Type: application/json');

require_once '../../class/Proprietario.class.php';

$data = json_decode(file_get_contents('php://input'));

$proprietario = new Proprietario;
$proprietario->store($data);

if($proprietario->getError() != null){
    $return_arr = $proprietario->getError();
}else{
    $return_arr = $proprietario->getResponse();
}

echo json_encode($return_arr);

?>