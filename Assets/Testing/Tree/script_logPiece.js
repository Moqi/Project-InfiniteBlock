#pragma strict
///////////////////////////////////////////////////////////////////////////
////////////////////////////// LogPiece script ////////////////////////////
///////////////////////////////////////////////////////////////////////////

	var stick				: Transform;
	var leaves				: Transform;
	var leavesSpawnPos_01 	: Transform;
	var leavesSpawnPos_02 	: Transform;
	
function Start () 
{	
	var randomNum1 : int = Random.Range(0, 2);
	
	if (randomNum1 < 1)
	{
		stick.transform.localScale = Vector3(Random.Range(1.3, 1.7), Random.Range(0.1, 0.3), Random.Range(0.1, 0.3));
	}
	else 
	{
		stick.transform.localScale = Vector3(Random.Range(0.1, 0.3), Random.Range(0.1, 0.3), Random.Range(1.3, 1.7));
	}
	
	
	//stick.transform.localPosition = Vector3(2, 0, 0);
	
	var randomNum2 : int = Random.Range( 0, 10);
	
	if (randomNum2 < 5)
	{
		var randomPosSticks : Vector3;
		var leavesSpawnPos 	: Vector3;
	
		
		if (randomNum1 < 1)
		{
			randomPosSticks = Vector3(Random.Range(-0.4, 0.4), 0, 0);
			
			leavesSpawnPos = leavesSpawnPos_01.transform.position;
		}
		else 
		{
			randomPosSticks = Vector3(0, 0, Random.Range(-0.4, 0.4));
			
			leavesSpawnPos = leavesSpawnPos_02.transform.position;
		}
		
	
		var newStick  : Transform = Instantiate(stick, transform.position + randomPosSticks, transform.rotation);
		
	
		//var newleaves : Transform = Instantiate(leaves, leavesSpawnPos + Vector3(0, newStick.transform.position.y, 0), newStick.transform.rotation);
		
		
		//newleaves.transform.localScale = Vector3(Random.Range(0.3, 0.5), Random.Range(0.3, 0.5), Random.Range(0.3, 0.5));
		
	}
}



