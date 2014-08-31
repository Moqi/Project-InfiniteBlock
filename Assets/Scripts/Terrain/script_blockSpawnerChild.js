#pragma strict

////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// BlockSpawnerParent Script ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// Variables
	
	// Player
private var maxDistanceToPlayer 		 : float; 
	
	// SpawnPoints: 
		var blockSpawnerChild			 : GameObject;
		
		var spawnPoints 				 : Vector3[];	//create an array of positions

	// Generate blocks:
		var mainPlatform 			     : GameObject;
private var spawnPlatform 				 : boolean 		= false;


/////////////////
function Start () 
{
	// Instantiates main platform
		var mainPlatform : GameObject = Instantiate(mainPlatform, transform.position - Vector3(0, 2, 0), Quaternion.identity);	

	// Making object child of parent
		transform.parent = GameObject.FindWithTag("blockSpawnParent").transform;
		
	// Finding new spawnPos based on spawnPoints set in the inspector
		FindSpawnPosition ();
		

		// Getting information from sceneManager
			var sceneManagerScript : script_sceneManager 		= GetComponent (script_sceneManager);
		
			var sceneManagerObject 								= GameObject.FindWithTag("scenemanager");			
		/*	
			var sceneManagerScript_newBlockSpawnerChildCanSpawn : boolean  = sceneManagerObject.GetComponent(script_sceneManager).newBlockSpawnerChildCanSpawn;	
					
		if (sceneManagerScript_newBlockSpawnerChildCanSpawn == true)
		{
			// yields to generate in at a steady pace
				yield WaitForSeconds(1);
			// Instantiates a new blockSpawner before creating the current platform
				var newBlockSpawnerChild : GameObject = Instantiate(blockSpawnerChild, transform.position, Quaternion.identity);
		
				//newBlockSpawnerChild.transform.parent = this.transform;
		}
		*/
	// Getting global distance to player from sceneManager:
		var sceneManagerScript_maxDistancePlayerObject : float  = sceneManagerObject.GetComponent(script_sceneManager).maxDistancePlayerObject;	

			maxDistanceToPlayer = sceneManagerScript_maxDistancePlayerObject;
			
				//Debug.Log("BlockSpawnerChild.maxDistanceToPlayer: " + maxDistanceToPlayer);
}

//////////////////
function Update () 
{	
	
	if (!GameObject.FindWithTag("Player"))
	{
		return null;
	}
	else 
	{
		var playerPos : Vector3 = GameObject.FindWithTag("Player").transform.position;
	}

	
	var distanceToPlayer = Vector3.Distance(transform.position, playerPos);
	
	if(distanceToPlayer <= maxDistanceToPlayer)
	{
		//Debug.Log("PlatformSpawner Nearby, spawning platform!");
		
		gameObject.GetComponent(script_blockSpawner).enabled = true;
	}
	else
	{
		gameObject.GetComponent(script_blockSpawner).enabled = false;
	}

}




/////////////////
function FindSpawnPosition ()
{
	//Choose a random number based on the length of the array
		var randomIndex : int = Random.Range(0, spawnPoints.length); 
		
			//Debug.Log("BlockSpawnerParent_randomIndex: " + randomIndex);
	
	//Choose a new point from the array of spawn points
 		var pickedPosition : Vector3 = transform.position + spawnPoints[randomIndex];
	
			//Debug.Log("BlockSpawnerParent_pickedPosition: " + pickedPosition);
			
	// transform.position = the pickedLocation
		transform.position = pickedPosition;
	

	/*
	// Check to see if we are near another child:
		var nearestChild = FindClosestChildObject().gameObject;
	
		var distanceToNearestChild = Vector3.Distance(transform.position, nearestChild.transform.position);
	
	
	// Restarts if the closest child is too close
	if (distanceToNearestChild <= 5.0)
	{
		Debug.Log("BlockSpawnChild.FindSpawnPosition: pickedPosition == parent, restarting...");
		
		FindSpawnPosition ();
	}		
	*/	
}


/*
function FindClosestChildObject () : GameObject 
{
	// Checking for other platformspawner to determine if a new location should be picked:
		var blockSpawnerChilds : GameObject[];
	
	blockSpawnerChilds 	= GameObject.FindGameObjectsWithTag("blockSpawnChild");
	
		var closestChild : GameObject;
	
		var distance 	= Mathf.Infinity;
	
		var thisBlockSpawnerChildPos = transform.position;
	
	// Iterate through them and find the closest one
	for (var go : GameObject in blockSpawnerChilds)
	{
			var difference  = (go.transform.position - thisBlockSpawnerChildPos);
		
			var curDistance = difference.sqrMagnitude;
		
		if (curDistance < distance)
		{
			closestChild 	= go;
			
			distance 		= curDistance;
		}
	}
	
	return closestChild;
}
*/












