<?php
header('Content-Type: application/json');

require_once '../../class/Imovel.class.php';

$imovel = new Imovel;
$imovel->list();

if($imovel->getError() != null){
    $return_arr = $imovel->getError();
}else{
    $return_arr = $imovel->getResponse();
}

echo json_encode($return_arr);

?>