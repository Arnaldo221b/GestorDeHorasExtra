Imports System.Web
Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.Data

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
<System.Web.Script.Services.ScriptService()> _
<WebService(Namespace:="http://tempuri.org/")> _
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Public Class ServicioWeb
    Inherits System.Web.Services.WebService


    <WebMethod(True)> _
    Public Function buscarUsuario(pUsuario As String, pClave As String) As Usuario
        Try
            Dim usuarioBL As New clsUsuario()
            Dim auxUsuario As Usuario = usuarioBL.BuscarUsuario(pUsuario, pClave)
            If Not auxUsuario Is Nothing Then
                Session.Add("UsuarioLogueado", auxUsuario)
            End If

            Return auxUsuario

        Catch ex As Exception
            Return New Usuario
        End Try
    End Function

    <WebMethod(True)> _
    Public Function buscarEjecutivosDeSupervisor() As String
        Try
            If Not Session.Item("UsuarioLogueado") Is Nothing Then

                Dim auxUsuario As Usuario = Session.Item("UsuarioLogueado")
                Dim ejecutivoBL As New clsEjecutivo()
                Dim tabla As DataTable = ejecutivoBL.ObtenerEjecutivosPorSupervisor(auxUsuario.Id)

                If Not tabla Is Nothing Then

                    Dim utilidadesBL As New clsUtilidades()
                    Return utilidadesBL.ConvertDataTabletoString(tabla)
                Else
                    Return ""
                End If

            Else
                Return ""
            End If

        Catch ex As Exception
            Return ""
        End Try
    End Function

    <WebMethod(True)> _
    Public Sub ModificarHoraExtra(IDHorasExtra As Integer, cantidad As Integer, valor As Double, pagoTotal As Double, fecha As Date)

        Dim ejecutivoBL As New clsEjecutivo()
        Try
            ejecutivoBL.ModificarHoraExtra(IDHorasExtra, cantidad, valor, pagoTotal, fecha)

        Catch ex As Exception

        End Try
    End Sub

End Class

