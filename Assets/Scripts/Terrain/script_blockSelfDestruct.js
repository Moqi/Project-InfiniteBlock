
	var maxDistanceToPlayer : float = 100.0; 


function Start()
{
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
	/*if (!GameObject.FindWithTag("Player"))
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
	}*/
     
  
}