using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FOV : MonoBehaviour
{
    public Camera cam;
    public bool flag = false;
    public float t = 0.5f;

    private void Update()
    {
        Cursor.visible = false;
        Cursor.lockState = CursorLockMode.Locked;
    }

    private void OnTriggerEnter(Collider other)
    {
        if(flag == false && other.gameObject.tag == "FOV")
        {
            cam.fieldOfView = Mathf.Lerp(cam.fieldOfView, 70, t * Time.deltaTime);
            flag = true;
        }
        else if(flag == true && other.gameObject.tag == "FOV")
        {
            cam.fieldOfView = Mathf.Lerp(cam.fieldOfView, 40, t);
            flag = false;
        }
    }

}
