#pragma strict
///////////////////////////////////////////////////////////////////////////
////////////////////////// Player Interaction script //////////////////////
///////////////////////////////////////////////////////////////////////////

// Harvest Effect
		var harvestEffect 		: Transform;
private var layerBreakable;
private var lastEffectTime 		: float = 0.0;
		var effectFrequency 	: float = 2.0;
private var begunHarvesting 	: float = 0.0;
		
		
function Start () 
{
	
}

function Update () 
{
	Harvest();
}

//////////////////////////////////////////
function Harvest()
{
	// Harvesting layer = breakable 
	layerBreakable = LayerMask.NameToLayer("breakable");

	if ( Input.GetMouseButton ( 0 ) )
	{
		var t 							= 0.0;
		var speed 						= 0.001;
		var endScale 					= Vector3.zero;
		var ray 		: Ray 			= Camera.main.ScreenPointToRay (Input.mousePosition);	
		var hit 		: RaycastHit;
		
		if (Physics.Raycast (ray, hit, Mathf.Infinity) )
		{	
			// Distance between player and RaycastHit
			var playerDistanceToHit : Vector3 = hit.transform.position - this.transform.position;
 				
 				// Distance limited to x- and z-axis
				var playerDistanceToHitInX = Mathf.Abs(playerDistanceToHit.x);
				var playerDistanceToHitInZ = Mathf.Abs(playerDistanceToHit.z);
			
			if ( playerDistanceToHitInX && playerDistanceToHitInZ < 2.5 && hit.transform.gameObject.layer == layerBreakable ) 
			{		
			// Effect	
				if (Time.time > lastEffectTime + 1 / effectFrequency ) 
				{
 					var newEffect : Transform = Instantiate ( harvestEffect, hit.transform.position, Quaternion.identity );	
 					
    				lastEffectTime = Time.time;
				} 
			// DownScaling						
				while ( t < 1.0 && Input.GetMouseButton ( 0 ) )
				{				
					t += Time.deltaTime * speed;
					
					hit.transform.localScale = Vector3.Lerp(hit.transform.localScale, endScale, t);
					
					yield;
				}
			// Disabling 	
				if ( Time.time > begunHarvesting + 1 )
				{			
					if ( hit.transform.localScale == Vector3 ( 0.5, 0.5, 0.5 ) )
					{
						hit.collider.gameObject.active = false;
					}
				
					begunHarvesting = Time.time;
				}
			}	
		}
	}
}

   












