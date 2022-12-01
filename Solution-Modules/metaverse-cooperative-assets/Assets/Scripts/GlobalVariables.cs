using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GlobalVariables : MonoBehaviour
{
    //public static string url = "https://limitless-thicket-68287.herokuapp.com/";
    public static string chain = "polygon";
    public static string url = "http://localhost:5000/";

    public static float walBalance;
    public static bool firstTime = false;

    public static bool growOne = false;
    public static GlobalVariables Instance { get; private set; }
    private void Awake()
    {
        // If there is an instance, and it's not me, delete myself.

        if (Instance != null && Instance != this)
        {
            Destroy(this);
        }
        else
        {
            Instance = this;
        }
    }
}
