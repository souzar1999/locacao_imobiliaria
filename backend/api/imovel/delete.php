<?php
header('Content-Type: application/json');

require_once '../../class/Imovel.class.php';

$id = $_GET['id'];

$imovel = new Imovel;
$imovel->delete($id);

if($imovel->getError() != null){
    $return_arr = $imovel->getError();
}else{
    $return_arr = $imovel->getResponse();
}

echo json_encode($return_arr);

?>