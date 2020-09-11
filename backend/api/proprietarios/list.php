<?php
require_once '../../header_config.php';
require_once '../../class/Proprietario.class.php';

$proprietario = new Proprietario;
$proprietario->list();

if($proprietario->getError() != null){
    $return_arr = $proprietario->getError();
}else{
    $return_arr = $proprietario->getResponse();
}

echo json_encode($return_arr);

?>