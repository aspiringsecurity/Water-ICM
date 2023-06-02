<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
Partial Class frmMain
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()>
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()>
    Private Sub InitializeComponent()
        Me.components = New System.ComponentModel.Container()
        Dim TreeNode1 As System.Windows.Forms.TreeNode = New System.Windows.Forms.TreeNode("  KeyBase  ")
        Dim TreeNode2 As System.Windows.Forms.TreeNode = New System.Windows.Forms.TreeNode("KEYVAULT", New System.Windows.Forms.TreeNode() {TreeNode1})
        Dim TreeNode3 As System.Windows.Forms.TreeNode = New System.Windows.Forms.TreeNode("  All Wallets  ", 0, 12)
        Dim TreeNode4 As System.Windows.Forms.TreeNode = New System.Windows.Forms.TreeNode("FILTERS", New System.Windows.Forms.TreeNode() {TreeNode3})
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(frmMain))
        Dim DataGridViewCellStyle1 As System.Windows.Forms.DataGridViewCellStyle = New System.Windows.Forms.DataGridViewCellStyle()
        Dim DataGridViewCellStyle10 As System.Windows.Forms.DataGridViewCellStyle = New System.Windows.Forms.DataGridViewCellStyle()
        Dim DataGridViewCellStyle11 As System.Windows.Forms.DataGridViewCellStyle = New System.Windows.Forms.DataGridViewCellStyle()
        Dim DataGridViewCellStyle12 As System.Windows.Forms.DataGridViewCellStyle = New System.Windows.Forms.DataGridViewCellStyle()
        Dim DataGridViewCellStyle2 As System.Windows.Forms.DataGridViewCellStyle = New System.Windows.Forms.DataGridViewCellStyle()
        Dim DataGridViewCellStyle3 As System.Windows.Forms.DataGridViewCellStyle = New System.Windows.Forms.DataGridViewCellStyle()
        Dim DataGridViewCellStyle4 As System.Windows.Forms.DataGridViewCellStyle = New System.Windows.Forms.DataGridViewCellStyle()
        Dim DataGridViewCellStyle5 As System.Windows.Forms.DataGridViewCellStyle = New System.Windows.Forms.DataGridViewCellStyle()
        Dim DataGridViewCellStyle6 As System.Windows.Forms.DataGridViewCellStyle = New System.Windows.Forms.DataGridViewCellStyle()
        Dim DataGridViewCellStyle7 As System.Windows.Forms.DataGridViewCellStyle = New System.Windows.Forms.DataGridViewCellStyle()
        Dim DataGridViewCellStyle8 As System.Windows.Forms.DataGridViewCellStyle = New System.Windows.Forms.DataGridViewCellStyle()
        Dim DataGridViewCellStyle9 As System.Windows.Forms.DataGridViewCellStyle = New System.Windows.Forms.DataGridViewCellStyle()
        Dim DataGridViewCellStyle13 As System.Windows.Forms.DataGridViewCellStyle = New System.Windows.Forms.DataGridViewCellStyle()
        Me.mnuMain = New System.Windows.Forms.MenuStrip()
        Me.FileToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.ToolStripMenuItem6 = New System.Windows.Forms.ToolStripMenuItem()
        Me.NewKeyVaultToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.RecentKeyVaultToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.OpenKeyVaultToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.KeyStoreToolStripMenuItem6 = New System.Windows.Forms.ToolStripMenuItem()
        Me.ImportKeybaseToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.ExportKeybaseToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.ToolStripMenuItem1 = New System.Windows.Forms.ToolStripSeparator()
        Me.EncryptionToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.SaveKeyVaultToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.ToolStripMenuItem2 = New System.Windows.Forms.ToolStripSeparator()
        Me.ExitToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.EditToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.FindToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.ToolStripMenuItem5 = New System.Windows.Forms.ToolStripSeparator()
        Me.WalletToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.AddWalletToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.EditWalletToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.DeleteWalletToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.HelpToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.OnlineSupportToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.ToolStripMenuItem4 = New System.Windows.Forms.ToolStripSeparator()
        Me.AboutToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.SplitContainer1 = New System.Windows.Forms.SplitContainer()
        Me.tvKeyExplorer = New System.Windows.Forms.TreeView()
        Me.imgLst = New System.Windows.Forms.ImageList(Me.components)
        Me.dgvWallets = New System.Windows.Forms.DataGridView()
        Me.UniqueID = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colParentID = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colOrderID = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colWalletIcon = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colName = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colWalletAddress = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colTheta = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colTFuel = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colThetaDrop = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colTNEXT = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colTags = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colSTRETCHEND = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colKEYSTORE = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colKEYPASS = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colMNEMONIC = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colPRIVATE_KEY = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.ctxMenuMain = New System.Windows.Forms.ContextMenuStrip(Me.components)
        Me.AddToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.EditToolStripMenuItem8 = New System.Windows.Forms.ToolStripMenuItem()
        Me.DeleteToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.MoveUpToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.MoveDownToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.panFind = New System.Windows.Forms.Panel()
        Me.Button3 = New System.Windows.Forms.Button()
        Me.txtFind = New System.Windows.Forms.TextBox()
        Me.OpenFileDialog1 = New System.Windows.Forms.OpenFileDialog()
        Me.panelStatus = New System.Windows.Forms.Panel()
        Me.txtFooterMsg = New System.Windows.Forms.TextBox()
        Me.imgFeaturcons = New System.Windows.Forms.ImageList(Me.components)
        Me.DataGridViewImageColumn1 = New System.Windows.Forms.DataGridViewImageColumn()
        Me.mnuMain.SuspendLayout()
        CType(Me.SplitContainer1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SplitContainer1.Panel1.SuspendLayout()
        Me.SplitContainer1.Panel2.SuspendLayout()
        Me.SplitContainer1.SuspendLayout()
        CType(Me.dgvWallets, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.ctxMenuMain.SuspendLayout()
        Me.panFind.SuspendLayout()
        Me.panelStatus.SuspendLayout()
        Me.SuspendLayout()
        '
        'mnuMain
        '
        Me.mnuMain.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.mnuMain.Font = New System.Drawing.Font("Microsoft Sans Serif", 11.25!)
        Me.mnuMain.ImageScalingSize = New System.Drawing.Size(32, 32)
        Me.mnuMain.Items.AddRange(New System.Windows.Forms.ToolStripItem() {Me.FileToolStripMenuItem, Me.EditToolStripMenuItem, Me.HelpToolStripMenuItem})
        Me.mnuMain.Location = New System.Drawing.Point(0, 0)
        Me.mnuMain.Name = "mnuMain"
        Me.mnuMain.Size = New System.Drawing.Size(1282, 26)
        Me.mnuMain.TabIndex = 0
        '
        'FileToolStripMenuItem
        '
        Me.FileToolStripMenuItem.DropDownItems.AddRange(New System.Windows.Forms.ToolStripItem() {Me.ToolStripMenuItem6, Me.OpenKeyVaultToolStripMenuItem, Me.KeyStoreToolStripMenuItem6, Me.ToolStripMenuItem1, Me.EncryptionToolStripMenuItem, Me.SaveKeyVaultToolStripMenuItem, Me.ToolStripMenuItem2, Me.ExitToolStripMenuItem})
        Me.FileToolStripMenuItem.Name = "FileToolStripMenuItem"
        Me.FileToolStripMenuItem.Size = New System.Drawing.Size(43, 22)
        Me.FileToolStripMenuItem.Text = "&File"
        '
        'ToolStripMenuItem6
        '
        Me.ToolStripMenuItem6.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.ToolStripMenuItem6.DropDownItems.AddRange(New System.Windows.Forms.ToolStripItem() {Me.NewKeyVaultToolStripMenuItem, Me.RecentKeyVaultToolStripMenuItem})
        Me.ToolStripMenuItem6.Enabled = False
        Me.ToolStripMenuItem6.ForeColor = System.Drawing.Color.FromArgb(CType(CType(0, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(192, Byte), Integer))
        Me.ToolStripMenuItem6.Name = "ToolStripMenuItem6"
        Me.ToolStripMenuItem6.Size = New System.Drawing.Size(158, 22)
        Me.ToolStripMenuItem6.Text = "KeyVault"
        Me.ToolStripMenuItem6.Visible = False
        '
        'NewKeyVaultToolStripMenuItem
        '
        Me.NewKeyVaultToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.NewKeyVaultToolStripMenuItem.Enabled = False
        Me.NewKeyVaultToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(0, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(192, Byte), Integer))
        Me.NewKeyVaultToolStripMenuItem.Name = "NewKeyVaultToolStripMenuItem"
        Me.NewKeyVaultToolStripMenuItem.Size = New System.Drawing.Size(184, 22)
        Me.NewKeyVaultToolStripMenuItem.Text = "&New KeyVault"
        '
        'RecentKeyVaultToolStripMenuItem
        '
        Me.RecentKeyVaultToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.RecentKeyVaultToolStripMenuItem.Enabled = False
        Me.RecentKeyVaultToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(0, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(192, Byte), Integer))
        Me.RecentKeyVaultToolStripMenuItem.Name = "RecentKeyVaultToolStripMenuItem"
        Me.RecentKeyVaultToolStripMenuItem.Size = New System.Drawing.Size(184, 22)
        Me.RecentKeyVaultToolStripMenuItem.Text = "&Recent KeyVault"
        Me.RecentKeyVaultToolStripMenuItem.Visible = False
        '
        'OpenKeyVaultToolStripMenuItem
        '
        Me.OpenKeyVaultToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.OpenKeyVaultToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        Me.OpenKeyVaultToolStripMenuItem.Name = "OpenKeyVaultToolStripMenuItem"
        Me.OpenKeyVaultToolStripMenuItem.Size = New System.Drawing.Size(158, 22)
        Me.OpenKeyVaultToolStripMenuItem.Text = "&Open"
        Me.OpenKeyVaultToolStripMenuItem.Visible = False
        '
        'KeyStoreToolStripMenuItem6
        '
        Me.KeyStoreToolStripMenuItem6.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.KeyStoreToolStripMenuItem6.DropDownItems.AddRange(New System.Windows.Forms.ToolStripItem() {Me.ImportKeybaseToolStripMenuItem, Me.ExportKeybaseToolStripMenuItem})
        Me.KeyStoreToolStripMenuItem6.Enabled = False
        Me.KeyStoreToolStripMenuItem6.ForeColor = System.Drawing.Color.FromArgb(CType(CType(0, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(192, Byte), Integer))
        Me.KeyStoreToolStripMenuItem6.Name = "KeyStoreToolStripMenuItem6"
        Me.KeyStoreToolStripMenuItem6.Size = New System.Drawing.Size(158, 22)
        Me.KeyStoreToolStripMenuItem6.Text = "&Keystore"
        Me.KeyStoreToolStripMenuItem6.Visible = False
        '
        'ImportKeybaseToolStripMenuItem
        '
        Me.ImportKeybaseToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.ImportKeybaseToolStripMenuItem.Enabled = False
        Me.ImportKeybaseToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(0, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(192, Byte), Integer))
        Me.ImportKeybaseToolStripMenuItem.Name = "ImportKeybaseToolStripMenuItem"
        Me.ImportKeybaseToolStripMenuItem.Size = New System.Drawing.Size(119, 22)
        Me.ImportKeybaseToolStripMenuItem.Text = "&Import"
        '
        'ExportKeybaseToolStripMenuItem
        '
        Me.ExportKeybaseToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.ExportKeybaseToolStripMenuItem.Enabled = False
        Me.ExportKeybaseToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(0, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(192, Byte), Integer))
        Me.ExportKeybaseToolStripMenuItem.Name = "ExportKeybaseToolStripMenuItem"
        Me.ExportKeybaseToolStripMenuItem.Size = New System.Drawing.Size(119, 22)
        Me.ExportKeybaseToolStripMenuItem.Text = "&Export"
        '
        'ToolStripMenuItem1
        '
        Me.ToolStripMenuItem1.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.ToolStripMenuItem1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(0, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(192, Byte), Integer))
        Me.ToolStripMenuItem1.Name = "ToolStripMenuItem1"
        Me.ToolStripMenuItem1.Size = New System.Drawing.Size(155, 6)
        Me.ToolStripMenuItem1.Visible = False
        '
        'EncryptionToolStripMenuItem
        '
        Me.EncryptionToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.EncryptionToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        Me.EncryptionToolStripMenuItem.Name = "EncryptionToolStripMenuItem"
        Me.EncryptionToolStripMenuItem.Size = New System.Drawing.Size(158, 22)
        Me.EncryptionToolStripMenuItem.Text = "&Encryption..."
        '
        'SaveKeyVaultToolStripMenuItem
        '
        Me.SaveKeyVaultToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.SaveKeyVaultToolStripMenuItem.Enabled = False
        Me.SaveKeyVaultToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        Me.SaveKeyVaultToolStripMenuItem.Name = "SaveKeyVaultToolStripMenuItem"
        Me.SaveKeyVaultToolStripMenuItem.Size = New System.Drawing.Size(158, 22)
        Me.SaveKeyVaultToolStripMenuItem.Text = "&Save"
        Me.SaveKeyVaultToolStripMenuItem.Visible = False
        '
        'ToolStripMenuItem2
        '
        Me.ToolStripMenuItem2.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.ToolStripMenuItem2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(0, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(192, Byte), Integer))
        Me.ToolStripMenuItem2.Name = "ToolStripMenuItem2"
        Me.ToolStripMenuItem2.Size = New System.Drawing.Size(155, 6)
        Me.ToolStripMenuItem2.Visible = False
        '
        'ExitToolStripMenuItem
        '
        Me.ExitToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.ExitToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        Me.ExitToolStripMenuItem.Name = "ExitToolStripMenuItem"
        Me.ExitToolStripMenuItem.Size = New System.Drawing.Size(158, 22)
        Me.ExitToolStripMenuItem.Text = "E&xit"
        '
        'EditToolStripMenuItem
        '
        Me.EditToolStripMenuItem.DropDownItems.AddRange(New System.Windows.Forms.ToolStripItem() {Me.FindToolStripMenuItem, Me.ToolStripMenuItem5, Me.WalletToolStripMenuItem})
        Me.EditToolStripMenuItem.Name = "EditToolStripMenuItem"
        Me.EditToolStripMenuItem.Size = New System.Drawing.Size(45, 22)
        Me.EditToolStripMenuItem.Text = "&Edit"
        '
        'FindToolStripMenuItem
        '
        Me.FindToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.FindToolStripMenuItem.Enabled = False
        Me.FindToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(0, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(192, Byte), Integer))
        Me.FindToolStripMenuItem.Name = "FindToolStripMenuItem"
        Me.FindToolStripMenuItem.Size = New System.Drawing.Size(180, 22)
        Me.FindToolStripMenuItem.Text = "&Find"
        '
        'ToolStripMenuItem5
        '
        Me.ToolStripMenuItem5.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.ToolStripMenuItem5.ForeColor = System.Drawing.Color.FromArgb(CType(CType(0, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(192, Byte), Integer))
        Me.ToolStripMenuItem5.Name = "ToolStripMenuItem5"
        Me.ToolStripMenuItem5.Size = New System.Drawing.Size(177, 6)
        Me.ToolStripMenuItem5.Visible = False
        '
        'WalletToolStripMenuItem
        '
        Me.WalletToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.WalletToolStripMenuItem.DropDownItems.AddRange(New System.Windows.Forms.ToolStripItem() {Me.AddWalletToolStripMenuItem, Me.EditWalletToolStripMenuItem, Me.DeleteWalletToolStripMenuItem})
        Me.WalletToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        Me.WalletToolStripMenuItem.Name = "WalletToolStripMenuItem"
        Me.WalletToolStripMenuItem.Size = New System.Drawing.Size(180, 22)
        Me.WalletToolStripMenuItem.Text = "Wallet"
        '
        'AddWalletToolStripMenuItem
        '
        Me.AddWalletToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.AddWalletToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        Me.AddWalletToolStripMenuItem.Name = "AddWalletToolStripMenuItem"
        Me.AddWalletToolStripMenuItem.Size = New System.Drawing.Size(180, 22)
        Me.AddWalletToolStripMenuItem.Text = "&Add..."
        Me.AddWalletToolStripMenuItem.TextAlign = System.Drawing.ContentAlignment.TopLeft
        '
        'EditWalletToolStripMenuItem
        '
        Me.EditWalletToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.EditWalletToolStripMenuItem.Enabled = False
        Me.EditWalletToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(94, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(222, Byte), Integer))
        Me.EditWalletToolStripMenuItem.Name = "EditWalletToolStripMenuItem"
        Me.EditWalletToolStripMenuItem.Size = New System.Drawing.Size(180, 22)
        Me.EditWalletToolStripMenuItem.Text = "&View/Modify..."
        '
        'DeleteWalletToolStripMenuItem
        '
        Me.DeleteWalletToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.DeleteWalletToolStripMenuItem.Enabled = False
        Me.DeleteWalletToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(94, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(222, Byte), Integer))
        Me.DeleteWalletToolStripMenuItem.Name = "DeleteWalletToolStripMenuItem"
        Me.DeleteWalletToolStripMenuItem.Size = New System.Drawing.Size(180, 22)
        Me.DeleteWalletToolStripMenuItem.Text = "&Delete"
        '
        'HelpToolStripMenuItem
        '
        Me.HelpToolStripMenuItem.DropDownItems.AddRange(New System.Windows.Forms.ToolStripItem() {Me.OnlineSupportToolStripMenuItem, Me.ToolStripMenuItem4, Me.AboutToolStripMenuItem})
        Me.HelpToolStripMenuItem.Name = "HelpToolStripMenuItem"
        Me.HelpToolStripMenuItem.Size = New System.Drawing.Size(50, 22)
        Me.HelpToolStripMenuItem.Text = "&Help"
        '
        'OnlineSupportToolStripMenuItem
        '
        Me.OnlineSupportToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.OnlineSupportToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.OnlineSupportToolStripMenuItem.Name = "OnlineSupportToolStripMenuItem"
        Me.OnlineSupportToolStripMenuItem.Size = New System.Drawing.Size(186, 22)
        Me.OnlineSupportToolStripMenuItem.Text = "Online &Support..."
        '
        'ToolStripMenuItem4
        '
        Me.ToolStripMenuItem4.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.ToolStripMenuItem4.ForeColor = System.Drawing.Color.FromArgb(CType(CType(0, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(192, Byte), Integer))
        Me.ToolStripMenuItem4.Name = "ToolStripMenuItem4"
        Me.ToolStripMenuItem4.Size = New System.Drawing.Size(183, 6)
        Me.ToolStripMenuItem4.Visible = False
        '
        'AboutToolStripMenuItem
        '
        Me.AboutToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.AboutToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        Me.AboutToolStripMenuItem.Name = "AboutToolStripMenuItem"
        Me.AboutToolStripMenuItem.Size = New System.Drawing.Size(186, 22)
        Me.AboutToolStripMenuItem.Text = "&About"
        '
        'SplitContainer1
        '
        Me.SplitContainer1.BackColor = System.Drawing.Color.FromArgb(CType(CType(47, Byte), Integer), CType(CType(49, Byte), Integer), CType(CType(54, Byte), Integer))
        Me.SplitContainer1.Dock = System.Windows.Forms.DockStyle.Fill
        Me.SplitContainer1.Location = New System.Drawing.Point(0, 26)
        Me.SplitContainer1.Name = "SplitContainer1"
        '
        'SplitContainer1.Panel1
        '
        Me.SplitContainer1.Panel1.Controls.Add(Me.tvKeyExplorer)
        Me.SplitContainer1.Panel1.Margin = New System.Windows.Forms.Padding(4)
        Me.SplitContainer1.Panel1.Padding = New System.Windows.Forms.Padding(4)
        '
        'SplitContainer1.Panel2
        '
        Me.SplitContainer1.Panel2.BackColor = System.Drawing.Color.FromArgb(CType(CType(47, Byte), Integer), CType(CType(49, Byte), Integer), CType(CType(54, Byte), Integer))
        Me.SplitContainer1.Panel2.Controls.Add(Me.dgvWallets)
        Me.SplitContainer1.Panel2.Controls.Add(Me.panFind)
        Me.SplitContainer1.Panel2.ForeColor = System.Drawing.Color.WhiteSmoke
        Me.SplitContainer1.Panel2.Margin = New System.Windows.Forms.Padding(4)
        Me.SplitContainer1.Panel2.Padding = New System.Windows.Forms.Padding(4)
        Me.SplitContainer1.Size = New System.Drawing.Size(1282, 490)
        Me.SplitContainer1.SplitterDistance = 213
        Me.SplitContainer1.TabIndex = 3
        '
        'tvKeyExplorer
        '
        Me.tvKeyExplorer.BackColor = System.Drawing.Color.FromArgb(CType(CType(47, Byte), Integer), CType(CType(49, Byte), Integer), CType(CType(54, Byte), Integer))
        Me.tvKeyExplorer.BorderStyle = System.Windows.Forms.BorderStyle.None
        Me.tvKeyExplorer.Dock = System.Windows.Forms.DockStyle.Fill
        Me.tvKeyExplorer.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.tvKeyExplorer.ForeColor = System.Drawing.Color.WhiteSmoke
        Me.tvKeyExplorer.ImageIndex = 0
        Me.tvKeyExplorer.ImageList = Me.imgLst
        Me.tvKeyExplorer.ItemHeight = 32
        Me.tvKeyExplorer.LineColor = System.Drawing.Color.DimGray
        Me.tvKeyExplorer.Location = New System.Drawing.Point(4, 4)
        Me.tvKeyExplorer.MinimumSize = New System.Drawing.Size(150, 420)
        Me.tvKeyExplorer.Name = "tvKeyExplorer"
        TreeNode1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(94, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(222, Byte), Integer))
        TreeNode1.ImageIndex = 9
        TreeNode1.Name = "Node0"
        TreeNode1.Text = "  KeyBase  "
        TreeNode2.ImageIndex = 10
        TreeNode2.Name = "Node0"
        TreeNode2.Text = "KEYVAULT"
        TreeNode3.ImageIndex = 0
        TreeNode3.Name = "nodeAllWallets"
        TreeNode3.SelectedImageIndex = 12
        TreeNode3.Text = "  All Wallets  "
        TreeNode4.ImageKey = "keybase0022.png"
        TreeNode4.Name = "nodeFilters"
        TreeNode4.SelectedImageKey = "keybase0012.png"
        TreeNode4.Text = "FILTERS"
        Me.tvKeyExplorer.Nodes.AddRange(New System.Windows.Forms.TreeNode() {TreeNode2, TreeNode4})
        Me.tvKeyExplorer.Scrollable = False
        Me.tvKeyExplorer.SelectedImageIndex = 0
        Me.tvKeyExplorer.Size = New System.Drawing.Size(205, 482)
        Me.tvKeyExplorer.StateImageList = Me.imgLst
        Me.tvKeyExplorer.TabIndex = 0
        '
        'imgLst
        '
        Me.imgLst.ImageStream = CType(resources.GetObject("imgLst.ImageStream"), System.Windows.Forms.ImageListStreamer)
        Me.imgLst.TransparentColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.imgLst.Images.SetKeyName(0, "theta-logo-33-32-32-64x64.png")
        Me.imgLst.Images.SetKeyName(1, "fuel_foundry-gear.png")
        Me.imgLst.Images.SetKeyName(2, "theta0001.png")
        Me.imgLst.Images.SetKeyName(3, "theta-logo-33-32-32-64x64-distortion001.png")
        Me.imgLst.Images.SetKeyName(4, "keybase0002.png")
        Me.imgLst.Images.SetKeyName(5, "left_marker0004.png")
        Me.imgLst.Images.SetKeyName(6, "theta_plug0001.png")
        Me.imgLst.Images.SetKeyName(7, "gear0001.png")
        Me.imgLst.Images.SetKeyName(8, "gear0002.jpg")
        Me.imgLst.Images.SetKeyName(9, "left_marker0014.png")
        Me.imgLst.Images.SetKeyName(10, "keybase0012.png")
        Me.imgLst.Images.SetKeyName(11, "keybase0022.png")
        Me.imgLst.Images.SetKeyName(12, "selected_node.png")
        '
        'dgvWallets
        '
        Me.dgvWallets.AllowUserToAddRows = False
        Me.dgvWallets.AllowUserToDeleteRows = False
        Me.dgvWallets.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill
        Me.dgvWallets.BackgroundColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.dgvWallets.BorderStyle = System.Windows.Forms.BorderStyle.None
        Me.dgvWallets.CellBorderStyle = System.Windows.Forms.DataGridViewCellBorderStyle.None
        Me.dgvWallets.ColumnHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None
        DataGridViewCellStyle1.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft
        DataGridViewCellStyle1.BackColor = System.Drawing.Color.FromArgb(CType(CType(47, Byte), Integer), CType(CType(49, Byte), Integer), CType(CType(54, Byte), Integer))
        DataGridViewCellStyle1.Font = New System.Drawing.Font("Microsoft Sans Serif", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        DataGridViewCellStyle1.ForeColor = System.Drawing.Color.Silver
        DataGridViewCellStyle1.SelectionBackColor = System.Drawing.Color.FromArgb(CType(CType(47, Byte), Integer), CType(CType(49, Byte), Integer), CType(CType(54, Byte), Integer))
        DataGridViewCellStyle1.SelectionForeColor = System.Drawing.Color.WhiteSmoke
        DataGridViewCellStyle1.WrapMode = System.Windows.Forms.DataGridViewTriState.[True]
        Me.dgvWallets.ColumnHeadersDefaultCellStyle = DataGridViewCellStyle1
        Me.dgvWallets.ColumnHeadersHeight = 31
        Me.dgvWallets.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.DisableResizing
        Me.dgvWallets.Columns.AddRange(New System.Windows.Forms.DataGridViewColumn() {Me.UniqueID, Me.colParentID, Me.colOrderID, Me.colWalletIcon, Me.colName, Me.colWalletAddress, Me.colTheta, Me.colTFuel, Me.colThetaDrop, Me.colTNEXT, Me.colTags, Me.colSTRETCHEND, Me.colKEYSTORE, Me.colKEYPASS, Me.colMNEMONIC, Me.colPRIVATE_KEY})
        DataGridViewCellStyle10.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft
        DataGridViewCellStyle10.BackColor = System.Drawing.SystemColors.Window
        DataGridViewCellStyle10.Font = New System.Drawing.Font("Microsoft Sans Serif", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        DataGridViewCellStyle10.ForeColor = System.Drawing.Color.WhiteSmoke
        DataGridViewCellStyle10.SelectionBackColor = System.Drawing.Color.FromArgb(CType(CType(94, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(222, Byte), Integer))
        DataGridViewCellStyle10.SelectionForeColor = System.Drawing.SystemColors.HighlightText
        DataGridViewCellStyle10.WrapMode = System.Windows.Forms.DataGridViewTriState.[False]
        Me.dgvWallets.DefaultCellStyle = DataGridViewCellStyle10
        Me.dgvWallets.Dock = System.Windows.Forms.DockStyle.Fill
        Me.dgvWallets.EnableHeadersVisualStyles = False
        Me.dgvWallets.GridColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.dgvWallets.Location = New System.Drawing.Point(4, 28)
        Me.dgvWallets.MultiSelect = False
        Me.dgvWallets.Name = "dgvWallets"
        Me.dgvWallets.ReadOnly = True
        Me.dgvWallets.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None
        DataGridViewCellStyle11.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft
        DataGridViewCellStyle11.Font = New System.Drawing.Font("Microsoft Sans Serif", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        DataGridViewCellStyle11.ForeColor = System.Drawing.Color.WhiteSmoke
        DataGridViewCellStyle11.SelectionBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(129, Byte), Integer), CType(CType(149, Byte), Integer))
        DataGridViewCellStyle11.SelectionForeColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        DataGridViewCellStyle11.WrapMode = System.Windows.Forms.DataGridViewTriState.[True]
        Me.dgvWallets.RowHeadersDefaultCellStyle = DataGridViewCellStyle11
        Me.dgvWallets.RowHeadersVisible = False
        Me.dgvWallets.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing
        DataGridViewCellStyle12.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft
        DataGridViewCellStyle12.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        DataGridViewCellStyle12.Padding = New System.Windows.Forms.Padding(4)
        DataGridViewCellStyle12.SelectionBackColor = System.Drawing.Color.FromArgb(CType(CType(51, Byte), Integer), CType(CType(53, Byte), Integer), CType(CType(58, Byte), Integer))
        DataGridViewCellStyle12.SelectionForeColor = System.Drawing.Color.FromArgb(CType(CType(94, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(222, Byte), Integer))
        Me.dgvWallets.RowsDefaultCellStyle = DataGridViewCellStyle12
        Me.dgvWallets.RowTemplate.ContextMenuStrip = Me.ctxMenuMain
        Me.dgvWallets.RowTemplate.Height = 38
        Me.dgvWallets.RowTemplate.Resizable = System.Windows.Forms.DataGridViewTriState.[False]
        Me.dgvWallets.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect
        Me.dgvWallets.ShowCellErrors = False
        Me.dgvWallets.ShowCellToolTips = False
        Me.dgvWallets.ShowEditingIcon = False
        Me.dgvWallets.ShowRowErrors = False
        Me.dgvWallets.Size = New System.Drawing.Size(1057, 458)
        Me.dgvWallets.TabIndex = 2
        '
        'UniqueID
        '
        Me.UniqueID.HeaderText = "UniqueID"
        Me.UniqueID.Name = "UniqueID"
        Me.UniqueID.ReadOnly = True
        Me.UniqueID.Visible = False
        '
        'colParentID
        '
        DataGridViewCellStyle2.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        DataGridViewCellStyle2.ForeColor = System.Drawing.Color.Gray
        DataGridViewCellStyle2.Padding = New System.Windows.Forms.Padding(1)
        Me.colParentID.DefaultCellStyle = DataGridViewCellStyle2
        Me.colParentID.HeaderText = "ParentID"
        Me.colParentID.Name = "colParentID"
        Me.colParentID.ReadOnly = True
        Me.colParentID.Visible = False
        '
        'colOrderID
        '
        DataGridViewCellStyle3.ForeColor = System.Drawing.Color.Gray
        Me.colOrderID.DefaultCellStyle = DataGridViewCellStyle3
        Me.colOrderID.HeaderText = "OrderID"
        Me.colOrderID.Name = "colOrderID"
        Me.colOrderID.ReadOnly = True
        Me.colOrderID.Visible = False
        '
        'colWalletIcon
        '
        Me.colWalletIcon.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.None
        DataGridViewCellStyle4.Font = New System.Drawing.Font("Wingdings 2", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.colWalletIcon.DefaultCellStyle = DataGridViewCellStyle4
        Me.colWalletIcon.FillWeight = 30.0!
        Me.colWalletIcon.HeaderText = ""
        Me.colWalletIcon.MinimumWidth = 30
        Me.colWalletIcon.Name = "colWalletIcon"
        Me.colWalletIcon.ReadOnly = True
        Me.colWalletIcon.Resizable = System.Windows.Forms.DataGridViewTriState.[False]
        Me.colWalletIcon.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable
        Me.colWalletIcon.ToolTipText = "Wallet Icon"
        Me.colWalletIcon.Width = 30
        '
        'colName
        '
        Me.colName.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.AllCells
        DataGridViewCellStyle5.Font = New System.Drawing.Font("Lucida Console", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        DataGridViewCellStyle5.ForeColor = System.Drawing.Color.WhiteSmoke
        Me.colName.DefaultCellStyle = DataGridViewCellStyle5
        Me.colName.FillWeight = 200.0!
        Me.colName.HeaderText = " WALLET"
        Me.colName.MinimumWidth = 200
        Me.colName.Name = "colName"
        Me.colName.ReadOnly = True
        Me.colName.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable
        Me.colName.Width = 200
        '
        'colWalletAddress
        '
        Me.colWalletAddress.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.AllCells
        DataGridViewCellStyle6.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        DataGridViewCellStyle6.Font = New System.Drawing.Font("Lucida Console", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        DataGridViewCellStyle6.ForeColor = System.Drawing.Color.Gray
        DataGridViewCellStyle6.Padding = New System.Windows.Forms.Padding(1)
        Me.colWalletAddress.DefaultCellStyle = DataGridViewCellStyle6
        Me.colWalletAddress.FillWeight = 120.0!
        Me.colWalletAddress.HeaderText = "ADDRESS"
        Me.colWalletAddress.MinimumWidth = 120
        Me.colWalletAddress.Name = "colWalletAddress"
        Me.colWalletAddress.ReadOnly = True
        Me.colWalletAddress.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable
        Me.colWalletAddress.ToolTipText = "Wallet Address"
        Me.colWalletAddress.Width = 120
        '
        'colTheta
        '
        DataGridViewCellStyle7.ForeColor = System.Drawing.Color.Cyan
        Me.colTheta.DefaultCellStyle = DataGridViewCellStyle7
        Me.colTheta.HeaderText = "THETA"
        Me.colTheta.Name = "colTheta"
        Me.colTheta.ReadOnly = True
        Me.colTheta.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable
        Me.colTheta.Visible = False
        '
        'colTFuel
        '
        DataGridViewCellStyle8.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.colTFuel.DefaultCellStyle = DataGridViewCellStyle8
        Me.colTFuel.HeaderText = "TFUEL"
        Me.colTFuel.Name = "colTFuel"
        Me.colTFuel.ReadOnly = True
        Me.colTFuel.Visible = False
        '
        'colThetaDrop
        '
        Me.colThetaDrop.HeaderText = "TDROP"
        Me.colThetaDrop.Name = "colThetaDrop"
        Me.colThetaDrop.ReadOnly = True
        Me.colThetaDrop.Resizable = System.Windows.Forms.DataGridViewTriState.[True]
        Me.colThetaDrop.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable
        Me.colThetaDrop.Visible = False
        '
        'colTNEXT
        '
        Me.colTNEXT.HeaderText = "TSWAP"
        Me.colTNEXT.Name = "colTNEXT"
        Me.colTNEXT.ReadOnly = True
        Me.colTNEXT.Visible = False
        '
        'colTags
        '
        Me.colTags.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.AllCells
        DataGridViewCellStyle9.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft
        DataGridViewCellStyle9.BackColor = System.Drawing.Color.Aqua
        DataGridViewCellStyle9.Font = New System.Drawing.Font("Microsoft Sans Serif", 18.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        DataGridViewCellStyle9.ForeColor = System.Drawing.Color.Silver
        DataGridViewCellStyle9.Padding = New System.Windows.Forms.Padding(1)
        Me.colTags.DefaultCellStyle = DataGridViewCellStyle9
        Me.colTags.HeaderText = "FEATURES"
        Me.colTags.MinimumWidth = 400
        Me.colTags.Name = "colTags"
        Me.colTags.ReadOnly = True
        Me.colTags.Resizable = System.Windows.Forms.DataGridViewTriState.[False]
        Me.colTags.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable
        Me.colTags.ToolTipText = "Hard Wallet"
        Me.colTags.Width = 400
        '
        'colSTRETCHEND
        '
        Me.colSTRETCHEND.HeaderText = ""
        Me.colSTRETCHEND.Name = "colSTRETCHEND"
        Me.colSTRETCHEND.ReadOnly = True
        Me.colSTRETCHEND.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable
        '
        'colKEYSTORE
        '
        Me.colKEYSTORE.HeaderText = "KEYSTORE"
        Me.colKEYSTORE.Name = "colKEYSTORE"
        Me.colKEYSTORE.ReadOnly = True
        Me.colKEYSTORE.Visible = False
        '
        'colKEYPASS
        '
        Me.colKEYPASS.HeaderText = "KEYPASS"
        Me.colKEYPASS.Name = "colKEYPASS"
        Me.colKEYPASS.ReadOnly = True
        Me.colKEYPASS.Visible = False
        '
        'colMNEMONIC
        '
        Me.colMNEMONIC.HeaderText = "MNEMONIC"
        Me.colMNEMONIC.Name = "colMNEMONIC"
        Me.colMNEMONIC.ReadOnly = True
        Me.colMNEMONIC.Visible = False
        '
        'colPRIVATE_KEY
        '
        Me.colPRIVATE_KEY.HeaderText = "PRIVATE_KEY"
        Me.colPRIVATE_KEY.Name = "colPRIVATE_KEY"
        Me.colPRIVATE_KEY.ReadOnly = True
        Me.colPRIVATE_KEY.Visible = False
        '
        'ctxMenuMain
        '
        Me.ctxMenuMain.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.ctxMenuMain.Font = New System.Drawing.Font("Microsoft Sans Serif", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ctxMenuMain.Items.AddRange(New System.Windows.Forms.ToolStripItem() {Me.AddToolStripMenuItem, Me.EditToolStripMenuItem8, Me.DeleteToolStripMenuItem, Me.MoveUpToolStripMenuItem, Me.MoveDownToolStripMenuItem})
        Me.ctxMenuMain.Name = "mnuWallet"
        Me.ctxMenuMain.Size = New System.Drawing.Size(181, 136)
        '
        'AddToolStripMenuItem
        '
        Me.AddToolStripMenuItem.BackgroundImage = Global.WalletManager.My.Resources.Resources._42_42_42
        Me.AddToolStripMenuItem.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Text
        Me.AddToolStripMenuItem.ForeColor = System.Drawing.Color.WhiteSmoke
        Me.AddToolStripMenuItem.Name = "AddToolStripMenuItem"
        Me.AddToolStripMenuItem.Size = New System.Drawing.Size(180, 22)
        Me.AddToolStripMenuItem.Text = "&Add..."
        Me.AddToolStripMenuItem.TextImageRelation = System.Windows.Forms.TextImageRelation.Overlay
        '
        'EditToolStripMenuItem8
        '
        Me.EditToolStripMenuItem8.BackgroundImage = Global.WalletManager.My.Resources.Resources._42_42_42
        Me.EditToolStripMenuItem8.Font = New System.Drawing.Font("Microsoft Sans Serif", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.EditToolStripMenuItem8.ForeColor = System.Drawing.Color.WhiteSmoke
        Me.EditToolStripMenuItem8.Name = "EditToolStripMenuItem8"
        Me.EditToolStripMenuItem8.Size = New System.Drawing.Size(180, 22)
        Me.EditToolStripMenuItem8.Text = "&View/Modify..."
        '
        'DeleteToolStripMenuItem
        '
        Me.DeleteToolStripMenuItem.BackgroundImage = Global.WalletManager.My.Resources.Resources._42_42_42
        Me.DeleteToolStripMenuItem.ForeColor = System.Drawing.Color.White
        Me.DeleteToolStripMenuItem.Name = "DeleteToolStripMenuItem"
        Me.DeleteToolStripMenuItem.Size = New System.Drawing.Size(180, 22)
        Me.DeleteToolStripMenuItem.Text = "&Delete"
        '
        'MoveUpToolStripMenuItem
        '
        Me.MoveUpToolStripMenuItem.BackgroundImage = Global.WalletManager.My.Resources.Resources._42_42_42
        Me.MoveUpToolStripMenuItem.ForeColor = System.Drawing.Color.White
        Me.MoveUpToolStripMenuItem.Name = "MoveUpToolStripMenuItem"
        Me.MoveUpToolStripMenuItem.Size = New System.Drawing.Size(180, 22)
        Me.MoveUpToolStripMenuItem.Text = "Move &Up"
        '
        'MoveDownToolStripMenuItem
        '
        Me.MoveDownToolStripMenuItem.BackgroundImage = Global.WalletManager.My.Resources.Resources._42_42_42
        Me.MoveDownToolStripMenuItem.ForeColor = System.Drawing.Color.White
        Me.MoveDownToolStripMenuItem.Name = "MoveDownToolStripMenuItem"
        Me.MoveDownToolStripMenuItem.Size = New System.Drawing.Size(180, 22)
        Me.MoveDownToolStripMenuItem.Text = "Move &Down"
        '
        'panFind
        '
        Me.panFind.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.panFind.Controls.Add(Me.Button3)
        Me.panFind.Controls.Add(Me.txtFind)
        Me.panFind.Dock = System.Windows.Forms.DockStyle.Top
        Me.panFind.Location = New System.Drawing.Point(4, 4)
        Me.panFind.Name = "panFind"
        Me.panFind.Size = New System.Drawing.Size(1057, 24)
        Me.panFind.TabIndex = 1
        Me.panFind.Visible = False
        '
        'Button3
        '
        Me.Button3.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.Button3.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(0, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(192, Byte), Integer))
        Me.Button3.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.Button3.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.Button3.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Button3.ForeColor = System.Drawing.Color.WhiteSmoke
        Me.Button3.Location = New System.Drawing.Point(565, 0)
        Me.Button3.Margin = New System.Windows.Forms.Padding(4)
        Me.Button3.Name = "Button3"
        Me.Button3.Size = New System.Drawing.Size(24, 24)
        Me.Button3.TabIndex = 19
        Me.Button3.Text = "+"
        Me.Button3.UseVisualStyleBackColor = False
        '
        'txtFind
        '
        Me.txtFind.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.txtFind.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.txtFind.Dock = System.Windows.Forms.DockStyle.Right
        Me.txtFind.ForeColor = System.Drawing.Color.FromArgb(CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer))
        Me.txtFind.Location = New System.Drawing.Point(922, 0)
        Me.txtFind.Name = "txtFind"
        Me.txtFind.Size = New System.Drawing.Size(135, 20)
        Me.txtFind.TabIndex = 0
        '
        'OpenFileDialog1
        '
        Me.OpenFileDialog1.FileName = "OpenFileDialog1"
        '
        'panelStatus
        '
        Me.panelStatus.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.panelStatus.Controls.Add(Me.txtFooterMsg)
        Me.panelStatus.Dock = System.Windows.Forms.DockStyle.Bottom
        Me.panelStatus.Location = New System.Drawing.Point(0, 516)
        Me.panelStatus.Name = "panelStatus"
        Me.panelStatus.Size = New System.Drawing.Size(1282, 25)
        Me.panelStatus.TabIndex = 4
        '
        'txtFooterMsg
        '
        Me.txtFooterMsg.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.txtFooterMsg.BorderStyle = System.Windows.Forms.BorderStyle.None
        Me.txtFooterMsg.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtFooterMsg.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.txtFooterMsg.Location = New System.Drawing.Point(8, 3)
        Me.txtFooterMsg.Name = "txtFooterMsg"
        Me.txtFooterMsg.ReadOnly = True
        Me.txtFooterMsg.Size = New System.Drawing.Size(452, 14)
        Me.txtFooterMsg.TabIndex = 0
        Me.txtFooterMsg.TabStop = False
        Me.txtFooterMsg.Text = "Set a SuperUser Password :: File -> Encryption..."
        Me.txtFooterMsg.Visible = False
        '
        'imgFeaturcons
        '
        Me.imgFeaturcons.ColorDepth = System.Windows.Forms.ColorDepth.Depth32Bit
        Me.imgFeaturcons.ImageSize = New System.Drawing.Size(16, 16)
        Me.imgFeaturcons.TransparentColor = System.Drawing.Color.Transparent
        '
        'DataGridViewImageColumn1
        '
        DataGridViewCellStyle13.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleCenter
        DataGridViewCellStyle13.Font = New System.Drawing.Font("Microsoft Sans Serif", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        DataGridViewCellStyle13.NullValue = CType(resources.GetObject("DataGridViewCellStyle13.NullValue"), Object)
        Me.DataGridViewImageColumn1.DefaultCellStyle = DataGridViewCellStyle13
        Me.DataGridViewImageColumn1.HeaderText = "EXP"
        Me.DataGridViewImageColumn1.Image = CType(resources.GetObject("DataGridViewImageColumn1.Image"), System.Drawing.Image)
        Me.DataGridViewImageColumn1.MinimumWidth = 50
        Me.DataGridViewImageColumn1.Name = "DataGridViewImageColumn1"
        Me.DataGridViewImageColumn1.Resizable = System.Windows.Forms.DataGridViewTriState.[False]
        Me.DataGridViewImageColumn1.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.Automatic
        Me.DataGridViewImageColumn1.Visible = False
        Me.DataGridViewImageColumn1.Width = 54
        '
        'frmMain
        '
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.None
        Me.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.ClientSize = New System.Drawing.Size(1282, 541)
        Me.Controls.Add(Me.SplitContainer1)
        Me.Controls.Add(Me.panelStatus)
        Me.Controls.Add(Me.mnuMain)
        Me.DoubleBuffered = True
        Me.ForeColor = System.Drawing.Color.Aqua
        Me.Icon = CType(resources.GetObject("$this.Icon"), System.Drawing.Icon)
        Me.MainMenuStrip = Me.mnuMain
        Me.Name = "frmMain"
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
        Me.Text = "KeyVault Manager - Offline Edition"
        Me.mnuMain.ResumeLayout(False)
        Me.mnuMain.PerformLayout()
        Me.SplitContainer1.Panel1.ResumeLayout(False)
        Me.SplitContainer1.Panel2.ResumeLayout(False)
        CType(Me.SplitContainer1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.SplitContainer1.ResumeLayout(False)
        CType(Me.dgvWallets, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ctxMenuMain.ResumeLayout(False)
        Me.panFind.ResumeLayout(False)
        Me.panFind.PerformLayout()
        Me.panelStatus.ResumeLayout(False)
        Me.panelStatus.PerformLayout()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents mnuMain As MenuStrip
    Friend WithEvents FileToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents EditToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents HelpToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents SplitContainer1 As SplitContainer
    Friend WithEvents tvKeyExplorer As TreeView
    Friend WithEvents imgLst As ImageList
    Friend WithEvents dgvWallets As DataGridView
    Friend WithEvents panFind As Panel
    Friend WithEvents ToolStripMenuItem1 As ToolStripSeparator
    Friend WithEvents ToolStripMenuItem2 As ToolStripSeparator
    Friend WithEvents ExitToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents OnlineSupportToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents ToolStripMenuItem4 As ToolStripSeparator
    Friend WithEvents AboutToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents txtFind As TextBox
    Friend WithEvents FindToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents ToolStripMenuItem5 As ToolStripSeparator
    Friend WithEvents OpenFileDialog1 As OpenFileDialog
    Friend WithEvents SaveKeyVaultToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents EncryptionToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents panelStatus As Panel
    Friend WithEvents txtFooterMsg As TextBox
    Friend WithEvents KeyStoreToolStripMenuItem6 As ToolStripMenuItem
    Friend WithEvents ImportKeybaseToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents ExportKeybaseToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents ToolStripMenuItem6 As ToolStripMenuItem
    Friend WithEvents NewKeyVaultToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents RecentKeyVaultToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents OpenKeyVaultToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents WalletToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents AddWalletToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents EditWalletToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents DeleteWalletToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents Button3 As Button
    Friend WithEvents ctxMenuMain As ContextMenuStrip
    Friend WithEvents AddToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents EditToolStripMenuItem8 As ToolStripMenuItem
    Friend WithEvents DataGridViewImageColumn1 As DataGridViewImageColumn
    Friend WithEvents imgFeaturcons As ImageList
    Friend WithEvents DeleteToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents UniqueID As DataGridViewTextBoxColumn
    Friend WithEvents colParentID As DataGridViewTextBoxColumn
    Friend WithEvents colOrderID As DataGridViewTextBoxColumn
    Friend WithEvents colWalletIcon As DataGridViewTextBoxColumn
    Friend WithEvents colName As DataGridViewTextBoxColumn
    Friend WithEvents colWalletAddress As DataGridViewTextBoxColumn
    Friend WithEvents colTheta As DataGridViewTextBoxColumn
    Friend WithEvents colTFuel As DataGridViewTextBoxColumn
    Friend WithEvents colThetaDrop As DataGridViewTextBoxColumn
    Friend WithEvents colTNEXT As DataGridViewTextBoxColumn
    Friend WithEvents colTags As DataGridViewTextBoxColumn
    Friend WithEvents colSTRETCHEND As DataGridViewTextBoxColumn
    Friend WithEvents colKEYSTORE As DataGridViewTextBoxColumn
    Friend WithEvents colKEYPASS As DataGridViewTextBoxColumn
    Friend WithEvents colMNEMONIC As DataGridViewTextBoxColumn
    Friend WithEvents colPRIVATE_KEY As DataGridViewTextBoxColumn
    Friend WithEvents MoveUpToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents MoveDownToolStripMenuItem As ToolStripMenuItem
End Class
