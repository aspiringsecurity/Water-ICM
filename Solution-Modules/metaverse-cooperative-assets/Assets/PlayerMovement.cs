using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
	public Animator anim;


	void FixedUpdate()
	{

	}
	void Update()
	{
		if(Input.GetKeyDown(KeyCode.W))
        {
			anim.SetBool("Walk", true);
        }
		if (Input.GetKeyUp(KeyCode.W))
		{
			anim.SetBool("Walk", false);
		}
		if (Input.GetKeyDown(KeyCode.S))
		{
			anim.SetBool("Walk", true);
		}
		if (Input.GetKeyUp(KeyCode.S))
		{
			anim.SetBool("Walk", false);
		}
	}
}