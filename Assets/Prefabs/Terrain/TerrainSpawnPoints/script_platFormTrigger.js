#pragma strict


	var endScaleMin  : float = 75.0;
	var endScaleMax	 : float = 200.0;
	

function Start () 
{
	PlatFormTrigger ();
}


function PlatFormTrigger ()
{
	var endScale    : Vector3;
    var t 			= 0.0;
	var speed 		= 0.1;
	
	transform.localScale = Vector3.zero;

	endScale = Vector3 (Random.Range(endScaleMin, endScaleMax), 100, Random.Range(endScaleMin, endScaleMax));

	while ( t < 1.0)
	{
		t += Time.deltaTime * speed;
			
		transform.localScale = Vector3.Lerp(transform.localScale, endScale, t);
						
		yield;	
	}
}


