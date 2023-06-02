' Module: Keystore Properties Window
' Purpose: Provide user access to encrypted keystore
' Title: ThetaKVM v1.0
' SubTitle: Offline Edition
' Sute: ThetaNMS v2.0
' Dev: Tom (slick) Gervais
' Support: fuelfoundry.io

Imports System.IO

Public Class frmWalletKeystore

    Public Shared localWalletID As Integer = -1
    Public Shared localWalletName As String = ""

    Private Sub BtnViewBox_Click(sender As Object, e As EventArgs) Handles btnViewBox.Click
        If txtDataBox.PasswordChar = "*" Then
            txtDataBox.PasswordChar = ""
        Else
            txtDataBox.PasswordChar = "*"
        End If
    End Sub

    Private Sub BtnExpand_Click(sender As Object, e As EventArgs) Handles btnExpand.Click

        If Me.FormBorderStyle = FormBorderStyle.None Then
            Me.FormBorderStyle = FormBorderStyle.FixedDialog
        Else
            Me.FormBorderStyle = FormBorderStyle.None
        End If

    End Sub

    Private Sub BtnClose_Click(sender As Object, e As EventArgs) Handles btnClose.Click
        Me.Dispose()
    End Sub

    Private Sub TxtDataBox_TextChanged(sender As Object, e As EventArgs) Handles txtDataBox.TextChanged
        btnSave.Visible = True

        If txtDataBox.Text.Length > 0 Then
            btnExport.Visible = True
        Else
            btnExport.Visible = False
        End If

    End Sub

    Private Sub txtDataBox_MouseEnter(sender As Object, e As EventArgs) Handles txtDataBox.MouseEnter
        txtDataBox.PasswordChar = ""
    End Sub

    Private Sub txtDataBox_MouseLeave(sender As Object, e As EventArgs) Handles txtDataBox.MouseLeave
        txtDataBox.PasswordChar = "*"
    End Sub

    Private Sub BtnSave_Click(sender As Object, e As EventArgs) Handles btnSave.Click

        If btnSave.Text = "Copy" Then
            Clipboard.SetText(txtDataBox.Text)
            lblFooterMsg.Text = "KEYSTORE COPIED TO CLIPBOARD"
            Exit Sub

        End If

        If GlobalVars.SU_PASSWORD_TEMP.Length > 0 Then
            frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(12).Value = GlobalFunctions.Encode(GlobalVars.SU_PASSWORD_TEMP, txtDataBox.Text)
        Else
            Dim tempPassword As String = InputBox("Enter in your SuperUser password to encrypt.")

            If SHA.GenerateSHA512String(tempPassword) = GlobalVars.VAULT_su_hash Then
                frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(12).Value = GlobalFunctions.Encode(tempPassword, txtDataBox.Text)

            End If
        End If

        frmMain.dgvWallets.UpdateCellValue(12, GlobalVars.SELECTED_WALLET_ID)
        GlobalFunctions.WriteKeyVaultToFile()
        lblFooterMsg.Text = "KEYSTORE SAVED SUCCESSFULLY"

    End Sub

    Private Sub FrmWalletVaultProperties_Load(sender As Object, e As EventArgs) Handles MyBase.Load

        If frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(12).Value.ToString.Length >= 12 Then
            txtDataBox.Text = GlobalFunctions.Decode(GlobalVars.SU_PASSWORD_TEMP, frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(12).Value)
        End If
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


    Private Sub btnExport_MouseEnter(sender As Object, e As EventArgs) Handles btnExport.MouseEnter
        btnExport.ForeColor = Color.FromArgb(255, 128, 0)
    End Sub

    Private Sub btnExport_MouseLeave(sender As Object, e As EventArgs) Handles btnExport.MouseLeave
        btnExport.ForeColor = Color.Gray
    End Sub

    Private Sub BtnExport_Click(sender As Object, e As EventArgs) Handles btnExport.Click

        ExportFileDialog1.FileName = GlobalVars.SELECTED_WALLET_ADDRESS + ".keystore"

        If ExportFileDialog1.ShowDialog() = DialogResult.OK Then

            My.Computer.FileSystem.WriteAllText(ExportFileDialog1.FileName, txtDataBox.Text, False)

            lblFooterMsg.Text = "KEYSTORE EXPORTED SUCCESSFULLY"
            End If

    End Sub
End Class