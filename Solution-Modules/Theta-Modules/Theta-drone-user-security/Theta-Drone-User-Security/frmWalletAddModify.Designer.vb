<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
Partial Class frmWalletAddModify
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(frmWalletAddModify))
        Me.panelStatus = New System.Windows.Forms.Panel()
        Me.lblFooterMsg = New System.Windows.Forms.Label()
        Me.ofdKeyVault = New System.Windows.Forms.OpenFileDialog()
        Me.Label4 = New System.Windows.Forms.Label()
        Me.Label9 = New System.Windows.Forms.Label()
        Me.Label7 = New System.Windows.Forms.Label()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.panMasterPass = New System.Windows.Forms.Panel()
        Me.Label13 = New System.Windows.Forms.Label()
        Me.Label8 = New System.Windows.Forms.Label()
        Me.txtWalletAddress = New System.Windows.Forms.TextBox()
        Me.txtWalletDescription = New System.Windows.Forms.TextBox()
        Me.Label11 = New System.Windows.Forms.Label()
        Me.btnHMO = New System.Windows.Forms.Button()
        Me.txtFind = New System.Windows.Forms.TextBox()
        Me.Label3 = New System.Windows.Forms.Label()
        Me.btnKeyVaultLocation = New System.Windows.Forms.Button()
        Me.Label6 = New System.Windows.Forms.Label()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.btnClose = New System.Windows.Forms.Button()
        Me.panFind = New System.Windows.Forms.Panel()
        Me.btnExpand = New System.Windows.Forms.Button()
        Me.btnSave = New System.Windows.Forms.Button()
        Me.Panel3 = New System.Windows.Forms.Panel()
        Me.Button3 = New System.Windows.Forms.Button()
        Me.btnEditFeatureTags = New System.Windows.Forms.Button()
        Me.Label14 = New System.Windows.Forms.Label()
        Me.txtFeatureTags = New System.Windows.Forms.TextBox()
        Me.Panel4 = New System.Windows.Forms.Panel()
        Me.btnViewKeypass = New System.Windows.Forms.Button()
        Me.btnCopyKeyPass = New System.Windows.Forms.Button()
        Me.btnEditKeypass = New System.Windows.Forms.Button()
        Me.btnEditMnemonic = New System.Windows.Forms.Button()
        Me.btnCopyMnemonic = New System.Windows.Forms.Button()
        Me.btnViewMnemonic = New System.Windows.Forms.Button()
        Me.Panel5 = New System.Windows.Forms.Panel()
        Me.panAccess = New System.Windows.Forms.Panel()
        Me.Panel7 = New System.Windows.Forms.Panel()
        Me.Label10 = New System.Windows.Forms.Label()
        Me.Label15 = New System.Windows.Forms.Label()
        Me.btnEditKeystore = New System.Windows.Forms.Button()
        Me.btnCopyKeystore = New System.Windows.Forms.Button()
        Me.btnViewKeystore = New System.Windows.Forms.Button()
        Me.btnEditPrivateKey = New System.Windows.Forms.Button()
        Me.btnCopyPrivateKey = New System.Windows.Forms.Button()
        Me.btnViewPrivateKey = New System.Windows.Forms.Button()
        Me.Label12 = New System.Windows.Forms.Label()
        Me.lblBottomMsg = New System.Windows.Forms.Label()
        Me.panAccessButtons = New System.Windows.Forms.Panel()
        Me.lblIdentMsg = New System.Windows.Forms.Label()
        Me.tmrClearMsg = New System.Windows.Forms.Timer(Me.components)
        Me.panelStatus.SuspendLayout()
        Me.panMasterPass.SuspendLayout()
        Me.panFind.SuspendLayout()
        Me.Panel3.SuspendLayout()
        Me.Panel4.SuspendLayout()
        Me.Panel5.SuspendLayout()
        Me.panAccess.SuspendLayout()
        Me.Panel7.SuspendLayout()
        Me.panAccessButtons.SuspendLayout()
        Me.SuspendLayout()
        '
        'panelStatus
        '
        Me.panelStatus.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.panelStatus.Controls.Add(Me.lblFooterMsg)
        Me.panelStatus.Dock = System.Windows.Forms.DockStyle.Bottom
        Me.panelStatus.Location = New System.Drawing.Point(0, 515)
        Me.panelStatus.Name = "panelStatus"
        Me.panelStatus.Size = New System.Drawing.Size(789, 25)
        Me.panelStatus.TabIndex = 36
        '
        'lblFooterMsg
        '
        Me.lblFooterMsg.Dock = System.Windows.Forms.DockStyle.Fill
        Me.lblFooterMsg.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblFooterMsg.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.lblFooterMsg.Location = New System.Drawing.Point(0, 0)
        Me.lblFooterMsg.Name = "lblFooterMsg"
        Me.lblFooterMsg.Size = New System.Drawing.Size(789, 25)
        Me.lblFooterMsg.TabIndex = 0
        Me.lblFooterMsg.TextAlign = System.Drawing.ContentAlignment.MiddleCenter
        '
        'Label4
        '
        Me.Label4.AutoSize = True
        Me.Label4.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label4.ForeColor = System.Drawing.Color.Gray
        Me.Label4.Location = New System.Drawing.Point(275, 6)
        Me.Label4.Name = "Label4"
        Me.Label4.Size = New System.Drawing.Size(61, 15)
        Me.Label4.TabIndex = 9
        Me.Label4.Text = "KEYPASS"
        '
        'Label9
        '
        Me.Label9.AutoSize = True
        Me.Label9.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label9.ForeColor = System.Drawing.Color.Gray
        Me.Label9.Location = New System.Drawing.Point(423, 6)
        Me.Label9.Name = "Label9"
        Me.Label9.Size = New System.Drawing.Size(75, 15)
        Me.Label9.TabIndex = 21
        Me.Label9.Text = "MNEMONIC"
        '
        'Label7
        '
        Me.Label7.AutoSize = True
        Me.Label7.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label7.ForeColor = System.Drawing.Color.Gray
        Me.Label7.Location = New System.Drawing.Point(187, 837)
        Me.Label7.Name = "Label7"
        Me.Label7.Size = New System.Drawing.Size(414, 16)
        Me.Label7.TabIndex = 14
        Me.Label7.Text = "*Always flush your clipboard after handling a password or mnemonic."
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label1.ForeColor = System.Drawing.Color.Gray
        Me.Label1.Location = New System.Drawing.Point(215, 12)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(61, 15)
        Me.Label1.TabIndex = 4
        Me.Label1.Text = "KEYBASE"
        '
        'panMasterPass
        '
        Me.panMasterPass.Controls.Add(Me.Label13)
        Me.panMasterPass.Controls.Add(Me.Label8)
        Me.panMasterPass.Controls.Add(Me.txtWalletAddress)
        Me.panMasterPass.Controls.Add(Me.txtWalletDescription)
        Me.panMasterPass.Location = New System.Drawing.Point(2, 138)
        Me.panMasterPass.Name = "panMasterPass"
        Me.panMasterPass.Size = New System.Drawing.Size(773, 63)
        Me.panMasterPass.TabIndex = 34
        '
        'Label13
        '
        Me.Label13.AutoSize = True
        Me.Label13.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label13.ForeColor = System.Drawing.Color.Gray
        Me.Label13.Location = New System.Drawing.Point(635, 6)
        Me.Label13.Name = "Label13"
        Me.Label13.Size = New System.Drawing.Size(115, 15)
        Me.Label13.TabIndex = 22
        Me.Label13.Text = "WALLET ADDRESS"
        '
        'Label8
        '
        Me.Label8.AutoSize = True
        Me.Label8.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label8.ForeColor = System.Drawing.Color.Gray
        Me.Label8.Location = New System.Drawing.Point(211, 6)
        Me.Label8.Name = "Label8"
        Me.Label8.Size = New System.Drawing.Size(132, 15)
        Me.Label8.TabIndex = 20
        Me.Label8.Text = "NAME | DESCRIPTION"
        '
        'txtWalletAddress
        '
        Me.txtWalletAddress.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.txtWalletAddress.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.txtWalletAddress.CharacterCasing = System.Windows.Forms.CharacterCasing.Upper
        Me.txtWalletAddress.Font = New System.Drawing.Font("Consolas", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtWalletAddress.ForeColor = System.Drawing.Color.FromArgb(CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer))
        Me.txtWalletAddress.Location = New System.Drawing.Point(349, 24)
        Me.txtWalletAddress.Name = "txtWalletAddress"
        Me.txtWalletAddress.Size = New System.Drawing.Size(397, 25)
        Me.txtWalletAddress.TabIndex = 2
        Me.txtWalletAddress.TextAlign = System.Windows.Forms.HorizontalAlignment.Center
        '
        'txtWalletDescription
        '
        Me.txtWalletDescription.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.txtWalletDescription.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.txtWalletDescription.CharacterCasing = System.Windows.Forms.CharacterCasing.Upper
        Me.txtWalletDescription.Font = New System.Drawing.Font("Consolas", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtWalletDescription.ForeColor = System.Drawing.Color.FromArgb(CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer))
        Me.txtWalletDescription.Location = New System.Drawing.Point(39, 24)
        Me.txtWalletDescription.Name = "txtWalletDescription"
        Me.txtWalletDescription.Size = New System.Drawing.Size(304, 25)
        Me.txtWalletDescription.TabIndex = 1
        Me.txtWalletDescription.TextAlign = System.Windows.Forms.HorizontalAlignment.Center
        '
        'Label11
        '
        Me.Label11.AutoSize = True
        Me.Label11.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label11.ForeColor = System.Drawing.Color.FromArgb(CType(CType(94, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(222, Byte), Integer))
        Me.Label11.Location = New System.Drawing.Point(34, 3)
        Me.Label11.Name = "Label11"
        Me.Label11.Size = New System.Drawing.Size(128, 15)
        Me.Label11.TabIndex = 39
        Me.Label11.Text = "ACCESS / RECOVERY"
        '
        'btnHMO
        '
        Me.btnHMO.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnHMO.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnHMO.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnHMO.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnHMO.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnHMO.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnHMO.ForeColor = System.Drawing.Color.FromArgb(CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer))
        Me.btnHMO.Location = New System.Drawing.Point(239, 31)
        Me.btnHMO.Margin = New System.Windows.Forms.Padding(4)
        Me.btnHMO.Name = "btnHMO"
        Me.btnHMO.Size = New System.Drawing.Size(31, 24)
        Me.btnHMO.TabIndex = 38
        Me.btnHMO.TabStop = False
        Me.btnHMO.Text = "..."
        Me.btnHMO.UseVisualStyleBackColor = False
        '
        'txtFind
        '
        Me.txtFind.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.txtFind.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.txtFind.Enabled = False
        Me.txtFind.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtFind.ForeColor = System.Drawing.Color.Gray
        Me.txtFind.Location = New System.Drawing.Point(52, 29)
        Me.txtFind.Multiline = True
        Me.txtFind.Name = "txtFind"
        Me.txtFind.ReadOnly = True
        Me.txtFind.Size = New System.Drawing.Size(220, 29)
        Me.txtFind.TabIndex = 0
        Me.txtFind.TabStop = False
        Me.txtFind.Text = " :: KEYVAULT :: [ KeyBase ]"
        '
        'Label3
        '
        Me.Label3.AutoSize = True
        Me.Label3.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label3.ForeColor = System.Drawing.Color.FromArgb(CType(CType(94, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(222, Byte), Integer))
        Me.Label3.Location = New System.Drawing.Point(32, 5)
        Me.Label3.Name = "Label3"
        Me.Label3.Size = New System.Drawing.Size(99, 15)
        Me.Label3.TabIndex = 6
        Me.Label3.Text = "IDENTIFICATION"
        '
        'btnKeyVaultLocation
        '
        Me.btnKeyVaultLocation.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnKeyVaultLocation.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnKeyVaultLocation.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnKeyVaultLocation.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnKeyVaultLocation.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnKeyVaultLocation.ForeColor = System.Drawing.Color.FromArgb(CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer))
        Me.btnKeyVaultLocation.Location = New System.Drawing.Point(2, 246)
        Me.btnKeyVaultLocation.Margin = New System.Windows.Forms.Padding(4)
        Me.btnKeyVaultLocation.Name = "btnKeyVaultLocation"
        Me.btnKeyVaultLocation.Size = New System.Drawing.Size(31, 23)
        Me.btnKeyVaultLocation.TabIndex = 33
        Me.btnKeyVaultLocation.Text = "..."
        Me.btnKeyVaultLocation.UseVisualStyleBackColor = True
        Me.btnKeyVaultLocation.Visible = False
        '
        'Label6
        '
        Me.Label6.AutoSize = True
        Me.Label6.Font = New System.Drawing.Font("Microsoft Sans Serif", 20.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label6.ForeColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        Me.Label6.Location = New System.Drawing.Point(28, 45)
        Me.Label6.Name = "Label6"
        Me.Label6.Size = New System.Drawing.Size(237, 31)
        Me.Label6.TabIndex = 31
        Me.Label6.Text = "Wallet Properties"
        '
        'Label2
        '
        Me.Label2.AutoSize = True
        Me.Label2.Location = New System.Drawing.Point(34, 79)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(357, 18)
        Me.Label2.TabIndex = 27
        Me.Label2.Text = "See our recommended guide to protecting your keys."
        '
        'btnClose
        '
        Me.btnClose.DialogResult = System.Windows.Forms.DialogResult.Cancel
        Me.btnClose.FlatAppearance.BorderColor = System.Drawing.Color.Crimson
        Me.btnClose.FlatAppearance.BorderSize = 0
        Me.btnClose.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Crimson
        Me.btnClose.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Maroon
        Me.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnClose.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnClose.ForeColor = System.Drawing.Color.Silver
        Me.btnClose.Location = New System.Drawing.Point(758, 1)
        Me.btnClose.Margin = New System.Windows.Forms.Padding(4)
        Me.btnClose.Name = "btnClose"
        Me.btnClose.Size = New System.Drawing.Size(30, 26)
        Me.btnClose.TabIndex = 24
        Me.btnClose.Text = "X"
        Me.btnClose.UseVisualStyleBackColor = True
        '
        'panFind
        '
        Me.panFind.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.panFind.Controls.Add(Me.btnExpand)
        Me.panFind.Controls.Add(Me.btnClose)
        Me.panFind.Dock = System.Windows.Forms.DockStyle.Top
        Me.panFind.Location = New System.Drawing.Point(0, 0)
        Me.panFind.Name = "panFind"
        Me.panFind.Size = New System.Drawing.Size(789, 29)
        Me.panFind.TabIndex = 26
        '
        'btnExpand
        '
        Me.btnExpand.DialogResult = System.Windows.Forms.DialogResult.Cancel
        Me.btnExpand.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        Me.btnExpand.FlatAppearance.BorderSize = 0
        Me.btnExpand.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        Me.btnExpand.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Maroon
        Me.btnExpand.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnExpand.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnExpand.ForeColor = System.Drawing.Color.Silver
        Me.btnExpand.Location = New System.Drawing.Point(720, 1)
        Me.btnExpand.Margin = New System.Windows.Forms.Padding(4)
        Me.btnExpand.Name = "btnExpand"
        Me.btnExpand.Size = New System.Drawing.Size(30, 26)
        Me.btnExpand.TabIndex = 44
        Me.btnExpand.Text = "[-]"
        Me.btnExpand.UseVisualStyleBackColor = True
        '
        'btnSave
        '
        Me.btnSave.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnSave.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnSave.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnSave.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnSave.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnSave.ForeColor = System.Drawing.Color.DarkGray
        Me.btnSave.Location = New System.Drawing.Point(636, 456)
        Me.btnSave.Margin = New System.Windows.Forms.Padding(4)
        Me.btnSave.Name = "btnSave"
        Me.btnSave.Size = New System.Drawing.Size(112, 32)
        Me.btnSave.TabIndex = 25
        Me.btnSave.Text = "SAVE"
        Me.btnSave.UseVisualStyleBackColor = True
        '
        'Panel3
        '
        Me.Panel3.Controls.Add(Me.Button3)
        Me.Panel3.Controls.Add(Me.btnEditFeatureTags)
        Me.Panel3.Controls.Add(Me.Label14)
        Me.Panel3.Controls.Add(Me.txtFeatureTags)
        Me.Panel3.Location = New System.Drawing.Point(12, 348)
        Me.Panel3.Name = "Panel3"
        Me.Panel3.Size = New System.Drawing.Size(749, 89)
        Me.Panel3.TabIndex = 37
        '
        'Button3
        '
        Me.Button3.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.Button3.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.Button3.FlatAppearance.BorderSize = 0
        Me.Button3.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.Button3.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.Button3.Font = New System.Drawing.Font("Courier New", 12.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Button3.ForeColor = System.Drawing.Color.Silver
        Me.Button3.Location = New System.Drawing.Point(665, 44)
        Me.Button3.Margin = New System.Windows.Forms.Padding(4)
        Me.Button3.Name = "Button3"
        Me.Button3.Size = New System.Drawing.Size(34, 27)
        Me.Button3.TabIndex = 25
        Me.Button3.Text = "+"
        Me.Button3.UseVisualStyleBackColor = False
        Me.Button3.Visible = False
        '
        'btnEditFeatureTags
        '
        Me.btnEditFeatureTags.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnEditFeatureTags.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnEditFeatureTags.FlatAppearance.BorderSize = 0
        Me.btnEditFeatureTags.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnEditFeatureTags.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnEditFeatureTags.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnEditFeatureTags.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnEditFeatureTags.ForeColor = System.Drawing.Color.Silver
        Me.btnEditFeatureTags.Location = New System.Drawing.Point(701, 44)
        Me.btnEditFeatureTags.Margin = New System.Windows.Forms.Padding(4)
        Me.btnEditFeatureTags.Name = "btnEditFeatureTags"
        Me.btnEditFeatureTags.Size = New System.Drawing.Size(34, 27)
        Me.btnEditFeatureTags.TabIndex = 24
        Me.btnEditFeatureTags.Text = "!"
        Me.btnEditFeatureTags.UseVisualStyleBackColor = False
        '
        'Label14
        '
        Me.Label14.AutoSize = True
        Me.Label14.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label14.ForeColor = System.Drawing.Color.Gray
        Me.Label14.Location = New System.Drawing.Point(644, 3)
        Me.Label14.Name = "Label14"
        Me.Label14.Size = New System.Drawing.Size(96, 15)
        Me.Label14.TabIndex = 9
        Me.Label14.Text = "FEATURE TAGS"
        '
        'txtFeatureTags
        '
        Me.txtFeatureTags.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.txtFeatureTags.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.txtFeatureTags.Font = New System.Drawing.Font("Consolas", 14.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtFeatureTags.ForeColor = System.Drawing.Color.Gray
        Me.txtFeatureTags.Location = New System.Drawing.Point(28, 19)
        Me.txtFeatureTags.Multiline = True
        Me.txtFeatureTags.Name = "txtFeatureTags"
        Me.txtFeatureTags.ReadOnly = True
        Me.txtFeatureTags.Size = New System.Drawing.Size(708, 53)
        Me.txtFeatureTags.TabIndex = 8
        '
        'Panel4
        '
        Me.Panel4.Controls.Add(Me.btnHMO)
        Me.Panel4.Controls.Add(Me.Label1)
        Me.Panel4.Controls.Add(Me.txtFind)
        Me.Panel4.Location = New System.Drawing.Point(472, 38)
        Me.Panel4.Name = "Panel4"
        Me.Panel4.Size = New System.Drawing.Size(283, 79)
        Me.Panel4.TabIndex = 45
        '
        'btnViewKeypass
        '
        Me.btnViewKeypass.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnViewKeypass.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnViewKeypass.FlatAppearance.BorderSize = 0
        Me.btnViewKeypass.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(160, Byte), Integer), CType(CType(98, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnViewKeypass.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(128, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnViewKeypass.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnViewKeypass.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnViewKeypass.ForeColor = System.Drawing.Color.DarkGray
        Me.btnViewKeypass.Location = New System.Drawing.Point(263, 25)
        Me.btnViewKeypass.Margin = New System.Windows.Forms.Padding(4)
        Me.btnViewKeypass.Name = "btnViewKeypass"
        Me.btnViewKeypass.Size = New System.Drawing.Size(34, 27)
        Me.btnViewKeypass.TabIndex = 48
        Me.btnViewKeypass.Text = "8"
        Me.btnViewKeypass.UseVisualStyleBackColor = False
        '
        'btnCopyKeyPass
        '
        Me.btnCopyKeyPass.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnCopyKeyPass.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnCopyKeyPass.FlatAppearance.BorderSize = 0
        Me.btnCopyKeyPass.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(160, Byte), Integer), CType(CType(98, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnCopyKeyPass.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(128, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnCopyKeyPass.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnCopyKeyPass.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnCopyKeyPass.ForeColor = System.Drawing.Color.DarkGray
        Me.btnCopyKeyPass.Location = New System.Drawing.Point(228, 25)
        Me.btnCopyKeyPass.Margin = New System.Windows.Forms.Padding(4)
        Me.btnCopyKeyPass.Name = "btnCopyKeyPass"
        Me.btnCopyKeyPass.Size = New System.Drawing.Size(34, 27)
        Me.btnCopyKeyPass.TabIndex = 46
        Me.btnCopyKeyPass.Text = "2"
        Me.btnCopyKeyPass.UseVisualStyleBackColor = False
        '
        'btnEditKeypass
        '
        Me.btnEditKeypass.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnEditKeypass.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnEditKeypass.FlatAppearance.BorderSize = 0
        Me.btnEditKeypass.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(160, Byte), Integer), CType(CType(98, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnEditKeypass.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(128, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnEditKeypass.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnEditKeypass.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnEditKeypass.ForeColor = System.Drawing.Color.DarkGray
        Me.btnEditKeypass.Location = New System.Drawing.Point(298, 25)
        Me.btnEditKeypass.Margin = New System.Windows.Forms.Padding(4)
        Me.btnEditKeypass.Name = "btnEditKeypass"
        Me.btnEditKeypass.Size = New System.Drawing.Size(34, 27)
        Me.btnEditKeypass.TabIndex = 49
        Me.btnEditKeypass.Text = "!"
        Me.btnEditKeypass.UseVisualStyleBackColor = False
        '
        'btnEditMnemonic
        '
        Me.btnEditMnemonic.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnEditMnemonic.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnEditMnemonic.FlatAppearance.BorderSize = 0
        Me.btnEditMnemonic.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(160, Byte), Integer), CType(CType(98, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnEditMnemonic.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(128, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnEditMnemonic.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnEditMnemonic.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnEditMnemonic.ForeColor = System.Drawing.Color.DarkGray
        Me.btnEditMnemonic.Location = New System.Drawing.Point(460, 25)
        Me.btnEditMnemonic.Margin = New System.Windows.Forms.Padding(4)
        Me.btnEditMnemonic.Name = "btnEditMnemonic"
        Me.btnEditMnemonic.Size = New System.Drawing.Size(34, 27)
        Me.btnEditMnemonic.TabIndex = 52
        Me.btnEditMnemonic.Text = "!"
        Me.btnEditMnemonic.UseVisualStyleBackColor = False
        '
        'btnCopyMnemonic
        '
        Me.btnCopyMnemonic.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnCopyMnemonic.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnCopyMnemonic.FlatAppearance.BorderSize = 0
        Me.btnCopyMnemonic.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(160, Byte), Integer), CType(CType(98, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnCopyMnemonic.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(128, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnCopyMnemonic.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnCopyMnemonic.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnCopyMnemonic.ForeColor = System.Drawing.Color.DarkGray
        Me.btnCopyMnemonic.Location = New System.Drawing.Point(390, 25)
        Me.btnCopyMnemonic.Margin = New System.Windows.Forms.Padding(4)
        Me.btnCopyMnemonic.Name = "btnCopyMnemonic"
        Me.btnCopyMnemonic.Size = New System.Drawing.Size(34, 27)
        Me.btnCopyMnemonic.TabIndex = 50
        Me.btnCopyMnemonic.Text = "2"
        Me.btnCopyMnemonic.UseVisualStyleBackColor = False
        '
        'btnViewMnemonic
        '
        Me.btnViewMnemonic.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnViewMnemonic.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnViewMnemonic.FlatAppearance.BorderSize = 0
        Me.btnViewMnemonic.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(160, Byte), Integer), CType(CType(98, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnViewMnemonic.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(128, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnViewMnemonic.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnViewMnemonic.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnViewMnemonic.ForeColor = System.Drawing.Color.DarkGray
        Me.btnViewMnemonic.Location = New System.Drawing.Point(425, 25)
        Me.btnViewMnemonic.Margin = New System.Windows.Forms.Padding(4)
        Me.btnViewMnemonic.Name = "btnViewMnemonic"
        Me.btnViewMnemonic.Size = New System.Drawing.Size(34, 27)
        Me.btnViewMnemonic.TabIndex = 51
        Me.btnViewMnemonic.Text = "8"
        Me.btnViewMnemonic.UseVisualStyleBackColor = False
        '
        'Panel5
        '
        Me.Panel5.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.Panel5.Controls.Add(Me.Label3)
        Me.Panel5.Location = New System.Drawing.Point(-4, 115)
        Me.Panel5.Name = "Panel5"
        Me.Panel5.Size = New System.Drawing.Size(824, 25)
        Me.Panel5.TabIndex = 37
        '
        'panAccess
        '
        Me.panAccess.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.panAccess.Controls.Add(Me.Label11)
        Me.panAccess.Location = New System.Drawing.Point(-4, 199)
        Me.panAccess.Name = "panAccess"
        Me.panAccess.Size = New System.Drawing.Size(811, 25)
        Me.panAccess.TabIndex = 38
        '
        'Panel7
        '
        Me.Panel7.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.Panel7.Controls.Add(Me.Label10)
        Me.Panel7.Location = New System.Drawing.Point(-4, 305)
        Me.Panel7.Name = "Panel7"
        Me.Panel7.Size = New System.Drawing.Size(831, 25)
        Me.Panel7.TabIndex = 53
        '
        'Label10
        '
        Me.Label10.AutoSize = True
        Me.Label10.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label10.ForeColor = System.Drawing.Color.FromArgb(CType(CType(94, Byte), Integer), CType(CType(192, Byte), Integer), CType(CType(222, Byte), Integer))
        Me.Label10.Location = New System.Drawing.Point(34, 5)
        Me.Label10.Name = "Label10"
        Me.Label10.Size = New System.Drawing.Size(105, 15)
        Me.Label10.TabIndex = 40
        Me.Label10.Text = "ADMINISTRATIVE"
        '
        'Label15
        '
        Me.Label15.AutoSize = True
        Me.Label15.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label15.ForeColor = System.Drawing.Color.Gray
        Me.Label15.Location = New System.Drawing.Point(100, 5)
        Me.Label15.Name = "Label15"
        Me.Label15.Size = New System.Drawing.Size(71, 15)
        Me.Label15.TabIndex = 54
        Me.Label15.Text = "KEYSTORE"
        '
        'btnEditKeystore
        '
        Me.btnEditKeystore.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnEditKeystore.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnEditKeystore.FlatAppearance.BorderSize = 0
        Me.btnEditKeystore.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnEditKeystore.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Teal
        Me.btnEditKeystore.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnEditKeystore.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnEditKeystore.ForeColor = System.Drawing.Color.DarkGray
        Me.btnEditKeystore.Location = New System.Drawing.Point(132, 24)
        Me.btnEditKeystore.Margin = New System.Windows.Forms.Padding(4)
        Me.btnEditKeystore.Name = "btnEditKeystore"
        Me.btnEditKeystore.Size = New System.Drawing.Size(34, 27)
        Me.btnEditKeystore.TabIndex = 57
        Me.btnEditKeystore.Text = "!"
        Me.btnEditKeystore.UseVisualStyleBackColor = False
        '
        'btnCopyKeystore
        '
        Me.btnCopyKeystore.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnCopyKeystore.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnCopyKeystore.FlatAppearance.BorderSize = 0
        Me.btnCopyKeystore.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnCopyKeystore.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Teal
        Me.btnCopyKeystore.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnCopyKeystore.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnCopyKeystore.ForeColor = System.Drawing.Color.DarkGray
        Me.btnCopyKeystore.Location = New System.Drawing.Point(62, 24)
        Me.btnCopyKeystore.Margin = New System.Windows.Forms.Padding(4)
        Me.btnCopyKeystore.Name = "btnCopyKeystore"
        Me.btnCopyKeystore.Size = New System.Drawing.Size(34, 27)
        Me.btnCopyKeystore.TabIndex = 55
        Me.btnCopyKeystore.Text = "2"
        Me.btnCopyKeystore.UseVisualStyleBackColor = False
        '
        'btnViewKeystore
        '
        Me.btnViewKeystore.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnViewKeystore.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnViewKeystore.FlatAppearance.BorderSize = 0
        Me.btnViewKeystore.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnViewKeystore.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Teal
        Me.btnViewKeystore.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnViewKeystore.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnViewKeystore.ForeColor = System.Drawing.Color.DarkGray
        Me.btnViewKeystore.Location = New System.Drawing.Point(97, 24)
        Me.btnViewKeystore.Margin = New System.Windows.Forms.Padding(4)
        Me.btnViewKeystore.Name = "btnViewKeystore"
        Me.btnViewKeystore.Size = New System.Drawing.Size(34, 27)
        Me.btnViewKeystore.TabIndex = 56
        Me.btnViewKeystore.Text = "8"
        Me.btnViewKeystore.UseVisualStyleBackColor = False
        '
        'btnEditPrivateKey
        '
        Me.btnEditPrivateKey.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnEditPrivateKey.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnEditPrivateKey.FlatAppearance.BorderSize = 0
        Me.btnEditPrivateKey.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(160, Byte), Integer), CType(CType(98, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnEditPrivateKey.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(128, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnEditPrivateKey.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnEditPrivateKey.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnEditPrivateKey.ForeColor = System.Drawing.Color.DarkGray
        Me.btnEditPrivateKey.Location = New System.Drawing.Point(624, 24)
        Me.btnEditPrivateKey.Margin = New System.Windows.Forms.Padding(4)
        Me.btnEditPrivateKey.Name = "btnEditPrivateKey"
        Me.btnEditPrivateKey.Size = New System.Drawing.Size(34, 27)
        Me.btnEditPrivateKey.TabIndex = 61
        Me.btnEditPrivateKey.Text = "!"
        Me.btnEditPrivateKey.UseVisualStyleBackColor = False
        '
        'btnCopyPrivateKey
        '
        Me.btnCopyPrivateKey.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnCopyPrivateKey.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnCopyPrivateKey.FlatAppearance.BorderSize = 0
        Me.btnCopyPrivateKey.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(160, Byte), Integer), CType(CType(98, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnCopyPrivateKey.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(128, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnCopyPrivateKey.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnCopyPrivateKey.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnCopyPrivateKey.ForeColor = System.Drawing.Color.DarkGray
        Me.btnCopyPrivateKey.Location = New System.Drawing.Point(554, 24)
        Me.btnCopyPrivateKey.Margin = New System.Windows.Forms.Padding(4)
        Me.btnCopyPrivateKey.Name = "btnCopyPrivateKey"
        Me.btnCopyPrivateKey.Size = New System.Drawing.Size(34, 27)
        Me.btnCopyPrivateKey.TabIndex = 59
        Me.btnCopyPrivateKey.Text = "2"
        Me.btnCopyPrivateKey.UseVisualStyleBackColor = False
        '
        'btnViewPrivateKey
        '
        Me.btnViewPrivateKey.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnViewPrivateKey.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnViewPrivateKey.FlatAppearance.BorderSize = 0
        Me.btnViewPrivateKey.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(160, Byte), Integer), CType(CType(98, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnViewPrivateKey.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(128, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnViewPrivateKey.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnViewPrivateKey.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnViewPrivateKey.ForeColor = System.Drawing.Color.DarkGray
        Me.btnViewPrivateKey.Location = New System.Drawing.Point(589, 24)
        Me.btnViewPrivateKey.Margin = New System.Windows.Forms.Padding(4)
        Me.btnViewPrivateKey.Name = "btnViewPrivateKey"
        Me.btnViewPrivateKey.Size = New System.Drawing.Size(34, 27)
        Me.btnViewPrivateKey.TabIndex = 60
        Me.btnViewPrivateKey.Text = "8"
        Me.btnViewPrivateKey.UseVisualStyleBackColor = False
        '
        'Label12
        '
        Me.Label12.AutoSize = True
        Me.Label12.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label12.ForeColor = System.Drawing.Color.Gray
        Me.Label12.Location = New System.Drawing.Point(579, 5)
        Me.Label12.Name = "Label12"
        Me.Label12.Size = New System.Drawing.Size(82, 15)
        Me.Label12.TabIndex = 58
        Me.Label12.Text = "PRIVATE KEY"
        '
        'lblBottomMsg
        '
        Me.lblBottomMsg.AutoSize = True
        Me.lblBottomMsg.ForeColor = System.Drawing.Color.Gray
        Me.lblBottomMsg.Location = New System.Drawing.Point(38, 470)
        Me.lblBottomMsg.Name = "lblBottomMsg"
        Me.lblBottomMsg.Size = New System.Drawing.Size(367, 18)
        Me.lblBottomMsg.TabIndex = 62
        Me.lblBottomMsg.Text = "Tag any features that will help further identify this wallet."
        '
        'panAccessButtons
        '
        Me.panAccessButtons.Controls.Add(Me.btnCopyKeystore)
        Me.panAccessButtons.Controls.Add(Me.btnEditPrivateKey)
        Me.panAccessButtons.Controls.Add(Me.Label4)
        Me.panAccessButtons.Controls.Add(Me.btnCopyPrivateKey)
        Me.panAccessButtons.Controls.Add(Me.Label9)
        Me.panAccessButtons.Controls.Add(Me.btnViewPrivateKey)
        Me.panAccessButtons.Controls.Add(Me.btnViewKeypass)
        Me.panAccessButtons.Controls.Add(Me.Label12)
        Me.panAccessButtons.Controls.Add(Me.btnCopyKeyPass)
        Me.panAccessButtons.Controls.Add(Me.btnEditKeystore)
        Me.panAccessButtons.Controls.Add(Me.btnEditKeypass)
        Me.panAccessButtons.Controls.Add(Me.btnViewMnemonic)
        Me.panAccessButtons.Controls.Add(Me.btnViewKeystore)
        Me.panAccessButtons.Controls.Add(Me.btnCopyMnemonic)
        Me.panAccessButtons.Controls.Add(Me.Label15)
        Me.panAccessButtons.Controls.Add(Me.btnEditMnemonic)
        Me.panAccessButtons.Location = New System.Drawing.Point(41, 233)
        Me.panAccessButtons.Name = "panAccessButtons"
        Me.panAccessButtons.Size = New System.Drawing.Size(720, 60)
        Me.panAccessButtons.TabIndex = 63
        '
        'lblIdentMsg
        '
        Me.lblIdentMsg.AutoSize = True
        Me.lblIdentMsg.ForeColor = System.Drawing.Color.Gray
        Me.lblIdentMsg.Location = New System.Drawing.Point(38, 275)
        Me.lblIdentMsg.Name = "lblIdentMsg"
        Me.lblIdentMsg.Size = New System.Drawing.Size(379, 18)
        Me.lblIdentMsg.TabIndex = 64
        Me.lblIdentMsg.Text = "Enter in a short name/description and the wallet address."
        Me.lblIdentMsg.Visible = False
        '
        'tmrClearMsg
        '
        Me.tmrClearMsg.Interval = 5000
        '
        'frmWalletAddModify
        '
        Me.AcceptButton = Me.btnSave
        Me.AutoScaleDimensions = New System.Drawing.SizeF(9.0!, 18.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.CancelButton = Me.btnClose
        Me.ClientSize = New System.Drawing.Size(789, 540)
        Me.Controls.Add(Me.lblBottomMsg)
        Me.Controls.Add(Me.Panel7)
        Me.Controls.Add(Me.panAccess)
        Me.Controls.Add(Me.Panel5)
        Me.Controls.Add(Me.Panel4)
        Me.Controls.Add(Me.Panel3)
        Me.Controls.Add(Me.btnKeyVaultLocation)
        Me.Controls.Add(Me.Label7)
        Me.Controls.Add(Me.panelStatus)
        Me.Controls.Add(Me.panMasterPass)
        Me.Controls.Add(Me.Label6)
        Me.Controls.Add(Me.Label2)
        Me.Controls.Add(Me.panFind)
        Me.Controls.Add(Me.btnSave)
        Me.Controls.Add(Me.panAccessButtons)
        Me.Controls.Add(Me.lblIdentMsg)
        Me.Font = New System.Drawing.Font("Microsoft Sans Serif", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ForeColor = System.Drawing.Color.WhiteSmoke
        Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None
        Me.Icon = CType(resources.GetObject("$this.Icon"), System.Drawing.Icon)
        Me.Margin = New System.Windows.Forms.Padding(4)
        Me.MaximizeBox = False
        Me.Name = "frmWalletAddModify"
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
        Me.Text = "Wallet Properties"
        Me.TopMost = True
        Me.panelStatus.ResumeLayout(False)
        Me.panMasterPass.ResumeLayout(False)
        Me.panMasterPass.PerformLayout()
        Me.panFind.ResumeLayout(False)
        Me.Panel3.ResumeLayout(False)
        Me.Panel3.PerformLayout()
        Me.Panel4.ResumeLayout(False)
        Me.Panel4.PerformLayout()
        Me.Panel5.ResumeLayout(False)
        Me.Panel5.PerformLayout()
        Me.panAccess.ResumeLayout(False)
        Me.panAccess.PerformLayout()
        Me.Panel7.ResumeLayout(False)
        Me.Panel7.PerformLayout()
        Me.panAccessButtons.ResumeLayout(False)
        Me.panAccessButtons.PerformLayout()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub
    Friend WithEvents panelStatus As Panel
    Friend WithEvents ofdKeyVault As OpenFileDialog
    Friend WithEvents Label4 As Label
    Friend WithEvents Label9 As Label
    Friend WithEvents Label7 As Label
    Friend WithEvents Label1 As Label
    Friend WithEvents panMasterPass As Panel
    Friend WithEvents Label8 As Label
    Friend WithEvents txtFind As TextBox
    Friend WithEvents Label3 As Label
    Friend WithEvents txtWalletDescription As TextBox
    Friend WithEvents btnKeyVaultLocation As Button
    Friend WithEvents Label6 As Label
    Friend WithEvents Label2 As Label
    Friend WithEvents btnClose As Button
    Friend WithEvents panFind As Panel
    Friend WithEvents btnSave As Button
    Friend WithEvents btnHMO As Button
    Friend WithEvents Label11 As Label
    Friend WithEvents Label13 As Label
    Friend WithEvents txtWalletAddress As TextBox
    Friend WithEvents btnExpand As Button
    Friend WithEvents Panel3 As Panel
    Friend WithEvents btnEditFeatureTags As Button
    Friend WithEvents Label14 As Label
    Friend WithEvents txtFeatureTags As TextBox
    Friend WithEvents Panel4 As Panel
    Friend WithEvents btnViewKeypass As Button
    Friend WithEvents btnCopyKeyPass As Button
    Friend WithEvents btnEditKeypass As Button
    Friend WithEvents btnEditMnemonic As Button
    Friend WithEvents btnCopyMnemonic As Button
    Friend WithEvents btnViewMnemonic As Button
    Friend WithEvents Panel5 As Panel
    Friend WithEvents panAccess As Panel
    Friend WithEvents Button3 As Button
    Friend WithEvents Panel7 As Panel
    Friend WithEvents Label15 As Label
    Friend WithEvents btnEditKeystore As Button
    Friend WithEvents btnCopyKeystore As Button
    Friend WithEvents btnViewKeystore As Button
    Friend WithEvents Label10 As Label
    Friend WithEvents btnEditPrivateKey As Button
    Friend WithEvents btnCopyPrivateKey As Button
    Friend WithEvents btnViewPrivateKey As Button
    Friend WithEvents Label12 As Label
    Friend WithEvents lblBottomMsg As Label
    Friend WithEvents panAccessButtons As Panel
    Friend WithEvents lblIdentMsg As Label
    Friend WithEvents lblFooterMsg As Label
    Friend WithEvents tmrClearMsg As Timer
End Class
