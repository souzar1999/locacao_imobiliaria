<?php 

require_once '../../connection/connection.class.php';

class Imovel {
  
  private $id;
  private $imovel_id;
  private $proprietario_id;
  private $cliente_id;
  private $data_ini;
  private $data_fim;
  private $taxa_adm;
  private $aluguel;
  private $condominio;
  private $iptu;
  
  private $Error;
  private $Response;

  private $con;

	function __construct()
	{
		$this->con = ConnectionDB::getConnection();
	}
  
  function list(){
    $return_arr = array();
    
    $query = "SELECT * FROM contratos";
    $result = mysqli_query($this->con, $query);
    
    if($result){
      
      while($row = mysqli_fetch_array($result)){
        
        $id = $row['id'];
        $imovel_id = $row['imovel_id'];
        $proprietario_id = $row['proprietario_id'];
        $cliente_id = $row['cliente_id'];
        $data_ini = $row['data_ini'];
        $data_fim = $row['data_fim'];
        $taxa_adm = $row['taxa_adm'];
        $aluguel = $row['aluguel'];
        $condominio = $row['condominio'];
        $iptu = $row['iptu'];

        $return_arr[] = array(
          
          "id" => $id,
          "imovel_id" => $imovel_id,
          "proprietario_id" => $proprietario_id,
          "cliente_id" => $cliente_id,
          "data_ini" => $data_ini,
          "data_fim" => $data_fim,
          "taxa_adm" => $taxa_adm,
          "aluguel" => $aluguel,
          "condominio" => $condominio,
          "iptu" => $iptu
        );
          
      }  
      
      $this->setResponse($return_arr);
      
    }else{
      
      $this->setError("Erro ao buscar contratos");
    }
  }
  
  function find($id){
    $return_arr = array();
    
    $query = "SELECT * FROM contratos WHERE id = {$id}";
    $result = mysqli_query($this->con, $query);
    
    if($result){
      
      while($row = mysqli_fetch_array($result)){
        
        $id = $row['id'];
        $imovel_id = $row['imovel_id'];
        $proprietario_id = $row['proprietario_id'];
        $cliente_id = $row['cliente_id'];
        $data_ini = $row['data_ini'];
        $data_fim = $row['data_fim'];
        $taxa_adm = $row['taxa_adm'];
        $aluguel = $row['aluguel'];
        $condominio = $row['condominio'];
        $iptu = $row['iptu'];

        $return_arr[] = array(
          
          "id" => $id,
          "imovel_id" => $imovel_id,
          "proprietario_id" => $proprietario_id,
          "cliente_id" => $cliente_id,
          "data_ini" => $data_ini,
          "data_fim" => $data_fim,
          "taxa_adm" => $taxa_adm,
          "aluguel" => $aluguel,
          "condominio" => $condominio,
          "iptu" => $iptu
        );
          
      }  
      
      $this->setResponse($return_arr);
      
    }else{
      
      $this->setError("Erro ao buscar contrato");
    }
  }
    
  function store($data){
    
    $query = 
      "INSERT INTO contratos (
          imovel_id, 
          proprietario_id, 
          cliente_id, 
          data_ini, 
          data_fim, 
          taxa_adm, 
          aluguel, 
          condominio, 
          iptu
        ) VALUES (
          '{$data->imovel_id}', 
          '{$data->proprietario_id}', 
          '{$data->cliente_id}', 
          '{$data->data_ini}', 
          '{$data->data_fim}', 
          '{$data->taxa_adm}', 
          '{$data->aluguel}', 
          '{$data->condominio}', 
          '{$data->iptu}'
        )";

    $result = mysqli_query($this->con, $query);
    
    if($result){
      $this->setResponse("Contrato cadastrado com sucesso");
      
    }else{
      
      $this->setError("Erro ao cadastrar contrato");
    }
  }    
    
  function update($id, $data){
    
    $query = 
      "UPDATE contratos SET 
        imovel_id = '{$data->client_id}',
        proprietario_id = '{$data->proprietario_id}',
        client_id = '{$data->client_id}',
        data_ini = '{$data->data_ini}',
        data_fim = '{$data->data_fim}',
        taxa_adm = '{$data->taxa_adm}',
        aluguel = '{$data->aluguel}',
        condominio = '{$data->condominio}',
        iptu = '{$data->iptu}' 
      WHERE id = {$id}";
    
    $result = mysqli_query($this->con, $query);
    
    if($result){
      $this->setResponse("Contrato editado com sucesso");
      
    }else{
      
      $this->setError("Erro ao editar contrato");
    }
  }    

  function delete($id){
    
    $query = "DELETE FROM contratos WHERE id = {$id}";
    
    $result = mysqli_query($this->con, $query);
    
    if($result){
      $this->setResponse("Contrato apagado com sucesso");
      
    }else{
      
      $this->setError("Erro ao apagar contrato");
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
  
  public function getImovel(){
    return $this->imovel_id;
  }
  
  public function setImovel($imovel_id){
    $this->imovel_id = $imovel_id;
  }
  
  public function getProprietario(){
    return $this->proprietario_id;
  }
  
  public function setProprietario($proprietario_id){
    $this->proprietario_id = $proprietario_id;
  }

  public function getCliente(){
    return $this->cliente_id;
  }
  
  public function setCliente($cliente_id){
    $this->cliente_id = $cliente_id;
  }

  public function getDataIni(){
    return $this->data_ini;
  }
  
  public function setDataIni($data_ini){
    $this->data_ini = $data_ini;
  }

  public function getDataFim(){
    return $this->data_fim;
  }
  
  public function setDataFim($data_fim){
    $this->data_fim = $data_fim;
  }

  public function getTaxaAdm(){
    return $this->taxa_adm;
  }
  
  public function setTaxaAdm($taxa_adm){
    $this->taxa_adm = $taxa_adm;
  }

  public function getAluguel(){
    return $this->aluguel;
  }
  
  public function setAluguel($aluguel){
    $this->aluguel = $aluguel;
  }

  public function getCondominio(){
    return $this->condominio;
  }
  
  public function setCondominio($condominio){
    $this->condominio = $condominio;
  }

  public function getIptu(){
    return $this->iptu;
  }
  
  public function setIptu($iptu){
    $this->iptu = $iptu;
  }
  
}
  
?>