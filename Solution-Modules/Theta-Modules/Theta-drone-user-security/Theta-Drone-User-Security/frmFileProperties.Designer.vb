<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
Partial Class frmFileProperties
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(frmFileProperties))
        Me.btnSave = New System.Windows.Forms.Button()
        Me.panFind = New System.Windows.Forms.Panel()
        Me.btnClose = New System.Windows.Forms.Button()
        Me.txtSUpass = New System.Windows.Forms.TextBox()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.lblSUsubtext = New System.Windows.Forms.Label()
        Me.chkEnablePKpass = New System.Windows.Forms.CheckBox()
        Me.Label4 = New System.Windows.Forms.Label()
        Me.txtPKpass = New System.Windows.Forms.TextBox()
        Me.txtKeyVaultLocation = New System.Windows.Forms.TextBox()
        Me.Label5 = New System.Windows.Forms.Label()
        Me.Label6 = New System.Windows.Forms.Label()
        Me.chkEnableSUpass = New System.Windows.Forms.CheckBox()
        Me.lblVCsubtext = New System.Windows.Forms.Label()
        Me.btnKeyVaultLocation = New System.Windows.Forms.Button()
        Me.txtPKpass2 = New System.Windows.Forms.TextBox()
        Me.txtSUpass2 = New System.Windows.Forms.TextBox()
        Me.btnApplySUpass = New System.Windows.Forms.Button()
        Me.btnApplyPKpass = New System.Windows.Forms.Button()
        Me.Label8 = New System.Windows.Forms.Label()
        Me.Label9 = New System.Windows.Forms.Label()
        Me.panMasterPass = New System.Windows.Forms.Panel()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.panPKPass = New System.Windows.Forms.Panel()
        Me.ofdKeyVault = New System.Windows.Forms.OpenFileDialog()
        Me.panelStatus = New System.Windows.Forms.Panel()
        Me.txtFooterMsg = New System.Windows.Forms.TextBox()
        Me.panFind.SuspendLayout()
        Me.panMasterPass.SuspendLayout()
        Me.panPKPass.SuspendLayout()
        Me.panelStatus.SuspendLayout()
        Me.SuspendLayout()
        '
        'btnSave
        '
        Me.btnSave.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnSave.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnSave.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnSave.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnSave.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnSave.ForeColor = System.Drawing.Color.WhiteSmoke
        Me.btnSave.Location = New System.Drawing.Point(635, 432)
        Me.btnSave.Margin = New System.Windows.Forms.Padding(4)
        Me.btnSave.Name = "btnSave"
        Me.btnSave.Size = New System.Drawing.Size(112, 32)
        Me.btnSave.TabIndex = 1
        Me.btnSave.Text = "CLOSE"
        Me.btnSave.UseVisualStyleBackColor = False
        '
        'panFind
        '
        Me.panFind.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.panFind.Controls.Add(Me.btnClose)
        Me.panFind.Dock = System.Windows.Forms.DockStyle.Top
        Me.panFind.Location = New System.Drawing.Point(0, 0)
        Me.panFind.Name = "panFind"
        Me.panFind.Size = New System.Drawing.Size(777, 29)
        Me.panFind.TabIndex = 3
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
        Me.btnClose.Location = New System.Drawing.Point(745, 1)
        Me.btnClose.Margin = New System.Windows.Forms.Padding(4)
        Me.btnClose.Name = "btnClose"
        Me.btnClose.Size = New System.Drawing.Size(30, 26)
        Me.btnClose.TabIndex = 24
        Me.btnClose.Text = "X"
        Me.btnClose.UseVisualStyleBackColor = True
        '
        'txtSUpass
        '
        Me.txtSUpass.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.txtSUpass.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.txtSUpass.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtSUpass.ForeColor = System.Drawing.Color.Cyan
        Me.txtSUpass.Location = New System.Drawing.Point(84, 22)
        Me.txtSUpass.Name = "txtSUpass"
        Me.txtSUpass.PasswordChar = Global.Microsoft.VisualBasic.ChrW(42)
        Me.txtSUpass.Size = New System.Drawing.Size(237, 26)
        Me.txtSUpass.TabIndex = 0
        '
        'Label2
        '
        Me.Label2.AutoSize = True
        Me.Label2.Location = New System.Drawing.Point(29, 91)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(386, 18)
        Me.Label2.TabIndex = 5
        Me.Label2.Text = "Protect your KeyVault by setting a SuperUser Password.  "
        '
        'lblSUsubtext
        '
        Me.lblSUsubtext.AutoSize = True
        Me.lblSUsubtext.Font = New System.Drawing.Font("Microsoft Sans Serif", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblSUsubtext.ForeColor = System.Drawing.Color.Gray
        Me.lblSUsubtext.Location = New System.Drawing.Point(28, 198)
        Me.lblSUsubtext.Name = "lblSUsubtext"
        Me.lblSUsubtext.Size = New System.Drawing.Size(352, 13)
        Me.lblSUsubtext.TabIndex = 6
        Me.lblSUsubtext.Text = "TO ENCRYPT/DECRYPT KEYVAULT WHEN OPENING AND SAVING."
        '
        'chkEnablePKpass
        '
        Me.chkEnablePKpass.AutoSize = True
        Me.chkEnablePKpass.BackgroundImage = Global.WalletManager.My.Resources.Resources._32_32_32
        Me.chkEnablePKpass.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.chkEnablePKpass.FlatAppearance.CheckedBackColor = System.Drawing.Color.Cyan
        Me.chkEnablePKpass.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.chkEnablePKpass.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.chkEnablePKpass.Location = New System.Drawing.Point(34, 232)
        Me.chkEnablePKpass.Name = "chkEnablePKpass"
        Me.chkEnablePKpass.Size = New System.Drawing.Size(215, 22)
        Me.chkEnablePKpass.TabIndex = 7
        Me.chkEnablePKpass.Text = "Enable VaultCrypt Password "
        Me.chkEnablePKpass.UseVisualStyleBackColor = False
        Me.chkEnablePKpass.Visible = False
        '
        'Label4
        '
        Me.Label4.AutoSize = True
        Me.Label4.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label4.ForeColor = System.Drawing.Color.Gray
        Me.Label4.Location = New System.Drawing.Point(252, 4)
        Me.Label4.Name = "Label4"
        Me.Label4.Size = New System.Drawing.Size(76, 15)
        Me.Label4.TabIndex = 9
        Me.Label4.Text = "PASSWORD"
        '
        'txtPKpass
        '
        Me.txtPKpass.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.txtPKpass.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.txtPKpass.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtPKpass.ForeColor = System.Drawing.Color.Cyan
        Me.txtPKpass.Location = New System.Drawing.Point(87, 22)
        Me.txtPKpass.Name = "txtPKpass"
        Me.txtPKpass.PasswordChar = Global.Microsoft.VisualBasic.ChrW(42)
        Me.txtPKpass.Size = New System.Drawing.Size(237, 26)
        Me.txtPKpass.TabIndex = 8
        '
        'txtKeyVaultLocation
        '
        Me.txtKeyVaultLocation.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.txtKeyVaultLocation.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.txtKeyVaultLocation.Enabled = False
        Me.txtKeyVaultLocation.ForeColor = System.Drawing.Color.FromArgb(CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer))
        Me.txtKeyVaultLocation.Location = New System.Drawing.Point(31, 383)
        Me.txtKeyVaultLocation.Multiline = True
        Me.txtKeyVaultLocation.Name = "txtKeyVaultLocation"
        Me.txtKeyVaultLocation.Size = New System.Drawing.Size(715, 28)
        Me.txtKeyVaultLocation.TabIndex = 10
        '
        'Label5
        '
        Me.Label5.AutoSize = True
        Me.Label5.Location = New System.Drawing.Point(28, 361)
        Me.Label5.Name = "Label5"
        Me.Label5.Size = New System.Drawing.Size(126, 18)
        Me.Label5.TabIndex = 11
        Me.Label5.Text = "KeyVault Location"
        '
        'Label6
        '
        Me.Label6.AutoSize = True
        Me.Label6.Font = New System.Drawing.Font("Microsoft Sans Serif", 20.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label6.ForeColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        Me.Label6.Location = New System.Drawing.Point(25, 45)
        Me.Label6.Name = "Label6"
        Me.Label6.Size = New System.Drawing.Size(278, 31)
        Me.Label6.TabIndex = 12
        Me.Label6.Text = "KeyVault Encryption"
        '
        'chkEnableSUpass
        '
        Me.chkEnableSUpass.AutoSize = True
        Me.chkEnableSUpass.BackgroundImage = Global.WalletManager.My.Resources.Resources._32_32_32
        Me.chkEnableSUpass.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.chkEnableSUpass.FlatAppearance.CheckedBackColor = System.Drawing.Color.Cyan
        Me.chkEnableSUpass.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.chkEnableSUpass.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.chkEnableSUpass.Location = New System.Drawing.Point(34, 118)
        Me.chkEnableSUpass.Name = "chkEnableSUpass"
        Me.chkEnableSUpass.Size = New System.Drawing.Size(215, 22)
        Me.chkEnableSUpass.TabIndex = 13
        Me.chkEnableSUpass.Text = "Enable SuperUser Password"
        Me.chkEnableSUpass.UseVisualStyleBackColor = False
        '
        'lblVCsubtext
        '
        Me.lblVCsubtext.AutoSize = True
        Me.lblVCsubtext.Font = New System.Drawing.Font("Microsoft Sans Serif", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblVCsubtext.ForeColor = System.Drawing.Color.Gray
        Me.lblVCsubtext.Location = New System.Drawing.Point(28, 315)
        Me.lblVCsubtext.Name = "lblVCsubtext"
        Me.lblVCsubtext.Size = New System.Drawing.Size(386, 13)
        Me.lblVCsubtext.TabIndex = 14
        Me.lblVCsubtext.Text = "TO ENCRYPT/DECRYPT PASSWORDS, MNEMONICS AND PRIVATE KEYS."
        Me.lblVCsubtext.Visible = False
        '
        'btnKeyVaultLocation
        '
        Me.btnKeyVaultLocation.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnKeyVaultLocation.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnKeyVaultLocation.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnKeyVaultLocation.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnKeyVaultLocation.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnKeyVaultLocation.ForeColor = System.Drawing.Color.FromArgb(CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer))
        Me.btnKeyVaultLocation.Location = New System.Drawing.Point(712, 385)
        Me.btnKeyVaultLocation.Margin = New System.Windows.Forms.Padding(4)
        Me.btnKeyVaultLocation.Name = "btnKeyVaultLocation"
        Me.btnKeyVaultLocation.Size = New System.Drawing.Size(31, 23)
        Me.btnKeyVaultLocation.TabIndex = 15
        Me.btnKeyVaultLocation.Text = "..."
        Me.btnKeyVaultLocation.UseVisualStyleBackColor = True
        '
        'txtPKpass2
        '
        Me.txtPKpass2.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.txtPKpass2.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.txtPKpass2.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtPKpass2.ForeColor = System.Drawing.Color.Cyan
        Me.txtPKpass2.Location = New System.Drawing.Point(385, 22)
        Me.txtPKpass2.Name = "txtPKpass2"
        Me.txtPKpass2.PasswordChar = Global.Microsoft.VisualBasic.ChrW(42)
        Me.txtPKpass2.Size = New System.Drawing.Size(237, 26)
        Me.txtPKpass2.TabIndex = 16
        '
        'txtSUpass2
        '
        Me.txtSUpass2.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.txtSUpass2.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.txtSUpass2.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtSUpass2.ForeColor = System.Drawing.Color.Cyan
        Me.txtSUpass2.Location = New System.Drawing.Point(384, 22)
        Me.txtSUpass2.Name = "txtSUpass2"
        Me.txtSUpass2.PasswordChar = Global.Microsoft.VisualBasic.ChrW(42)
        Me.txtSUpass2.Size = New System.Drawing.Size(237, 26)
        Me.txtSUpass2.TabIndex = 17
        '
        'btnApplySUpass
        '
        Me.btnApplySUpass.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnApplySUpass.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnApplySUpass.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnApplySUpass.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnApplySUpass.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnApplySUpass.ForeColor = System.Drawing.Color.DarkGray
        Me.btnApplySUpass.Location = New System.Drawing.Point(680, 21)
        Me.btnApplySUpass.Margin = New System.Windows.Forms.Padding(4)
        Me.btnApplySUpass.Name = "btnApplySUpass"
        Me.btnApplySUpass.Size = New System.Drawing.Size(64, 29)
        Me.btnApplySUpass.TabIndex = 18
        Me.btnApplySUpass.Text = "APPLY"
        Me.btnApplySUpass.UseVisualStyleBackColor = False
        '
        'btnApplyPKpass
        '
        Me.btnApplyPKpass.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnApplyPKpass.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnApplyPKpass.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnApplyPKpass.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnApplyPKpass.ForeColor = System.Drawing.Color.DarkGray
        Me.btnApplyPKpass.Location = New System.Drawing.Point(678, 21)
        Me.btnApplyPKpass.Margin = New System.Windows.Forms.Padding(4)
        Me.btnApplyPKpass.Name = "btnApplyPKpass"
        Me.btnApplyPKpass.Size = New System.Drawing.Size(67, 29)
        Me.btnApplyPKpass.TabIndex = 19
        Me.btnApplyPKpass.Text = "APPLY"
        Me.btnApplyPKpass.UseVisualStyleBackColor = True
        '
        'Label8
        '
        Me.Label8.AutoSize = True
        Me.Label8.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label8.ForeColor = System.Drawing.Color.Gray
        Me.Label8.Location = New System.Drawing.Point(571, 4)
        Me.Label8.Name = "Label8"
        Me.Label8.Size = New System.Drawing.Size(54, 15)
        Me.Label8.TabIndex = 20
        Me.Label8.Text = "REPEAT"
        '
        'Label9
        '
        Me.Label9.AutoSize = True
        Me.Label9.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label9.ForeColor = System.Drawing.Color.Gray
        Me.Label9.Location = New System.Drawing.Point(572, 4)
        Me.Label9.Name = "Label9"
        Me.Label9.Size = New System.Drawing.Size(54, 15)
        Me.Label9.TabIndex = 21
        Me.Label9.Text = "REPEAT"
        '
        'panMasterPass
        '
        Me.panMasterPass.Controls.Add(Me.Label1)
        Me.panMasterPass.Controls.Add(Me.Label8)
        Me.panMasterPass.Controls.Add(Me.txtSUpass)
        Me.panMasterPass.Controls.Add(Me.btnApplySUpass)
        Me.panMasterPass.Controls.Add(Me.txtSUpass2)
        Me.panMasterPass.Location = New System.Drawing.Point(2, 138)
        Me.panMasterPass.Name = "panMasterPass"
        Me.panMasterPass.Size = New System.Drawing.Size(773, 57)
        Me.panMasterPass.TabIndex = 22
        Me.panMasterPass.Visible = False
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label1.ForeColor = System.Drawing.Color.Gray
        Me.Label1.Location = New System.Drawing.Point(249, 4)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(76, 15)
        Me.Label1.TabIndex = 4
        Me.Label1.Text = "PASSWORD"
        '
        'panPKPass
        '
        Me.panPKPass.Controls.Add(Me.Label4)
        Me.panPKPass.Controls.Add(Me.txtPKpass)
        Me.panPKPass.Controls.Add(Me.Label9)
        Me.panPKPass.Controls.Add(Me.btnApplyPKpass)
        Me.panPKPass.Controls.Add(Me.txtPKpass2)
        Me.panPKPass.Location = New System.Drawing.Point(2, 255)
        Me.panPKPass.Name = "panPKPass"
        Me.panPKPass.Size = New System.Drawing.Size(773, 57)
        Me.panPKPass.TabIndex = 23
        Me.panPKPass.Visible = False
        '
        'panelStatus
        '
        Me.panelStatus.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.panelStatus.Controls.Add(Me.txtFooterMsg)
        Me.panelStatus.Dock = System.Windows.Forms.DockStyle.Bottom
        Me.panelStatus.Location = New System.Drawing.Point(0, 486)
        Me.panelStatus.Name = "panelStatus"
        Me.panelStatus.Size = New System.Drawing.Size(777, 25)
        Me.panelStatus.TabIndex = 24
        '
        'txtFooterMsg
        '
        Me.txtFooterMsg.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.txtFooterMsg.BorderStyle = System.Windows.Forms.BorderStyle.None
        Me.txtFooterMsg.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtFooterMsg.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.txtFooterMsg.Location = New System.Drawing.Point(8, 3)
        Me.txtFooterMsg.Multiline = True
        Me.txtFooterMsg.Name = "txtFooterMsg"
        Me.txtFooterMsg.ReadOnly = True
        Me.txtFooterMsg.Size = New System.Drawing.Size(769, 20)
        Me.txtFooterMsg.TabIndex = 0
        Me.txtFooterMsg.TextAlign = System.Windows.Forms.HorizontalAlignment.Center
        '
        'frmFileProperties
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(9.0!, 18.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.CancelButton = Me.btnClose
        Me.ClientSize = New System.Drawing.Size(777, 511)
        Me.Controls.Add(Me.panelStatus)
        Me.Controls.Add(Me.panPKPass)
        Me.Controls.Add(Me.panMasterPass)
        Me.Controls.Add(Me.lblVCsubtext)
        Me.Controls.Add(Me.btnKeyVaultLocation)
        Me.Controls.Add(Me.lblSUsubtext)
        Me.Controls.Add(Me.chkEnableSUpass)
        Me.Controls.Add(Me.Label6)
        Me.Controls.Add(Me.Label5)
        Me.Controls.Add(Me.txtKeyVaultLocation)
        Me.Controls.Add(Me.chkEnablePKpass)
        Me.Controls.Add(Me.Label2)
        Me.Controls.Add(Me.panFind)
        Me.Controls.Add(Me.btnSave)
        Me.DoubleBuffered = True
        Me.Font = New System.Drawing.Font("Microsoft Sans Serif", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ForeColor = System.Drawing.Color.WhiteSmoke
        Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None
        Me.Icon = CType(resources.GetObject("$this.Icon"), System.Drawing.Icon)
        Me.Margin = New System.Windows.Forms.Padding(4)
        Me.Name = "frmFileProperties"
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
        Me.Text = "Properties..."
        Me.TopMost = True
        Me.panFind.ResumeLayout(False)
        Me.panMasterPass.ResumeLayout(False)
        Me.panMasterPass.PerformLayout()
        Me.panPKPass.ResumeLayout(False)
        Me.panPKPass.PerformLayout()
        Me.panelStatus.ResumeLayout(False)
        Me.panelStatus.PerformLayout()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents btnSave As Button
    Friend WithEvents panFind As Panel
    Friend WithEvents txtSUpass As TextBox
    Friend WithEvents Label2 As Label
    Friend WithEvents lblSUsubtext As Label
    Friend WithEvents chkEnablePKpass As CheckBox
    Friend WithEvents Label4 As Label
    Friend WithEvents txtPKpass As TextBox
    Friend WithEvents txtKeyVaultLocation As TextBox
    Friend WithEvents Label5 As Label
    Friend WithEvents Label6 As Label
    Friend WithEvents chkEnableSUpass As CheckBox
    Friend WithEvents lblVCsubtext As Label
    Friend WithEvents btnKeyVaultLocation As Button
    Friend WithEvents txtPKpass2 As TextBox
    Friend WithEvents txtSUpass2 As TextBox
    Friend WithEvents btnApplySUpass As Button
    Friend WithEvents btnApplyPKpass As Button
    Friend WithEvents Label8 As Label
    Friend WithEvents Label9 As Label
    Friend WithEvents panMasterPass As Panel
    Friend WithEvents panPKPass As Panel
    Friend WithEvents Label1 As Label
    Friend WithEvents btnClose As Button
    Friend WithEvents ofdKeyVault As OpenFileDialog
    Friend WithEvents panelStatus As Panel
    Friend WithEvents txtFooterMsg As TextBox
End Class
