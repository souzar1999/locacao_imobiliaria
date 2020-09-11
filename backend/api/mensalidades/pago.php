<?php
require_once '../../header_config.php';
require_once '../../class/Mensalidade.class.php';

$id = $_GET['id'];
$data = json_decode(file_get_contents('php://input'));

$mensalidade = new Mensalidade;
$mensalidade->pago($id, $data);

if($mensalidade->getError() != null){
    $return_arr = $mensalidade->getError();
}else{
    $return_arr = $mensalidade->getResponse();
}

echo json_encode($return_arr);

?>