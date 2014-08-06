<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Index.aspx.vb" Inherits="Index" %>

<!DOCTYPE html>

<html lang="es">
<head runat="server">
    <meta charset="UTF-8">
    <link rel="Stylesheet" href="Styles/basico.css" />
    <link rel="Stylesheet" href="Styles/bootstrap.css" />
    
    <title>Inicio - Gestor Horas Extra</title>
</head>
<body>
    <form id="form1" runat="server">

      <div class="container well">
        
        <fieldset>
        <legend>Inicio de Sesión</legend>
           
            <label for="txtUsuario">Usuario</label>
            <input type="text" id="txtUsuario" placeholder="Nombre Usuario" />
            
            <label for="txtPassword">Contraseña</label>
            <input type="password" id="txtPassword" placeholder="Ingrese password" />
            <br />
            <a href="#" class="btn btn-primary" id="btnAceptar" >Aceptar</a>     
         </fieldset>
         <div id="msjError" style="margin-top:1em; display:none;">
         </div>
      </div>

    </form>

<script type="text/javascript" src="Scripts/jquery-1.11.1.js"></script>
<script type="text/javascript" src="Scripts/Index.js"></script>
<script type="text/javascript" src="Scripts/basico.js"></script>
<script type="text/javascript" src="Scripts/bootstrap.js"></script>
</body>


</html>
