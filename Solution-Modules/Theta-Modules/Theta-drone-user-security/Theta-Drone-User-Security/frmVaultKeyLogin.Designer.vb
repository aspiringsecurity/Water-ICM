<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
Partial Class frmVaultKeyLogin
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(frmVaultKeyLogin))
        Me.panFind = New System.Windows.Forms.Panel()
        Me.Button1 = New System.Windows.Forms.Button()
        Me.ledLeft = New System.Windows.Forms.Label()
        Me.btnClose = New System.Windows.Forms.Button()
        Me.chkRememberUntilClose = New System.Windows.Forms.CheckBox()
        Me.PictureBox2 = New System.Windows.Forms.PictureBox()
        Me.PictureBox1 = New System.Windows.Forms.PictureBox()
        Me.lblHeading = New System.Windows.Forms.Label()
        Me.btnConfirm = New System.Windows.Forms.Button()
        Me.lblVCPass = New System.Windows.Forms.Label()
        Me.txtVCpassword = New System.Windows.Forms.TextBox()
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.lblFooterMsg = New System.Windows.Forms.Label()
        Me.panFind.SuspendLayout()
        CType(Me.PictureBox2, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.Panel1.SuspendLayout()
        Me.SuspendLayout()
        '
        'panFind
        '
        Me.panFind.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.panFind.Controls.Add(Me.Button1)
        Me.panFind.Controls.Add(Me.ledLeft)
        Me.panFind.Controls.Add(Me.btnClose)
        Me.panFind.Dock = System.Windows.Forms.DockStyle.Top
        Me.panFind.Location = New System.Drawing.Point(0, 0)
        Me.panFind.Name = "panFind"
        Me.panFind.Size = New System.Drawing.Size(529, 29)
        Me.panFind.TabIndex = 23
        '
        'Button1
        '
        Me.Button1.FlatAppearance.BorderColor = System.Drawing.Color.Crimson
        Me.Button1.FlatAppearance.BorderSize = 0
        Me.Button1.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Crimson
        Me.Button1.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Maroon
        Me.Button1.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.Button1.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Button1.ForeColor = System.Drawing.Color.Silver
        Me.Button1.Location = New System.Drawing.Point(744, 1)
        Me.Button1.Margin = New System.Windows.Forms.Padding(4)
        Me.Button1.Name = "Button1"
        Me.Button1.Size = New System.Drawing.Size(30, 26)
        Me.Button1.TabIndex = 24
        Me.Button1.Text = "X"
        Me.Button1.UseVisualStyleBackColor = True
        '
        'ledLeft
        '
        Me.ledLeft.AutoSize = True
        Me.ledLeft.Dock = System.Windows.Forms.DockStyle.Left
        Me.ledLeft.Font = New System.Drawing.Font("Microsoft Sans Serif", 15.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ledLeft.ForeColor = System.Drawing.Color.FromArgb(CType(CType(128, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.ledLeft.Location = New System.Drawing.Point(0, 0)
        Me.ledLeft.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.ledLeft.Name = "ledLeft"
        Me.ledLeft.Size = New System.Drawing.Size(18, 25)
        Me.ledLeft.TabIndex = 2
        Me.ledLeft.Text = "/"
        Me.ledLeft.Visible = False
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
        Me.btnClose.Location = New System.Drawing.Point(498, 1)
        Me.btnClose.Margin = New System.Windows.Forms.Padding(4)
        Me.btnClose.Name = "btnClose"
        Me.btnClose.Size = New System.Drawing.Size(30, 26)
        Me.btnClose.TabIndex = 9
        Me.btnClose.Text = "X"
        Me.btnClose.UseVisualStyleBackColor = True
        '
        'chkRememberUntilClose
        '
        Me.chkRememberUntilClose.AutoSize = True
        Me.chkRememberUntilClose.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.chkRememberUntilClose.FlatAppearance.CheckedBackColor = System.Drawing.Color.Cyan
        Me.chkRememberUntilClose.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.chkRememberUntilClose.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.chkRememberUntilClose.ForeColor = System.Drawing.Color.Gray
        Me.chkRememberUntilClose.Location = New System.Drawing.Point(173, 193)
        Me.chkRememberUntilClose.Name = "chkRememberUntilClose"
        Me.chkRememberUntilClose.Size = New System.Drawing.Size(183, 20)
        Me.chkRememberUntilClose.TabIndex = 27
        Me.chkRememberUntilClose.Text = "Remember for this session"
        Me.chkRememberUntilClose.UseVisualStyleBackColor = False
        Me.chkRememberUntilClose.Visible = False
        '
        'PictureBox2
        '
        Me.PictureBox2.Image = Global.WalletManager.My.Resources.Resources.theta_logo_33_32_32
        Me.PictureBox2.Location = New System.Drawing.Point(448, 44)
        Me.PictureBox2.Name = "PictureBox2"
        Me.PictureBox2.Size = New System.Drawing.Size(160, 153)
        Me.PictureBox2.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage
        Me.PictureBox2.TabIndex = 25
        Me.PictureBox2.TabStop = False
        '
        'PictureBox1
        '
        Me.PictureBox1.Image = Global.WalletManager.My.Resources.Resources.theta_logo_33_32_32
        Me.PictureBox1.Location = New System.Drawing.Point(-79, 44)
        Me.PictureBox1.Name = "PictureBox1"
        Me.PictureBox1.Size = New System.Drawing.Size(160, 153)
        Me.PictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage
        Me.PictureBox1.TabIndex = 24
        Me.PictureBox1.TabStop = False
        '
        'lblHeading
        '
        Me.lblHeading.AutoSize = True
        Me.lblHeading.Font = New System.Drawing.Font("Verdana", 18.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblHeading.ForeColor = System.Drawing.Color.FromArgb(CType(CType(192, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.lblHeading.Location = New System.Drawing.Point(93, 56)
        Me.lblHeading.Name = "lblHeading"
        Me.lblHeading.Size = New System.Drawing.Size(343, 29)
        Me.lblHeading.TabIndex = 21
        Me.lblHeading.Text = "Theta KeyVault Manager"
        '
        'btnConfirm
        '
        Me.btnConfirm.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnConfirm.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnConfirm.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnConfirm.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnConfirm.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnConfirm.ForeColor = System.Drawing.Color.WhiteSmoke
        Me.btnConfirm.Location = New System.Drawing.Point(199, 153)
        Me.btnConfirm.Margin = New System.Windows.Forms.Padding(4)
        Me.btnConfirm.Name = "btnConfirm"
        Me.btnConfirm.Size = New System.Drawing.Size(126, 32)
        Me.btnConfirm.TabIndex = 17
        Me.btnConfirm.Text = "CONFIRM"
        Me.btnConfirm.UseVisualStyleBackColor = True
        '
        'lblVCPass
        '
        Me.lblVCPass.AutoSize = True
        Me.lblVCPass.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblVCPass.ForeColor = System.Drawing.Color.Gray
        Me.lblVCPass.Location = New System.Drawing.Point(269, 91)
        Me.lblVCPass.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.lblVCPass.Name = "lblVCPass"
        Me.lblVCPass.Size = New System.Drawing.Size(155, 15)
        Me.lblVCPass.TabIndex = 20
        Me.lblVCPass.Text = "VAULTCRYPT PASSWORD"
        Me.lblVCPass.Visible = False
        '
        'txtVCpassword
        '
        Me.txtVCpassword.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.txtVCpassword.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.txtVCpassword.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtVCpassword.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.txtVCpassword.Location = New System.Drawing.Point(108, 109)
        Me.txtVCpassword.Margin = New System.Windows.Forms.Padding(4)
        Me.txtVCpassword.MaxLength = 64
        Me.txtVCpassword.Name = "txtVCpassword"
        Me.txtVCpassword.PasswordChar = Global.Microsoft.VisualBasic.ChrW(42)
        Me.txtVCpassword.Size = New System.Drawing.Size(311, 26)
        Me.txtVCpassword.TabIndex = 1
        Me.txtVCpassword.TextAlign = System.Windows.Forms.HorizontalAlignment.Center
        Me.txtVCpassword.WordWrap = False
        '
        'Panel1
        '
        Me.Panel1.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.Panel1.Controls.Add(Me.lblFooterMsg)
        Me.Panel1.Dock = System.Windows.Forms.DockStyle.Bottom
        Me.Panel1.Location = New System.Drawing.Point(0, 233)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(529, 29)
        Me.Panel1.TabIndex = 29
        '
        'lblFooterMsg
        '
        Me.lblFooterMsg.Dock = System.Windows.Forms.DockStyle.Fill
        Me.lblFooterMsg.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblFooterMsg.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.lblFooterMsg.Location = New System.Drawing.Point(0, 0)
        Me.lblFooterMsg.Name = "lblFooterMsg"
        Me.lblFooterMsg.Size = New System.Drawing.Size(529, 29)
        Me.lblFooterMsg.TabIndex = 1
        Me.lblFooterMsg.TextAlign = System.Drawing.ContentAlignment.MiddleCenter
        '
        'frmVaultKeyLogin
        '
        Me.AcceptButton = Me.btnConfirm
        Me.AutoScaleDimensions = New System.Drawing.SizeF(9.0!, 18.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.CancelButton = Me.btnClose
        Me.ClientSize = New System.Drawing.Size(529, 262)
        Me.Controls.Add(Me.Panel1)
        Me.Controls.Add(Me.panFind)
        Me.Controls.Add(Me.chkRememberUntilClose)
        Me.Controls.Add(Me.PictureBox2)
        Me.Controls.Add(Me.PictureBox1)
        Me.Controls.Add(Me.lblHeading)
        Me.Controls.Add(Me.btnConfirm)
        Me.Controls.Add(Me.lblVCPass)
        Me.Controls.Add(Me.txtVCpassword)
        Me.DoubleBuffered = True
        Me.Font = New System.Drawing.Font("Microsoft Sans Serif", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ForeColor = System.Drawing.Color.FromArgb(CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer))
        Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None
        Me.Icon = CType(resources.GetObject("$this.Icon"), System.Drawing.Icon)
        Me.Margin = New System.Windows.Forms.Padding(4)
        Me.Name = "frmVaultKeyLogin"
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
        Me.Text = "VaultCrypt - Confirm"
        Me.TopMost = True
        Me.panFind.ResumeLayout(False)
        Me.panFind.PerformLayout()
        CType(Me.PictureBox2, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.Panel1.ResumeLayout(False)
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents panFind As Panel
    Friend WithEvents Button1 As Button
    Friend WithEvents ledLeft As Label
    Friend WithEvents btnClose As Button
    Friend WithEvents chkRememberUntilClose As CheckBox
    Friend WithEvents PictureBox2 As PictureBox
    Friend WithEvents PictureBox1 As PictureBox
    Friend WithEvents lblHeading As Label
    Friend WithEvents btnConfirm As Button
    Friend WithEvents lblVCPass As Label
    Friend WithEvents txtVCpassword As TextBox
    Friend WithEvents Panel1 As Panel
    Friend WithEvents lblFooterMsg As Label
End Class
