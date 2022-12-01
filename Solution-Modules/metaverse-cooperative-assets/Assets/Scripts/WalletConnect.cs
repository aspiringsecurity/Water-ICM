using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
using TMPro;
using UnityEngine.SceneManagement;

public class WalletConnect : MonoBehaviour
{
    public TMP_InputField walletAddress;
    public TMP_InputField chainName;

    public GameObject Login;
    public GameObject Privacy;

    public float walletBalance;

    public class balance
    {
        public string walletaddress = "abc";
        public string chain = "polygon";
    }

    void Start()
    {
        PlayerPrefs.DeleteAll();
        if(PlayerPrefs.HasKey("WalletAddress"))
        {
            //AutoInvest();
        }
    }

    public void Invest()
    {
        balance mbal = new balance();
        mbal.walletaddress = walletAddress.text;
        mbal.chain = chainName.text;

        string _json = JsonUtility.ToJson(mbal);
        Debug.Log("data:" + _json);
        CacheData(mbal);
        StartCoroutine(GetRequest(GlobalVariables.url, _json));

        
        //SceneManager.LoadScene("Level04 1");
    }

    public void AutoInvest()
    {
        balance mbal = new balance();
        mbal.walletaddress = PlayerPrefs.GetString("WalletAddress");
        mbal.chain = PlayerPrefs.GetString("Chain");
        Debug.Log(mbal.walletaddress + mbal.chain);

        string _json = JsonUtility.ToJson(mbal);
        Debug.Log("data:" + _json);
        StartCoroutine(GetRequest(GlobalVariables.url, _json));
        
    }

    public void CacheData(balance mbal)
    {
        PlayerPrefs.SetString("WalletAddress", mbal.walletaddress);
        PlayerPrefs.SetString("Chain", mbal.chain);

        PlayerPrefs.Save();
    }

    IEnumerator GetRequest(string uri, string form)
    {
        
        using (UnityWebRequest webRequest = UnityWebRequest.Put(uri + "getwalletbalance", form))
        {
            Debug.Log("Using entered!!");
            webRequest.method = UnityWebRequest.kHttpVerbPOST;
            webRequest.SetRequestHeader("Content-Type", "application/json");
            webRequest.SetRequestHeader("accept", "text/plain");
            yield return webRequest.SendWebRequest();

            string[] pages = uri.Split('/');
            int page = pages.Length - 1;



            switch (webRequest.result)
            {
                case UnityWebRequest.Result.ConnectionError:
                case UnityWebRequest.Result.DataProcessingError:
                    Debug.LogError(pages[page] + ": Error: " + webRequest.error);
                    break;
                case UnityWebRequest.Result.ProtocolError:
                    Debug.LogError(pages[page] + ": HTTP Error: " + webRequest.error);
                    break;
                case UnityWebRequest.Result.Success:
                    Debug.Log(pages[page] + ":\nReceived: " + webRequest.downloadHandler.text);
                    walletBalance = float.Parse(webRequest.downloadHandler.text);
                    Debug.Log("Balance:" + walletAddress);
                    GlobalVariables.walBalance = walletBalance;
                    PlayerPrefs.SetFloat("Balance", walletBalance);

                    Login.SetActive(false);
                    Privacy.SetActive(true);
                    //SceneManager.LoadScene("Level04");
                    break;
            }
        }

        
    }

    public void AcceptPrivacy()
    {
        SceneManager.LoadScene("Level04");
    }    
    
    public void DenyPrivacy()
    {
        Application.Quit();
    }
}
