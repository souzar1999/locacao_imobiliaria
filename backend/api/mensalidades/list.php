<?php
require_once '../../header_config.php';
require_once '../../class/Mensalidade.class.php';

$id = $_GET['id'];

$mensalidade = new Mensalidade;
$mensalidade->list($id);

if($mensalidade->getError() != null){
    $return_arr = $mensalidade->getError();
}else{
    $return_arr = $mensalidade->getResponse();
}

echo json_encode($return_arr);

?>