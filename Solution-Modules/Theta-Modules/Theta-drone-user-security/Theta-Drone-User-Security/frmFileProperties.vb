' Module: KeyVault Properties ("Encryption")
' Purpose: Used to configure encryption settings for KeyVault
' Title: ThetaKVM v1.0
' SubTitle: Offline Edition
' Sute: ThetaNMS v2.0
' Dev: Tom (slick) Gervais
' Support: fuelfoundry.io




Imports System.ComponentModel
Imports System.IO

Public Class frmFileProperties
    Dim REQUIRED_PASSWORD_LENGTH As Integer = 5

    Private Function EncryptKeystore(encryptionPassword As String, unencrypted_keystore As String)
        Dim encrypted_keystore As String = GlobalFunctions.Encode(encryptionPassword, unencrypted_keystore)
        GlobalFunctions.Decode(encryptionPassword, encrypted_keystore)

        Return encrypted_keystore
    End Function


    Private Function EncrypteAllKeystores_JSONBuilder(passwordSUhashSated As String)
        Dim wallet_array As String = ""

        Dim intRowNumber As Integer = 0
        For Each row As DataGridViewRow In frmMain.dgvWallets.Rows

            'visible grid vars
            Dim unique_id As String = intRowNumber
            Dim parent_id As Integer = row.Cells.Item(1).Value
            Dim order_id As Integer = row.Cells.Item(2).Value
            Dim description As String = row.Cells.Item(4).Value
            Dim address As String = row.Cells.Item(5).Value
            Dim feature_tags As String = row.Cells.Item(10).Value

            'hidden grid vars
            Dim keystore As String = row.Cells.Item(12).Value
            Dim keystore_pass As String = "" 'row.Cells.Item(6).Value
            Dim mnemonic As String = "" 'row.Cells.Item(7).Value
            Dim private_key As String = "" 'row.Cells.Item(8).Value

            Dim local_visible As String = row.Cells.Item(10).Value
            Dim encrypted_keystore As String = EncryptKeystore(passwordSUhashSated, keystore)

            wallet_array += """wallet" & unique_id & """ {
        ""unique_id"":" & unique_id & ",
        ""parent_id"": " & parent_id & ",
        ""order_id"":" & order_id & ",
        ""description"":""" & description & """,
        ""address"":""" & address & """,
        ""keystore"":""" & encrypted_keystore & """, 
        ""keystore_pass"":"""",
        ""mnemonic"":"""",
        ""private_key"":"""",
        ""feature_tags"":""" & feature_tags & """,
        ""visible"":1
    },"

            '""🌐 📱 🔑 🔐 🔐 🔓 ♻ 💧 🦊 Θ 🚰 ❤"",
            intRowNumber += 1
        Next

        ' MsgBox(wallet_array)
        Return wallet_array
    End Function


    Private Function EncryptVault_ApplySUpass(rawSUpassword As String)
        Dim passwordSUhashSalted = GlobalVars.ENCRYPT_HEADER & rawSUpassword & GlobalVars.ENCRYPT_FOOTER
        Dim keyvault_header_SUencrypted = "
{
""version"":1,
""backward_compatibility_version"":1,
""su_encryption"":1,
""su_hash"":""" & SHA.GenerateSHA512String(passwordSUhashSalted) & """,
""pk_encryption"":0,
""pk_validation"":"""",
""keybase_cnt"":1,
""wallet_cnt"":0,
""keybases"": {
    ""keybase2"":""KeyBase""
    },
""wallets"": {
    " & EncrypteAllKeystores_JSONBuilder(passwordSUhashSalted) & "
       ""eow"":1
    },
""eof"":1
"

        Dim keyvault_footer_SUencrypted = "
}
"
        Return keyvault_header_SUencrypted & keyvault_footer_SUencrypted
    End Function


    'VaultCrypt

    Private Function EncryptVault_ApplyVCpass(rawPKpassword As String)
        ' MsgBox(keyvault_header_SUencrypted & keyvault_footer_SUencrypted)
        ' Return keyvault_header_SUencrypted & keyvault_footer_SUencrypted
    End Function



    Private Sub FrmFileProperties_Load(sender As Object, e As EventArgs) Handles MyBase.Load

        'DEBUG
        '  GlobalVars.VAULT_su_encryption = 1

        If GlobalVars.VAULT_su_encryption = 1 Then

            chkEnableSUpass.Text = "SuperUser Password Locked"

            txtSUpass.Text = "*****"
            txtSUpass.ReadOnly = True
            txtSUpass.ForeColor = Color.Gray
            txtSUpass2.Text = "*****"
            txtSUpass2.ReadOnly = True
            txtSUpass2.ForeColor = Color.Gray
            btnApplySUpass.ForeColor = Color.Gray
            btnApplySUpass.Visible = False

            chkEnableSUpass.Checked = True
            chkEnableSUpass.ForeColor = Color.FromArgb(92, 182, 209)
            chkEnablePKpass.Visible = True
            lblVCsubtext.Visible = True
        End If

        Try

            If GlobalVars.VAULT_pk_encryption = 1 Then

                chkEnablePKpass.Text = "VaultCrypt Password Locked"

                txtPKpass.Text = "*****"
                txtPKpass.ReadOnly = True
                txtPKpass.ForeColor = Color.Gray
                txtPKpass2.Text = "*****"
                txtPKpass2.ReadOnly = True
                txtPKpass2.ForeColor = Color.Gray
                btnApplyPKpass.ForeColor = Color.Gray
                btnApplyPKpass.Visible = False

                chkEnablePKpass.Checked = True
                chkEnablePKpass.ForeColor = Color.FromArgb(92, 182, 209)
                chkEnablePKpass.Visible = True
                ' lblVCsubtext.Visible = True

                panPKPass.Visible = False
            End If

        Catch ex As Exception

        End Try

        'prep form
        txtKeyVaultLocation.Text = GlobalVars.strKeyVaultLocation
        txtFooterMsg.Text = ""
    End Sub

    Private Sub ChkEnableMasterPass_CheckedChanged(sender As Object, e As EventArgs) Handles chkEnableSUpass.CheckedChanged
        If GlobalVars.VAULT_su_encryption = 1 Then
            chkEnableSUpass.Checked = False
            txtFooterMsg.Text = "You've already set a SU password.  This feature will be included in the next version."
            chkEnablePKpass.Visible = True
            Exit Sub
        End If

        If chkEnableSUpass.Checked Then
            chkEnableSUpass.ForeColor = Color.FromArgb(92, 189, 209) 'Color.FromArgb(235, 235, 235)
            panMasterPass.Visible = True
            chkEnablePKpass.Visible = True
            lblVCsubtext.Visible = True
            lblSUsubtext.ForeColor = Color.WhiteSmoke

        Else
            chkEnableSUpass.ForeColor = Color.FromArgb(255, 128, 0)
            panMasterPass.Visible = False
            lblVCsubtext.Visible = False
            lblSUsubtext.ForeColor = Color.DarkGray
        End If

    End Sub

    Private Sub BtnSave_Click(sender As Object, e As EventArgs) Handles btnSave.Click
        frmMain.Show()
        Me.Dispose()
    End Sub

    Private Sub BtnSave_MouseMove(sender As Object, e As MouseEventArgs) Handles btnSave.MouseMove
        btnSave.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub BtnSave_MouseLeave(sender As Object, e As EventArgs) Handles btnSave.MouseLeave
        btnSave.FlatAppearance.BorderColor = Color.DimGray
    End Sub

    Private Sub BtnClose_Click(sender As Object, e As EventArgs) Handles btnClose.Click
        frmMain.Show()
        Me.Dispose()
    End Sub

    Private Sub BtnKeyVaultLocation_Click(sender As Object, e As EventArgs) Handles btnKeyVaultLocation.Click
        ofdKeyVault.FileName = txtKeyVaultLocation.Text
        ofdKeyVault.ShowDialog()

        If MsgBox("EXPERIMENTAL FEATURE WARNING!  Improper use of this tool may lock you out of your KeyVault.  Select Ok to restart with the newly selected keystore.  All unsaved changes will be lost.", vbOKCancel, "Update Default Keystore?") = 1 Then
            My.Computer.Registry.SetValue("HKEY_CURRENT_USER\SOFTWARE\FuelFoundry\ThetaNMS\ThetaKVM", "LastOpenedKeyVault",
                                          ofdKeyVault.FileName)
            Application.Restart()
        End If

    End Sub

    Private Sub btnKeyVaultLocation_MouseMove(sender As Object, e As MouseEventArgs) Handles btnKeyVaultLocation.MouseMove
        btnKeyVaultLocation.FlatAppearance.BorderColor = Color.FromArgb(255, 128, 0)
    End Sub

    Private Sub BtnKeyVaultLocation_MouseLeave(sender As Object, e As EventArgs) Handles btnKeyVaultLocation.MouseLeave
        btnKeyVaultLocation.FlatAppearance.BorderColor = Color.FromArgb(32, 32, 32)
    End Sub

    Private Sub frmFileProperties_Closing(sender As Object, e As CancelEventArgs) Handles Me.Closing
        frmMain.Show()
    End Sub

    Private Sub TxtSUpass2_TextChanged(sender As Object, e As EventArgs) Handles txtSUpass2.TextChanged
        If txtSUpass2.TextLength >= REQUIRED_PASSWORD_LENGTH Then
            If txtSUpass.Text = txtSUpass2.Text Then
                btnApplySUpass.ForeColor = Color.WhiteSmoke
                Me.AcceptButton = Me.btnApplySUpass
            Else
                btnApplySUpass.ForeColor = Color.Gray
            End If
        End If
    End Sub

    Private Sub ChkEnablePKpass_CheckedChanged(sender As Object, e As EventArgs) Handles chkEnablePKpass.CheckedChanged
        If GlobalVars.VAULT_pk_encryption = 1 Then
            chkEnablePKpass.Checked = False
            txtFooterMsg.Text = "You've already set a VaultCrypt password.  This feature will be included in the next version."
            Exit Sub
        End If

        If GlobalVars.VAULT_su_encryption = 0 Then
            txtFooterMsg.Text = "** YOU MUST FIRST APPLY A SUPERUSER PASSWORD **"
            chkEnablePKpass.Checked = False
            Exit Sub
        End If

        If chkEnablePKpass.Checked Then
            chkEnablePKpass.ForeColor = Color.FromArgb(92, 189, 209) 'Color.FromArgb(235, 235, 235)
            panPKPass.Visible = True
            chkEnablePKpass.Visible = True
            txtFooterMsg.Text = " ** ENCRYPT-KEY WARNING: USE EXTREME CAUTION WHEN HANDLING SENSITIVE DATA ** "

        Else
            chkEnablePKpass.ForeColor = Color.FromArgb(255, 128, 0)
            panPKPass.Visible = False
        End If

    End Sub

    Private Sub BtnApplySUpass_Click(sender As Object, e As EventArgs) Handles btnApplySUpass.Click
        If txtSUpass2.TextLength >= REQUIRED_PASSWORD_LENGTH Then
            If txtSUpass.Text = txtSUpass2.Text Then
                Dim intSUencrypt As Integer = MsgBox("READ BEFORE CLICKING...

Applying a SuperUser password will encrypt your KeyVault.  What does this mean?

Your already encrypted Keystores inside the KeyVault will be encrypted again, making any stored keystores not legible outside of KVM (using a JSON viewer, etc...).  Once applied, you will not be able to revert or change the superuser password (until the next version is released).  

Click OK to encrypt your KeyVault, otherwise click Cancel.", vbOKCancel, "ThetaKVM Hackathon Edition v1.0HE22 - A note from the Developer")
                If intSUencrypt = 1 Then
                    Dim file As System.IO.StreamWriter
                    file = My.Computer.FileSystem.OpenTextFileWriter(GlobalVars.strKeyVaultLocation, False)
                    file.Write(EncryptVault_ApplySUpass(txtSUpass2.Text))
                    file.Close()
                End If
            End If
        End If

        MsgBox("Click OK to restart ThetaKVM.  You will need to enter your SuperUser password to access the KeyVault.", vbOK, "ThetaKVM")
        Application.Restart()

    End Sub

    Private Sub BtnApplySUpass_MouseMove(sender As Object, e As MouseEventArgs) Handles btnApplySUpass.MouseMove
        If txtSUpass2.TextLength >= REQUIRED_PASSWORD_LENGTH Then
            If txtSUpass.Text = txtSUpass2.Text Then
                btnApplySUpass.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
            End If
        Else

            btnApplySUpass.FlatAppearance.BorderColor = Color.FromArgb(255, 128, 0)
        End If

    End Sub

    Private Sub BtnApplySUpass_MouseLeave(sender As Object, e As EventArgs) Handles btnApplySUpass.MouseLeave
        btnApplySUpass.FlatAppearance.BorderColor = Color.DimGray
    End Sub

    Private Sub BtnApplyPKpass_Click(sender As Object, e As EventArgs) Handles btnApplyPKpass.Click

        If txtPKpass2.TextLength >= REQUIRED_PASSWORD_LENGTH Then
            If txtPKpass.Text = txtPKpass2.Text Then

                Dim intSUencrypt As Integer = MsgBox("READ BEFORE CLICKING...

Applying a VaultCrypt password will allow you to store sensitive data (passwords, mnemonics, private keys). 

A unique partial-hash will be generated, built in combination from your SU and VC passwords.  Once applied, you will not be able to revert or change the VC password (until the next version is released).  

Click OK to setup your VaultCrypt password, otherwise click Cancel.", vbOKCancel, "ThetaKVM Hackathon Edition v1.0HE22 - A note from the Developer")
                If intSUencrypt = 1 Then

                    GlobalVars.VAULT_pk_encryption = 1
                    GlobalVars.VAULT_pk_validation = GlobalFunctions.PKValidationHash(txtPKpass2.Text)

                    GlobalFunctions.WriteKeyVaultToFile()

                    txtPKpass.Enabled = False
                    txtPKpass2.Enabled = False

                End If
            End If
        End If

        MsgBox("Click OK to restart ThetaKVM.  You will need to enter your SuperUser password to access the KeyVault.", vbOK, "ThetaKVM")
        Application.Restart()
    End Sub
End Class