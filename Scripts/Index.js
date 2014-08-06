
$(document).ready(function () {

    $("#btnAceptar").click(function () {

        BuscarUsuario();

    });

});


function BuscarUsuario() {

    var usuario = $('#txtUsuario').val();
    var clave = $('#txtPassword').val();
    mostrarCargando();

    try {
        $.ajax({
            type: "POST",
            url: "ServicioWeb.asmx/buscarUsuario",
            data: '{ "pUsuario":"' + usuario + '", "pClave":"' + clave + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                esconderCargando();
                if (data.d != undefined && data.d != null) {
                    window.location.href = "Home.aspx";
                } else {
                    mostrarAlerta('msjError', 'El usuario o password ingresado no son válidos.', 'error');
                }
            },
            error: function (response) { esconderCargando(); alert(response.status + " " + response.statusText); }
        });

    } catch (e) {
        esconderCargando();
        alert("Ha ocurrido un error : " + e.message);
    }

}