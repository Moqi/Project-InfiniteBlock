#pragma strict

		var effect_dust 	: Transform;


function OnTriggerEnter (other : Collider) 
{
	if ( other.collider.tag == "groundObject" )
	{
		//Debug.Log ( "DustEffect!" );
		var newDust : Transform = Instantiate (effect_dust, transform.position, Quaternion.identity );
	}
}

