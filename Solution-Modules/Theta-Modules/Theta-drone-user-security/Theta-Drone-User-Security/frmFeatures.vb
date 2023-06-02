' Module: Feature Set Form
' Purpose: Used to select/deselect applicable feature tags to a wallet
' Title: ThetaKVM v1.0
' SubTitle: Offline Edition
' Sute: ThetaNMS v2.0
' Dev: Tom (slick) Gervais
' Support: fuelfoundry.io



Public Class frmFeatures

    Public Shared strFeatureBuilder As String = ""

    Dim WEB_WALLET As String = "WEB_WALLET, "

    Dim HAS_WEB_WALLET As Boolean = False
    Dim HAS_MOBILE_APP As Boolean = False
    Dim HAS_KEYSTORE As Boolean = False
    Dim HAS_KEYPASS As Boolean = False

    Dim HAS_MNEMONIC As Boolean = False
    Dim HAS_PRIVATE_KEY As Boolean = False

    Dim HAS_STAKE_GUARDIAN As Boolean = False
    Dim HAS_STAKE_ELITEEDGE As Boolean = False
    Dim HAS_STAKE_TDROP As Boolean = False
    Dim HAS_STAKE_VALIDATOR As Boolean = False

    Dim HAS_THETADROP As Boolean = False
    Dim HAS_THETASWAP As Boolean = False
    Dim HAS_LP As Boolean = False
    Dim HAS_STAKE As Boolean = False
    Dim HAS_FAVORITE As Boolean = False

    '3rd party
    Dim HAS_LEDGER As Boolean = False
    Dim HAS_TREZOR As Boolean = False
    Dim HAS_METAMASK As Boolean = False
    Dim HAS_TNS_DOMAIN As Boolean = False
    Dim HAS_OPENTHETA As Boolean = False
    Dim HAS_TBILL As Boolean = False



    Private Sub BtnWEB_WALLET_Click(sender As Object, e As EventArgs) Handles btnWEB_WALLET.Click
        If HAS_WEB_WALLET = False Then
            HAS_WEB_WALLET = True
            btnWEB_WALLET.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_WEB_WALLET = False
            btnWEB_WALLET.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnPHONE_APP_Click(sender As Object, e As EventArgs) Handles btnMOBILE_APP.Click
        If HAS_MOBILE_APP = False Then
            HAS_MOBILE_APP = True
            btnMOBILE_APP.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_MOBILE_APP = False
            btnMOBILE_APP.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnKEYSTORE_Click(sender As Object, e As EventArgs) Handles btnKEYSTORE.Click
        If HAS_KEYSTORE = False Then
            HAS_KEYSTORE = True
            btnKEYSTORE.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_KEYSTORE = False
            btnKEYSTORE.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnMNEMONIC_Click(sender As Object, e As EventArgs) Handles btnMNEMONIC.Click
        If HAS_MNEMONIC = False Then
            HAS_MNEMONIC = True
            btnMNEMONIC.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_MNEMONIC = False
            btnMNEMONIC.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub





    Private Sub BtnTHETADROP_Click(sender As Object, e As EventArgs) Handles btnTHETADROP.Click
        If HAS_THETADROP = False Then
            HAS_THETADROP = True
            btnTHETADROP.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_THETADROP = False
            btnTHETADROP.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub



    Private Sub BtnTHETASWAP_Click(sender As Object, e As EventArgs) Handles btnTHETASWAP.Click
        If HAS_THETASWAP = False Then
            HAS_THETASWAP = True
            btnTHETASWAP.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_THETASWAP = False
            btnTHETASWAP.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnLP_Click(sender As Object, e As EventArgs) Handles btnLP.Click
        If HAS_LP = False Then
            HAS_LP = True
            btnLP.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_LP = False
            btnLP.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub



    Private Sub BtnFAVORITE_Click(sender As Object, e As EventArgs) Handles btnFAVORITE.Click
        If HAS_FAVORITE = False Then
            HAS_FAVORITE = True
            btnFAVORITE.FlatAppearance.BorderColor = Color.FromArgb(192, 0, 192)
        Else
            HAS_FAVORITE = False
            btnFAVORITE.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnLEDGER_Click(sender As Object, e As EventArgs) Handles btnLEDGER.Click
        If HAS_LEDGER = False Then
            HAS_LEDGER = True
            btnLEDGER.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_LEDGER = False
            btnLEDGER.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnTREZOR_Click(sender As Object, e As EventArgs) Handles btnTREZOR.Click
        If HAS_TREZOR = False Then
            HAS_TREZOR = True
            btnTREZOR.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_TREZOR = False
            btnTREZOR.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnMETAMASK_Click(sender As Object, e As EventArgs) Handles btnMETAMASK.Click
        If HAS_METAMASK = False Then
            HAS_METAMASK = True
            btnMETAMASK.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_METAMASK = False
            btnMETAMASK.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnTNS_DOMAIN_Click(sender As Object, e As EventArgs) Handles btnTNS_DOMAIN.Click
        If HAS_TNS_DOMAIN = False Then
            HAS_TNS_DOMAIN = True
            btnTNS_DOMAIN.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_TNS_DOMAIN = False
            btnTNS_DOMAIN.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnOPENTHETA_Click(sender As Object, e As EventArgs) Handles btnOPENTHETA.Click
        If HAS_OPENTHETA = False Then
            HAS_OPENTHETA = True
            btnOPENTHETA.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_OPENTHETA = False
            btnOPENTHETA.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnTBILL_Click(sender As Object, e As EventArgs) Handles btnTBILL.Click
        If HAS_TBILL = False Then
            HAS_TBILL = True
            btnTBILL.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_TBILL = False
            btnTBILL.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnUPDATE_Click(sender As Object, e As EventArgs) Handles btnUPDATE.Click

        strFeatureBuilder = ""

        If HAS_WEB_WALLET Then strFeatureBuilder += GlobalVars.WEB_WALLET
        If HAS_MOBILE_APP Then strFeatureBuilder += GlobalVars.MOBILE_APP
        If HAS_KEYSTORE Then strFeatureBuilder += GlobalVars.KEYSTORE
        If HAS_KEYPASS Then strFeatureBuilder += GlobalVars.KEYPASS
        If HAS_MNEMONIC Then strFeatureBuilder += GlobalVars.MNEMONIC
        If HAS_PRIVATE_KEY Then strFeatureBuilder += GlobalVars.PRIVATE_KEY

        If HAS_STAKE_GUARDIAN Then strFeatureBuilder += GlobalVars.STAKE_GUARDIAN
        If HAS_STAKE_ELITEEDGE Then strFeatureBuilder += GlobalVars.STAKE_ELITEEDGE
        If HAS_STAKE_TDROP Then strFeatureBuilder += GlobalVars.STAKE_TDROP
        If HAS_STAKE_VALIDATOR Then strFeatureBuilder += GlobalVars.STAKE_VALIDATOR


        If HAS_THETADROP Then strFeatureBuilder += GlobalVars.THETA_DROP
        If HAS_THETASWAP Then strFeatureBuilder += GlobalVars.THETA_SWAP
        If HAS_LP Then strFeatureBuilder += GlobalVars.LIQUIDITY_POOL
        If HAS_FAVORITE Then strFeatureBuilder += GlobalVars.FAVORITE

        '3rd party
        If HAS_LEDGER Then strFeatureBuilder += GlobalVars.LEDGER
        If HAS_TREZOR Then strFeatureBuilder += GlobalVars.TREZOR
        If HAS_METAMASK Then strFeatureBuilder += GlobalVars.METAMASK
        If HAS_TNS_DOMAIN Then strFeatureBuilder += GlobalVars.TNS_DOMAIN
        If HAS_OPENTHETA Then strFeatureBuilder += GlobalVars.OPENTHETA
        If HAS_TBILL Then strFeatureBuilder += GlobalVars.TBILL


        frmWalletAddModify.txtFeatureTags.Text = strFeatureBuilder
        Me.Dispose()
    End Sub

    Private Sub btnUPDATE_MouseDown(sender As Object, e As MouseEventArgs) Handles btnUPDATE.MouseDown
        btnUPDATE.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub btnUPDATE_MouseUp(sender As Object, e As MouseEventArgs) Handles btnUPDATE.MouseUp
        btnUPDATE.FlatAppearance.BorderColor = Color.DimGray
    End Sub

    Private Sub BtnKEYPASS_Click(sender As Object, e As EventArgs) Handles btnKEYPASS.Click

        If HAS_KEYPASS = False Then
            HAS_KEYPASS = True
            btnKEYPASS.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_KEYPASS = False
            btnKEYPASS.FlatAppearance.BorderColor = Color.DimGray
        End If

    End Sub

    Private Sub BtnPRIVATE_KEY_Click(sender As Object, e As EventArgs) Handles btnPRIVATE_KEY.Click
        If HAS_PRIVATE_KEY = False Then
            HAS_PRIVATE_KEY = True
            btnPRIVATE_KEY.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_PRIVATE_KEY = False
            btnPRIVATE_KEY.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnSTAKE_GUARDIAN_Click(sender As Object, e As EventArgs) Handles btnSTAKE_GUARDIAN.Click
        If HAS_STAKE_GUARDIAN = False Then
            HAS_STAKE_GUARDIAN = True
            btnSTAKE_GUARDIAN.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_STAKE_GUARDIAN = False
            btnSTAKE_GUARDIAN.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnSTAKE_ELITEEDGE_Click(sender As Object, e As EventArgs) Handles btnSTAKE_ELITEEDGE.Click
        If HAS_STAKE_ELITEEDGE = False Then
            HAS_STAKE_ELITEEDGE = True
            btnSTAKE_ELITEEDGE.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_STAKE_ELITEEDGE = False
            btnSTAKE_ELITEEDGE.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnSTAKE_TDROP_Click(sender As Object, e As EventArgs) Handles btnSTAKE_TDROP.Click
        If HAS_STAKE_TDROP = False Then
            HAS_STAKE_TDROP = True
            btnSTAKE_TDROP.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_STAKE_TDROP = False
            btnSTAKE_TDROP.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub BtnSTAKE_VALIDATOR_Click(sender As Object, e As EventArgs) Handles btnSTAKE_VALIDATOR.Click
        If HAS_STAKE_VALIDATOR = False Then
            HAS_STAKE_VALIDATOR = True
            btnSTAKE_VALIDATOR.FlatAppearance.BorderColor = Color.FromArgb(92, 189, 209)
        Else
            HAS_STAKE_VALIDATOR = False
            btnSTAKE_VALIDATOR.FlatAppearance.BorderColor = Color.DimGray
        End If
    End Sub

    Private Sub FrmFeatures_Load(sender As Object, e As EventArgs) Handles MyBase.Load

        Dim strImportFeatures = frmMain.dgvWallets.Item(10, GlobalVars.SELECTED_WALLET_ID).Value.ToString

        If strImportFeatures.Contains(GlobalVars.WEB_WALLET) Then btnWEB_WALLET.PerformClick()
        If strImportFeatures.Contains(GlobalVars.MOBILE_APP) Then btnMOBILE_APP.PerformClick()

        If strImportFeatures.Contains(GlobalVars.KEYSTORE) Then btnKEYSTORE.PerformClick()
        If strImportFeatures.Contains(GlobalVars.KEYPASS) Then btnKEYPASS.PerformClick()
        If strImportFeatures.Contains(GlobalVars.MNEMONIC) Then btnMNEMONIC.PerformClick()
        If strImportFeatures.Contains(GlobalVars.PRIVATE_KEY) Then btnPRIVATE_KEY.PerformClick()

        If strImportFeatures.Contains(GlobalVars.STAKE_GUARDIAN) Then btnSTAKE_GUARDIAN.PerformClick()
        If strImportFeatures.Contains(GlobalVars.STAKE_ELITEEDGE) Then btnSTAKE_ELITEEDGE.PerformClick()
        If strImportFeatures.Contains(GlobalVars.STAKE_TDROP) Then btnSTAKE_TDROP.PerformClick()
        If strImportFeatures.Contains(GlobalVars.STAKE_VALIDATOR) Then btnSTAKE_VALIDATOR.PerformClick()

        If strImportFeatures.Contains(GlobalVars.THETA_DROP) Then btnTHETADROP.PerformClick()
        If strImportFeatures.Contains(GlobalVars.THETA_SWAP) Then btnTHETASWAP.PerformClick()
        If strImportFeatures.Contains(GlobalVars.LIQUIDITY_POOL) Then btnLP.PerformClick()
        If strImportFeatures.Contains(GlobalVars.FAVORITE) Then btnFAVORITE.PerformClick()

        '3rd party
        If strImportFeatures.Contains(GlobalVars.LEDGER) Then btnLEDGER.PerformClick()
        If strImportFeatures.Contains(GlobalVars.TREZOR) Then btnTREZOR.PerformClick()
        If strImportFeatures.Contains(GlobalVars.METAMASK) Then btnMETAMASK.PerformClick()
        If strImportFeatures.Contains(GlobalVars.TNS_DOMAIN) Then btnTNS_DOMAIN.PerformClick()
        If strImportFeatures.Contains(GlobalVars.OPENTHETA) Then btnOPENTHETA.PerformClick()
        If strImportFeatures.Contains(GlobalVars.TBILL) Then btnTBILL.PerformClick()

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


    'frmWalletAddModify.txtFeatureTags.Text.Replace("[WEB_WALLET], ", "")
End Class