#pragma strict

		
		var blockSpawner 	: Transform;


function OnTriggerEnter (other : Collider) 
{
		if ( other.tag == "platFormTrigger")
		{
			print("hit point!");
			
			var randomNum : int = Random.Range(0, 10);
			
			if ( randomNum <= 4)
			{
				Instantiate (blockSpawner, transform.position, Quaternion.identity);
			}
		}
}