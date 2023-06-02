Imports System.Security.Cryptography
Imports System.Text
Imports System.IO


Public Class Wallet
    Public Property unique_id As Integer
    Public Property visible As Integer
    Public Property parent_id  as Integer
    Public Property order_id As Integer
    Public Property parent_name  As String
    Public Property description As String
    Public Property encrypted_kb  as Integer
    Public Property encrypted_pk As Integer
    Public Property keystore  As String
    Public Property keystore_pass  As String
    Public Property mnemonic  As String
    Public Property private_key As String
    Public Property feature_tags As String
End Class



Public Class GlobalVars

    Public Shared SALT_GRAMS As Integer = 16 'Used for entropy of the VaultCrypt password, you may set this as high as 32.  If you change the value of SALT_GRAMS, you will need to change it for every version going forward.

    Public Shared ENCRYPT_HEADER As String = "div9e5ntye857ryt84ugewtu94tywy5g489vyte8yrv98t7y68w879tenvweyyvtb98byeg78e"
    'Keep in mind, while unlikely, a hacker may still be able to descript your superuser password because the hash is stored 
    'in your keyvault.  This is primarily to keep "average-joe-user" out. 
    'if you change the value of ENCRYPT_HEADER, you will need To change it For every version released going forward.

    Public Shared ENCRYPT_FOOTER As String = "w5984noty777h5gbiortuysy87hogruyt7t9t8ehur9t8royesntu9o8"
    'if you change the value of ENCRYPT_FOOTER, you will need To change it For every version released going forward.

    Public Shared SU_PASSWORD_TEMP As String = ""
    Public Shared SU_PASSWORD_REMEMBER As Integer = 0

    Public Shared KEYVAULT_MODIFIED As Integer = 0

    Public Shared ADD As Integer = 8
    Public Shared EDIT As Integer = 16
    Public Shared MODIFY As Integer = 16
    Public Shared DELETE As Integer = 32

    Public Shared COLKEYPASS As Integer = 13
    Public Shared COLMNEMONIC As Integer = 14
    Public Shared COLPRIVATEKEY As Integer = 15

    Public Shared MODECOPY As Integer = 64
    Public Shared MODEVIEW As Integer = 128
    Public Shared MODEEDIT As Integer = 256

    Public Shared WALLET_MODE As Integer = ADD
    Public Shared SELECTED_WALLET_ID As Integer = -1
    Public Shared SELECTED_WALLET_NAME As String = ""
    Public Shared SELECTED_WALLET_ADDRESS As String = ""

    'vault vars
    Public Shared VAULT_version = 0
    Public Shared VAULT_backward_compatibility_version = 0
    Public Shared VAULT_su_encryption = 0
    Public Shared VAULT_su_hash = ""
    Public Shared VAULT_pk_encryption = 0
    Public Shared VAULT_pk_validation = ""
    Public Shared VAULT_keybase_cnt = 0
    Public Shared VAULT_wallet_cnt = 0

    Public Shared jsonFile As String = "{}"
    Public Shared vaultData = Newtonsoft.Json.Linq.JObject.Parse(jsonFile)

    'feature tags
    Public Shared WEB_WALLET As String = "🌐 "
    Public Shared MOBILE_APP As String = "📱 "
    Public Shared KEYSTORE As String = "🔑 "
    Public Shared KEYPASS As String = "🔐 "
    Public Shared MNEMONIC As String = "🔏 "
    Public Shared PRIVATE_KEY As String = "🔓 "

    Public Shared STAKE_GUARDIAN As String = "g "
    Public Shared STAKE_ELITEEDGE As String = "e "
    Public Shared STAKE_TDROP As String = "d "
    Public Shared STAKE_VALIDATOR As String = "v "

    Public Shared LIQUIDITY_POOL As String = "♻ "
    Public Shared THETA_DROP As String = "💧 "
    Public Shared THETA_SWAP As String = "s "

    '3rd party support
    Public Shared LEDGER As String = "[L] "
    Public Shared TREZOR As String = "[T] "

    Public Shared METAMASK As String = "🦊 "
    Public Shared OPENTHETA As String = "Θ "
    Public Shared TNS_DOMAIN As String = "🚰 "
    Public Shared TBILL As String = "💰 "

    Public Shared FAVORITE As String = "❤ "

    Public Shared strKeyVaultLocation As String = My.Application.Info.DirectoryPath & "\mykeys.keyvault"

    Public Shared strKeyVaultTEMPLATE As String = "{
    ""version"":1,
    ""backward_compatibility_version"":1,
    ""su_encryption"":0,
    ""su_hash"":"""",
    ""pk_encryption"":0,
    ""pk_validation"":"""",
    ""keybase_cnt"":1,
    ""wallet_cnt"":0,
""about"": {
    ""parent_app"": ""thetanms2"",
    ""app_name"": ""ThetaKVM v1.0 - Theta KeyVault Manager"",
    ""support"": ""thetanms@fuelfoundry.io"",
    ""url"": ""https://fuelfoundry.io/thetanms"",
    ""format"": ""unique_id, visible, parent_id, parent_name, description, keystore, encrypted_mnemonic, feature_tags""
},
""keybases"": {
    ""keybase0"":""RESERVED"",
    ""keybase1"":""RESERVED"",
    ""keybase2"":""KeyBase"",
   ""keybase3"":""KeyBase002"",
    ""keybase4"":""KeyBase003"",
    ""keybase5"":""KeyBase004"",
    ""keybase6"":""KeyBase005"",
    ""keybase7"":""KeyBase006"",
    ""keybase8"":""KeyBase007"",
    ""keybase9"":""KeyBase008""
},
""wallets"": {
    },
    ""eof"":1
}
"
    Public Shared strWalletTEMPLATE As String = """wallet0"": {
        ""unique_id"":0,
        ""parent_id"":2,
        ""order_id"":0,
        ""description"":""Wallet #1"",
        ""address"":""0xD7095837502758164869267047693759261859E11B"",
        ""keystore"":"""",
        ""keystore_pass"":"""",
        ""mnemonic"":"""",
        ""private_key"":"""",
        ""feature_tags"":""🌐 📱 🔑 🔐 🔐 🔓 ♻ 💧 🦊 Θ 🚰 ❤"",
        ""visible"":1
    },"


End Class

Public Class GlobalFunctions

    Shared Function PKValidationHash(rawPKpass As String)

        'take a portion of the SU hash (add salt based on SU password), append the VC hash, generate a new hash from the combined and delete the last half of the newly generated hash so there is no stored password, this is only used for validation
        Return SHA.GenerateSHA512String(GlobalVars.VAULT_su_hash.ToString.Substring(0, GlobalVars.SALT_GRAMS) + SHA.GenerateSHA512String(rawPKpass)).Substring(0, 64)

    End Function

    Shared Function PKValidatePassword(rawPKpass As String) As Boolean

        Dim toBeValidatedHash = SHA.GenerateSHA512String(GlobalVars.VAULT_su_hash.ToString.Substring(0, GlobalVars.SALT_GRAMS) + SHA.GenerateSHA512String(rawPKpass)).Substring(0, 64)

        If toBeValidatedHash = GlobalVars.VAULT_pk_validation Then
            'success
            Return True
        Else
            'validation failed
            Return False
        End If

    End Function

    Shared Function PKEncrypt(rawPKpass As String, cipherText As String)

        Return Encode(rawPKpass, cipherText)

    End Function

    Shared Function PKDecrypt(rawPKpass As String, cipherText As String)

        Return Decode(rawPKpass, cipherText)

    End Function


    Shared Function WriteKeyVaultToFile()

        If frmMain.dgvWallets.Rows.Count = 0 Then
            MsgBox("Nothing to save, click Ok to continue...", vbOK, "ThetaKVM")
            Exit Function
        End If


        Using writer As New System.IO.StreamWriter(GlobalVars.strKeyVaultLocation)
            writer.WriteLine("{")
            writer.WriteLine("""version"":" & GlobalVars.VAULT_version & ",")
            writer.WriteLine("""backward_compatibility_version"":" & GlobalVars.VAULT_backward_compatibility_version & ",")
            writer.WriteLine("""su_encryption"":" & GlobalVars.VAULT_su_encryption & ",")
            writer.WriteLine("""su_hash"":""" & GlobalVars.VAULT_su_hash & """,")
            writer.WriteLine("""pk_encryption"":" & GlobalVars.VAULT_pk_encryption & ",")
            writer.WriteLine("""pk_validation"":""" & GlobalVars.VAULT_pk_validation & """,")
            writer.WriteLine("""keybase_cnt"":" & GlobalVars.VAULT_keybase_cnt & ",")
            writer.WriteLine("""wallet_cnt"":" & frmMain.dgvWallets.rows.Count & ",")
            writer.WriteLine("""keybases"": {")
            writer.WriteLine("  ""keybase2"":""KeyBase""")
            writer.WriteLine("  },")

            writer.WriteLine("""wallets"": {")



            'for loop start

            Dim intWalletNum As Integer = 0
            Dim wallet_array as string = ""

            For Each row As DataGridViewRow In frmMain.dgvWallets.Rows

                'visible grid vars
                Dim unique_id As String = intWalletNum 'row.Cells.Item(0).Value
                Dim parent_id As Integer = row.Cells.Item(1).Value
                Dim order_id As Integer = row.Cells.Item(2).Value
                Dim description As String = row.Cells.Item(4).Value
                Dim address As String = row.Cells.Item(5).Value
                Dim feature_tags As String = row.Cells.Item(10).Value

                'hidden grid vars
                Dim keystore As String = row.Cells.Item(12).Value

                Dim encrypted_keypass As String = row.Cells.Item(13).Value
                Dim encrypted_mnemonic As String = row.Cells.Item(14).Value
                Dim encrypted_private_key As String = row.Cells.Item(15).Value

                Dim encrypted_keystore As String = row.Cells.Item(12).Value


                wallet_array += """wallet" & unique_id & """: {
        ""unique_id"":" & unique_id & ",
        ""parent_id"": " & parent_id & ",
        ""order_id"":" & order_id & ",
        ""description"":""" & description & """,
        ""address"":""" & address & """,
        ""keystore"":""" & encrypted_keystore & """, 
        ""keypass"":""" & encrypted_keypass & """,
        ""mnemonic"":""" & encrypted_mnemonic & """,
        ""private_key"":""" & encrypted_private_key & """,
        ""feature_tags"":""" & feature_tags & """,
        ""visible"":1
    },
"

                '""🌐 📱 🔑 🔐 🔐 🔓 ♻ 💧 🦊 Θ 🚰 ❤"",
                intWalletNum += 1
            Next

            writer.Write(wallet_array)


            'for loop end
            writer.WriteLine("""eow"":1 ")
            writer.WriteLine("},")
            writer.WriteLine("""eof"":1 ")
            writer.WriteLine("} ")

            'for each row on dsgvWallets do...
            '"unique_id":0,

            writer.Close()
        End Using
        'SAVE KEYVAULT


        GlobalVars.KEYVAULT_MODIFIED = 0
    End Function


    Shared Function Encode(password As String, plainText As String)

        Dim wrapper As New Simple3Des(password)
        Dim cipherText As String = wrapper.EncryptData(plainText)

        Return cipherText
    End Function

    ' write what-if routines 
    Shared Function Decode(password As String, cipherText As String)

        Dim wrapper As New Simple3Des(password)
        Dim plainText As String = ""

        ' DecryptData throws if the wrong password is used.
        Try
            plainText = wrapper.DecryptData(cipherText)

        Catch ex As System.Security.Cryptography.CryptographicException
            MsgBox("The data could not be decrypted with the password provided.")
        End Try

        Return plainText
    End Function

    'Old school
    Shared Function GetMD5Hash(theInput As String) As String

        Using hasher As MD5 = MD5.Create()    ' create hash object

            ' Convert to byte array and get hash
            Dim dbytes As Byte() =
             hasher.ComputeHash(Encoding.UTF8.GetBytes(theInput))

            ' sb to create string from bytes
            Dim sBuilder As New StringBuilder()

            ' convert byte data to hex string
            For n As Integer = 0 To dbytes.Length - 1
                sBuilder.Append(dbytes(n).ToString("X2"))
            Next n

            Return sBuilder.ToString()
        End Using

    End Function

End Class

Public NotInheritable Class Simple3Des
    Private TripleDes As New TripleDESCryptoServiceProvider

    Private Function TruncateHash(
    ByVal key As String,
    ByVal length As Integer) As Byte()

        Dim sha1 As New SHA1CryptoServiceProvider

        ' Hash the key.
        Dim keyBytes() As Byte =
            System.Text.Encoding.Unicode.GetBytes(key)
        Dim hash() As Byte = sha1.ComputeHash(keyBytes)

        ' Truncate or pad the hash.
        ReDim Preserve hash(length - 1)
        Return hash
    End Function

    Sub New(ByVal key As String)
        ' Initialize the crypto provider.
        TripleDes.Key = TruncateHash(key, TripleDes.KeySize \ 8)
        TripleDes.IV = TruncateHash("", TripleDes.BlockSize \ 8)
    End Sub

    Public Function EncryptData(
    ByVal plaintext As String) As String

        ' Convert the plaintext string to a byte array.
        Dim plaintextBytes() As Byte =
            System.Text.Encoding.Unicode.GetBytes(plaintext)

        ' Create the stream.
        Dim ms As New System.IO.MemoryStream
        ' Create the encoder to write to the stream.
        Dim encStream As New CryptoStream(ms,
            TripleDes.CreateEncryptor(),
            System.Security.Cryptography.CryptoStreamMode.Write)

        ' Use the crypto stream to write the byte array to the stream.
        encStream.Write(plaintextBytes, 0, plaintextBytes.Length)
        encStream.FlushFinalBlock()

        ' Convert the encrypted stream to a printable string.
        Return Convert.ToBase64String(ms.ToArray)
    End Function

    Public Function DecryptData(
    ByVal encryptedtext As String) As String

        ' Convert the encrypted text string to a byte array.
        Dim encryptedBytes() As Byte = Convert.FromBase64String(encryptedtext)

        ' Create the stream.
        Dim ms As New System.IO.MemoryStream
        ' Create the decoder to write to the stream.
        Dim decStream As New CryptoStream(ms,
            TripleDes.CreateDecryptor(),
            System.Security.Cryptography.CryptoStreamMode.Write)

        ' Use the crypto stream to write the byte array to the stream.
        decStream.Write(encryptedBytes, 0, encryptedBytes.Length)
        decStream.FlushFinalBlock()

        ' Convert the plaintext stream to a string.
        Return System.Text.Encoding.Unicode.GetString(ms.ToArray)
    End Function

End Class

Public Class SHA
    Public Shared Function GenerateSHA256String(ByVal inputString) As String
        Dim sha256 As SHA256 = SHA256Managed.Create()
        Dim bytes As Byte() = Encoding.UTF8.GetBytes(inputString)
        Dim hash As Byte() = sha256.ComputeHash(bytes)
        Dim stringBuilder As New StringBuilder()

        For i As Integer = 0 To hash.Length - 1
            stringBuilder.Append(hash(i).ToString("X2"))
        Next

        Return stringBuilder.ToString()
    End Function

    Public Shared Function GenerateSHA512String(ByVal inputString) As String
        Dim sha512 As SHA512 = SHA512Managed.Create()
        Dim bytes As Byte() = Encoding.UTF8.GetBytes(inputString)
        Dim hash As Byte() = sha512.ComputeHash(bytes)
        Dim stringBuilder As New StringBuilder()

        For i As Integer = 0 To hash.Length - 1
            stringBuilder.Append(hash(i).ToString("X2"))
        Next

        Return stringBuilder.ToString()
    End Function
End Class

Public Class Vault
    Public Property version As String
    Public Property su_hash As String
    Public Property pk_hash As String
End Class

Public Class RendererDarkSlick
    Inherits ToolStripSystemRenderer

    Dim slickbrush = New Drawing.SolidBrush(Color.FromArgb(55, 57, 62, 0))
    Protected Overrides Sub OnRenderItemText(e As ToolStripItemTextRenderEventArgs)

        Dim tclr As Color = Color.FromArgb(47, 49, 54)
        TextRenderer.DrawText(e.Graphics, e.Text, e.TextFont, e.TextRectangle, Color.Silver, TextFormatFlags.VerticalCenter Or TextFormatFlags.Left Or TextFormatFlags.SingleLine)

    End Sub

    Protected Overloads Overrides Sub OnRenderMenuItemBackground(ByVal e As ToolStripItemRenderEventArgs)

        Dim rc As New Rectangle(2, 0, e.Item.Size.Width - 4, e.Item.Size.Height)
        Dim c As Color = CType(IIf(e.Item.Selected, Color.FromArgb(55, 57, 62), Color.FromArgb(47, 49, 54)), Color)

        Using brush As New SolidBrush(c)
            e.Graphics.FillRectangle(brush, rc)

        End Using

    End Sub

    Protected Overrides Sub OnRenderSeparator(ByVal e As System.Windows.Forms.ToolStripSeparatorRenderEventArgs)
        e.Graphics.FillRectangle(slickbrush, 0, 0, e.Item.Width - 1, e.Item.Height)
        e.Graphics.FillRectangle(slickbrush, 32, 3, e.Item.Width - 33, 1)
        e.Graphics.FillRectangle(slickbrush, 32, 4, e.Item.Width - 33, 1)
    End Sub

    Protected Overrides Sub OnRenderToolStripBorder(e As ToolStripRenderEventArgs)
        MyBase.OnRenderToolStripBorder(e)

        ControlPaint.DrawFocusRectangle(e.Graphics, e.AffectedBounds, SystemColors.ControlDarkDark, SystemColors.ControlDarkDark)
        e.Graphics.FillRectangle(slickbrush, 0, 0, e.AffectedBounds.X + 1, e.AffectedBounds.Y + 1)

    End Sub

End Class


Public Class ColorTable
    Inherits ProfessionalColorTable

    Dim Color1 = Color.FromArgb(30, 38, 44)
    Dim Color2 = Color.FromArgb(75, 81, 88)

    Public Overrides ReadOnly Property MenuBorder() As Color
        Get
            Return Color1
        End Get
    End Property

    Public Overrides ReadOnly Property MenuItemSelectedGradientBegin() As Color
        Get
            Return Color2
        End Get
    End Property

    Public Overrides ReadOnly Property MenuItemSelectedGradientEnd() As Color
        Get
            Return Color2
        End Get
    End Property

    Public Overrides ReadOnly Property MenuItemSelected() As Color
        Get
            Return Color2
        End Get
    End Property

    Public Overrides ReadOnly Property MenuItemBorder() As Color
        Get
            Return Color1
        End Get
    End Property

    Public Overrides ReadOnly Property MenuItemPressedGradientBegin() As Color
        Get
            Return Color2
        End Get
    End Property

    Public Overrides ReadOnly Property MenuItemPressedGradientEnd() As Color
        Get
            Return Color2
        End Get
    End Property

    Public Overrides ReadOnly Property SeparatorDark() As Color
        Get
            Return Color1
        End Get
    End Property

    Public Overrides ReadOnly Property ToolStripDropDownBackground() As Color
        Get
            Return Color1
        End Get
    End Property

End Class



