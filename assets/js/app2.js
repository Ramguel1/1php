var btnGuardar=document.getElementById('btnGuardar');

btnGuardar.onclick= async()=>{
    //Recopilar datos
let nombre=document.getElementById('nombre').value;
let ap=document.getElementById('ap').value;
let am=document.getElementById('am').value;
let telefono=document.getElementById('telefono').value;

//Validar campos vacíos
if(nombre.trim()=="" || ap.trim()=="" || am.trim()=="" || telefono.trim()==""){
    Swal.fire({
        title: "ERROR", 
        text:"Tienes campos vacíos",
        icon: "error"
    });
    return;
}

//ENCAPSULAR DATOS
const datos=new FormData();
datos.append("nombre",nombre);
datos.append("ap",ap);
datos.append("am",am);
datos.append('action','add');

//PETICION Y RESPUESTA
let respuesta=await fetch("../1php/php/namasuno.php",{method:'POST',body:datos});
let json=await respuesta.json();

if(json.success==true){
    Swal.fire({title: "Se registro",
               text: json.mensaje,
               icon: "success"
    });
}else{
    Swal.fire({ title: "no",
               text: json.mensaje,
               icon: "error"
    });
}
cargarContactos();
}

const cargarContactos=async()=>{
    const datos2=new FormData();
    datos2.append('action', 'cargar');
    let respuesta=await fetch("php/namasuno.php",{method: 'POST' , body:datos2});
    let json=await respuesta.json();
    let tablaHTML=``
    json.data.forEach(item=>{
        tablaHTML+=`<tr>
        <td>${item[0]}</td>
        <td>${item[1]}</td>
        <td>${item[2]}</td>
        <td>${item[3]}</td>
        <td>${item[4]}</td>
        <td> <button class="btn btn-dark" onclick="eliminarContacto(${item[0]})">DEL</button></td>
      <td> <button class="btn btn-primary"  onclick="mostrarContacto(${item[0]})" data-bs-toggle="modal" data-bs-target="#editModal">Editar</button></td>
        </tr>
    `
    });
    document.getElementById("listaContactos").innerHTML=tablaHTML;
}



const eliminarContacto = async (id) => {
    Swal.fire({
        title: "eliminar?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: "No"

    }).then(async (result) => {
        if (result.isConfirmed) {
            let contactoid = new FormData();
            contactoid.append('id', id);
            contactoid.append('action', 'eliminar')
            let respuesta = await fetch("php/namasuno.php", {
                method: 'POST',
                body: contactoid
            });
            let json = await respuesta.json();

            if (json.success == true) {
                Swal.fire({
                    title: "se elimino", 
                    text: json.mensaje, 
                    icon: "success"});
            } else {
                Swal.fire({
                    title: "no", 
                    text: json.mensaje, 
                    icon: "error"});
            }
            cargarContactos();
            Swal.fire("el contacto se elimino", "", "success");
        }
    });
}


const mostrarContacto=async(id)=>{
    let contactoid=new FormData();
    contactoid.append("id",id);
    contactoid.append('action','consul')
    let respuesta=await fetch("php/namasuno.php",{method:'POST',body:contactoid});
    let json=await respuesta.json();

    document.querySelector("#id").value=json.id;

    document.querySelector("#enombre").value=json.nombre;
    document.querySelector("#eap").value=json.ap;
    document.querySelector("#eam").value=json.am;
    document.querySelector("#etelefono").value=json.telefono;
}


const actualizarContacto=async()=>{

    var id=document.querySelector("#id").value;
    var nombre=document.querySelector("#enombre").value;
    var ap=document.querySelector("#eap").value;
    var am=document.querySelector("#eam").value;
    var telefono=document.querySelector("#etelefono").value;

    if(nombre.trim()=="" || ap.trim()=="" || am.trim()=="" || telefono.trim()==""){
        Swal.fire({
            title: "ERROR", 
            text:"Tienes campos vacíos",
            icon: "error"
        });
        return;
    }
    
    let datos=new FormData();
    datos.append("id",id);
    datos.append("nombre",nombre);
    datos.append("ap",ap);
    datos.append("am",am);
    datos.append("telefono",telefono);
    datos.append("action",'update')

    let respuesta=await fetch("php/namasuno.php",{method:'POST',body:datos});
    let json=await respuesta.json();
    
    document.querySelector("#editModal").click();
    if(json.success==true){
        Swal.fire({title: "se actualizo",
                   text: json.mensaje,
                   icon: "success"
        });
    }else{
        Swal.fire({ title: "no",
                   text: json.mensaje,
                   icon: "error"
        });
    }
    cargarContactos();
}