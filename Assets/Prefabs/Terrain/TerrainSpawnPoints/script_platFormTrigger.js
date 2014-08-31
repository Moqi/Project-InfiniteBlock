#pragma strict

private var triggerRdy   : boolean	= false;
		var endScaleMin  : float 	= 75.0;
		var endScaleMax	 : float 	= 200.0;
	

function Start () 
{
	
}

function Update ()
{
	if ( Input.GetKeyDown ( KeyCode.F8 ) )
	{
		triggerRdy = true;
	}
	
	if ( triggerRdy )
	{
		PlatFormTrigger ();
	}
}


function PlatFormTrigger ()
{
	if ( triggerRdy )
	{
		triggerRdy 		= false;
		
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
	if ( transform.localScale == endScale )
	{
		transform.localScale = Vector3.zero;		
	}
}


