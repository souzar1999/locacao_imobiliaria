<?php
require_once '../../header_config.php';
require_once '../../class/Contrato.class.php';

$data = json_decode(file_get_contents('php://input'));

$contrato = new Contrato;
$contrato->store($data);

if($contrato->getError() != null){
    $return_arr = $contrato->getError();
}else{
    $return_arr = $contrato->getResponse();
}

echo json_encode($return_arr);

?>