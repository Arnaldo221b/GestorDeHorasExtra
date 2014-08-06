Imports Microsoft.VisualBasic
Imports System.Data

Public Class clsUtilidades

    ''' <summary>
    '''  Permite convertir un datatable en un json
    ''' </summary>
    ''' <param name="dt">DataTable a convertir</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ConvertDataTabletoString(dt As DataTable) As String

        Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
        Dim rows As New List(Of Dictionary(Of String, Object))()
        Dim row As Dictionary(Of String, Object)

        For Each dr As DataRow In dt.Rows
            row = New Dictionary(Of String, Object)()
            For Each col As DataColumn In dt.Columns
                row.Add(col.ColumnName, dr(col))
            Next
            rows.Add(row)
        Next

        Return serializer.Serialize(rows)

    End Function

End Class
