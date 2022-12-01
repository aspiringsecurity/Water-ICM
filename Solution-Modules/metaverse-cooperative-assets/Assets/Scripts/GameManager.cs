using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public int numTrees;
    public float bal;

    [SerializeField]
    GameObject prefabOne;

    [SerializeField]
    GameObject prefabTwo;

    [SerializeField]
    GameObject prefabThree;

    [SerializeField]
    GameObject plane;

    // spawn control
    const float MinSpawnDelay = 1;
    const float MaxSpawnDelay = 5;

    // spawn location support
    float randomX;
    float randomY;
    float randomZ;

    public bool spawn = false;

    public List<Transform> spawnPoints;

    // Start is called before the first frame update
    void Start()
    {
        bal = PlayerPrefs.GetFloat("Balance");
        Debug.Log("Game Manager: " + PlayerPrefs.GetFloat("Balance"));
        plane = GameObject.FindWithTag("Plane");

        // save spawn boundaries for efficiency
        float randomX = Random.Range(plane.transform.position.x - plane.transform.localScale.x / 2, plane.transform.position.x + plane.transform.localScale.x / 2);
        float randomY = Random.Range(plane.transform.position.y - plane.transform.localScale.y / 2, plane.transform.position.y + plane.transform.localScale.y / 2);
        float randomZ = Random.Range(plane.transform.position.y - plane.transform.localScale.z / 2, plane.transform.position.y + plane.transform.localScale.z / 2);
    }

    // Update is called once per frame
    void Update()
    {
        if(bal>=5)
        {
            numTrees = System.Convert.ToInt16(bal / 0.5f);
            if (spawn == false)
            {
                objectSpawn(prefabThree);
                Debug.Log(numTrees.ToString());
            }
        }
        else if(bal>=10)
        {
            numTrees = System.Convert.ToInt16(bal / 1f);
            if (spawn == false)
            {
                objectSpawn(prefabTwo);
                Debug.Log(numTrees.ToString());
            }
        }
        else
        {
            numTrees = System.Convert.ToInt16(bal / 0.1f);
            if (spawn == false)
            {
                objectSpawn(prefabOne);
                Debug.Log(numTrees.ToString());
            }
        }


    }

    /// <summary>
    /// Spawns an object at a random location on a plane
    /// </summary>
    void objectSpawn(GameObject spawnObject)
    {
        int spawnTrees = numTrees;
        for(int i=0;i<spawnPoints.Count;i++)
        {
            GameObject Tree = Instantiate<GameObject>(spawnObject, new Vector3(spawnPoints[i].localPosition.x,  1.75f, spawnPoints[i].localPosition.z), Quaternion.identity);
            Tree.transform.localScale = new Vector3(10, 10, 10);
            spawnTrees -= 1;

            if(spawnTrees == 0)
            {
                break;
            }
        }

        spawn = true;
    }
}
