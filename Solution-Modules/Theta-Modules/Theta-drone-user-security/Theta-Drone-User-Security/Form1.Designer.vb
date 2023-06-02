<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class frmLogin
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
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
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(frmLogin))
        Me.txtSUpassword = New System.Windows.Forms.TextBox()
        Me.ledLeft = New System.Windows.Forms.Label()
        Me.lblSUPass = New System.Windows.Forms.Label()
        Me.btnLogin = New System.Windows.Forms.Button()
        Me.lblHeading = New System.Windows.Forms.Label()
        Me.Label4 = New System.Windows.Forms.Label()
        Me.btnClose = New System.Windows.Forms.Button()
        Me.panFind = New System.Windows.Forms.Panel()
        Me.Button1 = New System.Windows.Forms.Button()
        Me.panelStatus = New System.Windows.Forms.Panel()
        Me.ledRight = New System.Windows.Forms.Label()
        Me.lblFooterMsg = New System.Windows.Forms.Label()
        Me.chkRememberUntilClose = New System.Windows.Forms.CheckBox()
        Me.lblLoginMessage = New System.Windows.Forms.Label()
        Me.PictureBox1 = New System.Windows.Forms.PictureBox()
        Me.PictureBox2 = New System.Windows.Forms.PictureBox()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.panFind.SuspendLayout()
        Me.panelStatus.SuspendLayout()
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.PictureBox2, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'txtSUpassword
        '
        Me.txtSUpassword.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.txtSUpassword.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.txtSUpassword.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtSUpassword.ForeColor = System.Drawing.Color.Cyan
        Me.txtSUpassword.Location = New System.Drawing.Point(111, 113)
        Me.txtSUpassword.Margin = New System.Windows.Forms.Padding(4)
        Me.txtSUpassword.MaxLength = 64
        Me.txtSUpassword.Name = "txtSUpassword"
        Me.txtSUpassword.PasswordChar = Global.Microsoft.VisualBasic.ChrW(42)
        Me.txtSUpassword.Size = New System.Drawing.Size(311, 26)
        Me.txtSUpassword.TabIndex = 2
        Me.txtSUpassword.TextAlign = System.Windows.Forms.HorizontalAlignment.Center
        Me.txtSUpassword.WordWrap = False
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
        'lblSUPass
        '
        Me.lblSUPass.AutoSize = True
        Me.lblSUPass.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblSUPass.ForeColor = System.Drawing.Color.Gray
        Me.lblSUPass.Location = New System.Drawing.Point(272, 95)
        Me.lblSUPass.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.lblSUPass.Name = "lblSUPass"
        Me.lblSUPass.Size = New System.Drawing.Size(155, 15)
        Me.lblSUPass.TabIndex = 3
        Me.lblSUPass.Text = "SUPERUSER PASSWORD"
        Me.lblSUPass.Visible = False
        '
        'btnLogin
        '
        Me.btnLogin.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnLogin.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnLogin.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnLogin.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnLogin.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnLogin.ForeColor = System.Drawing.Color.WhiteSmoke
        Me.btnLogin.Location = New System.Drawing.Point(202, 157)
        Me.btnLogin.Margin = New System.Windows.Forms.Padding(4)
        Me.btnLogin.Name = "btnLogin"
        Me.btnLogin.Size = New System.Drawing.Size(126, 32)
        Me.btnLogin.TabIndex = 0
        Me.btnLogin.Text = "LOGIN"
        Me.btnLogin.UseVisualStyleBackColor = True
        '
        'lblHeading
        '
        Me.lblHeading.AutoSize = True
        Me.lblHeading.Font = New System.Drawing.Font("Verdana", 18.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblHeading.ForeColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        Me.lblHeading.Location = New System.Drawing.Point(96, 60)
        Me.lblHeading.Name = "lblHeading"
        Me.lblHeading.Size = New System.Drawing.Size(343, 29)
        Me.lblHeading.TabIndex = 5
        Me.lblHeading.Text = "Theta KeyVault Manager"
        '
        'Label4
        '
        Me.Label4.AutoSize = True
        Me.Label4.Font = New System.Drawing.Font("Consolas", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label4.ForeColor = System.Drawing.Color.Gray
        Me.Label4.Location = New System.Drawing.Point(413, 220)
        Me.Label4.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label4.Name = "Label4"
        Me.Label4.Size = New System.Drawing.Size(115, 13)
        Me.Label4.TabIndex = 8
        Me.Label4.Text = "THETAKVM v1.0 HE22"
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
        Me.panFind.TabIndex = 10
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
        'panelStatus
        '
        Me.panelStatus.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.panelStatus.Controls.Add(Me.ledRight)
        Me.panelStatus.Controls.Add(Me.lblFooterMsg)
        Me.panelStatus.Dock = System.Windows.Forms.DockStyle.Bottom
        Me.panelStatus.Location = New System.Drawing.Point(0, 233)
        Me.panelStatus.Name = "panelStatus"
        Me.panelStatus.Size = New System.Drawing.Size(529, 29)
        Me.panelStatus.TabIndex = 11
        '
        'ledRight
        '
        Me.ledRight.AutoSize = True
        Me.ledRight.Dock = System.Windows.Forms.DockStyle.Right
        Me.ledRight.Font = New System.Drawing.Font("Microsoft Sans Serif", 15.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ledRight.ForeColor = System.Drawing.Color.FromArgb(CType(CType(128, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.ledRight.Location = New System.Drawing.Point(511, 0)
        Me.ledRight.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.ledRight.Name = "ledRight"
        Me.ledRight.Size = New System.Drawing.Size(18, 25)
        Me.ledRight.TabIndex = 25
        Me.ledRight.Text = "/"
        Me.ledRight.Visible = False
        '
        'lblFooterMsg
        '
        Me.lblFooterMsg.Dock = System.Windows.Forms.DockStyle.Fill
        Me.lblFooterMsg.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblFooterMsg.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.lblFooterMsg.Location = New System.Drawing.Point(0, 0)
        Me.lblFooterMsg.Name = "lblFooterMsg"
        Me.lblFooterMsg.Size = New System.Drawing.Size(529, 29)
        Me.lblFooterMsg.TabIndex = 0
        Me.lblFooterMsg.Text = "**** SUPERUSER PASSWORD DISABLED ***"
        Me.lblFooterMsg.TextAlign = System.Drawing.ContentAlignment.MiddleCenter
        '
        'chkRememberUntilClose
        '
        Me.chkRememberUntilClose.AutoSize = True
        Me.chkRememberUntilClose.Checked = True
        Me.chkRememberUntilClose.CheckState = System.Windows.Forms.CheckState.Checked
        Me.chkRememberUntilClose.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.chkRememberUntilClose.FlatAppearance.CheckedBackColor = System.Drawing.Color.Cyan
        Me.chkRememberUntilClose.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.chkRememberUntilClose.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.chkRememberUntilClose.ForeColor = System.Drawing.Color.Gray
        Me.chkRememberUntilClose.Location = New System.Drawing.Point(175, 196)
        Me.chkRememberUntilClose.Name = "chkRememberUntilClose"
        Me.chkRememberUntilClose.Size = New System.Drawing.Size(183, 20)
        Me.chkRememberUntilClose.TabIndex = 16
        Me.chkRememberUntilClose.Text = "Remember for this session"
        Me.chkRememberUntilClose.UseVisualStyleBackColor = False
        Me.chkRememberUntilClose.Visible = False
        '
        'lblLoginMessage
        '
        Me.lblLoginMessage.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblLoginMessage.ForeColor = System.Drawing.Color.Gray
        Me.lblLoginMessage.Location = New System.Drawing.Point(2, 191)
        Me.lblLoginMessage.Name = "lblLoginMessage"
        Me.lblLoginMessage.Size = New System.Drawing.Size(529, 29)
        Me.lblLoginMessage.TabIndex = 12
        Me.lblLoginMessage.Text = "...Click LOGIN to Continue..."
        Me.lblLoginMessage.TextAlign = System.Drawing.ContentAlignment.MiddleCenter
        Me.lblLoginMessage.Visible = False
        '
        'PictureBox1
        '
        Me.PictureBox1.Image = Global.WalletManager.My.Resources.Resources.theta_logo_33_32_32
        Me.PictureBox1.Location = New System.Drawing.Point(-79, 49)
        Me.PictureBox1.Name = "PictureBox1"
        Me.PictureBox1.Size = New System.Drawing.Size(160, 153)
        Me.PictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage
        Me.PictureBox1.TabIndex = 13
        Me.PictureBox1.TabStop = False
        '
        'PictureBox2
        '
        Me.PictureBox2.Image = Global.WalletManager.My.Resources.Resources.theta_logo_33_32_32
        Me.PictureBox2.Location = New System.Drawing.Point(448, 49)
        Me.PictureBox2.Name = "PictureBox2"
        Me.PictureBox2.Size = New System.Drawing.Size(160, 153)
        Me.PictureBox2.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage
        Me.PictureBox2.TabIndex = 14
        Me.PictureBox2.TabStop = False
        '
        'Label2
        '
        Me.Label2.AutoSize = True
        Me.Label2.Font = New System.Drawing.Font("Consolas", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label2.ForeColor = System.Drawing.Color.Gray
        Me.Label2.Location = New System.Drawing.Point(1, 220)
        Me.Label2.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(97, 13)
        Me.Label2.TabIndex = 15
        Me.Label2.Text = "OFFLINE EDITION"
        '
        'frmLogin
        '
        Me.AcceptButton = Me.btnLogin
        Me.AutoScaleDimensions = New System.Drawing.SizeF(9.0!, 18.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.CancelButton = Me.btnClose
        Me.ClientSize = New System.Drawing.Size(529, 262)
        Me.Controls.Add(Me.chkRememberUntilClose)
        Me.Controls.Add(Me.Label2)
        Me.Controls.Add(Me.PictureBox2)
        Me.Controls.Add(Me.PictureBox1)
        Me.Controls.Add(Me.panelStatus)
        Me.Controls.Add(Me.Label4)
        Me.Controls.Add(Me.panFind)
        Me.Controls.Add(Me.lblHeading)
        Me.Controls.Add(Me.btnLogin)
        Me.Controls.Add(Me.lblSUPass)
        Me.Controls.Add(Me.txtSUpassword)
        Me.Controls.Add(Me.lblLoginMessage)
        Me.DoubleBuffered = True
        Me.Font = New System.Drawing.Font("Microsoft Sans Serif", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ForeColor = System.Drawing.Color.FromArgb(CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer))
        Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None
        Me.Icon = CType(resources.GetObject("$this.Icon"), System.Drawing.Icon)
        Me.Margin = New System.Windows.Forms.Padding(4)
        Me.Name = "frmLogin"
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
        Me.Text = "ThetaKeys - Login"
        Me.TopMost = True
        Me.panFind.ResumeLayout(False)
        Me.panFind.PerformLayout()
        Me.panelStatus.ResumeLayout(False)
        Me.panelStatus.PerformLayout()
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.PictureBox2, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub
    Friend WithEvents txtSUpassword As TextBox
    Friend WithEvents ledLeft As Label
    Friend WithEvents lblSUPass As Label
    Friend WithEvents btnLogin As Button
    Friend WithEvents lblHeading As Label
    Friend WithEvents Label4 As Label
    Friend WithEvents btnClose As Button
    Friend WithEvents panFind As Panel
    Friend WithEvents Button1 As Button
    Friend WithEvents panelStatus As Panel
    Friend WithEvents lblFooterMsg As Label
    Friend WithEvents ledRight As Label
    Friend WithEvents lblLoginMessage As Label
    Friend WithEvents PictureBox1 As PictureBox
    Friend WithEvents PictureBox2 As PictureBox
    Friend WithEvents Label2 As Label
    Friend WithEvents chkRememberUntilClose As CheckBox
End Class
