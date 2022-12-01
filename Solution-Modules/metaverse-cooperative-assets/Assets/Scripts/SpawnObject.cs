using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// An object spawner
/// </summary>
public class SpawnObject : MonoBehaviour
{
	#region Variables
	// needed for spawning
	[SerializeField]
	GameObject spawnObject;

	[SerializeField]
	GameObject plane;
	
	// spawn control
	const float MinSpawnDelay = 1;
	const float MaxSpawnDelay = 5;

	// spawn location support
	float randomX;
	float randomY;
	float randomZ;

	#endregion

	#region Methods
    /// <summary>
    /// Use this for initialization
    /// </summary>
    void Start()
    {
		plane = GameObject.FindWithTag("Plane");

		// save spawn boundaries for efficiency
		float randomX = Random.Range (plane.transform.position.x - plane.transform.localScale.x / 2, plane.transform.position.x + plane.transform.localScale.x / 2);
		float randomY = Random.Range (plane.transform.position.y - plane.transform.localScale.y / 2, plane.transform.position.y + plane.transform.localScale.y / 2);
		float randomZ = Random.Range (plane.transform.position.y - plane.transform.localScale.z / 2, plane.transform.position.y + plane.transform.localScale.z / 2);
	}

    /// <summary>
    /// Update is called once per frame
    /// </summary>
    void Update()
    {
		// check for time to spawn a new enemy
		
	}
	
	/// <summary>
	/// Spawns an object at a random location on a plane
	/// </summary>
	void objectSpawn()
	{
		// generate random location and create new object
		Vector3 randomPosition = GetARandomPos(plane);
                                                                  
        Instantiate<GameObject>(spawnObject, randomPosition, Quaternion.identity);   
	
	}

	/// <summary>
	/// Return random position on the plane
	/// </summary>
	public Vector3 GetARandomPos(GameObject plane){

    Mesh planeMesh = plane.GetComponent<MeshFilter>().mesh;
    Bounds bounds = planeMesh.bounds;

    float minX = plane.transform.position.x - plane.transform.localScale.x * bounds.size.x * 0.5f;
    float minZ = plane.transform.position.z - plane.transform.localScale.z * bounds.size.z * 0.5f;

    Vector3 newVec = new Vector3(Random.Range (minX, -minX),
                                 plane.transform.position.y,
                                 Random.Range (minZ, -minZ));
    return newVec;
	}

	#endregion
}
