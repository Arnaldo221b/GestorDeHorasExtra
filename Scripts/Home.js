
$(document).ready(function () {

    ObtenerListadoEjecutivos();

    //LLAMADA AL METODO MODIFICAR EJECUTIVO
    $("#btnModificarEjecutivo").click(function () {
        var cantidad = $("#txtEditarCantidad").val();
        var valor = $("#txtEditarValor").val();
        var pago = $("#txtEditarPago").val();
        var fecha = $("#txtEditarFecha").val();
        var IDHoraExtra = $("#txtEditarIDHoraExtra").val();
        mostrarCargando();
        try {
            $.ajax({
                type: "POST",
                url: "ServicioWeb.asmx/ModificarHoraExtra",
                data: '{ "IDHorasExtra":' + IDHoraExtra + ', "cantidad":' + cantidad + ',"valor":' + valor + ',"pagoTotal":' + pago + ',"fecha":"' + fecha + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    esconderCargando();

                    mostrarAlerta("msjExitoso", "Ejecutivo modificado de forma exitosa", "success");
                    ObtenerListadoEjecutivos();

                },
                error: function (response) { esconderCargando(); mostrarAlerta("msjExitoso", "Error al modificar al ejecutivo", "error"); }
            });

        } catch (e) {
            esconderCargando();
            alert("Ha ocurrido un error : " + e.message);
        }

    })


    //LLAMADA AL METODO PARA ELIMINAR A UN EJECUTIVO

});


function ObtenerListadoEjecutivos() {
    mostrarCargando();

    try {
        $.ajax({
            type: "POST",
            url: "ServicioWeb.asmx/buscarEjecutivosDeSupervisor",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                esconderCargando();
                
                if (data.d != undefined && data.d != null) {

                    $("#ListaEjecutivo tbody tr").remove();

                    var resultado = JSON.parse(data.d);

                    if (resultado.length > 0) {

                        $.each(resultado, function (indice, ejecutivo) {
                            $("#ListaEjecutivo tbody").append("<tr></tr>");
                            $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.nombre + "</td>");
                            $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.cantidad + "</td>");
                            $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.fecha + "</td>");
                            $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.valorHora + "</td>");
                            $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.pagoTotal + "</td>");
                            $("#ListaEjecutivo tbody tr:last").append("<td><button type='button' onclick='cargarModalEditar(this," + ejecutivo.idHorasExtra + ")' data-toggle='modal' data-target='#mdlEditar'  class='btn btn-primary'> Editar </button > <button type='button' onclick='borrarHoraExtra(" + ejecutivo.idHorasExtra + ")' class='btn btn-danger'> Borrar </button ></td>");
                        });

                    } else {

                        $("#ListaEjecutivo tbody").append("<tr></tr>");
                        $("#ListaEjecutivo tbody").append("<td colspan='6'> No figuran ejecutivos asociados </td>");
                    }


                } else {
                    alert('No se logro obtener el listado de ejecutivos.');
                }
            },
            error: function (response) { esconderCargando(); alert(response.status + " " + response.statusText); }
        });

    } catch (e) {
        esconderCargando();
        alert("Ha ocurrido un error : " + e.message);
    }


}



function cargarModalEditar(btn,idHoraExtra) {
    var td = btn.parentElement;
    var tr = td.parentElement;
    var celdas = tr.cells;

    var fecha = celdas[2].innerHTML.split("/");
    var fechaFormateada = fecha[2] + "-" + fecha[1] + "-" + fecha[0];

    $("#txtEditarNombre").val(celdas[0].innerHTML);
    $("#txtEditarCantidad").val(celdas[1].innerHTML);
    $("#txtEditarValor").val(celdas[3].innerHTML);
    $("#txtEditarPago").val(celdas[4].innerHTML);
    $("#txtEditarFecha").val(fechaFormateada);
    $("#txtEditarIDHoraExtra").val(idHoraExtra);

}


