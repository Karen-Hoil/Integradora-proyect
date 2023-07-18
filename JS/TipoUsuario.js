$(document).ready(function() {
    var url = 'http://localhost:3001/TipoUsuario'
    var opcion = null;
    var id_TipoUsuario, Tipos, id_usuario_id, fila
    var tablaTipoUsuario = $('#tablaTipoUsuario').DataTable({
        "ajax":{
            "url" : url,
            "dataSrc" : ""
        },
        "columns" : [
            {"data" : "id_TipoUsuario"},
            {"data" : "Tipos"},
            {"data" : "id_usuario_id"},
            {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditarTipoUsuario'>Editar</button><button class='btn btn-danger btn-sm btnBorrarTipoUsuario'>Borrar</button></div></div>"}
    
        ],
        "columnsDefs" : [{
            "targets": [2],
            render(v){
                return Number(v).toFixed(2)
            }

    }]              
});
//CREAR
$("#btnCrearTipoUsuario").click(function(){
    opcion='crear';            
    id=null;
    $("#formTipoUsuario").trigger("reset");
    $(".modal-header").css( "background-color", "#23272b");
    $(".modal-header").css( "color", "white" );
    $(".modal-title").text("Crear tipo de usuario");
    $('#modalCRUD-2').modal('show');	    
});    
//EDITAR        
$(document).on("click", ".btnEditarTipoUsuario", function(){		            
    opcion='editar';
    fila = $(this).closest("tr");	        
    id_TipoUsuario = parseInt(fila.find('td:eq(0)').text());
    Tipos = fila.find('td:eq(1)').text();
    id_usuario_id = fila.find('td:eq(3)').text();            
    $("#id_tipoUsuario").val(id_TipoUsuario);
    $("#Tipos").val(Tipos);
    $("#id_usuario").val(id_usuario_id);            
    $(".modal-header").css("background-color", "#7303c0");
    $(".modal-header").css("color", "white" );
    $(".modal-title").text("Editar tipo de usuario");		
    $('#modalCRUD-2').modal('show');		   
});

 //BORRAR
$(document).on("click", ".btnBorrarTipoUsuario", function(){
    fila = $(this);           
    id_TipoUsuario = parseInt($(this).closest('tr').find('td:eq(0)').text());            
    Swal.fire({
        title: '¿Confirma eliminar el comentario',                
        showCancelButton: true,
        confirmButtonText: `Confirmar`,                
        }).then((result) => {               
        if (result.isConfirmed) {
            $.ajax({
                url: url + id_TipoUsuario,
                method: 'delete',                        
                data:  {id_TipoUsuario:id_TipoUsuario},    
                success: function() {
                    tablaTipoUsuario.row(fila.parents('tr')).remove().draw();                  
                }
            });
            Swal.fire('¡Registro Eliminado!', '', 'success')
        } 
        })
});     
//submit para el CREAR y EDITAR
$('#formTipoUsuario').submit(function(e){                                     
    e.preventDefault();
    id_TipoUsuario = $.trim($('#id_TipoUsuario').val());    
    Tipos = $.trim($('#Tipos').val());  
    id_usuario_id = $.trim($('#id_usuario').val());                
    if(opcion=='crear'){                
        $.ajax({                    
            url: url,
            method: 'post',                                                         
            contentType: 'application/json',  
            data:  JSON.stringify({Tipos:Tipos, id_usuario_id:id_usuario_id}),                       
            success: function(data) {                       
                tablaTipoUsuario.ajax.reload(null, false);                        
            }
        });	
    }
    if(opcion=='editar'){
        console.log("EDITAR");
        $.ajax({                    
            url: url+id_TipoUsuario,
            method: 'put',                                        
            contentType: 'application/json',  
            data:  JSON.stringify({id_TipoUsuario:id_TipoUsuario, Tipos:Tipos, id_usuario_id:id_usuario_id}),                       
            success: function(data) {                       
                tablaTipoUsuario.ajax.reload(null, false);                        
            }
        });	
    }        		        
    $('#modalCRUD-2').modal('hide');											     			
});
});
