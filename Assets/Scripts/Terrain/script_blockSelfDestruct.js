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
		//return null;
	}
	else 
	{
		var playerPos : Vector3 = GameObject.FindWithTag("Player").transform.position;
	}
	

	var distanceToPlayer = Vector3.Distance(transform.position, playerPos);
	
	if ( playerPos.y >= -5)
	{	
		if ( distanceToPlayer > maxDistanceToPlayer )
		{	
			gameObject.GetComponent(Renderer).enabled = false;
		}
		else
		{
			gameObject.GetComponent(Renderer).enabled = true;	
		}
	}
}
/*
for (var r : Transform in this.transform)
		{
			for (var rr : Transform in r.transform)
			{
				var childsT : Transform[] = new Transform[rr.childCount];
				var i : int = 0;
				for ( var child : Transform in rr )
				{
				    childsT[i] = child;
				    i++;
				    //Debug.Log(child.name);
				    
				    if ( !child.transform )
				    {
					    if ( distanceToPlayer > maxDistanceToPlayer )
					    {
					    	child.transform.GetComponent ( Collider ).enabled = false;
					   		child.transform.GetComponent ( Renderer ).enabled = false;
					    }
					    else
					    {
					    	child.transform.GetComponent ( Collider ).enabled = true;
					    	child.transform.GetComponent ( Renderer ).enabled = true;
					    }
					} 
				}
			}	
		}
*/









