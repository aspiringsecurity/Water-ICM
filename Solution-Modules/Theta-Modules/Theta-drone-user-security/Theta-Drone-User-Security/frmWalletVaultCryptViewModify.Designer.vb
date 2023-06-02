<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
Partial Class frmWalletVaultCryptViewModify
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
        Me.panFind = New System.Windows.Forms.Panel()
        Me.lblWalletName = New System.Windows.Forms.Label()
        Me.btnExpand = New System.Windows.Forms.Button()
        Me.btnClose = New System.Windows.Forms.Button()
        Me.btnSave = New System.Windows.Forms.Button()
        Me.txtDataBox = New System.Windows.Forms.TextBox()
        Me.lblDataBoxTitle = New System.Windows.Forms.Label()
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.lblFooterMsg = New System.Windows.Forms.Label()
        Me.Button2 = New System.Windows.Forms.Button()
        Me.panFind.SuspendLayout()
        Me.Panel1.SuspendLayout()
        Me.SuspendLayout()
        '
        'panFind
        '
        Me.panFind.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.panFind.Controls.Add(Me.lblWalletName)
        Me.panFind.Controls.Add(Me.btnExpand)
        Me.panFind.Controls.Add(Me.btnClose)
        Me.panFind.Dock = System.Windows.Forms.DockStyle.Top
        Me.panFind.Location = New System.Drawing.Point(0, 0)
        Me.panFind.Name = "panFind"
        Me.panFind.Size = New System.Drawing.Size(483, 29)
        Me.panFind.TabIndex = 64
        '
        'lblWalletName
        '
        Me.lblWalletName.AutoSize = True
        Me.lblWalletName.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblWalletName.ForeColor = System.Drawing.Color.Silver
        Me.lblWalletName.Location = New System.Drawing.Point(8, 7)
        Me.lblWalletName.Name = "lblWalletName"
        Me.lblWalletName.Size = New System.Drawing.Size(83, 15)
        Me.lblWalletName.TabIndex = 64
        Me.lblWalletName.Text = "VAULTCRYPT"
        Me.lblWalletName.TextAlign = System.Drawing.ContentAlignment.MiddleLeft
        '
        'btnExpand
        '
        Me.btnExpand.DialogResult = System.Windows.Forms.DialogResult.Cancel
        Me.btnExpand.Dock = System.Windows.Forms.DockStyle.Right
        Me.btnExpand.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        Me.btnExpand.FlatAppearance.BorderSize = 0
        Me.btnExpand.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(92, Byte), Integer), CType(CType(189, Byte), Integer), CType(CType(209, Byte), Integer))
        Me.btnExpand.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Maroon
        Me.btnExpand.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnExpand.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnExpand.ForeColor = System.Drawing.Color.Silver
        Me.btnExpand.Location = New System.Drawing.Point(423, 0)
        Me.btnExpand.Margin = New System.Windows.Forms.Padding(4)
        Me.btnExpand.Name = "btnExpand"
        Me.btnExpand.Size = New System.Drawing.Size(30, 29)
        Me.btnExpand.TabIndex = 44
        Me.btnExpand.Text = "[-]"
        Me.btnExpand.UseVisualStyleBackColor = True
        '
        'btnClose
        '
        Me.btnClose.DialogResult = System.Windows.Forms.DialogResult.Cancel
        Me.btnClose.Dock = System.Windows.Forms.DockStyle.Right
        Me.btnClose.FlatAppearance.BorderColor = System.Drawing.Color.Crimson
        Me.btnClose.FlatAppearance.BorderSize = 0
        Me.btnClose.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Crimson
        Me.btnClose.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Maroon
        Me.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnClose.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnClose.ForeColor = System.Drawing.Color.Silver
        Me.btnClose.Location = New System.Drawing.Point(453, 0)
        Me.btnClose.Margin = New System.Windows.Forms.Padding(4)
        Me.btnClose.Name = "btnClose"
        Me.btnClose.Size = New System.Drawing.Size(30, 29)
        Me.btnClose.TabIndex = 24
        Me.btnClose.Text = "X"
        Me.btnClose.UseVisualStyleBackColor = True
        '
        'btnSave
        '
        Me.btnSave.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnSave.Cursor = System.Windows.Forms.Cursors.Hand
        Me.btnSave.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnSave.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnSave.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnSave.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnSave.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnSave.ForeColor = System.Drawing.Color.DarkGray
        Me.btnSave.Location = New System.Drawing.Point(401, 204)
        Me.btnSave.Margin = New System.Windows.Forms.Padding(4)
        Me.btnSave.Name = "btnSave"
        Me.btnSave.Size = New System.Drawing.Size(57, 28)
        Me.btnSave.TabIndex = 67
        Me.btnSave.Text = "Save"
        Me.btnSave.UseVisualStyleBackColor = False
        Me.btnSave.Visible = False
        '
        'txtDataBox
        '
        Me.txtDataBox.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.txtDataBox.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.txtDataBox.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtDataBox.ForeColor = System.Drawing.Color.Aqua
        Me.txtDataBox.Location = New System.Drawing.Point(22, 66)
        Me.txtDataBox.Multiline = True
        Me.txtDataBox.Name = "txtDataBox"
        Me.txtDataBox.PasswordChar = Global.Microsoft.VisualBasic.ChrW(42)
        Me.txtDataBox.Size = New System.Drawing.Size(437, 167)
        Me.txtDataBox.TabIndex = 66
        '
        'lblDataBoxTitle
        '
        Me.lblDataBoxTitle.AutoSize = True
        Me.lblDataBoxTitle.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblDataBoxTitle.ForeColor = System.Drawing.Color.Gray
        Me.lblDataBoxTitle.Location = New System.Drawing.Point(19, 48)
        Me.lblDataBoxTitle.Name = "lblDataBoxTitle"
        Me.lblDataBoxTitle.Size = New System.Drawing.Size(94, 15)
        Me.lblDataBoxTitle.TabIndex = 65
        Me.lblDataBoxTitle.Text = "DATABOXTITLE"
        Me.lblDataBoxTitle.TextAlign = System.Drawing.ContentAlignment.MiddleRight
        '
        'Panel1
        '
        Me.Panel1.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.Panel1.Controls.Add(Me.lblFooterMsg)
        Me.Panel1.Controls.Add(Me.Button2)
        Me.Panel1.Dock = System.Windows.Forms.DockStyle.Bottom
        Me.Panel1.Location = New System.Drawing.Point(0, 260)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(483, 29)
        Me.Panel1.TabIndex = 68
        '
        'lblFooterMsg
        '
        Me.lblFooterMsg.Dock = System.Windows.Forms.DockStyle.Fill
        Me.lblFooterMsg.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblFooterMsg.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.lblFooterMsg.Location = New System.Drawing.Point(0, 0)
        Me.lblFooterMsg.Name = "lblFooterMsg"
        Me.lblFooterMsg.Size = New System.Drawing.Size(483, 29)
        Me.lblFooterMsg.TabIndex = 64
        Me.lblFooterMsg.TextAlign = System.Drawing.ContentAlignment.MiddleCenter
        '
        'Button2
        '
        Me.Button2.FlatAppearance.BorderColor = System.Drawing.Color.Crimson
        Me.Button2.FlatAppearance.BorderSize = 0
        Me.Button2.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Crimson
        Me.Button2.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Maroon
        Me.Button2.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.Button2.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Button2.ForeColor = System.Drawing.Color.Silver
        Me.Button2.Location = New System.Drawing.Point(744, 1)
        Me.Button2.Margin = New System.Windows.Forms.Padding(4)
        Me.Button2.Name = "Button2"
        Me.Button2.Size = New System.Drawing.Size(30, 26)
        Me.Button2.TabIndex = 24
        Me.Button2.Text = "X"
        Me.Button2.UseVisualStyleBackColor = True
        '
        'frmWalletVaultCryptViewModify
        '
        Me.AcceptButton = Me.btnSave
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.None
        Me.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.CancelButton = Me.btnClose
        Me.ClientSize = New System.Drawing.Size(483, 289)
        Me.Controls.Add(Me.Panel1)
        Me.Controls.Add(Me.panFind)
        Me.Controls.Add(Me.btnSave)
        Me.Controls.Add(Me.txtDataBox)
        Me.Controls.Add(Me.lblDataBoxTitle)
        Me.DoubleBuffered = True
        Me.ForeColor = System.Drawing.Color.WhiteSmoke
        Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None
        Me.MaximizeBox = False
        Me.Name = "frmWalletVaultCryptViewModify"
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
        Me.Text = "VaultCrypt"
        Me.TopMost = True
        Me.panFind.ResumeLayout(False)
        Me.panFind.PerformLayout()
        Me.Panel1.ResumeLayout(False)
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents panFind As Panel
    Friend WithEvents btnExpand As Button
    Friend WithEvents btnClose As Button
    Friend WithEvents btnSave As Button
    Friend WithEvents txtDataBox As TextBox
    Friend WithEvents lblDataBoxTitle As Label
    Friend WithEvents Panel1 As Panel
    Friend WithEvents Button2 As Button
    Friend WithEvents lblWalletName As Label
    Friend WithEvents lblFooterMsg As Label
End Class
