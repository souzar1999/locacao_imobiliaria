<?php
require_once '../../header_config.php';
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