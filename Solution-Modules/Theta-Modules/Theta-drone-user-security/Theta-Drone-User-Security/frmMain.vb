' Module: KeyVault Manager
' Purpose: Central point for user management of wallets in ThetaKVM
' Title: ThetaKVM v1.0
' SubTitle: Offline Edition
' Sute: ThetaNMS v2.0
' Dev: Tom (slick) Gervais
' Support: fuelfoundry.io


Imports System.IO

Public Class frmMain

    Dim GlobalIndex As Integer = 0

    Function ImportWalletsFromKeyVault()

        Dim intWalletNumber As Integer = 0


        While intWalletNumber < GlobalVars.VAULT_wallet_cnt

            Dim WALLET_unique_id As Integer = intWalletNumber
            Dim WALLET_parent_id = GlobalVars.vaultData("wallets")("wallet" + intWalletNumber.ToString)("parent_id").ToString
            Dim WALLET_order_id As Integer = GlobalVars.vaultData.Item("wallets")("wallet" + intWalletNumber.ToString)("parent_id").ToString

            Dim WALLET_description As String = GlobalVars.vaultData.Item("wallets")("wallet" + intWalletNumber.ToString)("description").ToString
            Dim WALLET_address As String = GlobalVars.vaultData.Item("wallets")("wallet" + intWalletNumber.ToString)("address").ToString
            Dim WALLET_feature_tags As String = GlobalVars.vaultData.Item("wallets")("wallet" + intWalletNumber.ToString)("feature_tags").ToString
            ' WALLET_feature_tags = FeatureTagBuilder(WALLET_feature_tags) -- future implementation --

            Dim WALLET_KEYSTORE As String = GlobalVars.vaultData.Item("wallets")("wallet" + intWalletNumber.ToString)("keystore").ToString
            Dim WALLET_KEYPASS As String = GlobalVars.vaultData.Item("wallets")("wallet" + intWalletNumber.ToString)("keypass").ToString
            Dim WALLET_MNEMONIC As String = GlobalVars.vaultData.Item("wallets")("wallet" + intWalletNumber.ToString)("mnemonic").ToString
            Dim WALLET_PRIVATE_KEY As String = GlobalVars.vaultData.Item("wallets")("wallet" + intWalletNumber.ToString)("private_key").ToString

            dgvWallets.Rows.Add(intWalletNumber, 1, intWalletNumber, 5, WALLET_description, WALLET_address, 0, 0, 0, 0, WALLET_feature_tags, "", WALLET_KEYSTORE, WALLET_KEYPASS, WALLET_MNEMONIC, WALLET_PRIVATE_KEY)

            intWalletNumber += 1
        End While

        Return 0
    End Function

    Private Class MyRenderer
        Inherits ToolStripProfessionalRenderer

        Public Sub New()
            MyBase.New(New MyColors())
        End Sub
    End Class

    Private Class MyColors
        Inherits ProfessionalColorTable

        Public Overrides ReadOnly Property MenuItemSelected As Color
            Get
                Return Color.Orange
            End Get
        End Property

        Public Overrides ReadOnly Property MenuItemSelectedGradientBegin As Color
            Get
                Return Color.White
            End Get
        End Property

        Public Overrides ReadOnly Property MenuItemSelectedGradientEnd As Color
            Get
                Return Color.Blue
            End Get
        End Property
    End Class

    Private Class oRenderer : Inherits ToolStripProfessionalRenderer
        Protected Overrides Sub OnRenderMenuItemBackground(ByVal e As System.Windows.Forms.ToolStripItemRenderEventArgs)
            If e.Item.Selected Then
                Dim rc As New Rectangle(Point.Empty, e.Item.Size)

                'Set the highlight color
                e.Graphics.FillRectangle(Brushes.Blue, rc)
                e.Graphics.DrawRectangle(Pens.Black, 1, 0, rc.Width - 2, rc.Height - 1)
            Else
                Dim rc As New Rectangle(Point.Empty, e.Item.Size)

                'Set the default color
                e.Graphics.FillRectangle(Brushes.Black, rc)
                e.Graphics.DrawRectangle(Pens.Black, 1, 0, rc.Width - 2, rc.Height - 1)
            End If
        End Sub
    End Class

    Public Sub New()
        ' This call is required by the designer.
        InitializeComponent()
        ' Add any initialization after the InitializeComponent() call.
        '  ctxMenuMain.RenderMode = ToolStripRenderMode.Professional
        '  ctxMenuMain.Renderer = New oRenderer()
    End Sub

    Private Sub FrmMain_Load(sender As Object, e As EventArgs) Handles MyBase.Load

        '  Me.Width = 1250
        Me.Height = 580

        FileToolStripMenuItem.ForeColor = Color.White 'FromArgb(92, 189, 209)
        EditToolStripMenuItem.ForeColor = Color.White 'FromArgb(92, 189, 209)
        HelpToolStripMenuItem.ForeColor = Color.White 'FromArgb(92, 189, 209)


        If GlobalVars.VAULT_su_encryption = 0 And GlobalVars.VAULT_su_hash.ToString.Length < 2 Then
            txtFooterMsg.Visible = True
            EncryptionToolStripMenuItem.ForeColor = Color.FromArgb(255, 128, 0)
        End If

        frmLogin.Hide()
        mnuMain.ForeColor = Color.WhiteSmoke
        tvKeyExplorer.Nodes(0).Expand()
        mnuMain.BackColor = Color.FromArgb(47, 49, 54) '55, 57, 62)
        dgvWallets.EnableHeadersVisualStyles = False

        ImportWalletsFromKeyVault()

        If GlobalVars.VAULT_su_encryption = 0 Then
            WalletToolStripMenuItem.Enabled = False
            AddToolStripMenuItem.Enabled = False
        End If

    End Sub

    Private Sub frmMain_Closed(sender As Object, e As EventArgs) Handles MyBase.Closed
        frmLogin.Dispose()
        Application.Exit()
    End Sub


    Private Sub TvKeybase_AfterSelect(sender As Object, e As TreeViewEventArgs) Handles tvKeyExplorer.AfterSelect

        GlobalIndex = tvKeyExplorer.SelectedNode.Index
        tvKeyExplorer.SelectedNode = Nothing

    End Sub

    Private Sub DgvWallets_CellContentClick(sender As Object, e As DataGridViewCellEventArgs) Handles dgvWallets.CellContentClick
        Try

            If e.RowIndex > -1 Then
            EditWalletToolStripMenuItem.Enabled = True
            DeleteWalletToolStripMenuItem.Enabled = True

            GlobalVars.WALLET_MODE = GlobalVars.ADD
            GlobalVars.SELECTED_WALLET_ID = dgvWallets.Item(0, e.RowIndex).Value
            GlobalVars.SELECTED_WALLET_NAME = dgvWallets.Item(4, e.RowIndex).Value
            GlobalVars.SELECTED_WALLET_ADDRESS = dgvWallets.Item(5, e.RowIndex).Value

        End If

        Catch ex As Exception

        End Try
    End Sub

    Private Sub PropertiesToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles EncryptionToolStripMenuItem.Click
        Me.Hide()
        frmFileProperties.Show()

    End Sub

    Private Sub AddWalletToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles AddWalletToolStripMenuItem.Click

        GlobalVars.WALLET_MODE = GlobalVars.ADD
        GlobalVars.SELECTED_WALLET_ID = -1
        GlobalVars.SELECTED_WALLET_NAME = ""
        GlobalVars.SELECTED_WALLET_ADDRESS = ""
        frmWalletAddModify.Show()
        frmWalletAddModify.btnSave.Text = "CREATE"
        frmWalletAddModify.AcceptButton = frmWalletAddModify.btnSave

    End Sub


    Private Sub dgvWallets_CellMouseEnter(sender As Object, e As DataGridViewCellEventArgs) Handles dgvWallets.CellMouseEnter
        If dgvWallets.Rows.Count = 0 Then Exit Sub

        If e.RowIndex > -1 And e.RowIndex <> dgvWallets.SelectedRows(0).Index Then
            dgvWallets.Rows(e.RowIndex).DefaultCellStyle.BackColor = Color.FromArgb(51, 53, 58)
            dgvWallets.Rows(e.RowIndex).DefaultCellStyle.ForeColor = Color.WhiteSmoke
            dgvWallets.Item(3, e.RowIndex).Style.ForeColor = Color.FromArgb(92, 189, 209)
            dgvWallets.Item(4, e.RowIndex).Style.ForeColor = Color.WhiteSmoke
            dgvWallets.Item(5, e.RowIndex).Style.ForeColor = Color.WhiteSmoke
            dgvWallets.Item(10, e.RowIndex).Style.ForeColor = Color.WhiteSmoke
        End If

    End Sub

    Private Sub dgvWallets_CellMouseLeave(sender As Object, e As DataGridViewCellEventArgs) Handles dgvWallets.CellMouseLeave
        If dgvWallets.Rows.Count = 0 Then Exit Sub

        If e.RowIndex > -1 Then
            dgvWallets.Rows(e.RowIndex).DefaultCellStyle.BackColor = Color.FromArgb(55, 57, 62)
            dgvWallets.Rows(e.RowIndex).DefaultCellStyle.ForeColor = Color.Gray

            dgvWallets.Item(3, e.RowIndex).Style.ForeColor = Color.WhiteSmoke
            dgvWallets.Item(4, e.RowIndex).Style.ForeColor = Color.WhiteSmoke

            dgvWallets.Item(5, e.RowIndex).Style.ForeColor = Color.Gray
            dgvWallets.Item(10, e.RowIndex).Style.ForeColor = Color.Silver

        End If
    End Sub

    Private Sub OnlineSupportToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles OnlineSupportToolStripMenuItem.Click
        MsgBox("You are currently running the Offline Edition, this version does not connect to the Internet.  Please visit fuelfoundry.io for more info.")
    End Sub

    Private Sub ExitToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles ExitToolStripMenuItem.Click

        'SAVE
        GlobalFunctions.WriteKeyVaultToFile()

        'exit
        Application.Exit()

    End Sub

    Private Sub AddToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles AddToolStripMenuItem.Click
        AddWalletToolStripMenuItem.PerformClick()
    End Sub

    Private Sub EditToolStripMenuItem8_Click(sender As Object, e As EventArgs) Handles EditToolStripMenuItem8.Click
        EditWalletToolStripMenuItem.PerformClick()
    End Sub

    Private Sub DeleteToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles DeleteToolStripMenuItem.Click
        DeleteWalletToolStripMenuItem.PerformClick()
    End Sub

    Private Sub DgvWallets_MouseDown(sender As Object, e As MouseEventArgs) Handles dgvWallets.MouseDown
        If dgvWallets.Rows.Count = 0 Then Exit Sub

        'select row on right click before displaying context menu
        If e.Button = MouseButtons.Right Then
            Try
                Dim hti = dgvWallets.HitTest(e.X, e.Y)
                dgvWallets.Rows(hti.RowIndex).Selected = True
            Catch ex As Exception

            End Try

        End If

    End Sub

    Private Sub DgvWallets_CellDoubleClick(sender As Object, e As DataGridViewCellEventArgs) Handles dgvWallets.CellDoubleClick
        GlobalVars.WALLET_MODE = GlobalVars.EDIT
        frmWalletAddModify.Show()
    End Sub

    Private Sub EditWalletToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles EditWalletToolStripMenuItem.Click
        GlobalVars.WALLET_MODE = GlobalVars.EDIT
        frmWalletAddModify.Show()
    End Sub

    Private Sub DeleteWalletToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles DeleteWalletToolStripMenuItem.Click
        Dim intDeleteYesNo As Integer = MsgBox("Are you sure you want to delete " + dgvWallets.SelectedRows(0).Cells(5).Value.ToString + " from your KeyVault?", vbOKCancel, "ThetaKVM - Delete Confirmation")

        If intDeleteYesNo = 1 Then
            dgvWallets.Rows.Remove(dgvWallets.SelectedRows(0))
            GlobalFunctions.WriteKeyVaultToFile()
        End If

    End Sub

    Private Sub FileToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles FileToolStripMenuItem.Click
        If GlobalVars.KEYVAULT_MODIFIED = 1 Then
            SaveKeyVaultToolStripMenuItem.Enabled = True

        End If
    End Sub

    Private Sub DgvWallets_Click(sender As Object, e As EventArgs) Handles dgvWallets.Click

        If GlobalVars.VAULT_su_encryption = 1 And dgvWallets.Rows.Count = 0 Then
            GlobalVars.WALLET_MODE = GlobalVars.ADD
            frmWalletAddModify.Show()
        End If

        Try
            If dgvWallets.SelectedRows(0).Index > -1 Then
                EditWalletToolStripMenuItem.Enabled = True
                DeleteWalletToolStripMenuItem.Enabled = True

                'GlobalVars.WALLET_MODE = GlobalVars.ADD
                GlobalVars.SELECTED_WALLET_ID = dgvWallets.SelectedRows(0).Index 'dgvWallets.Item(0, dgvWallets.SelectedRows(0).Index).Value
                GlobalVars.SELECTED_WALLET_NAME = dgvWallets.Item(4, dgvWallets.SelectedRows(0).Index).Value
                GlobalVars.SELECTED_WALLET_ADDRESS = dgvWallets.Item(5, dgvWallets.SelectedRows(0).Index).Value

            End If

        Catch ex As Exception

        End Try

    End Sub

    Private Sub SaveKeyVaultToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles SaveKeyVaultToolStripMenuItem.Click
        GlobalFunctions.WriteKeyVaultToFile()
    End Sub

    Private Sub AboutToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles AboutToolStripMenuItem.Click
        MsgBox("ThetaKVM - Offline Edition Is part of a greater toolset I'm writing to better the Theta community.  After too many friends getting their cryptos hacked or lost, I've decided to write a series of apps and give them away in hopes that folks will take more care with their keys.  Mileage of this app may vary and I present NO WARRANTIES, so please back up your keys somewhere.  Got Quetions?  Swing by the #developer channel in the community Theta Tech Discord and give us a holla, lots of friendly folk there.  -slick", vbOKOnly, "ThetaKVM - Offline Edition Hackathon Build")
    End Sub

    Private Sub MoveUpToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles MoveUpToolStripMenuItem.Click

        Dim selectedRowIndex As Integer = dgvWallets.SelectedRows(0).Index

        'ye ol bubble sort ftw!
        If selectedRowIndex > 0 Then

            Dim tempFromCol0 As String = dgvWallets.SelectedRows(0).Cells(0).Value
            Dim tempFromCol1 As String = dgvWallets.SelectedRows(0).Cells(1).Value
            Dim tempFromCol2 As String = dgvWallets.SelectedRows(0).Cells(2).Value
            Dim tempFromCol3 As String = dgvWallets.SelectedRows(0).Cells(3).Value
            Dim tempFromCol4 As String = dgvWallets.SelectedRows(0).Cells(4).Value
            Dim tempFromCol5 As String = dgvWallets.SelectedRows(0).Cells(5).Value
            Dim tempFromCol6 As String = dgvWallets.SelectedRows(0).Cells(6).Value
            Dim tempFromCol7 As String = dgvWallets.SelectedRows(0).Cells(7).Value
            Dim tempFromCol8 As String = dgvWallets.SelectedRows(0).Cells(8).Value
            Dim tempFromCol9 As String = dgvWallets.SelectedRows(0).Cells(9).Value
            Dim tempFromCol10 As String = dgvWallets.SelectedRows(0).Cells(10).Value
            Dim tempFromCol11 As String = dgvWallets.SelectedRows(0).Cells(11).Value
            Dim tempFromCol12 As String = dgvWallets.SelectedRows(0).Cells(12).Value
            Dim tempFromCol13 As String = dgvWallets.SelectedRows(0).Cells(13).Value
            Dim tempFromCol14 As String = dgvWallets.SelectedRows(0).Cells(14).Value
            Dim tempFromCol15 As String = dgvWallets.SelectedRows(0).Cells(15).Value

            dgvWallets.SelectedRows(0).Cells(0).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(0).Value
            dgvWallets.SelectedRows(0).Cells(1).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(1).Value
            dgvWallets.SelectedRows(0).Cells(2).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(2).Value
            dgvWallets.SelectedRows(0).Cells(3).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(3).Value
            dgvWallets.SelectedRows(0).Cells(4).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(4).Value
            dgvWallets.SelectedRows(0).Cells(5).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(5).Value
            dgvWallets.SelectedRows(0).Cells(6).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(6).Value
            dgvWallets.SelectedRows(0).Cells(7).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(7).Value
            dgvWallets.SelectedRows(0).Cells(8).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(8).Value
            dgvWallets.SelectedRows(0).Cells(9).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(9).Value
            dgvWallets.SelectedRows(0).Cells(10).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(10).Value
            dgvWallets.SelectedRows(0).Cells(11).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(11).Value
            dgvWallets.SelectedRows(0).Cells(12).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(12).Value
            dgvWallets.SelectedRows(0).Cells(13).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(13).Value
            dgvWallets.SelectedRows(0).Cells(14).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(14).Value
            dgvWallets.SelectedRows(0).Cells(15).Value = dgvWallets.Rows(selectedRowIndex - 1).Cells(15).Value

            dgvWallets.Rows(selectedRowIndex - 1).Cells(0).Value = tempFromCol0
            dgvWallets.Rows(selectedRowIndex - 1).Cells(1).Value = tempFromCol1
            dgvWallets.Rows(selectedRowIndex - 1).Cells(2).Value = tempFromCol2
            dgvWallets.Rows(selectedRowIndex - 1).Cells(3).Value = tempFromCol3
            dgvWallets.Rows(selectedRowIndex - 1).Cells(4).Value = tempFromCol4
            dgvWallets.Rows(selectedRowIndex - 1).Cells(5).Value = tempFromCol5
            dgvWallets.Rows(selectedRowIndex - 1).Cells(6).Value = tempFromCol6
            dgvWallets.Rows(selectedRowIndex - 1).Cells(7).Value = tempFromCol7
            dgvWallets.Rows(selectedRowIndex - 1).Cells(8).Value = tempFromCol8
            dgvWallets.Rows(selectedRowIndex - 1).Cells(9).Value = tempFromCol9
            dgvWallets.Rows(selectedRowIndex - 1).Cells(10).Value = tempFromCol10
            dgvWallets.Rows(selectedRowIndex - 1).Cells(11).Value = tempFromCol11
            dgvWallets.Rows(selectedRowIndex - 1).Cells(12).Value = tempFromCol12
            dgvWallets.Rows(selectedRowIndex - 1).Cells(13).Value = tempFromCol13
            dgvWallets.Rows(selectedRowIndex - 1).Cells(14).Value = tempFromCol14
            dgvWallets.Rows(selectedRowIndex - 1).Cells(15).Value = tempFromCol15

            dgvWallets.Rows(selectedRowIndex - 1).Selected = True

            GlobalFunctions.WriteKeyVaultToFile()
        End If

    End Sub

    Private Sub MoveDownToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles MoveDownToolStripMenuItem.Click
        Dim selectedRowIndex As Integer = dgvWallets.SelectedRows(0).Index

        'ye ol bubble sort ftw!
        If selectedRowIndex > 0 And selectedRowIndex < dgvWallets.Rows.Count - 1 Then

            Dim tempFromCol0 As String = dgvWallets.SelectedRows(0).Cells(0).Value
            Dim tempFromCol1 As String = dgvWallets.SelectedRows(0).Cells(1).Value
            Dim tempFromCol2 As String = dgvWallets.SelectedRows(0).Cells(2).Value
            Dim tempFromCol3 As String = dgvWallets.SelectedRows(0).Cells(3).Value
            Dim tempFromCol4 As String = dgvWallets.SelectedRows(0).Cells(4).Value
            Dim tempFromCol5 As String = dgvWallets.SelectedRows(0).Cells(5).Value
            Dim tempFromCol6 As String = dgvWallets.SelectedRows(0).Cells(6).Value
            Dim tempFromCol7 As String = dgvWallets.SelectedRows(0).Cells(7).Value
            Dim tempFromCol8 As String = dgvWallets.SelectedRows(0).Cells(8).Value
            Dim tempFromCol9 As String = dgvWallets.SelectedRows(0).Cells(9).Value
            Dim tempFromCol10 As String = dgvWallets.SelectedRows(0).Cells(10).Value
            Dim tempFromCol11 As String = dgvWallets.SelectedRows(0).Cells(11).Value
            Dim tempFromCol12 As String = dgvWallets.SelectedRows(0).Cells(12).Value
            Dim tempFromCol13 As String = dgvWallets.SelectedRows(0).Cells(13).Value
            Dim tempFromCol14 As String = dgvWallets.SelectedRows(0).Cells(14).Value
            Dim tempFromCol15 As String = dgvWallets.SelectedRows(0).Cells(15).Value

            dgvWallets.SelectedRows(0).Cells(0).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(0).Value
            dgvWallets.SelectedRows(0).Cells(1).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(1).Value
            dgvWallets.SelectedRows(0).Cells(2).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(2).Value
            dgvWallets.SelectedRows(0).Cells(3).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(3).Value
            dgvWallets.SelectedRows(0).Cells(4).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(4).Value
            dgvWallets.SelectedRows(0).Cells(5).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(5).Value
            dgvWallets.SelectedRows(0).Cells(6).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(6).Value
            dgvWallets.SelectedRows(0).Cells(7).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(7).Value
            dgvWallets.SelectedRows(0).Cells(8).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(8).Value
            dgvWallets.SelectedRows(0).Cells(9).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(9).Value
            dgvWallets.SelectedRows(0).Cells(10).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(10).Value
            dgvWallets.SelectedRows(0).Cells(11).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(11).Value
            dgvWallets.SelectedRows(0).Cells(12).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(12).Value
            dgvWallets.SelectedRows(0).Cells(13).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(13).Value
            dgvWallets.SelectedRows(0).Cells(14).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(14).Value
            dgvWallets.SelectedRows(0).Cells(15).Value = dgvWallets.Rows(selectedRowIndex + 1).Cells(15).Value

            dgvWallets.Rows(selectedRowIndex + 1).Cells(0).Value = tempFromCol0
            dgvWallets.Rows(selectedRowIndex + 1).Cells(1).Value = tempFromCol1
            dgvWallets.Rows(selectedRowIndex + 1).Cells(2).Value = tempFromCol2
            dgvWallets.Rows(selectedRowIndex + 1).Cells(3).Value = tempFromCol3
            dgvWallets.Rows(selectedRowIndex + 1).Cells(4).Value = tempFromCol4
            dgvWallets.Rows(selectedRowIndex + 1).Cells(5).Value = tempFromCol5
            dgvWallets.Rows(selectedRowIndex + 1).Cells(6).Value = tempFromCol6
            dgvWallets.Rows(selectedRowIndex + 1).Cells(7).Value = tempFromCol7
            dgvWallets.Rows(selectedRowIndex + 1).Cells(8).Value = tempFromCol8
            dgvWallets.Rows(selectedRowIndex + 1).Cells(9).Value = tempFromCol9
            dgvWallets.Rows(selectedRowIndex + 1).Cells(10).Value = tempFromCol10
            dgvWallets.Rows(selectedRowIndex + 1).Cells(11).Value = tempFromCol11
            dgvWallets.Rows(selectedRowIndex + 1).Cells(12).Value = tempFromCol12
            dgvWallets.Rows(selectedRowIndex + 1).Cells(13).Value = tempFromCol13
            dgvWallets.Rows(selectedRowIndex + 1).Cells(14).Value = tempFromCol14
            dgvWallets.Rows(selectedRowIndex + 1).Cells(15).Value = tempFromCol15

            dgvWallets.Rows(selectedRowIndex + 1).Selected = True

            GlobalFunctions.WriteKeyVaultToFile()
        End If

    End Sub

    Private Sub CtxMenuMain_MouseEnter(sender As Object, e As EventArgs) Handles ctxMenuMain.MouseEnter
        ' 42, 42, 42
    End Sub

    Private Sub ExitToolStripMenuItem_MouseEnter(sender As Object, e As EventArgs) Handles ExitToolStripMenuItem.MouseEnter
        ExitToolStripMenuItem.ForeColor = Color.Black
    End Sub

    Private Sub ExitToolStripMenuItem_MouseLeave(sender As Object, e As EventArgs) Handles ExitToolStripMenuItem.MouseLeave
        ExitToolStripMenuItem.ForeColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub WalletToolStripMenuItem_MouseEnter(sender As Object, e As EventArgs) Handles WalletToolStripMenuItem.MouseEnter
        WalletToolStripMenuItem.ForeColor = Color.Black
    End Sub

    Private Sub WalletToolStripMenuItem_MouseLeave(sender As Object, e As EventArgs) Handles WalletToolStripMenuItem.MouseLeave
        WalletToolStripMenuItem.ForeColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub AddWalletToolStripMenuItem_MouseEnter(sender As Object, e As EventArgs) Handles AddWalletToolStripMenuItem.MouseEnter
        AddWalletToolStripMenuItem.ForeColor = Color.Black
    End Sub

    Private Sub AddWalletToolStripMenuItem_MouseLeave(sender As Object, e As EventArgs) Handles AddWalletToolStripMenuItem.MouseLeave
        AddWalletToolStripMenuItem.ForeColor = Color.FromArgb(92, 189, 209)
    End Sub
    Private Sub EditWalletToolStripMenuItem_MouseEnter(sender As Object, e As EventArgs) Handles EditWalletToolStripMenuItem.MouseEnter
        EditWalletToolStripMenuItem.ForeColor = Color.Black
    End Sub

    Private Sub EditWalletToolStripMenuItem_MouseLeave(sender As Object, e As EventArgs) Handles EditWalletToolStripMenuItem.MouseLeave
        EditWalletToolStripMenuItem.ForeColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub DeleteWalletToolStripMenuItem_MouseEnter(sender As Object, e As EventArgs) Handles DeleteWalletToolStripMenuItem.MouseEnter
        DeleteWalletToolStripMenuItem.ForeColor = Color.Black
    End Sub

    Private Sub DeleteWalletToolStripMenuItem_MouseLeave(sender As Object, e As EventArgs) Handles DeleteWalletToolStripMenuItem.MouseLeave
        DeleteWalletToolStripMenuItem.ForeColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub FileToolStripMenuItem_MouseEnter(sender As Object, e As EventArgs) Handles FileToolStripMenuItem.MouseEnter
        FileToolStripMenuItem.ForeColor = Color.Black
    End Sub

    Private Sub FileToolStripMenuItem_MouseLeave(sender As Object, e As EventArgs) Handles FileToolStripMenuItem.MouseLeave
        If FileToolStripMenuItem.DropDown.Visible = False Then
            FileToolStripMenuItem.ForeColor = Color.White
        End If
    End Sub

    Private Sub EditToolStripMenuItem_MouseEnter(sender As Object, e As EventArgs) Handles EditToolStripMenuItem.MouseEnter
        EditToolStripMenuItem.ForeColor = Color.Black
    End Sub

    Private Sub EditToolStripMenuItem_MouseLeave(sender As Object, e As EventArgs) Handles EditToolStripMenuItem.MouseLeave
        If EditToolStripMenuItem.DropDown.Visible = False Then
            EditToolStripMenuItem.ForeColor = Color.White
        End If
    End Sub

    Private Sub HelpToolStripMenuItem_MouseEnter(sender As Object, e As EventArgs) Handles HelpToolStripMenuItem.MouseEnter
        HelpToolStripMenuItem.ForeColor = Color.Black
    End Sub

    Private Sub HelpToolStripMenuItem_MouseLeave(sender As Object, e As EventArgs) Handles HelpToolStripMenuItem.MouseLeave
        If HelpToolStripMenuItem.DropDown.Visible = False Then
            HelpToolStripMenuItem.ForeColor = Color.White
        End If
    End Sub

    Private Sub EncryptionToolStripMenuItem_MouseEnter(sender As Object, e As EventArgs) Handles EncryptionToolStripMenuItem.MouseEnter
        EncryptionToolStripMenuItem.ForeColor = Color.Black
        EncryptionToolStripMenuItem.BackColor = Color.FromArgb(55, 57, 62)
    End Sub

    Private Sub EncryptionToolStripMenuItem_MouseLeave(sender As Object, e As EventArgs) Handles EncryptionToolStripMenuItem.MouseLeave
        EncryptionToolStripMenuItem.ForeColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub HelpToolStripMenuItem_DropDownOpened(sender As Object, e As EventArgs) Handles HelpToolStripMenuItem.DropDownOpened
        HelpToolStripMenuItem.ForeColor = Color.Black
    End Sub

    Private Sub HelpToolStripMenuItem_DropDownClosed(sender As Object, e As EventArgs) Handles HelpToolStripMenuItem.DropDownClosed
        HelpToolStripMenuItem.ForeColor = Color.White
    End Sub

    Private Sub EditToolStripMenuItem_DropDownClosed(sender As Object, e As EventArgs) Handles EditToolStripMenuItem.DropDownClosed
        EditToolStripMenuItem.ForeColor = Color.White
    End Sub

    Private Sub FileToolStripMenuItem_DropDownClosed(sender As Object, e As EventArgs) Handles FileToolStripMenuItem.DropDownClosed
        FileToolStripMenuItem.ForeColor = Color.White
    End Sub

    Private Sub AboutToolStripMenuItem_MouseEnter(sender As Object, e As EventArgs) Handles AboutToolStripMenuItem.MouseEnter
        AboutToolStripMenuItem.ForeColor = Color.Black
    End Sub

    Private Sub AboutToolStripMenuItem_MouseLeave(sender As Object, e As EventArgs) Handles AboutToolStripMenuItem.MouseLeave
        AboutToolStripMenuItem.ForeColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub AddToolStripMenuItem_MouseEnter(sender As Object, e As EventArgs) Handles AddToolStripMenuItem.MouseEnter
        AddToolStripMenuItem.ForeColor = Color.Black
    End Sub

    Private Sub EditToolStripMenuItem8_MouseEnter(sender As Object, e As EventArgs) Handles EditToolStripMenuItem8.MouseEnter
        EditToolStripMenuItem8.ForeColor = Color.Black
    End Sub

    Private Sub AddToolStripMenuItem_MouseLeave(sender As Object, e As EventArgs) Handles AddToolStripMenuItem.MouseLeave
        AddToolStripMenuItem.ForeColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub EditToolStripMenuItem8_MouseLeave(sender As Object, e As EventArgs) Handles EditToolStripMenuItem8.MouseLeave
        EditToolStripMenuItem8.ForeColor = Color.FromArgb(92, 189, 209)
    End Sub

    Private Sub CtxMenuMain_Opening(sender As Object, e As System.ComponentModel.CancelEventArgs) Handles ctxMenuMain.Opening

    End Sub
End Class