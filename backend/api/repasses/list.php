<?php
require_once '../../header_config.php';
require_once '../../class/Repasse.class.php';

$id = $_GET['id'];

$repasse = new Repasse;
$repasse->list($id);

if($repasse->getError() != null){
    $return_arr = $repasse->getError();
}else{
    $return_arr = $repasse->getResponse();
}

echo json_encode($return_arr);

?>