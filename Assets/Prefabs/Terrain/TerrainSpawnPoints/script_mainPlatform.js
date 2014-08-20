#pragma strict
////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// mainPlatform Script ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// function SpawnDetails
		var objectHolder				 : Transform;
		var blocktypeMain 				 : Transform;
		var floraGenerator 				 : Transform;
		var generateSpeed				 : float 		= 0.5;
private var z_width		 				 : int; 			
private var x_width		 				 : int; 			
		var Min_Z_width  				 : int;
		var Max_Z_width	 				 : int;
		var Min_X_width  				 : int;
		var Max_X_width  				 : int; 
private var make_Z_extraBlocks 			 : boolean 		= true;	


///////////////////////////////////////
function Start ()
{	
	LerpSize (this.transform, Vector3 ( 10, 10, 10 ), 1.0, 2.5 );
	
	yield WaitForSeconds (1.0);
	
	SpawnDetails ();
}

///////////////////////////////////////
function LerpSize ( object : Transform, endScale : Vector3, speedMin : float, speedMax : float )
{	
	var t 			  = 0.0;
	var speed : float = Random.Range ( speedMin, speedMax );
	
	object.localScale = Vector3.zero;
	
	while ( t < 1.0)
	{
		t += Time.deltaTime / speed;
			
		object.localScale = Vector3.Lerp ( object.localScale, endScale, t );
						
		yield;	
	}
}				
	
///////////////////////////////////////	
function SpawnDetails ()
{
	
	//blocktypeMain.transform.localScale = Vector3.zero;
	
	z_width = Random.Range(Min_Z_width, Max_Z_width);
		//Debug.Log(z_width);
	x_width = Random.Range(Min_X_width, Max_X_width);
		//Debug.Log(x_width);
	//transform.position = transform.position - (Vector3( x_width, 0, z_width) / 2);	
	
	for (var i : int = 0; i < z_width; i++) 
  	{						
  						// Extra sidecubes ## Side: -X 
    						PlaceBlock ( Vector3 ( Random.Range(-1, -1), Random.Range(1, 2), 	i ) );
    	
   			for (var j : int = 0; j < x_width; j++)
    		{
    					// Fill cubes    		
      						PlaceBlock ( Vector3 ( j, 				1, 							i ) );
      			
      					// random blocks ontop of fillerBlocks //
      						PlaceBlock ( Vector3( j, 				2, 							i ) );
      			
					// Extra Z blocks //
	      			if (j <= x_width && make_Z_extraBlocks == true)
	  				{
	  					// Side: Z(minus) //
	    					PlaceBlock ( Vector3 ( j, 		Random.Range(1, 1), 		i + Random.Range(-1, -2) ) );
	  			
	  					// Side: Z(plus) //			
	   						PlaceBlock ( Vector3 ( j, 		Random.Range(1, 1), 		z_width + Random.Range(1, 2) ) );
	  				}	
  				yield WaitForSeconds(generateSpeed);
    		}
		
		// Locks the Z-extra blocks, so that they don't appear as filler
		make_Z_extraBlocks = false;
		
    					// Extra sidecubes ## Side: +X    	
    						PlaceBlock (Vector3 ( j + Random.Range(1, 2), Random.Range(1, 1), 	i ) );
         	  		  	
     // Yield to slow generationProcess down 
    	yield WaitForSeconds(generateSpeed);
  	 }
 
}
///////////////////////////////////////	

function PlaceBlock ( position : Vector3 )
{	
	yield WaitForSeconds (Random.Range ( 1, 5) );

	var randomStartPos 		: Vector3 = Vector3 ( Random.Range ( - 4.5, 4.5 ), -0.5, Random.Range ( - 4.5, 4.5 ) );
	var objectType 	   		: Transform;
	var randomObjectType	: int 	  = Random.Range ( 0, 9 );
	
	if ( randomObjectType <= 4 )
	{
		objectType = floraGenerator;
	}
	else 
	{
		objectType = blocktypeMain;
	}

	var newBlock		: Transform 	= Instantiate (objectType, transform.position + randomStartPos + position, Quaternion.identity);

	newBlock.gameObject.transform.parent 			= objectHolder.transform;
	
	if ( newBlock.transform.position.y >= 1 )
	{
		var newBlockPos : Vector3   = newBlock.transform.position;

		var bottomBlock : Transform = Instantiate ( blocktypeMain, newBlockPos - Vector3 ( 0, 1, 0 ), Quaternion.identity );
	
		bottomBlock.gameObject.transform.parent 	= objectHolder.transform;
	}	
	
	if ( objectType == blocktypeMain )
	{
		LerpSize ( newBlock, Vector3 ( 10, 10, 10 ), 15.0, 25.0 );	
	}
}






















