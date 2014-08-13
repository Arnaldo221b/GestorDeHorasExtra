<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Home.aspx.vb" Inherits="Home" %>

<!DOCTYPE html>

<html lang="es">
<head runat="server">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="Stylesheet" href="Styles/basico.css" />
    <link rel="Stylesheet" href="Styles/bootstrap.css" />

    <title>Home - Gestor Horas Extra</title>
</head>
<body>
    <form id="form1" runat="server">
    <div class="container active">
        
        <header class="page-header">
           <h1>Gestor de Horas Extra</h1>
           <h2><small>Usuario : <%: Session.Item("UsuarioLogueado").Nombre()%></small></h2>
        </header>
        <section>

        <div class="row">
          <div class="col-md-6 col-sm-5"><button type="button" ID="btnAgregar" name="btnAgregar" data-toggle='modal' data-target='#mdlAgregar' class="btn btn-default"> + Nuevo Registro</button></div>
          <div class="col-md-5 col-md-offset-1"><input type="text" onkeyup="BuscarEjecutivoPorNombre()" name="txtBuscarNombre" id="txtBuscarNombre" class="form-control" placeholder="Ingresa el nombre de un ejecutivo a buscar..." /></div>
        </div>
        
        
            
            <h4>Listado de Ejecutivos</h4>
            
            <table id="ListaEjecutivo" class="table table-bordered">
               <thead class="Azul">
                 <th>Nombre</th>
                 <th>Cantidad Horas Extra</th>
                 <th>Fecha Realización Horas Extras</th>
                 <th>Valor Hora Extra</th>
                 <th>Pago Total</th>                 
                 <th>Acción</th>
               </thead>
               <tbody>
                 <tr>
                    <td>......</td>
                    <td>......</td>
                    <td>......</td>
                    <td>......</td>
                    <td>......</td>
                    <td>......</td>
                 </tr>
               </tbody>
            </table>

        </section>
        <footer></footer>

        
<!-- Modal Editar -->
        <div class="modal fade" id="mdlEditar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only"></span></button>
                <h4 class="modal-title" id="myModalLabel">Editar Horas Extras</h4>
              </div>
              <div class="modal-body">
                    <label for="cboEditarUsuario" >Nombre</label><br />
                    <select id="cboEditarUsuario" class="form-control" disabled>
                    </select><br />
                    <label for="txtEditarCantidad" >Cantidad Horas Extras</label><br />
                    <input id="txtEditarCantidad" class="form-control" onchange="CalcularValorAPagar(2)" type="number" required="required" min="0" name="txtEDitarCantidad" placeholder="Cantidad horas Extras" /><br />
                    <label for="txtEditarValor" >Valor Hora Extra</label><br />
                    <input id="txtEditarValor" class="form-control" onchange="CalcularValorAPagar(2)" type="number" required="required" min="0" name="txtEditarValor" placeholder="Valor Hora Extra"  /><br />
                    <label for="txtEditarPago" >Pago total</label><br />
                    <input id="txtEditarPago"  class="form-control" type="number" required="required" min="0" name="txtEditarPago" placeholder="Pago Total" disabled /><br />
                    <label for="txtEditarFecha">Fecha Realización Horas Extras</label><br />
                    <input id="txtEditarFecha" class="form-control" type="date" required="required" name="txtEditarFecha"   /><br />

                    <!--Input escondido con valor de ID -->
                    <input id="txtEditarIDHoraExtra" type="hidden" name="txtEditarIDHoraExtra" />

                    <div id="msjExitoso" style="margin-top:1em; display:none">
                    </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                <button id="btnModificarEjecutivo" type="button" class="btn btn-primary"  >Guardar</button>
              </div>
            </div>
          </div>
        </div>



        <!-- Modal Agregar -->
        <div class="modal fade" id="mdlAgregar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only"></span></button>
                <h4 class="modal-title" id="H1">Agregar Horas Extras</h4>
              </div>
              <div class="modal-body">
                    <label for="cboAgregarUsuario" >Nombre</label><br />
                    <select id="cboAgregarUsuario" class="form-control" >
                    </select><br />
                    <label for"txtAgregarCantidad" >Cantidad Horas Extras</label><br />
                    <input id="txtAgregarCantidad" class="form-control" onchange="CalcularValorAPagar(1)" min="0" type="number" name="txtAgregarCantidad" required="required" value="0" placeholder="Cantidad horas Extras" /><br />
                    <label for"txtAgregarValor"  >Valor Hora Extra</label><br />
                    <input id="txtAgregarValor" class="form-control" onchange="CalcularValorAPagar(1)" min="0" type="number" name="txtAgregarValor" required="required" value="0" placeholder="Valor Hora Extra"  /><br />
                    <label for"txtAgregarPago" >Pago total</label><br />
                    <input id="txtAgregarPago" class="form-control" type="number" name="txtAgregarPago" placeholder="Pago Total" value="0" required="required" disabled /><br />
                    <label for"txtAgregarFecha" >Fecha Realización Horas Extras</label><br />
                    <input id="txtAgregarFecha" class="form-control" type="date" name="txtAgregarFecha" required="required"  /><br />

                    <!--Input escondido con valor de ID -->
                    <input id="txtAgregarIDUsuario" type="hidden" name="txtAgregarIDUsuario" />

                    <div id="msjExitosoAgregar" style="margin-top:1em; display:none">
                    </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                <button id="btnAgregarHora" type="button" class="btn btn-primary"  >Guardar</button>
              </div>
            </div>
          </div>
        </div>


    </div>
    </form>

<script type="text/javascript" src="Scripts/jquery-1.11.1.js"></script>
<script type="text/javascript" src="Scripts/Home.js"></script>
<script type="text/javascript" src="Scripts/basico.js"></script>
<script type="text/javascript" src="Scripts/bootstrap.js"></script>
</body>
</html>
