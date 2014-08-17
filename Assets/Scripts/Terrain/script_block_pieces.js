#pragma strict
/*
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// Script: Build_block_root ///////////////////////////////////////
// Christian Krogh (www.Christiankrogh.com)
// August, 2014
// Description: Controls the root of every building block
/////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
/*
private var reGrow 				: boolean		= false;
private var endScale 			: Vector3;
private var timeBeforeReGrow 	: float 		= 0.0;
private var timeStart			: float			= 0.0;

/////////////////
function Start ()
{
	timeBeforeReGrow = Random.Range( 480, 600);
	timeStart = timeBeforeReGrow;
	
	yield WaitForSeconds (2);
	
	endScale = transform.localScale;
}

//////////////////
function Update () 
{
	ReGrowth ();
}

////////////////////
function ReGrowth ()
{
	var renderer : Renderer 	= gameObject.GetComponent ( Renderer );
	var collider : Collider 	= gameObject.GetComponent ( Collider );
			
	if ( !renderer.enabled && !collider.enabled )
	{
		//Debug.Log ( "object will regrow!" );	
		
		timeBeforeReGrow -= Time.deltaTime;
		
		if ( timeBeforeReGrow > 0 )
		{
			//Debug.Log ( timeBeforeReGrow.ToString ( "F0" ) );
		}
		else
		{
			ReScale ();
			renderer.enabled = true;
			collider.enabled = true;
			timeBeforeReGrow = timeStart;
		}
	}
}


function ReScale ()
{
	//////////////////////////
	// Calculate scale 
	var t 			: float		= 0.0;
	var speed 		: float		= 20.0;
	var startScale 	: Vector3 	= Vector3.zero;
							
	while ( t < 1.0)
	{
		t += Time.deltaTime / speed;
			
		transform.localScale 	= Vector3.Lerp ( startScale, endScale, t );	
						
		yield;	
		
		transform.localScale 	= endScale;	
	}						
}
*/












