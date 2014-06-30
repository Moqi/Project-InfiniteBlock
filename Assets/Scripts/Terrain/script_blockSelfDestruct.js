
	var maxDistanceToPlayer : float = 100.0; 

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
	
	if(distanceToPlayer > maxDistanceToPlayer)
	{
		//Destroy(gameObject);
		gameObject.active = false;
	}
     
  
}