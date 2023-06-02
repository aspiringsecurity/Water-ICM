' Title: ThetaKVM v1.0
' SubTitle: Offline Edition
' Sute: ThetaNMS v2.0
' Dev: Tom (slick) Gervais
' Support: fuelfoundry.io

Imports System.IO
Imports Microsoft.Win32
'Imports System.Text.Json
'Imports System.Text.Json.Serialization
'Imports Newtonsoft.Json

Public Class frmLogin

    Function CheckForFirstRun()

        If My.Computer.Registry.GetValue("HKEY_CURRENT_USER\SOFTWARE\FuelFoundry\ThetaNMS\ThetaKVM",
                                         "LastOpenedKeyVault", Nothing) Is Nothing Then
            'value does not exist, setup for first run
            My.Computer.Registry.CurrentUser.CreateSubKey("SOFTWARE\FuelFoundry\ThetaNMS\ThetaKVM")
            My.Computer.Registry.SetValue("HKEY_CURRENT_USER\SOFTWARE\FuelFoundry\ThetaNMS\ThetaKVM", "LastOpenedKeyVault",
                                          GlobalVars.strKeyVaultLocation)

            GlobalVars.VAULT_pk_encryption = 0
            MsgBox("READ THIS!  

This looks to be your first time running ThetaKVM.  Take note, while this app has been *Thetafied* to look super Thetaeee (because who doesn't love Theta?), this app is NOT written or endorsed any way by ThetaLabs, but was written rather by a very big fan-person.  So enjoy and keep in mind there are no warranties provided for using this applciation.  

*Use at your own risk*  

Also be sure to compile the program yourself or if you downloaded the binary off the web, validate the checksum!", vbOKOnly, "ThetaKVM - Offline Edition [Hackathon Build]")

        Else
            'value exists, open last file
            GlobalVars.strKeyVaultLocation = My.Computer.Registry.GetValue("HKEY_CURRENT_USER\SOFTWARE\FuelFoundry\ThetaNMS\ThetaKVM", "LastOpenedKeyVault", Nothing)
        End If

        If My.Computer.FileSystem.FileExists(GlobalVars.strKeyVaultLocation) Then

            'proceed / do nothing
        Else
            'future: prompt if file not exists

            'write template file
            Dim file As System.IO.StreamWriter
            file = My.Computer.FileSystem.OpenTextFileWriter(GlobalVars.strKeyVaultLocation, True)
            file.Write(GlobalVars.strKeyVaultTEMPLATE)
            'file.WriteLine(strKeyVaultTEMPLATE)
            file.Close()
        End If

        Return 0
    End Function


    Private Sub BtnLogin_Click(sender As Object, e As EventArgs) Handles btnLogin.Click


        If GlobalVars.SU_PASSWORD_REMEMBER Then
            ' GlobalVars.SU_PASSWORD_TEMP

        End If

        'Add checkbox to allow the option to store SU Password
        GlobalVars.SU_PASSWORD_TEMP = txtSUpassword.Text

        If GlobalVars.VAULT_su_encryption = 1 And SHA.GenerateSHA512String(GlobalVars.ENCRYPT_HEADER & GlobalVars.SU_PASSWORD_TEMP & GlobalVars.ENCRYPT_FOOTER) <> GlobalVars.VAULT_su_hash Then
            lblFooterMsg.Text = "PASSWORD FAILED"
            Exit Sub
        End If

        frmMain.Show()
        frmMain.TopMost = True
        Application.DoEvents()
        frmMain.TopMost = False
    End Sub

    Private Sub BtnClose_Click(sender As Object, e As EventArgs) Handles btnClose.Click
        Application.Exit()
    End Sub

    Private Sub BtnLogin_MouseDown(sender As Object, e As MouseEventArgs) Handles btnLogin.MouseDown


        btnLogin.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub BtnLogin_MouseUp(sender As Object, e As MouseEventArgs) Handles btnLogin.MouseUp

        btnLogin.FlatAppearance.BorderColor = Color.DimGray
    End Sub

    Private Sub TxtPassword_MouseMove(sender As Object, e As MouseEventArgs) Handles txtSUpassword.MouseMove
        If txtSUpassword.Text.Length > 0 Then Exit Sub
        lblSUPass.Visible = True
    End Sub

    Private Sub FrmLogin_MouseMove(sender As Object, e As MouseEventArgs) Handles MyBase.MouseMove
        If txtSUpassword.Text.Length > 0 Then Exit Sub
        lblSUPass.Visible = True
    End Sub

    Private Sub FrmLogin_MouseLeave(sender As Object, e As EventArgs) Handles MyBase.MouseLeave
        lblSUPass.Visible = False
    End Sub

    Private Sub LblHeading_MouseMove(sender As Object, e As MouseEventArgs) Handles lblHeading.MouseMove
        If txtSUpassword.Text.Length > 0 Then Exit Sub

        lblSUPass.Visible = True
    End Sub

    Private Sub BtnLogin_MouseMove(sender As Object, e As MouseEventArgs) Handles btnLogin.MouseMove
        If txtSUpassword.Text.Length > 0 Then Exit Sub
        lblSUPass.Visible = True
    End Sub

    Private Sub TxtPassword_TextChanged(sender As Object, e As EventArgs) Handles txtSUpassword.TextChanged
        If txtSUpassword.Text.Length > 0 Then lblSUPass.Visible = False
        lblFooterMsg.Text = ""
    End Sub

    Private Sub lblLoginMessage_MouseMove(sender As Object, e As MouseEventArgs) Handles lblLoginMessage.MouseMove
        If txtSUpassword.Text.Length > 0 Then Exit Sub
        lblSUPass.Visible = True
    End Sub '

    Private Sub FrmLogin_Load(sender As Object, e As EventArgs) Handles MyBase.Load

        'check for first run, otherwise set keyvault location to last opened keyvault
        CheckForFirstRun()

        'set globals
        Try
            GlobalVars.jsonFile = File.ReadAllText(GlobalVars.strKeyVaultLocation)
            GlobalVars.vaultData = Newtonsoft.Json.Linq.JObject.Parse(GlobalVars.jsonFile)

            GlobalVars.VAULT_version = GlobalVars.vaultData.Item("version")
            GlobalVars.VAULT_backward_compatibility_version = GlobalVars.vaultData.Item("backward_compatibility_version")
            GlobalVars.VAULT_su_encryption = GlobalVars.vaultData.Item("su_encryption")
            GlobalVars.VAULT_su_hash = GlobalVars.vaultData.Item("su_hash").ToString
            GlobalVars.VAULT_pk_encryption = GlobalVars.vaultData.Item("pk_encryption")

            GlobalVars.VAULT_pk_validation = GlobalVars.vaultData.Item("pk_validation").ToString
            GlobalVars.VAULT_keybase_cnt = GlobalVars.vaultData.Item("keybase_cnt")
            GlobalVars.VAULT_wallet_cnt = GlobalVars.vaultData.Item("wallet_cnt")

            'DEBUG
            'GlobalVars.VAULT_su_encryption = 1

            If GlobalVars.VAULT_su_encryption = 0 Then
                lblLoginMessage.Visible = True

            Else
                lblFooterMsg.Text = ""
                '  chkRememberUntilClose.Visible = True
            End If

        Catch ex As Exception
            ' in case the structure of the object is not what we expected.
            MsgBox(ex.Message)

        End Try

    End Sub

    Private Sub ChkRememberUntilClose_CheckedChanged(sender As Object, e As EventArgs) Handles chkRememberUntilClose.CheckedChanged
        chkRememberUntilClose.ForeColor = Color.FromArgb(255, 128, 0)
        GlobalVars.SU_PASSWORD_REMEMBER = chkRememberUntilClose.Checked

    End Sub
End Class

