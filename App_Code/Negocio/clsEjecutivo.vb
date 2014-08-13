Imports System.Data.SqlClient
Imports System.Data

Public Class clsEjecutivo

    Private strConexion As String = "Data Source=192.168.0.201\HOLMESSQLSERVER;Initial Catalog=bd_pruebaLocal;Persist Security Info=True;User ID=aordonez;Password=Holmes221Baker"
    Private conexion As New SqlConnection(strConexion)

    Public Function ObtenerEjecutivosPorSupervisor(ByVal pidSupervisor As Integer) As DataTable
        Dim resultado As New DataSet
        Dim adapter As New SqlDataAdapter
        Dim comando As New SqlCommand

        Try
            Dim paramIdSupervisor As New SqlParameter("@idSupervisor", pidSupervisor)

            'SE DEFINE LA CONSULTA A HACER A LA BD
            With comando
                'TIPO PROCEDIMIENTO ALMACENADO
                .CommandType = CommandType.StoredProcedure
                'NOMBRE DEL PROCEDIMIENTO ALMACENADO
                .CommandText = "sp_ObtenerEjecutivos"
                'PARAMETROS
                .Parameters.Add(paramIdSupervisor)
                'LA CONEXION A LA BD
                .Connection = conexion
            End With

            conexion.Open()
            adapter.SelectCommand = comando
            adapter.Fill(resultado)
            adapter.Dispose()
            comando.Dispose()
            conexion.Close()

            If resultado.Tables.Count > 0 Then
                Return resultado.Tables(0)
            Else
                Return New DataTable
            End If

        Catch ex As Exception
            Return New DataTable
        Finally
            If conexion.State <> ConnectionState.Closed Then
                conexion.Close()
            End If
        End Try

    End Function

    Public Sub ModificarHoraExtra(IDHorasExtra As Integer, cantidad As Integer, valor As Double, pagoTotal As Double, fecha As Date)
        Dim comando As New SqlCommand


        Try
            Dim paramIDHoraExtra As New SqlParameter("@IdHoraExtra", IDHorasExtra)
            Dim paramCantidad As New SqlParameter("@cantidad", cantidad)
            Dim paramValor As New SqlParameter("@valorHora", valor)
            Dim paramPago As New SqlParameter("@PagoTotal", pagoTotal)
            Dim paramFecha As New SqlParameter("@Fecha", fecha)

            'SE DEFINE LA CONSULTA A HACER A LA BD
            With comando
                'TIPO PROCEDIMIENTO ALMACENADO
                .CommandType = CommandType.StoredProcedure
                'NOMBRE DEL PROCEDIMIENTO ALMACENADO
                .CommandText = "sp_ModificarHoraExtra"
                'PARAMETROS
                .Parameters.Add(paramIDHoraExtra)
                .Parameters.Add(paramCantidad)
                .Parameters.Add(paramValor)
                .Parameters.Add(paramPago)
                .Parameters.Add(paramFecha)
                'LA CONEXION A LA BD
                .Connection = conexion
            End With

            conexion.Open()
            comando.ExecuteNonQuery()
            comando.Dispose()
            conexion.Close()


        Catch ex As Exception

        Finally
            If conexion.State <> ConnectionState.Closed Then
                conexion.Close()
            End If
        End Try

    End Sub


    ''' <summary>
    '''  Permite dar de baja un registro de hora extra
    ''' </summary>
    ''' <param name="idHorasExtra">Id de la hora extra a dar de baja</param>
    ''' <remarks></remarks>
    Public Sub BorrarHoraExtra(idHorasExtra As Integer)
        Dim comando As New SqlCommand


        Try
            Dim paramIDHoraExtra As New SqlParameter("@IdHoraExtra", idHorasExtra)

            'SE DEFINE LA CONSULTA A HACER A LA BD
            With comando
                'TIPO PROCEDIMIENTO ALMACENADO
                .CommandType = CommandType.StoredProcedure
                'NOMBRE DEL PROCEDIMIENTO ALMACENADO
                .CommandText = "sp_EliminarHoraExtra"
                'PARAMETROS
                .Parameters.Add(paramIDHoraExtra)
                'LA CONEXION A LA BD
                .Connection = conexion
            End With

            conexion.Open()
            comando.ExecuteNonQuery()
            comando.Dispose()
            conexion.Close()


        Catch ex As Exception

        Finally
            If conexion.State <> ConnectionState.Closed Then
                conexion.Close()
            End If
        End Try

    End Sub

    ''' <summary>
    '''  Permite insertar un nuevo registro de hora extra
    ''' </summary>
    ''' <param name="cantidad"></param>
    ''' <param name="valor"></param>
    ''' <param name="pagoTotal"></param>
    ''' <param name="fecha"></param>
    ''' <remarks></remarks>
    Public Sub InsertarHoraExtra(cantidad As Integer, valor As Double, pagoTotal As Double, fecha As Date, idUsuario As Integer, vigente As Boolean)
        Dim comando As New SqlCommand


        Try
            Dim paramCantidad As New SqlParameter("@cantidad", cantidad)
            Dim paramValor As New SqlParameter("@valorHora", valor)
            Dim paramPago As New SqlParameter("@PagoTotal", pagoTotal)
            Dim paramFecha As New SqlParameter("@Fecha", fecha)
            Dim paramidUsuario As New SqlParameter("@idUsuario", idUsuario)
            Dim paramVigente As New SqlParameter("@vigente", vigente)

            'SE DEFINE LA CONSULTA A HACER A LA BD
            With comando
                'TIPO PROCEDIMIENTO ALMACENADO
                .CommandType = CommandType.StoredProcedure
                'NOMBRE DEL PROCEDIMIENTO ALMACENADO
                .CommandText = "sp_insertarHoraExtra"
                'PARAMETROS
                .Parameters.Add(paramCantidad)
                .Parameters.Add(paramValor)
                .Parameters.Add(paramPago)
                .Parameters.Add(paramFecha)
                .Parameters.Add(paramidUsuario)
                .Parameters.Add(paramVigente)
                'LA CONEXION A LA BD
                .Connection = conexion
            End With

            conexion.Open()
            comando.ExecuteNonQuery()
            comando.Dispose()
            conexion.Close()


        Catch ex As Exception

        Finally
            If conexion.State <> ConnectionState.Closed Then
                conexion.Close()
            End If
        End Try

    End Sub

    Public Function ObtenerUsuarios(pidSupervisor As Integer) As DataTable
        Dim resultado As New DataSet
        Dim adapter As New SqlDataAdapter
        Dim comando As New SqlCommand

        Try

            Dim paramIdSupervisor As New SqlParameter("@idSupervisor", pidSupervisor)

            'SE DEFINE LA CONSULTA A HACER A LA BD
            With comando
                'TIPO PROCEDIMIENTO ALMACENADO
                .CommandType = CommandType.StoredProcedure
                'NOMBRE DEL PROCEDIMIENTO ALMACENADO
                .CommandText = "sp_ObtenerUsuarios"
                'PARAMETROS
                .Parameters.Add(paramIdSupervisor)
                'LA CONEXION A LA BD
                .Connection = conexion
            End With

            conexion.Open()
            adapter.SelectCommand = comando
            adapter.Fill(resultado)
            adapter.Dispose()
            comando.Dispose()
            conexion.Close()

            If resultado.Tables.Count > 0 Then
                Return resultado.Tables(0)
            Else
                Return New DataTable
            End If

        Catch ex As Exception
            Return New DataTable
        Finally
            If conexion.State <> ConnectionState.Closed Then
                conexion.Close()
            End If
        End Try

    End Function


End Class
