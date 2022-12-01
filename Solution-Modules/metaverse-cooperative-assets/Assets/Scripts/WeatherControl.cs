using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Net;
using System;
using System.IO;

public class WeatherControl : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        //HttpWebRequest request = (HttpWebRequest)WebRequest.Create(String.Format("http://api.openweathermap.org/data/2.5/weather?id={0}&APPID={1}", CityId, API_KEY));
        //HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        //StreamReader reader = new StreamReader(response.GetResponseStream());
        //string jsonResponse = reader.ReadToEnd();
        //WeatherInfo info = JsonUtility.FromJson<WeatherInfo>(jsonResponse);
        //return info;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

  /*private WeatherInfo GetWeather()
{

}*/
