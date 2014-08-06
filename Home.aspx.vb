
Partial Class Home
    Inherits System.Web.UI.Page



    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load

        If Not Page.IsPostBack Then

            If Me.Session.Item("UsuarioLogueado") Is Nothing Then
                Response.Redirect(ResolveUrl("~/Index.aspx"))
            End If

        End If

    End Sub

End Class
