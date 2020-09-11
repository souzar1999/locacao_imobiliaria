<?php
require_once '../../header_config.php';
require_once '../../class/Repasse.class.php';

$id = $_GET['id'];
$data = json_decode(file_get_contents('php://input'));

$repasse = new Repasse;
$repasse->realizado($id, $data);

if($repasse->getError() != null){
    $return_arr = $repasse->getError();
}else{
    $return_arr = $repasse->getResponse();
}

echo json_encode($return_arr);

?>