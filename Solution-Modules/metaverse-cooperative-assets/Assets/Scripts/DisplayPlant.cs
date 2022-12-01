using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DisplayPlant : MonoBehaviour
{
    public GameObject Canvas;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void OnTriggerEnter(Collider other)
    {
        Debug.Log(other.name);
        for(int i=0;i<4;i++)
        {
            Canvas.transform.GetChild(i).gameObject.SetActive(false);
        }        
        for(int i=0;i<4;i++)
        {
            if(Canvas.transform.GetChild(i).gameObject.name == other.gameObject.tag)
            {
                Debug.Log("It entered!!");
                Canvas.transform.GetChild(i).gameObject.SetActive(true);
            }
        }
    }
}
