#pragma strict


private var maxDistanceToPlayer : float;


function Start()
{

// Getting information from sceneManager
	var sceneManagerScript : script_sceneManager 		= GetComponent (script_sceneManager);
	
	var sceneManagerObject 								= GameObject.FindWithTag("scenemanager");			
			
	var sceneManagerScript_maxDistancePlayerObject : float  = sceneManagerObject.GetComponent(script_sceneManager).maxDistancePlayerObject;	

	maxDistanceToPlayer = sceneManagerScript_maxDistancePlayerObject;
	
		//Debug.Log("BlockSpawner.maxDistanceToPlayer: " + maxDistanceToPlayer);

	var randomNum : int = Random.Range(0, 3);
	
	if (randomNum == 0)
	{
		transform.rotation = Quaternion.Euler(0,90,0);
	}
	if (randomNum == 1)
	{
		transform.rotation = Quaternion.Euler(0,180,0); 
	}
	if (randomNum == 2)
	{
		transform.rotation = Quaternion.Euler(0,270,0);
	}
	if (randomNum == 3)
	{		
		transform.rotation = Quaternion.Euler(0,0,0); 
	}
}


function Update()
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
	
	if ( playerPos.y >= -5)
	{
	
		var parentAndChildRenderer = GetComponentsInChildren(Renderer);
	
		if(distanceToPlayer > maxDistanceToPlayer)
		{	
			
			for (var r : Renderer in parentAndChildRenderer)
			{
				if (r.CompareTag("groundObject"))
				{
					r.enabled = false;
				}	
			}
			//gameObject.GetComponent(MeshRenderer).enabled = false;
		}
		else
		{
			for (var r : Renderer in parentAndChildRenderer)
			{
				if (r.CompareTag("groundObject"))
				{
					r.enabled = true;
				}	
			}
			//gameObject.GetComponent(MeshRenderer).enabled = true;
		}
	}
    
  
}












