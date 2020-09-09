<?php

class ConnectionDB {
   
      public static $con;
   
      public static function getConnection() {
          if (!isset(self::$con)) {
              
            $host = "localhost";
            $user = "locacao_imobiliaria";
            $password = "Leom2310";
            $dbname = "locacao_imobiliaria";
            
            self::$con = mysqli_connect($host, $user, $password, $dbname);
            
            if (!self::$con) {
                die("Connection failed: " . mysqli_connect_error());
            }    
          }
          
          return self::$con;
      }
  }
?>