


// Scroll main texture based on time
	var scrollSpeed 		: float = 0.5;
	var randomNum 			: int;
	
function Start()
{
	randomNum = Random.Range(0, 7);
}


function Update () 
{
	var offset : float = Time.time * scrollSpeed;
	
	if (randomNum == 0)
	{	// - x = left
		renderer.material.SetTextureOffset ("_MainTex", Vector2(-offset, 0));
	}
	else if (randomNum == 1)
	{	// + x = right
		renderer.material.SetTextureOffset ("_MainTex", Vector2(offset, 0));
	}
	else if (randomNum == 2)
	{	// + x, + y = right-Up
		renderer.material.SetTextureOffset ("_MainTex", Vector2(offset, offset));
	}
	else if (randomNum == 3)
	{	// - x, + y 
		renderer.material.SetTextureOffset ("_MainTex", Vector2(- offset, offset));
	}
	else if (randomNum == 4)
	{	// + x, - y 
		renderer.material.SetTextureOffset ("_MainTex", Vector2(offset, - offset));
	}
	else if (randomNum == 5)
	{	// - x, - y
		renderer.material.SetTextureOffset ("_MainTex", Vector2(- offset, - offset));
	}
	else if (randomNum == 6)
	{	//  + y 
		renderer.material.SetTextureOffset ("_MainTex", Vector2(0, offset));
	}
	else if (randomNum == 7)
	{	// - y
		renderer.material.SetTextureOffset ("_MainTex", Vector2(0, - offset));
	}
	
}









