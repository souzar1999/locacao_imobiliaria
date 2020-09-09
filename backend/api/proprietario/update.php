<?php
header('Content-Type: application/json');

require_once '../../class/Proprietario.class.php';

$id = $_GET['id'];
$data = json_decode(file_get_contents('php://input'));

$proprietario = new Proprietario;
$proprietario->update($id, $data);

if($proprietario->getError() != null){
    $return_arr = $proprietario->getError();
}else{
    $return_arr = $proprietario->getResponse();
}

echo json_encode($return_arr);

?>