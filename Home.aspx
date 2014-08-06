<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Home.aspx.vb" Inherits="Home" %>

<!DOCTYPE html>

<html lang="es">
<head runat="server">
    <meta charset="UTF-8">
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

        <div>
        
        </div>
        <div class="col-md-5">
           <button type="button" ID="btnAgregar" name="btnAgregar" class="btn btn-default"> + Nuevo Registro</button>
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

        
<!-- Modal -->
        <div class="modal fade" id="mdlEditar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only"></span></button>
                <h4 class="modal-title" id="myModalLabel">Editar Ejecutivo</h4>
              </div>
              <div class="modal-body">
                    <label for"txtEditarNombre" class="label">Nombre</label><br />
                    <input id="txtEditarNombre" type="text" name="txtEditarNombre"  disabled /><br />
                    <label for"txtEditarCantidad" class="label">Cantidad Horas Extras</label><br />
                    <input id="txtEditarCantidad" type="number" name="txtEDitarCantidad" placeholder="Cantidad horas Extras" /><br />
                    <label for"txtEditarValor" class="label">Valor Hora Extra</label><br />
                    <input id="txtEditarValor" type="number" name="txtEditarValor" placeholder="Valor Hora Extra"  /><br />
                    <label for"txtEditarPago" class="label">Pago total</label><br />
                    <input id="txtEditarPago" type="number" name="txtEditarPago" placeholder="Pago Total"  /><br />
                    <label for"txtEditarFecha" class="label">Fecha Realización Horas Extras</label><br />
                    <input id="txtEditarFecha" type="date" name="txtEditarFecha"   /><br />

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

    </div>
    </form>

<script type="text/javascript" src="Scripts/jquery-1.11.1.js"></script>
<script type="text/javascript" src="Scripts/Home.js"></script>
<script type="text/javascript" src="Scripts/basico.js"></script>
<script type="text/javascript" src="Scripts/bootstrap.js"></script>
</body>
</html>
