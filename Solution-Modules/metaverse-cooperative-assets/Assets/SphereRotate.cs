using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SphereRotate : MonoBehaviour
{
    public GameObject sphere;
    public Camera raycastCam;
    public bool isMoving = false;
    public float speed = 1f;

    public Vector3 targetAngle = new Vector3(0, 90f, 0);
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {  
        if (Input.GetKeyDown(KeyCode.Tab))
        {
            sphere.transform.rotation = Quaternion.Slerp(sphere.transform.rotation, Quaternion.Euler(0, 135f, 0) * sphere.transform.rotation, Time.deltaTime * 20f);
            //sphere.transform.Rotate(0, -90, 0);
            //float angle = sphere.transform.rotation.y + 90f;
            //sphere.transform.eulerAngles = Quaternion.Lerp(sphere.transform.rotation, sphere.transform.rotation. + Quaternion.Euler(0, , 0), Time.deltaTime);
            //sphere.transform.rotation = Quaternion.Lerp(transform.rotation, new Quaternion(transform.rotation.x, transform.rotation.y + 90f, transform.rotation.z, 0), Time.deltaTime * speed);
            //sphere.transform.rotation = Quaternion.Lerp(0, stargetAngle);
            //isMoving = false;
        }
    }
}
