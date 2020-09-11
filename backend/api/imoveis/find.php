<?php
require_once '../../header_config.php';
require_once '../../class/Imovel.class.php';

$id = $_GET['id'];

$imovel = new Imovel;
$imovel->find($id);

if($imovel->getError() != null){
    $return_arr = $imovel->getError();
}else{
    $return_arr = $imovel->getResponse();
}

echo json_encode($return_arr);

?>