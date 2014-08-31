#pragma strict

		
		var blockSpawner 	: Transform;


function OnTriggerEnter (other : Collider) 
{
		if ( other.tag == "platFormTrigger")
		{
			yield WaitForSeconds ( Random.Range ( 0.0, 10.0 ) );	// spawn delay to increase performance
			//Debug.Log("hit point!");
			
			var randomNum : int = Random.Range(0, 10);
			
			if ( randomNum <= 4)
			{
				Instantiate (blockSpawner, transform.position, Quaternion.identity);
			}
		}
}