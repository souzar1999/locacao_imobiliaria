<?php 

require_once '../../connection/connection.class.php';

class Mensalidade {
  
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
    
    $query = "SELECT * FROM mensalidades WHERE contrato_id = {$id}";
    $result = mysqli_query($this->con, $query);
    
    if($result){
      
      while($row = mysqli_fetch_array($result)){
        
        $id = $row['id'];
        $data_ini = $row['data_ini'];
        $data_fim = $row['data_fim'];
        $valor = $row['valor'];
        $pago = $row['pago'];
        
        $return_arr[] = array(
          
          "id" => $id,
          "data_ini" => $data_ini,
          "data_fim" => $data_fim,
          "valor" => $valor,
          "pago" => $pago);
          
      }  
      
      $this->setResponse($return_arr);
      
    }else{
      
      $this->setError("Erro ao buscar mensalidades");
    }
  }
      
  function pago($id, $data){
    
    $query = "UPDATE mensalidades SET pago = '{$data->pago}' WHERE id = {$id}";
    
    $result = mysqli_query($this->con, $query);
    
    if($result){
      $this->setResponse("Sucesso ao definir mensalidade como paga");
      
    }else{
      
      $this->setError("Erro ao definir mensalidade como paga");
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
  
  public function getNome(){
    return $this->nome;
  }
  
  public function setNome($nome){
    $this->nome = $nome;
  }
  
  public function getEmail(){
    return $this->email;
  }
  
  public function setEmail($email){
    $this->email = $email;
  }
  
  public function getFone(){
    return $this->fone;
  }
  
  public function setFone($fone){
    $this->fone = $fone;
  }
  
}
  
?>