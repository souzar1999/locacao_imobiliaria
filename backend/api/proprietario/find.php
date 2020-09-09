<?php
header('Content-Type: application/json');

require_once '../../class/Proprietario.class.php';

$id = $_GET['id'];

$proprietario = new Proprietario;
$proprietario->find($id);

if($proprietario->getError() != null){
    $return_arr = $proprietario->getError();
}else{
    $return_arr = $proprietario->getResponse();
}

echo json_encode($return_arr);

?>