' Module: Keystore Properties Window
' Purpose: Provide second level user access to encrypted passwords and other sensitive data
' Title: ThetaKVM v1.0
' SubTitle: Offline Edition
' Sute: ThetaNMS v2.0
' Dev: Tom (slick) Gervais
' Support: fuelfoundry.io


Public Class frmWalletVaultCryptViewModify

    'localables
    Public Shared localWalletID As Integer = -1
    Public Shared localWalletName As String = ""

    'keep in mind, this saves having to type the username/password at every open and save, with the very rare potential exposure of this password residing in memory while the window is open
    Public Shared tempPKpass As String = ""
    Public Shared passMode As Integer = 0
    Public Shared passVar As Integer = -1


    Private Sub BtnClose_Click(sender As Object, e As EventArgs) Handles btnClose.Click
        Me.Close()
    End Sub

    Private Sub BtnSave_Click(sender As Object, e As EventArgs) Handles btnSave.Click

        If btnSave.Text = "Copy" Then
            Clipboard.SetText(txtDataBox.Text)
            lblFooterMsg.Text = "KEYSTORE COPIED TO CLIPBOARD"
            Exit Sub

        End If

        If GlobalFunctions.PKValidatePassword(tempPKpass) = True Then

            frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(passVar).Value = GlobalFunctions.Encode(tempPKpass, txtDataBox.Text)

            lblFooterMsg.Text = "KEYVAULT UPDATED SUCCESSFULLY"
        Else
            lblFooterMsg.Text = "KEYVAULT UPDATED FAILED"
        End If

        GlobalFunctions.WriteKeyVaultToFile()

    End Sub

    Private Sub BtnExpand_Click(sender As Object, e As EventArgs) Handles btnExpand.Click
        If Me.FormBorderStyle = FormBorderStyle.None Then
            Me.FormBorderStyle = FormBorderStyle.FixedDialog
        Else
            Me.FormBorderStyle = FormBorderStyle.None
        End If
    End Sub

    Private Sub FrmWalletVaultCryptViewModify_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        'Me.Dispose()
    End Sub

    Private Sub TxtDataBox_TextChanged(sender As Object, e As EventArgs) Handles txtDataBox.TextChanged
        btnSave.Visible = True
    End Sub

    Private Sub txtDataBox_MouseEnter(sender As Object, e As EventArgs) Handles txtDataBox.MouseEnter
        txtDataBox.PasswordChar = ""
    End Sub

    Private Sub txtDataBox_MouseLeave(sender As Object, e As EventArgs) Handles txtDataBox.MouseLeave
        txtDataBox.PasswordChar = "*"
    End Sub

    Private Sub btnSave_MouseDown(sender As Object, e As MouseEventArgs) Handles btnSave.MouseDown
        btnSave.ForeColor = Color.DarkGray
    End Sub

    Private Sub btnSave_MouseEnter(sender As Object, e As EventArgs) Handles btnSave.MouseEnter
        btnSave.ForeColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub btnSave_MouseLeave(sender As Object, e As EventArgs) Handles btnSave.MouseLeave
        btnSave.ForeColor = Color.DarkGray
    End Sub
End Class