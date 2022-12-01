using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class WeatherML : MonoBehaviour
{
    public GameObject Clouds;
    public GameObject Rain;
    public GameObject Light;

    void Start()
    {
        Clouds = GameObject.Find("Clouds");
        Rain = GameObject.Find("RainMaker");
        Light = GameObject.Find("Sun");
        Clouds.SetActive(false);
        Rain.SetActive(false);
        Light.SetActive(false);
        StartCoroutine(GetRequest("http://127.0.0.1:8000/get_data"));
    }

    IEnumerator GetRequest(string uri)
    {
        using (UnityWebRequest webRequest = UnityWebRequest.Get(uri))
        {
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
                    string climate = webRequest.downloadHandler.text[1].ToString();
                    Debug.Log(climate.GetType());
                    if(climate == "1")
                    {
                        Clouds.SetActive(true);
                    }
                    else if(climate == "2")
                    {
                        Light.SetActive(true);
                    }
                    else
                    {
                        Rain.SetActive(true);
                    }
                    break;
            }
        }
    }


}
