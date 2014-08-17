#pragma strict


private var maxDistanceToPlayer : float;


function Start()
{

// Getting information from sceneManager
	var sceneManagerScript : script_sceneManager 		= GetComponent (script_sceneManager);
	
	var sceneManagerObject 								= GameObject.FindWithTag("scenemanager");			
			
	var sceneManagerScript_maxDistancePlayerObject : float  = sceneManagerObject.GetComponent(script_sceneManager).maxDistancePlayerObject;	

	maxDistanceToPlayer = sceneManagerScript_maxDistancePlayerObject;
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
		if ( distanceToPlayer > maxDistanceToPlayer )
		{
			gameObject.GetComponent(Collider).enabled = false;	
			gameObject.GetComponent(Renderer).enabled = false;
		}
		else
		{
			gameObject.GetComponent(Collider).enabled = true;
			gameObject.GetComponent(Renderer).enabled = true;	
		}
	}
}








