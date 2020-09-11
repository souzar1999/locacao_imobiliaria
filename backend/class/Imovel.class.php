<?php 

require_once '../../connection/connection.class.php';

class Imovel {
  
  private $id;
  private $endereco;
  private $proprietario_id;
  
  private $Error;
  private $Response;

  private $con;

	function __construct()
	{
		$this->con = ConnectionDB::getConnection();
	}
  
  function list(){
    $return_arr = array();
    
    $query = 
    "SELECT imoveis.*, proprietarios.nome as proprietario_nome
         FROM imoveis
        INNER JOIN proprietarios ON imoveis.proprietario_id = proprietarios.id";
    $result = mysqli_query($this->con, $query);
    
    if($result){
      
      while($row = mysqli_fetch_array($result)){
        
        $id = $row['id'];
        $endereco = $row['endereco'];
        $proprietario_id = $row['proprietario_id'];
        $proprietario_nome = $row['proprietario_nome'];
        
        $return_arr[] = array(
          
          "id" => $id,
          "endereco" => $endereco,
          "proprietario_id" => $proprietario_id,
          "proprietario_nome" => $proprietario_nome);
          
      }  
      
      $this->setResponse($return_arr);
      
    }else{
      
      $this->setError("Erro ao buscar imóveis");
    }
  }
  
  function find($id){
    $return_arr = array();
    
    $query = "SELECT * FROM imoveis WHERE id = {$id}";
    $result = mysqli_query($this->con, $query);
    
    if($result){
      
      while($row = mysqli_fetch_array($result)){
        
        $id = $row['id'];
        $endereco = $row['endereco'];
        $proprietario_id = $row['proprietario_id'];
          
      }  
      
      $this->setResponse(array(
        "id" => $id,
        "endereco" => $endereco,
        "proprietario_id" => $proprietario_id
      ));
      
    }else{
      
      $this->setError("Erro ao buscar imovel");
    }
  }
    
  function store($data){
    
    $query = "INSERT INTO imoveis (endereco, proprietario_id) VALUES ('{$data->endereco}', '{$data->proprietario_id}')";

    $result = mysqli_query($this->con, $query);
    
    if($result){
      $this->setResponse("Imóvel cadastrado com sucesso");
      
    }else{
      
      $this->setError("Erro ao cadastrar imóvel");
    }
  }    
    
  function update($id, $data){
    
    $query = "UPDATE imoveis SET endereco = '{$data->endereco}', proprietario_id = '{$data->proprietario_id}' WHERE id = {$id}";
    
    $result = mysqli_query($this->con, $query);
    
    if($result){
      $this->setResponse("Imóvel editado com sucesso");
      
    }else{
      
      $this->setError("Erro ao editar imóvel");
    }
  }    

  function delete($id){
    
    $query = "DELETE FROM imoveis WHERE id = {$id}";
    
    $result = mysqli_query($this->con, $query);
    
    if($result){
      $this->setResponse("Imóvel apagado com sucesso");
      
    }else{
      
      $this->setError("Erro ao apagar imóvel");
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
  
  public function getEndereco(){
    return $this->endereco;
  }
  
  public function setEndereco($endereco){
    $this->endereco = $endereco;
  }
  
  public function getProprietario(){
    return $this->proprietario_id;
  }
  
  public function setProprietario($proprietario_id){
    $this->proprietario_id = $proprietario_id;
  }
  
}
  
?>