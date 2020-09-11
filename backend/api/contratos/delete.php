<?php
require_once '../../header_config.php';
require_once '../../class/Contrato.class.php';

$id = $_GET['id'];

$contrato = new Contrato;
$contrato->delete($id);

if($contrato->getError() != null){
    $return_arr = $contrato->getError();
}else{
    $return_arr = $contrato->getResponse();
}

echo json_encode($return_arr);

?>