var ListadoDeEjecutivos = null;

$(document).ready(function () {

    ObtenerListadoEjecutivos();
    ObtenerUsuarios();

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


    //LLAMADA AL METODO PARA INSERTAR HORA EXTRA
    $("#btnAgregarHora").click(function () {

        var idUsuario = $("#cboAgregarUsuario").val();
        var cantidad = $("#txtAgregarCantidad").val();
        var valor = $("#txtAgregarValor").val();
        var pago = $("#txtAgregarPago").val();
        var fecha = $("#txtAgregarFecha").val();

        mostrarCargando();
        try {
            $.ajax({
                type: "POST",
                url: "ServicioWeb.asmx/insertarHoraExtra",
                data: '{ "cantidad":' + cantidad + ',"valor":' + valor + ',"pagoTotal":' + pago + ',"fecha":"' + fecha + '", "IDUsuario":' + idUsuario + ' ,"vigente":"' + true + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    esconderCargando();

                    mostrarAlerta("msjExitosoAgregar", "Hora extra ingresada correctamente", "success");
                    ObtenerListadoEjecutivos();

                },
                error: function (response) { esconderCargando(); mostrarAlerta("msjExitosoAgregar", "Error al intentar agregar el registro.", "error"); }
            });

        } catch (e) {
            esconderCargando();
            alert("Ha ocurrido un error : " + e.message);
        }

    })

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
                    //GUARDO LA LISTA EN UNA VARIABLE GLOBAL
                    ListadoDeEjecutivos = resultado;

                    if (resultado.length > 0) {

                        $.each(resultado, function (indice, ejecutivo) {
                            $("#ListaEjecutivo tbody").append("<tr></tr>");
                            $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.nombre + "</td>");
                            $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.cantidad + "</td>");
                            $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.fecha + "</td>");
                            $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.valorHora + "</td>");
                            $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.pagoTotal + "</td>");
                            $("#ListaEjecutivo tbody tr:last").append("<td><button type='button' onclick='cargarModalEditar(this," + ejecutivo.idHorasExtra + ")' data-toggle='modal' data-target='#mdlEditar'  class='btn btn-primary'> Editar </button > <button type='button' onclick='borrarHoraExtra(" + ejecutivo.idHorasExtra + ")' class='btn btn-danger'> Borrar </button > <input type='hidden' value='" + ejecutivo.idUsuario + "'/></td>");
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

    $("#cboEditarUsuario").val(celdas[5].children[2].value);
    $("#txtEditarCantidad").val(celdas[1].innerHTML);
    $("#txtEditarValor").val(celdas[3].innerHTML);
    $("#txtEditarPago").val(celdas[4].innerHTML);
    $("#txtEditarFecha").val(fechaFormateada);
    $("#txtEditarIDHoraExtra").val(idHoraExtra);

}


function cargarModalAgregar(idUsuario) {


    $("#txtAgregarIDUsuario").val(idUsuario);

}

function ObtenerUsuarios() {

    try {
        $.ajax({
            type: "POST",
            url: "ServicioWeb.asmx/ObtenerUsuarios",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d != undefined && data.d != null) {

                    var resultado = JSON.parse(data.d);

                    if (resultado.length > 0) {

                        $.each(resultado, function (indice, usuario) {
                            $("#cboAgregarUsuario").append("<option value ='" + usuario.idUsuario + "'>" + usuario.nombre + "</option>");
                            $("#cboEditarUsuario").append("<option value ='" + usuario.idUsuario + "'>" + usuario.nombre + "</option>");
                        });

                    } else {

                        $("#cboAgregarUsuario").append("<option value ='-1'>No se encontraron usuarios</option>");
                        $("#cboEditarUsuario").append("<option value ='-1'>No se encontraron usuarios</option>");
                    }


                } else {
                    alert('No se logro obtener el listado de usuarios, para llenar en formulario de nuevo registro.');
                }

            },
            error: function (response) {  }
        });

    } catch (e) {
        alert("Ha ocurrido un error : " + e.message);
    }

}

function CalcularValorAPagar(formulario) {

    var cantidad = 0;
    var valor = 0;
    var resultado = 0;

    // 1 = AGREGAR NUEVO REGISTRO
    // 2 = EDITAR NUEVO REGISTRO
    if (formulario == 1) {
        cantidad = $("#txtAgregarCantidad").val();
        valor = $("#txtAgregarValor").val();
        resultado = cantidad * valor;
        $("#txtAgregarPago").val(resultado);
    } else {
        cantidad = $("#txtEditarCantidad").val();
        valor = $("#txtEditarValor").val();
        resultado = cantidad * valor;
        $("#txtEditarPago").val(resultado);
    }

}

function borrarHoraExtra(idHoraExtra) {

    mostrarCargando();
    try {
        $.ajax({
            type: "POST",
            url: "ServicioWeb.asmx/BorrarHoraExtra",
            data: '{ "pidHoraExtra":' + idHoraExtra + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                esconderCargando();
                ObtenerListadoEjecutivos();

            },
            error: function (response) { esconderCargando(); }
        });

    } catch (e) {
        esconderCargando();
        alert("Ha ocurrido un error : " + e.message);
    }

}


function BuscarEjecutivoPorNombre(e) {
    var key = window.event.keyCode;
    if (key != 13) { return false; }

    if (ListadoDeEjecutivos != null && ListadoDeEjecutivos != undefined) {

        var nombreEjecutivo = $("#txtBuscarNombre").val();
        nombreEjecutivo = nombreEjecutivo.trim();

        $("#ListaEjecutivo tbody tr").remove();

        if (nombreEjecutivo == "") {
        //SE COMPRUEBO SI EL CAMPO DE TEXTO ESTA VACIO, DE ESTARLO ENTONCES SE CARGA TODO.
            $.each(ListadoDeEjecutivos, function (indice, ejecutivo) {

                $("#ListaEjecutivo tbody").append("<tr></tr>");
                $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.nombre + "</td>");
                $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.cantidad + "</td>");
                $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.fecha + "</td>");
                $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.valorHora + "</td>");
                $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.pagoTotal + "</td>");
                $("#ListaEjecutivo tbody tr:last").append("<td><button type='button' onclick='cargarModalEditar(this," + ejecutivo.idHorasExtra + ")' data-toggle='modal' data-target='#mdlEditar'  class='btn btn-primary'> Editar </button > <button type='button' onclick='borrarHoraExtra(" + ejecutivo.idHorasExtra + ")' class='btn btn-danger'> Borrar </button > <input type='hidden' value='" + ejecutivo.idUsuario + "'/></td>");

            });

        } else {
        //SE COMPARA EL NOMBRE INGRESADO CON EL NOMBRE DE LOS EJECUTIVOS LISTADOS
        $.each(ListadoDeEjecutivos, function (indice, ejecutivo) {

            if (ejecutivo.nombre.toUpperCase().indexOf(nombreEjecutivo.toUpperCase()) > -1) {

                var aux = ejecutivo.nombre.toUpperCase().indexOf(nombreEjecutivo.toUpperCase());
                var x = ejecutivo.nombre.substring(aux, aux + nombreEjecutivo.length);
                $("#ListaEjecutivo tbody").append("<tr></tr>");
                $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.nombre.replace(x, "<span style='background-color:#FFFF87;font-weight:bold'>" + x + "</span>") + "</td>");
                $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.cantidad + "</td>");
                $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.fecha + "</td>");
                $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.valorHora + "</td>");
                $("#ListaEjecutivo tbody tr:last").append("<td>" + ejecutivo.pagoTotal + "</td>");
                $("#ListaEjecutivo tbody tr:last").append("<td><button type='button' onclick='cargarModalEditar(this," + ejecutivo.idHorasExtra + ")' data-toggle='modal' data-target='#mdlEditar'  class='btn btn-primary'> Editar </button > <button type='button' onclick='borrarHoraExtra(" + ejecutivo.idHorasExtra + ")' class='btn btn-danger'> Borrar </button > <input type='hidden' value='" + ejecutivo.idUsuario + "'/></td>");
            }

        });
        
        }
        

    }//FIN DE COMPROBAR LISTA.

}