' Module: Wallet Manager
' Purpose: User management of a selected wallet
' Title: ThetaKVM v1.0
' SubTitle: Offline Edition
' Sute: ThetaNMS v2.0
' Dev: Tom (slick) Gervais
' Support: fuelfoundry.io


Imports System.ComponentModel

Public Class frmWalletAddModify

    Function VaultCryptSet() As Boolean

        If GlobalVars.VAULT_pk_encryption = 0 Then
            lblFooterMsg.Text = "YOU MUST FIRST SET A VAULTCRYPT PASSWORD"
            tmrClearMsg.Enabled = True
            Return False
        Else
            Return True

        End If

    End Function


    Function GenerateFeatureSet(featureText As String) As String

        featureText.Replace("[WEB_WALLET]", "🌐 ")
        featureText.Replace("[MOBILE_APP]", "📱 ")

        featureText.Replace("[KEYSTORE]", "🔑 ")
        featureText.Replace("[KEYPASS]", "🔐 ")

        featureText.Replace("[MNEMONIC]", "🔏 ")
        featureText.Replace("[PRIVATE_KEY]", "🔓 ")
        featureText.Replace("[STAKE_GUARDIAN]", "g ")
        featureText.Replace("[STAKE_EDGENODE]", "e ")

        featureText.Replace("[STAKE_TDROP]", "TD ")
        featureText.Replace("[LIQUIDITY_POOL]", "♻ ")
        featureText.Replace("[THETA_DROP]", "💧 ")
        '3rd party support
        featureText.Replace("[META_MASK]", "🦊 ")
        featureText.Replace("[TNS_DOMAIN]", "🚰 ")

        featureText.Replace("[TBILL]", "💰 ")
        featureText.Replace("[FAVORITE]", "❤ ")

        Return featureText

    End Function
    Private Sub FrmWalletAddModify_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        frmMain.TopMost = False

        If (GlobalVars.WALLET_MODE = GlobalVars.ADD) Then
            Me.Text = "Add New Wallet..."
            panAccess.Visible = False
            panAccessButtons.Visible = False
            lblIdentMsg.Visible = True
            btnEditFeatureTags.Visible = False
            lblBottomMsg.Visible = False

        Else
            Me.Text = "Modify Wallet..."
            lblBottomMsg.Text = "Wallet ID: " & GlobalVars.SELECTED_WALLET_ID

        End If

        txtWalletDescription.Text = GlobalVars.SELECTED_WALLET_NAME
        txtWalletAddress.Text = GlobalVars.SELECTED_WALLET_ADDRESS

        If GlobalVars.SELECTED_WALLET_ID >= 0 Then
            txtFeatureTags.Text = frmMain.dgvWallets.Item(10, GlobalVars.SELECTED_WALLET_ID).Value
        End If

        '' Me.Width = 800
        '' Me.Height = 570

    End Sub

    Private Sub BtnHMO_Click(sender As Object, e As EventArgs) Handles btnHMO.Click
        Dim x As Integer

        x = MsgBox("READ BEFORE CLICKING...

Hey there!  Hope you're enjoying this program as much as I enjoyed writing it.  If you like what you see, it would mean the world to me if you could help me out by liking and commenting on this application at the Devpost Theta Hackathon 2022 Q2 website.  

It's features like these I plan to add to future versions.  Thanks for the consideration and if there're any features you'd like added, please let me know.  

-slick", vbOKCancel, "ThetaKVM Hackathon Edition v1.0HE22 - Pledge Inquiry from Developer")
        If x = 1 Then
            MsgBox("Visit: https://vote.fuelfoundry.io/ ", "ThetaKVM")
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
        frmMain.Enabled = True
        frmMain.Show()
        Me.Dispose()

    End Sub


    Private Sub BtnCopyKeystore_Click(sender As Object, e As EventArgs) Handles btnCopyKeystore.Click

        If GlobalVars.SU_PASSWORD_REMEMBER Then

            If frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(12).Value.ToString.Length >= 16 Then
                Clipboard.SetText(GlobalFunctions.Decode(GlobalVars.SU_PASSWORD_TEMP, frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(12).Value))
                lblFooterMsg.Text = "KEYSTORE COPIED TO CLIPBOARD"
            Else
                lblFooterMsg.Text = "KEYSTORE NOT FOUND"
                tmrClearMsg.Enabled = True
            End If

        End If

    End Sub

    Private Sub BtnSave_Click(sender As Object, e As EventArgs) Handles btnSave.Click

        If GlobalVars.WALLET_MODE = GlobalVars.ADD Then
            frmMain.dgvWallets.Rows.Add(frmMain.dgvWallets.Rows.Count, 0, frmMain.dgvWallets.Rows.Count, 5, txtWalletDescription.Text, txtWalletAddress.Text, "THETA", "TFUEL", "TDROP", "TSWAP", txtFeatureTags.Text, "", "", "", "", "")

            GlobalFunctions.WriteKeyVaultToFile()

            frmMain.Enabled = True
            Me.Dispose()

            Exit Sub
        End If

        frmMain.dgvWallets.Item(4, GlobalVars.SELECTED_WALLET_ID).Value = txtWalletDescription.Text
        frmMain.dgvWallets.Item(5, GlobalVars.SELECTED_WALLET_ID).Value = txtWalletAddress.Text
        frmMain.dgvWallets.Item(10, GlobalVars.SELECTED_WALLET_ID).Value = txtFeatureTags.Text
        frmMain.Show()

        GlobalFunctions.WriteKeyVaultToFile()

        frmMain.Enabled = True
        Me.Dispose()
    End Sub

    Private Sub BtnEditFeatureTags_Click(sender As Object, e As EventArgs) Handles btnEditFeatureTags.Click
        frmFeatures.Show()

        frmFeatures.Left = Me.Left + 540 + 270
    End Sub

    Private Sub BtnViewKeystore_Click(sender As Object, e As EventArgs) Handles btnViewKeystore.Click
        frmWalletKeystore.Show()

        frmWalletKeystore.localWalletID = GlobalVars.SELECTED_WALLET_ID
        frmWalletKeystore.localWalletName = txtWalletDescription.Text
        frmWalletKeystore.lblWalletName.Text = "[ " + txtWalletDescription.Text + " ]"

        frmWalletKeystore.txtDataBox.ReadOnly = True
        frmWalletKeystore.txtDataBox.ForeColor = Color.Silver
        frmWalletKeystore.btnSave.Text = "Copy"

    End Sub

    Private Sub BtnEditKeystore_Click(sender As Object, e As EventArgs) Handles btnEditKeystore.Click

        frmWalletKeystore.Show()
        frmWalletKeystore.localWalletID = GlobalVars.SELECTED_WALLET_ID
        frmWalletKeystore.localWalletName = txtWalletDescription.Text
        frmWalletKeystore.lblWalletName.Text = "[" + txtWalletDescription.Text + "] "
    End Sub

    Private Sub BtnCopyKeyPass_Click(sender As Object, e As EventArgs) Handles btnCopyKeyPass.Click
        If Not VaultCryptSet() Then Exit Sub

        If GlobalVars.VAULT_pk_encryption = 1 Then

            frmVaultKeyLogin.Show()
            frmVaultKeyLogin.passMode = GlobalVars.MODECOPY
            frmVaultKeyLogin.passVar = GlobalVars.COLKEYPASS
            frmVaultKeyLogin.TopMost = True

        End If

    End Sub

    Private Sub BtnEditKeypass_Click(sender As Object, e As EventArgs) Handles btnEditKeypass.Click
        If Not VaultCryptSet() Then Exit Sub

        If GlobalVars.VAULT_pk_encryption = 1 Then

            frmVaultKeyLogin.Show()
            frmVaultKeyLogin.passMode = GlobalVars.MODEEDIT
            frmVaultKeyLogin.passVar = GlobalVars.COLKEYPASS
            frmVaultKeyLogin.TopMost = True

        End If

    End Sub

    Private Sub BtnViewKeypass_Click(sender As Object, e As EventArgs) Handles btnViewKeypass.Click
        If Not VaultCryptSet() Then Exit Sub

        If GlobalVars.VAULT_pk_encryption = 1 Then

            frmVaultKeyLogin.Show()
            frmVaultKeyLogin.passMode = GlobalVars.MODEVIEW
            frmVaultKeyLogin.passVar = GlobalVars.COLKEYPASS
            frmVaultKeyLogin.TopMost = True

        End If

    End Sub

    Private Sub BtnCopyMnemonic_Click(sender As Object, e As EventArgs) Handles btnCopyMnemonic.Click
        If Not VaultCryptSet() Then Exit Sub

        If GlobalVars.VAULT_pk_encryption = 1 Then

            frmVaultKeyLogin.Show()
            frmVaultKeyLogin.passMode = GlobalVars.MODECOPY
            frmVaultKeyLogin.passVar = GlobalVars.COLMNEMONIC
            frmVaultKeyLogin.TopMost = True

        End If
    End Sub

    Private Sub BtnViewMnemonic_Click(sender As Object, e As EventArgs) Handles btnViewMnemonic.Click
        If Not VaultCryptSet() Then Exit Sub

        If GlobalVars.VAULT_pk_encryption = 1 Then

            frmVaultKeyLogin.Show()
            frmVaultKeyLogin.passMode = GlobalVars.MODEVIEW
            frmVaultKeyLogin.passVar = GlobalVars.COLMNEMONIC
            frmVaultKeyLogin.TopMost = True

        End If
    End Sub

    Private Sub BtnEditMnemonic_Click(sender As Object, e As EventArgs) Handles btnEditMnemonic.Click
        If GlobalVars.VAULT_pk_encryption = 1 Then

            frmVaultKeyLogin.Show()
            frmVaultKeyLogin.passMode = GlobalVars.MODEEDIT
            frmVaultKeyLogin.passVar = GlobalVars.COLMNEMONIC
            frmVaultKeyLogin.TopMost = True

        End If
    End Sub

    Private Sub BtnCopyPrivateKey_Click(sender As Object, e As EventArgs) Handles btnCopyPrivateKey.Click
        If Not VaultCryptSet() Then Exit Sub

        If GlobalVars.VAULT_pk_encryption = 1 Then

            frmVaultKeyLogin.Show()
            frmVaultKeyLogin.passMode = GlobalVars.MODECOPY
            frmVaultKeyLogin.passVar = GlobalVars.COLPRIVATEKEY
            frmVaultKeyLogin.TopMost = True

        End If
    End Sub

    Private Sub BtnViewPrivateKey_Click(sender As Object, e As EventArgs) Handles btnViewPrivateKey.Click
        If Not VaultCryptSet() Then Exit Sub

        If GlobalVars.VAULT_pk_encryption = 1 Then

            frmVaultKeyLogin.Show()
            frmVaultKeyLogin.passMode = GlobalVars.MODEVIEW
            frmVaultKeyLogin.passVar = GlobalVars.COLPRIVATEKEY
            frmVaultKeyLogin.TopMost = True

        End If
    End Sub

    Private Sub BtnEditPrivateKey_Click(sender As Object, e As EventArgs) Handles btnEditPrivateKey.Click
        If Not VaultCryptSet() Then Exit Sub

        If GlobalVars.VAULT_pk_encryption = 1 Then

            frmVaultKeyLogin.Show()
            frmVaultKeyLogin.passMode = GlobalVars.MODEEDIT
            frmVaultKeyLogin.passVar = GlobalVars.COLPRIVATEKEY
            frmVaultKeyLogin.TopMost = True

        End If
    End Sub


    Private Sub btnSave_MouseDown(sender As Object, e As MouseEventArgs) Handles btnSave.MouseDown
        btnSave.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub btnSave_MouseUp(sender As Object, e As MouseEventArgs) Handles btnSave.MouseUp
        btnSave.FlatAppearance.BorderColor = Color.DarkGray
    End Sub

    Private Sub btnCopyKeystore_MouseEnter(sender As Object, e As EventArgs) Handles btnCopyKeystore.MouseEnter
        btnCopyKeystore.ForeColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub btnCopyKeystore_MouseLeave(sender As Object, e As EventArgs) Handles btnCopyKeystore.MouseLeave
        btnCopyKeystore.ForeColor = Color.DarkGray
    End Sub

    Private Sub btnViewKeystore_MouseEnter(sender As Object, e As EventArgs) Handles btnViewKeystore.MouseEnter
        btnViewKeystore.ForeColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub btnViewKeystore_MouseLeave(sender As Object, e As EventArgs) Handles btnViewKeystore.MouseLeave
        btnViewKeystore.ForeColor = Color.DarkGray
    End Sub

    Private Sub btnEditKeystore_MouseEnter(sender As Object, e As EventArgs) Handles btnEditKeystore.MouseEnter
        btnEditKeystore.ForeColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub btnEditKeystore_MouseLeave(sender As Object, e As EventArgs) Handles btnEditKeystore.MouseLeave
        btnEditKeystore.ForeColor = Color.DarkGray
    End Sub

    Private Sub btnCopyKeyPass_MouseEnter(sender As Object, e As EventArgs) Handles btnCopyKeyPass.MouseEnter
        'btnCopyKeyPass.ForeColor = Color.FromArgb(255, 128, 0)
    End Sub

    Private Sub btnCopyKeyPass_MouseLeave(sender As Object, e As EventArgs) Handles btnCopyKeyPass.MouseLeave
        'btnCopyKeyPass.ForeColor = Color.DarkGray
    End Sub

    Private Sub TmrClearMsg_Tick(sender As Object, e As EventArgs) Handles tmrClearMsg.Tick
        tmrClearMsg.Enabled = False
        lblBottomMsg.Text = ""
    End Sub

    Private Sub btnEditFeatureTags_MouseEnter(sender As Object, e As EventArgs) Handles btnEditFeatureTags.MouseEnter
        btnEditFeatureTags.ForeColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub btnEditFeatureTags_MouseLeave(sender As Object, e As EventArgs) Handles btnEditFeatureTags.MouseLeave
        btnEditFeatureTags.ForeColor = Color.DarkGray
    End Sub

    Private Sub frmWalletAddModify_Closed(sender As Object, e As EventArgs) Handles Me.Closed
        frmMain.Enabled = True
        frmMain.Show()
    End Sub
End Class