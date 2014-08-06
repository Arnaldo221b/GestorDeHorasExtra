Imports System.Data.SqlClient
Imports System.Data

Public Class clsUsuario

    Private strConexion As String = "Data Source=192.168.0.201\HOLMESSQLSERVER;Initial Catalog=bd_pruebaLocal;Persist Security Info=True;User ID=aordonez;Password=Holmes221Baker"
    Private conexion As New SqlConnection(strConexion)

    ''' <summary>
    '''  Permite buscar un usuario especifico.
    ''' </summary>
    ''' <param name="pNombre">Nombre de usuario</param>
    ''' <param name="pPassword">Password de usuario</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function BuscarUsuario(ByVal pNombre As String, ByVal pPassword As String) As Usuario
        Dim comando As New SqlCommand()

        'PARAMETROS A PASAR AL PROCEDIMIENTO ALMACENADO
        Dim paramNombre As New SqlParameter("@nombre", pNombre)
        Dim paramPassword As New SqlParameter("@password", pPassword)

        Try

            'SE DEFINE LA CONSULTA A HACER A LA BD
            With comando
                'TIPO PROCEDIMIENTO ALMACENADO
                .CommandType = CommandType.StoredProcedure
                'NOMBRE DEL PROCEDIMIENTO ALMACENADO
                .CommandText = "sp_BuscarUsuario"
                'PARAMETROS
                .Parameters.Add(paramNombre)
                .Parameters.Add(paramPassword)
                'LA CONEXION A LA BD
                .Connection = conexion
            End With

            'ABRO LA CONEXION
            conexion.Open()

            'ESTABLEZCO UN LECTOR
            Dim lector As SqlDataReader

            'EJECUTO LA CONSULTA O PROCEDIMIENTO ALMACENADO
            lector = comando.ExecuteReader()

            'COMPRUEBO SI TIENE FILAS
            If lector.HasRows Then
                lector.Read()

                'CREO UN USUARIO EN BASE A LO RESCATADO
                Dim auxUsuario As New Usuario
                auxUsuario.Id = lector.GetInt32(0)
                auxUsuario.Nombre = lector.GetString(1)
                auxUsuario.Password = lector.GetString(2)
                Return auxUsuario
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Return Nothing
        Finally
            'CIERRO LA CONEXION
            If conexion.State <> ConnectionState.Closed Then
                conexion.Close()
            End If
        End Try

    End Function


End Class
