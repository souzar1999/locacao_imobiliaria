<?php
require_once '../../header_config.php';
require_once '../../class/Imovel.class.php';

$id = $_GET['id'];
$data = json_decode(file_get_contents('php://input'));

$imovel = new Imovel;
$imovel->update($id, $data);

if($imovel->getError() != null){
    $return_arr = $imovel->getError();
}else{
    $return_arr = $imovel->getResponse();
}

echo json_encode($return_arr);

?>