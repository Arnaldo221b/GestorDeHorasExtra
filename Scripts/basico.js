
function mostrarCargando(pMensaje) {
    if (pMensaje == null || pMensaje == undefined || pMensaje == "") {
        pMensaje = "CARGANDO";
    }
    $("body").append("<div id='mensajeCargando'><img id='imgCargando' src='Imagenes/imgCargando.GIF' alt='imagen cargando' /><p>" + pMensaje + "</p></div>");
}

function esconderCargando() {
    $("#mensajeCargando").remove();
}

function mostrarAlerta(lugar, mensaje,tipoAlerta) {
    var contenedorMensaje = document.getElementById("" + lugar + "_1");

    if (contenedorMensaje != null && contenedorMensaje != undefined) {
        $('#' + lugar + '_1').remove();
    }
    
    $('#' + lugar).append('<div id="' + lugar + '_1" class="alert alert-'+tipoAlerta+'"></div>');
    $('#' + lugar + '_1').append('<button type="button" class="close" data-dismiss="alert">&times;</button>');
    $('#' + lugar + '_1').append('' + mensaje + '');
    $('#' + lugar ).fadeIn(1500);
}




