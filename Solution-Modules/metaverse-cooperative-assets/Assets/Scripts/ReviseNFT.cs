using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

public class ReviseNFT : MonoBehaviour
{
    public class crco
    {
        public string walletaddress = "abc";
        public string collectionname = "sting1" + System.Convert.ToInt16(Random.Range(0f, 100f)).ToString();
        public string uri = "redd" + System.Convert.ToInt16(Random.Range(0f, 100f)).ToString();
    }

    void Start()
    {
        crco mbal = new crco();
        mbal.walletaddress = PlayerPrefs.GetString("WalletAddress");
        string _json = JsonUtility.ToJson(mbal);
        Debug.Log("collection:" + _json);
        StartCoroutine(GetRequest(GlobalVariables.url, _json));
    }

    IEnumerator GetRequest(string uri, string form)
    {
        using (UnityWebRequest webRequest = UnityWebRequest.Put(uri + "createcollection", form))
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

                    break;
            }
        }
    }
}
