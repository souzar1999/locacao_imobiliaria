<?php
require_once '../../header_config.php';
require_once '../../class/Contrato.class.php';

$contrato = new Contrato;
$contrato->list();

if($contrato->getError() != null){
    $return_arr = $contrato->getError();
}else{
    $return_arr = $contrato->getResponse();
}

echo json_encode($return_arr);

?>