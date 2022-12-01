using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class NFTCreate : MonoBehaviour
{
    public List<string> urls = new List<string>(){"https://i.postimg.cc/3yRyMCkK/nft1.png", "https://i.postimg.cc/jwnL2x6m/nft2.png", "https://i.postimg.cc/gwTxGXh3/nft3.png"};
    public class mnft
    {
        public string walletaddress = "abc";
        public string tokenId = "abhi1" + System.Convert.ToInt16(Random.Range(0f, 100f)).ToString();
        public string name = "t1" + System.Convert.ToInt16(Random.Range(0f, 100f)).ToString();
        public string description = "tier1";
        public string metadata = "{ \"text\": \"first\" }";
        public string asseturl = "url";
    }

    void Start()
    {
        mnft mbal = new mnft();
        mbal.walletaddress = PlayerPrefs.GetString("WalletAddress");
        string _json = JsonUtility.ToJson(mbal);
        Debug.Log("collection:" + _json);
        for(int i=0;i<3;i++)
        {
            mbal.asseturl = urls[i];
            StartCoroutine(GetRequest(GlobalVariables.url, _json, i));
        }
        
    }

    IEnumerator GetRequest(string uri, string form, int number)
    {
        using (UnityWebRequest webRequest = UnityWebRequest.Put(uri + "mintnft", form))
        {
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
                    PlayerPrefs.SetString("Tier" + number.ToString(), webRequest.downloadHandler.text);
                    break;
            }
        }
    }
}
