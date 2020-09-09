<?php 

require_once '../../connection/connection.class.php';

class Proprietario {
  
  private $id;
  private $nome;
  private $email;
  private $fone;
  private $dia_repasse;
  
  private $Error;
  private $Response;

  private $con;

	function __construct()
	{
		$this->con = ConnectionDB::getConnection();
	}
  
  function list(){
    $return_arr = array();
    
    $query = "SELECT * FROM proprietarios";
    $result = mysqli_query($this->con, $query);
    
    if($result){
      
      while($row = mysqli_fetch_array($result)){
        
        $id = $row['id'];
        $nome = $row['nome'];
        $email = $row['email'];
        $fone = $row['fone'];
        $dia_repasse = $row['dia_repasse'];
        
        $return_arr[] = array(
          
          "id" => $id,
          "nome" => $nome,
          "fone" => $fone,
          "email" => $email,
          "dia_repasse" => $dia_repasse);
          
      }  
      
      $this->setResponse($return_arr);
      
    }else{
      
      $this->setError("Erro ao buscar proprietários");
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
      
      $this->setError("Erro ao buscar proprietário");
    }
  }
    
  function store($data){
    
    $query = "INSERT INTO proprietarios (nome, email, fone, dia_repasse) VALUES ('{$data->nome}', '{$data->email}', '{$data->fone}', '{$data->dia_repasse}')";

    $result = mysqli_query($this->con, $query);
    
    if($result){
      $this->setResponse("Proprietário cadastrado com sucesso");
      
    }else{
      
      $this->setError("Erro ao cadastrar proprietário");
    }
  }    
    
  function update($id, $data){
    
    $query = "UPDATE proprietarios SET nome = '{$data->nome}', email = '{$data->email}', fone = '{$data->fone}', dia_repasse = '{$data->dia_repasse}' WHERE id = {$id}";
    
    $result = mysqli_query($this->con, $query);
    
    if($result){
      $this->setResponse("Proprietário editado com sucesso");
      
    }else{
      
      $this->setError("Erro ao editar proprietário");
    }
  }    

  function delete($id){
    
    $query = "DELETE FROM proprietarios WHERE id = {$id}";
    
    $result = mysqli_query($this->con, $query);
    
    if($result){
      $this->setResponse("Proprietário apagado com sucesso");
      
    }else{
      
      $this->setError("Erro ao apagar proprietário");
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
  
  public function getDiaRepasse(){
    return $this->dia_repasse;
  }
  
  public function setDiaRepasse($dia_repasse){
    $this->dia_repasse = $dia_repasse;
  }
  
}
  
?>