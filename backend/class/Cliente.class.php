<?php 

require_once '../../connection/connection.class.php';

class Cliente {
  
  private $id;
  private $nome;
  private $email;
  private $fone;
  
  private $Error;
  private $Response;

  private $con;

	function __construct()
	{
		$this->con = ConnectionDB::getConnection();
	}
  
  function list(){
    $return_arr = array();
    
    $query = "SELECT * FROM clientes";
    $result = mysqli_query($this->con, $query);
    
    if($result){
      
      while($row = mysqli_fetch_array($result)){
        
        $id = $row['id'];
        $nome = $row['nome'];
        $email = $row['email'];
        $fone = $row['fone'];
        
        $return_arr[] = array(
          
          "id" => $id,
          "nome" => $nome,
          "fone" => $fone,
          "email" => $email);
          
      }  
      
      $this->setResponse($return_arr);
      
    }else{
      
      $this->setError("Erro ao buscar clientes");
    }
  }
  
  function find($id){
    $return_arr = array();
    
    $query = "SELECT * FROM clientes WHERE id = {$id}";
    $result = mysqli_query($this->con, $query);
    
    if($result){
      
      while($row = mysqli_fetch_array($result)){
        
        $id = $row['id'];
        $nome = $row['nome'];
        $email = $row['email'];
        $fone = $row['fone'];
        
        $return_arr[] = array(
          
          "id" => $id,
          "nome" => $nome,
          "fone" => $fone,
          "email" => $email);
          
      }  
      
      $this->setResponse($return_arr);
      
    }else{
      
      $this->setError("Erro ao buscar cliente");
    }
  }
    
  function store($data){
    
    $query = "INSERT INTO clientes (nome, email, fone) VALUES ('{$data->nome}', '{$data->email}', '{$data->fone}')";

    $result = mysqli_query($this->con, $query);
    
    if($result){
      $this->setResponse("Cliente cadastrado com sucesso");
      
    }else{
      
      $this->setError("Erro ao cadastrar cliente");
    }
  }    
    
  function update($id, $data){
    
    $query = "UPDATE clientes SET nome = '{$data->nome}', email = '{$data->email}', fone = '{$data->fone}' WHERE id = {$id}";
    
    $result = mysqli_query($this->con, $query);
    
    if($result){
      $this->setResponse("Cliente editado com sucesso");
      
    }else{
      
      $this->setError("Erro ao editar cliente");
    }
  }    

  function delete($id){
    
    $query = "DELETE FROM clientes WHERE id = {$id}";
    
    $result = mysqli_query($this->con, $query);
    
    if($result){
      $this->setResponse("Cliente apagado com sucesso");
      
    }else{
      
      $this->setError("Erro ao apagar cliente");
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