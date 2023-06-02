<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class frmWalletKeystore
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
        Me.panelStatus = New System.Windows.Forms.Panel()
        Me.lblFooterMsg = New System.Windows.Forms.Label()
        Me.panFind = New System.Windows.Forms.Panel()
        Me.lblWalletName = New System.Windows.Forms.Label()
        Me.btnExpand = New System.Windows.Forms.Button()
        Me.btnClose = New System.Windows.Forms.Button()
        Me.btnKeystoreExport = New System.Windows.Forms.Button()
        Me.lblDataBoxTitle = New System.Windows.Forms.Label()
        Me.btnEditBox = New System.Windows.Forms.Button()
        Me.btnCopyBox = New System.Windows.Forms.Button()
        Me.btnViewBox = New System.Windows.Forms.Button()
        Me.txtDataBox = New System.Windows.Forms.TextBox()
        Me.btnSave = New System.Windows.Forms.Button()
        Me.btnExport = New System.Windows.Forms.Button()
        Me.ExportFileDialog1 = New System.Windows.Forms.SaveFileDialog()
        Me.panelStatus.SuspendLayout()
        Me.panFind.SuspendLayout()
        Me.SuspendLayout()
        '
        'panelStatus
        '
        Me.panelStatus.BackColor = System.Drawing.Color.FromArgb(CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer), CType(CType(42, Byte), Integer))
        Me.panelStatus.Controls.Add(Me.lblFooterMsg)
        Me.panelStatus.Dock = System.Windows.Forms.DockStyle.Bottom
        Me.panelStatus.Location = New System.Drawing.Point(0, 319)
        Me.panelStatus.Name = "panelStatus"
        Me.panelStatus.Size = New System.Drawing.Size(484, 25)
        Me.panelStatus.TabIndex = 37
        '
        'lblFooterMsg
        '
        Me.lblFooterMsg.Dock = System.Windows.Forms.DockStyle.Fill
        Me.lblFooterMsg.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblFooterMsg.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.lblFooterMsg.Location = New System.Drawing.Point(0, 0)
        Me.lblFooterMsg.Name = "lblFooterMsg"
        Me.lblFooterMsg.Size = New System.Drawing.Size(484, 25)
        Me.lblFooterMsg.TabIndex = 63
        Me.lblFooterMsg.TextAlign = System.Drawing.ContentAlignment.MiddleCenter
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
        Me.panFind.Size = New System.Drawing.Size(484, 29)
        Me.panFind.TabIndex = 38
        '
        'lblWalletName
        '
        Me.lblWalletName.AutoSize = True
        Me.lblWalletName.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblWalletName.ForeColor = System.Drawing.Color.Silver
        Me.lblWalletName.Location = New System.Drawing.Point(7, 6)
        Me.lblWalletName.Name = "lblWalletName"
        Me.lblWalletName.Size = New System.Drawing.Size(54, 15)
        Me.lblWalletName.TabIndex = 63
        Me.lblWalletName.Text = "WALLET"
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
        Me.btnExpand.Location = New System.Drawing.Point(424, 0)
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
        Me.btnClose.Location = New System.Drawing.Point(454, 0)
        Me.btnClose.Margin = New System.Windows.Forms.Padding(4)
        Me.btnClose.Name = "btnClose"
        Me.btnClose.Size = New System.Drawing.Size(30, 29)
        Me.btnClose.TabIndex = 24
        Me.btnClose.Text = "X"
        Me.btnClose.UseVisualStyleBackColor = True
        '
        'btnKeystoreExport
        '
        Me.btnKeystoreExport.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnKeystoreExport.Cursor = System.Windows.Forms.Cursors.Hand
        Me.btnKeystoreExport.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnKeystoreExport.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnKeystoreExport.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnKeystoreExport.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnKeystoreExport.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnKeystoreExport.ForeColor = System.Drawing.Color.DarkGray
        Me.btnKeystoreExport.Location = New System.Drawing.Point(401, 252)
        Me.btnKeystoreExport.Margin = New System.Windows.Forms.Padding(4)
        Me.btnKeystoreExport.Name = "btnKeystoreExport"
        Me.btnKeystoreExport.Size = New System.Drawing.Size(57, 28)
        Me.btnKeystoreExport.TabIndex = 41
        Me.btnKeystoreExport.Text = "Export"
        Me.btnKeystoreExport.UseVisualStyleBackColor = False
        Me.btnKeystoreExport.Visible = False
        '
        'lblDataBoxTitle
        '
        Me.lblDataBoxTitle.AutoSize = True
        Me.lblDataBoxTitle.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblDataBoxTitle.ForeColor = System.Drawing.Color.Gray
        Me.lblDataBoxTitle.Location = New System.Drawing.Point(19, 48)
        Me.lblDataBoxTitle.Name = "lblDataBoxTitle"
        Me.lblDataBoxTitle.Size = New System.Drawing.Size(71, 15)
        Me.lblDataBoxTitle.TabIndex = 55
        Me.lblDataBoxTitle.Text = "KEYSTORE"
        Me.lblDataBoxTitle.TextAlign = System.Drawing.ContentAlignment.MiddleRight
        '
        'btnEditBox
        '
        Me.btnEditBox.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnEditBox.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnEditBox.FlatAppearance.BorderSize = 0
        Me.btnEditBox.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnEditBox.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnEditBox.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnEditBox.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnEditBox.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnEditBox.Location = New System.Drawing.Point(426, 288)
        Me.btnEditBox.Margin = New System.Windows.Forms.Padding(4)
        Me.btnEditBox.Name = "btnEditBox"
        Me.btnEditBox.Size = New System.Drawing.Size(34, 27)
        Me.btnEditBox.TabIndex = 60
        Me.btnEditBox.Text = "!"
        Me.btnEditBox.UseVisualStyleBackColor = False
        Me.btnEditBox.Visible = False
        '
        'btnCopyBox
        '
        Me.btnCopyBox.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnCopyBox.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnCopyBox.FlatAppearance.BorderSize = 0
        Me.btnCopyBox.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnCopyBox.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnCopyBox.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnCopyBox.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnCopyBox.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnCopyBox.Location = New System.Drawing.Point(356, 288)
        Me.btnCopyBox.Margin = New System.Windows.Forms.Padding(4)
        Me.btnCopyBox.Name = "btnCopyBox"
        Me.btnCopyBox.Size = New System.Drawing.Size(34, 27)
        Me.btnCopyBox.TabIndex = 58
        Me.btnCopyBox.Text = "2"
        Me.btnCopyBox.UseVisualStyleBackColor = False
        Me.btnCopyBox.Visible = False
        '
        'btnViewBox
        '
        Me.btnViewBox.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.btnViewBox.FlatAppearance.BorderColor = System.Drawing.Color.DimGray
        Me.btnViewBox.FlatAppearance.BorderSize = 0
        Me.btnViewBox.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnViewBox.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnViewBox.Font = New System.Drawing.Font("Wingdings 2", 11.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.btnViewBox.ForeColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(128, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.btnViewBox.Location = New System.Drawing.Point(391, 288)
        Me.btnViewBox.Margin = New System.Windows.Forms.Padding(4)
        Me.btnViewBox.Name = "btnViewBox"
        Me.btnViewBox.Size = New System.Drawing.Size(34, 27)
        Me.btnViewBox.TabIndex = 59
        Me.btnViewBox.Text = "8"
        Me.btnViewBox.UseVisualStyleBackColor = False
        Me.btnViewBox.Visible = False
        '
        'txtDataBox
        '
        Me.txtDataBox.BackColor = System.Drawing.Color.FromArgb(CType(CType(55, Byte), Integer), CType(CType(57, Byte), Integer), CType(CType(62, Byte), Integer))
        Me.txtDataBox.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.txtDataBox.ForeColor = System.Drawing.Color.Aqua
        Me.txtDataBox.Location = New System.Drawing.Point(22, 66)
        Me.txtDataBox.Multiline = True
        Me.txtDataBox.Name = "txtDataBox"
        Me.txtDataBox.PasswordChar = Global.Microsoft.VisualBasic.ChrW(42)
        Me.txtDataBox.Size = New System.Drawing.Size(437, 215)
        Me.txtDataBox.TabIndex = 61
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
        Me.btnSave.Location = New System.Drawing.Point(404, 252)
        Me.btnSave.Margin = New System.Windows.Forms.Padding(4)
        Me.btnSave.Name = "btnSave"
        Me.btnSave.Size = New System.Drawing.Size(53, 28)
        Me.btnSave.TabIndex = 62
        Me.btnSave.Text = "SAVE"
        Me.btnSave.UseVisualStyleBackColor = False
        Me.btnSave.Visible = False
        '
        'btnExport
        '
        Me.btnExport.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnExport.Cursor = System.Windows.Forms.Cursors.Hand
        Me.btnExport.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnExport.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnExport.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.btnExport.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnExport.Font = New System.Drawing.Font("Microsoft Sans Serif", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnExport.ForeColor = System.Drawing.Color.Gray
        Me.btnExport.Location = New System.Drawing.Point(206, 288)
        Me.btnExport.Margin = New System.Windows.Forms.Padding(4)
        Me.btnExport.Name = "btnExport"
        Me.btnExport.Size = New System.Drawing.Size(68, 22)
        Me.btnExport.TabIndex = 63
        Me.btnExport.Text = "EXPORT"
        Me.btnExport.UseVisualStyleBackColor = False
        Me.btnExport.Visible = False
        '
        'ExportFileDialog1
        '
        Me.ExportFileDialog1.Filter = """Keystore files|*.keystore|All files|*.*"
        Me.ExportFileDialog1.RestoreDirectory = True
        '
        'frmWalletKeystore
        '
        Me.AcceptButton = Me.btnSave
        Me.AutoScaleDimensions = New System.Drawing.SizeF(8.0!, 16.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.BackColor = System.Drawing.Color.FromArgb(CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer), CType(CType(32, Byte), Integer))
        Me.CancelButton = Me.btnClose
        Me.ClientSize = New System.Drawing.Size(484, 344)
        Me.Controls.Add(Me.btnSave)
        Me.Controls.Add(Me.btnKeystoreExport)
        Me.Controls.Add(Me.txtDataBox)
        Me.Controls.Add(Me.btnEditBox)
        Me.Controls.Add(Me.btnCopyBox)
        Me.Controls.Add(Me.btnViewBox)
        Me.Controls.Add(Me.lblDataBoxTitle)
        Me.Controls.Add(Me.panFind)
        Me.Controls.Add(Me.panelStatus)
        Me.Controls.Add(Me.btnExport)
        Me.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ForeColor = System.Drawing.Color.FromArgb(CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer), CType(CType(224, Byte), Integer))
        Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None
        Me.Margin = New System.Windows.Forms.Padding(4)
        Me.MaximizeBox = False
        Me.Name = "frmWalletKeystore"
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
        Me.Text = "Keystore"
        Me.TopMost = True
        Me.panelStatus.ResumeLayout(False)
        Me.panFind.ResumeLayout(False)
        Me.panFind.PerformLayout()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents panelStatus As Panel
    Friend WithEvents panFind As Panel
    Friend WithEvents btnExpand As Button
    Friend WithEvents btnClose As Button
    Friend WithEvents btnKeystoreExport As Button
    Friend WithEvents lblDataBoxTitle As Label
    Friend WithEvents btnEditBox As Button
    Friend WithEvents btnCopyBox As Button
    Friend WithEvents btnViewBox As Button
    Friend WithEvents txtDataBox As TextBox
    Friend WithEvents btnSave As Button
    Friend WithEvents lblFooterMsg As Label
    Friend WithEvents lblWalletName As Label
    Friend WithEvents btnExport As Button
    Friend WithEvents ExportFileDialog1 As SaveFileDialog
End Class
