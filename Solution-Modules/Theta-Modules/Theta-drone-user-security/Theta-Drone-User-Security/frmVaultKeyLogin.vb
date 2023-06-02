' Module: VaultCrypt Login
' Purpose: Used for validating user VaultCrypt access 
' Title: ThetaKVM v1.0
' SubTitle: Offline Edition
' Sute: ThetaNMS v2.0
' Dev: Tom (slick) Gervais
' Support: fuelfoundry.io


Public Class frmVaultKeyLogin

    'localables
    Public Shared passMode As Integer = 0
    Public Shared passVar As Integer = 0


    Private Sub TxtVCpassword_MouseEnter(sender As Object, e As EventArgs) Handles txtVCpassword.MouseEnter
        lblVCPass.Visible = True
    End Sub

    Private Sub TxtVCpassword_MouseLeave(sender As Object, e As EventArgs) Handles txtVCpassword.MouseLeave
        lblVCPass.Visible = False
    End Sub

    Private Sub BtnClose_Click(sender As Object, e As EventArgs) Handles btnClose.Click
        Me.Dispose()

    End Sub

    Private Sub FrmVaultKeyLogin_Load(sender As Object, e As EventArgs) Handles MyBase.Load

    End Sub

    Private Sub BtnConfirm_Click(sender As Object, e As EventArgs) Handles btnConfirm.Click

        ' run validation on vc pass
        If Not GlobalFunctions.PKValidatePassword(txtVCpassword.Text) Then
            MsgBox("VaultCrypt Login: Password validation failed.")
            Exit Sub
        End If

        ' copy mode
        If passMode = GlobalVars.MODECOPY Then

            If passVar = 13 Then

                If frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(13).Value.ToString.Length >= 8 Then
                    Clipboard.SetText(GlobalFunctions.Decode(txtVCpassword.Text, frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(13).Value))
                    frmWalletAddModify.lblFooterMsg.Text = "KEYSTORE PASSWORD COPIED TO CLIPBOARD"
                Else
                    frmWalletAddModify.lblFooterMsg.Text = "KEYSTORE PASSWORD NOT SET"
                End If

            End If

            If passVar = 14 Then

                If frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(14).Value.ToString.Length >= 8 Then
                    Clipboard.SetText(GlobalFunctions.Decode(txtVCpassword.Text, frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(14).Value))
                    frmWalletAddModify.lblFooterMsg.Text = "MNEMONIC COPIED TO CLIPBOARD"
                Else
                    frmWalletAddModify.lblFooterMsg.Text = "MNEMONIC NOT SET"
                End If

            End If

            If passVar = 15 Then

                If frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(15).Value.ToString.Length >= 8 Then
                    Clipboard.SetText(GlobalFunctions.Decode(txtVCpassword.Text, frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(15).Value))
                    frmWalletAddModify.lblFooterMsg.Text = "PRIVATE KEY COPIED TO CLIPBOARD"
                Else
                    frmWalletAddModify.lblFooterMsg.Text = "PRIVATE KEY NOT SET"
                End If

            End If

        End If

        ' view mode
        If passMode = GlobalVars.MODEVIEW Then

            frmWalletVaultCryptViewModify.Show()
            frmWalletVaultCryptViewModify.localWalletID = GlobalVars.SELECTED_WALLET_ID
            frmWalletVaultCryptViewModify.tempPKpass = txtVCpassword.Text
            frmWalletVaultCryptViewModify.passMode = GlobalVars.MODEVIEW
            frmWalletVaultCryptViewModify.btnSave.Text = "Copy"
            frmWalletVaultCryptViewModify.txtDataBox.ReadOnly = True
            frmWalletVaultCryptViewModify.txtDataBox.ForeColor = Color.Silver
            frmWalletVaultCryptViewModify.lblWalletName.Text = "VAULTCRYPT [ READ-ONLY ]"

            If passVar = GlobalVars.COLKEYPASS Then
                frmWalletVaultCryptViewModify.passVar = GlobalVars.COLKEYPASS
                frmWalletVaultCryptViewModify.lblDataBoxTitle.Text = "KEYSTORE PASSWORD"
                If frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(GlobalVars.COLKEYPASS).Value.ToString.Length > 8 Then
                    frmWalletVaultCryptViewModify.txtDataBox.Text = GlobalFunctions.Decode(txtVCpassword.Text, frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(GlobalVars.COLKEYPASS).Value)

                End If

            End If


            If passVar = GlobalVars.COLMNEMONIC Then
                frmWalletVaultCryptViewModify.passVar = GlobalVars.COLMNEMONIC
                frmWalletVaultCryptViewModify.lblDataBoxTitle.Text = "MNEMONIC"
                If frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(GlobalVars.COLMNEMONIC).Value.ToString.Length > 8 Then
                    frmWalletVaultCryptViewModify.txtDataBox.Text = GlobalFunctions.Decode(txtVCpassword.Text, frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(GlobalVars.COLMNEMONIC).Value)

                End If

            End If

            If passVar = GlobalVars.COLPRIVATEKEY Then

                frmWalletVaultCryptViewModify.passVar = GlobalVars.COLPRIVATEKEY
                frmWalletVaultCryptViewModify.lblDataBoxTitle.Text = "PRIVATE KEY"
                If frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(GlobalVars.COLPRIVATEKEY).Value.ToString.Length > 8 Then
                    frmWalletVaultCryptViewModify.txtDataBox.Text = GlobalFunctions.Decode(txtVCpassword.Text, frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(GlobalVars.COLPRIVATEKEY).Value)

                End If

            End If

        End If



        ' edit mode
        If passMode = GlobalVars.MODEEDIT Then

            frmWalletVaultCryptViewModify.Show()
            frmWalletVaultCryptViewModify.localWalletID = GlobalVars.SELECTED_WALLET_ID
            frmWalletVaultCryptViewModify.tempPKpass = txtVCpassword.Text
            frmWalletVaultCryptViewModify.passMode = GlobalVars.MODEEDIT

            If passVar = GlobalVars.COLKEYPASS Then

                frmWalletVaultCryptViewModify.passVar = GlobalVars.COLKEYPASS
                frmWalletVaultCryptViewModify.lblDataBoxTitle.Text = "KEYSTORE PASSWORD"
                If frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(GlobalVars.COLKEYPASS).Value.ToString.Length > 8 Then
                    frmWalletVaultCryptViewModify.txtDataBox.Text = GlobalFunctions.Decode(txtVCpassword.Text, frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(GlobalVars.COLKEYPASS).Value)
                End If

            End If


            If passVar = GlobalVars.COLMNEMONIC Then
                frmWalletVaultCryptViewModify.passVar = GlobalVars.COLMNEMONIC
                frmWalletVaultCryptViewModify.lblDataBoxTitle.Text = "MNEMONIC"
                If frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(GlobalVars.COLMNEMONIC).Value.ToString.Length > 8 Then
                    frmWalletVaultCryptViewModify.txtDataBox.Text = GlobalFunctions.Decode(txtVCpassword.Text, frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(GlobalVars.COLMNEMONIC).Value)
                End If

            End If


            If passVar = GlobalVars.COLPRIVATEKEY Then

                frmWalletVaultCryptViewModify.passVar = GlobalVars.COLPRIVATEKEY
                frmWalletVaultCryptViewModify.lblDataBoxTitle.Text = "PRIVATE KEY"
                If frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(GlobalVars.COLPRIVATEKEY).Value.ToString.Length > 8 Then
                    frmWalletVaultCryptViewModify.txtDataBox.Text = GlobalFunctions.Decode(txtVCpassword.Text, frmMain.dgvWallets.Rows(GlobalVars.SELECTED_WALLET_ID).Cells(GlobalVars.COLPRIVATEKEY).Value)
                End If

            End If

        End If





        Me.Dispose()
    End Sub

    Private Sub btnConfirm_MouseEnter(sender As Object, e As EventArgs) Handles btnConfirm.MouseEnter

    End Sub

    Private Sub btnConfirm_MouseLeave(sender As Object, e As EventArgs) Handles btnConfirm.MouseLeave

    End Sub

    Private Sub btnConfirm_MouseDown(sender As Object, e As MouseEventArgs) Handles btnConfirm.MouseDown
        btnConfirm.FlatAppearance.BorderColor = Color.FromArgb(192, 64, 0)
    End Sub

    Private Sub btnConfirm_MouseUp(sender As Object, e As MouseEventArgs) Handles btnConfirm.MouseUp
        btnConfirm.FlatAppearance.BorderColor = Color.DimGray
    End Sub
End Class