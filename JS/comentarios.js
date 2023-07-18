$(document).ready(function() {
    var url = 'http://localhost:3001/comentarios/'
    var opcion = null;
    var id_comentarios, comentarios, id_producto_id, id_usuario_id, fila
    var tablaComentarios = $('#tablaComentarios').DataTable({
        "ajax":{
            "url" : url,
            "dataSrc" : ""
        },
        "columns" : [
            {"data" : "id_comentarios"},
            {"data" : "comentarios"},
            {"data" : "id_producto_id"},
            {"data" : "id_usuario_id"},
            {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditarComentario'>Editar</button><button class='btn btn-danger btn-sm btnBorrarComentario'>Borrar</button></div></div>"}
    
        ],
        "columnsDefs" : [{
            "targets": [2],
            render(v){
                return Number(v).toFixed(2)
            }

    }]              
});
//CREAR
$("#btnCrearComentarios").click(function(){
    opcion='crear';            
    id_comentarios=null;
    $("#formComentarios").trigger("reset");
    $(".modal-header").css( "background-color", "#23272b");
    $(".modal-header").css( "color", "white" );
    $(".modal-title").text("Crear Comentario");
    $('#modalCRUD').modal('show');	    
});    
//EDITAR        
$(document).on("click", ".btnEditarComentario", function(){		            
    opcion='editar';
    fila = $(this).closest("tr");	        
    id_comentarios = parseInt(fila.find('td:eq(0)').text());
    comentarios = fila.find('td:eq(1)').text();
    id_producto_id = fila.find('td:eq(2)').text();
    id_usuario_id = fila.find('td:eq(3)').text();            
    $("#id_comentarios").val(id_comentarios);
    $("#comentarios").val(comentarios);
    $("#id_producto_id").val(id_producto_id);
    $("#id_usuario_id").val(id_usuario_id);            
    $(".modal-header").css("background-color", "#7303c0");
    $(".modal-header").css("color", "white" );
    $(".modal-title").text("Editar Comentario");		
    $('#modalCRUD').modal('show');		   
});

 //BORRAR
$(document).on("click", ".btnBorrarComentario", function(){
    fila = $(this);           
    id_comentarios = parseInt($(this).closest('tr').find('td:eq(0)').text());            
    Swal.fire({
        title: '¿Confirma eliminar el comentario',                
        showCancelButton: true,
        confirmButtonText: `Confirmar`,                
        }).then((result) => {               
        if (result.isConfirmed) {
            $.ajax({
                url: url+id_comentarios,
                method: 'delete',                        
                data:  {id_comentarios:id_comentarios},    
                success: function() {
                    tablaComentarios.row(fila.parents('tr')).remove().draw();                  
                }
            });
            Swal.fire('¡Registro Eliminado!', '', 'success')
        } 
        })
});     
//submit para el CREAR y EDITAR
$('#formComentarios').submit(function(e){                                     
    e.preventDefault();
    id_comentarios = $.trim($('#id_comentarios').val());    
    comentarios = $.trim($('#comentarios').val());
    id_producto_id = $.trim($('#id_producto_id').val());    
    id_usuario_id = $.trim($('#id_usuario_id').val());                
    if(opcion=='crear'){                
        $.ajax({                    
            url: url,
            method: 'post',                                                         
            contentType: 'application/json',  
            data:  JSON.stringify({comentarios:comentarios, id_producto_id:id_producto_id, id_usuario_id:id_usuario_id}),                       
            success: function(data) {                       
                tablaComentarios.ajax.reload(null, false);                        
            }
        });	
    }
    if(opcion=='editar'){
        console.log("EDITAR");
        $.ajax({                    
            url: url+id_comentarios,
            method: 'put',                                        
            contentType: 'application/json',  
            data:  JSON.stringify({id_comentarios:id_comentarios, comentarios:comentarios, id_producto_id:id_producto_id, id_usuario_id:id_usuario_id}),                       
            success: function(data) {                       
                tablaComentarios.ajax.reload(null, false);                        
            }
        });	
    }        		        
    $('#modalCRUD').modal('hide');											     			
});
});