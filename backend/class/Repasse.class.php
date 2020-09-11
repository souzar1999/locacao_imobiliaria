<?php 

require_once '../../connection/connection.class.php';

class Repasse {
  
  private $id;
  private $data_ini;
  private $data_fim;
  private $valor;
  private $contrato_id;
  
  private $Error;
  private $Response;

  private $con;

	function __construct()
	{
		$this->con = ConnectionDB::getConnection();
	}
  
  function list($id){
    $return_arr = array();
    
    $query = "SELECT * FROM repasses  WHERE contrato_id = {$id}";
    $result = mysqli_query($this->con, $query);
    
    if($result){
      
      while($row = mysqli_fetch_array($result)){
        
        $id = $row['id'];
        $data_ini = $row['data_ini'];
        $data_fim = $row['data_fim'];
        $valor = $row['valor'];
        $realizado = $row['realizado'];
        
        $return_arr[] = array(
          
          "id" => $id,
          "data_ini" => $data_ini,
          "data_fim" => $data_fim,
          "valor" => $valor,
          "realizado" => $realizado);
          
      }  
      
      $this->setResponse($return_arr);
      
    }else{
      
      $this->setError("Erro ao buscar repasse");
    }
  }
      
  function realizado($id, $data){
    
    $query = "UPDATE repasses SET realizado = '{$data->realizado}' WHERE id = {$id}";
    
    $result = mysqli_query($this->con, $query);
    
    if($result){
      $this->setResponse("Sucesso ao definir repasse como realizada");
      
    }else{
      
      $this->setError("Erro ao definir repasse como realizada");
    }
  }    

  public function getError(){
    return $this->Error;
  }

  public function setError($Error){
    $this->Error = $Error;
  }
  
  public function getResponse(){
    return $this->Response;
  }
  
  public function setResponse($Response){
    $this->Response = $Response;
  }
  
  public function getId(){
    return $this->id;
  }
  
  public function setId($id){
    $this->id = $id;
  }
}
  
?>