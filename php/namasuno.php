<?php

    require_once "si.php";

    $respuesta = ["success" => false, "mensaje" => ""];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $action = $_POST['action'];

        if ($action === 'add') {
            $valido['success']=array('success'=>false, 'mensaje'=>"");

if($_POST){
        $a=$_POST['nombre'];
        $b=$_POST['ap'];
        $c=$_POST['am'];
        $d=$_POST['telefono'];
      
        $sql="INSERT INTO contacto VALUES (null,'$a','$b','$c','$d')";
        if($cx->query($sql)){
            $valido['success']=true;
        }else{
            $valido['success']=false;
        }
}else{
    $valido['success']=false;
}
 echo json_encode($valido);

    
        } elseif ($action === 'update') {
           
if($_POST){
    $id=$_POST['id'];
    $a=$_POST['nombre'];
    $b=$_POST['ap'];
    $c=$_POST['am'];
    $d=$_POST['telefono'];
   

    $sql = "UPDATE contacto SET nombre='$a', ap='$b', am='$c', telefono='$d' WHERE id=$id";

    if($cx->query($sql)){
       $valido['success']=true;
       $valido['mensaje']="SE ACTUALIZO CORRECTAMENTE";
    }else{
        $valido['success']=false;
       $valido['mensaje']="ERROR AL ACTUALIZAR EN BD"; 
    }
    
}else{
$valido['success']=false;
$valido['mensaje']="ERROR AL GUARDAR";
}

echo json_encode($valido);
  
        } elseif ($action === 'cargar') {
            
            header('Content-Type: text/html; charset=utf-8');

$sql="SELECT * FROM contacto";
$registro=array('data'=>array());
$res=$cx->query($sql);
if($res->num_rows>0){
    while($row=$res->fetch_array()){
        $registro['data'][]=array($row[0],$row[1],$row[2],$row[3],$row[4]);
    }
}

echo json_encode($registro);

        } elseif ($action === 'eliminar') {
            $valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $id=$_POST['id'];
    $sqle="DELETE FROM contacto WHERE  id=$id";
    if($cx->query($sqle)){
       $valido['success']=true;
       $valido['mensaje']="SE ELIMINO CORRECTAMENTE";
    }else{
        $valido['success']=false;
       $valido['mensaje']="ERROR AL ELIMINAR EN BD"; 
    }
    
}else{
$valido['success']=false;
$valido['mensaje']="ERROR AL ELIMINAR";

}

echo json_encode($valido);
      
        } elseif ($action === 'consul'){
            header('Content-Type: text/html; charset=utf-8');
            $valido['success']=array('success'=>false,
            'mensaje'=>"",
            'contactoid'=>"",
            'nombre'=>"",
            'ap'=>"",
            'am'=>"",
            'telefono'=>"",
           );
            if ($_POST) {
            $id=$_POST['id'];
            $sql="SELECT * FROM contacto WHERE id=$id";
            $res=$cx->query($sql);
            $row=$res->fetch_array();
            $valido['success']=true;
            $valido['mensaje']="SE ENCONTRO REGISTRO";
            $valido['id']=$row[0];
            $valido['nombre']=$row[1];
            $valido['ap']=$row[2];
            $valido['am']=$row[3];
            $valido['telefono']=$row[4];
        
            }else{
                $valido['success']=false;
                $valido['mensaje']="NO SE ENCONTRO EL contacto";
            
            }
            
            echo json_encode($valido);
        }else{

        echo json_encode($respuesta);
    } 
    
}else {
        echo json_encode(["error" => "Método no permitido"]);
    }
?>