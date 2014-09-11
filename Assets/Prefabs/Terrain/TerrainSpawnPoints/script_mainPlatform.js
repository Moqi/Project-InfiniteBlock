#pragma strict 
#pragma downcast
////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// mainPlatform Script ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

private var spawnAmount 				 : int 			= 10;

private var pickedPlatform				 : Transform;
private var platformType_forest			 : boolean		= false;
private var platformType_rock			 : boolean		= false;

		var platform_01 				 : Transform;
			var platform_01_Type_forest	 : Texture;
			var platform_01_Type_rock	 : Texture;
		var platform_02 				 : Transform;
			var platform_02_Type_forest	 : Texture;
			var platform_02_Type_rock	 : Texture;
		var platform_03 				 : Transform;
			var platform_03_Type_forest	 : Texture;
			var platform_03_Type_rock	 : Texture;
		
		var objectHolder				 : Transform;
		var blocktypeMain 				 : Transform;
			var mainBlockType_forest	 : Texture;
			var mainBlockType_rock		 : Texture;	
		var floraGenerator 				 : Transform;

private var picked_platform_01			 : boolean		= false;
private var picked_platform_02			 : boolean		= false;
private var picked_platform_03			 : boolean		= false;



///////////////////////////////////////
function Start ()
{	
	this.transform.parent = GameObject.FindWithTag ( "platformContainer" ).transform;
	
	PickRandomPlatform ();
}

///////////////////////////////////////
function PickRandomPlatform ()
{
	var chanceOfPlatform_01 : float = 33.0;	
	var chanceOfPlatform_02 : float = 33.0;
	var chanceOfPlatform_03 : float = 33.0;	
	var randomNum 		 	: float = Random.Range(0.0, 100.0); 
	
	if ( 	  randomNum < chanceOfPlatform_01 )
	{		pickedPlatform = platform_01;	picked_platform_01 = true; }						// Platform # 1
	
	else if ( randomNum < chanceOfPlatform_01 + chanceOfPlatform_02 )
	{		pickedPlatform = platform_02;	picked_platform_02 = true; }						// Platform # 2
	
	else if ( randomNum < chanceOfPlatform_01 + chanceOfPlatform_02 + chanceOfPlatform_03 )
	{		pickedPlatform = platform_03;	picked_platform_03 = true; }						// Platform # 3
	
	else {	pickedPlatform = platform_01;	picked_platform_01 = true; }						// Platform # 1
	
	var newPlatform : Transform = Instantiate ( pickedPlatform, this.transform.position, Quaternion.identity );	
	
		newPlatform.transform.position += Vector3 ( Random.Range( 0.005, 0.01 ), Random.Range( 0.005, 0.01 ), Random.Range( 0.005, 0.01 ) ); // adjusting position a tiny bit to avoid z-fighting
	
		newPlatform.transform.parent = this.transform;
	
	LerpSize 			( newPlatform.transform, Vector3 ( 10, 10, 10 ), 1.0, 2.5 );			// Scale function

	SpecifyPlatformType ( newPlatform );														// Specifies platformType

	SpawnDetails 		( newPlatform );														// Detail spawn function 
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Description: The type of platform is defined by the look of it - it's texture. 
// Because of that, the texture will change based on type of platform picked in this function. 
function SpecifyPlatformType ( pickedPlatform : Transform )
{
	var chanceOfPlatform_Type_01 : float = 95.0;	
	var chanceOfPlatform_Type_02 : float = 5.0;
	var chanceOfPlatform_Type_03 : float = 33.0;
	var randomNum 		 		 : float = Random.Range(0.0, 100.0); 
	
	///////// Platform_Type = Forest ///////////////
	if ( 	  randomNum < chanceOfPlatform_Type_01 )	
	{	
		platformType_rock   = false;
		platformType_forest	= true;
			
		if ( 		picked_platform_01 == true )
		{	pickedPlatform.gameObject.renderer.material.mainTexture = platform_01_Type_forest;		//Debug.Log ( "Platform_01_Type = forest" );	
		}
		else if ( 	picked_platform_02 == true )
		{	pickedPlatform.gameObject.renderer.material.mainTexture = platform_02_Type_forest;		//Debug.Log ( "Platform_02_Type = forest" );	
		}
		else if (	picked_platform_03 == true )
		{	pickedPlatform.gameObject.renderer.material.mainTexture = platform_03_Type_forest;		//Debug.Log ( "Platform_03_Type = forest" );	
		}	
	}	
	///////// Platform_Type = Rock ////////////////////////////////////////////
	else if ( randomNum < chanceOfPlatform_Type_01 + chanceOfPlatform_Type_02 )	
	{
		platformType_forest = false;
		platformType_rock	= true;
	
		if ( 		picked_platform_01 == true )
		{	pickedPlatform.gameObject.renderer.material.mainTexture = platform_01_Type_rock;		//Debug.Log ( "Platform_01_Type = rock" );	
		}
		else if ( 	picked_platform_02 == true )
		{	pickedPlatform.gameObject.renderer.material.mainTexture = platform_02_Type_rock;		//Debug.Log ( "Platform_02_Type = rock" );	
		}
		else if (	picked_platform_03 == true )
		{	pickedPlatform.gameObject.renderer.material.mainTexture = platform_03_Type_rock;		//Debug.Log ( "Platform_03_Type = rock" );	
		}	
	}		
}
//////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// 
function SpawnDetails ( pickedPlatform : Transform )
{
	yield WaitForSeconds (1.0);	
	
	var allChildren  = ShuffleThis ( pickedPlatform.GetComponentsInChildren ( Transform ) );	// Get all children of picked platform (SHUFFLED - see function below)

 	for ( var i : int = 0; i < spawnAmount; i++ )
 	{
		var pickedChild : Transform = allChildren [ i ];

		PlaceBlock ( pickedChild.transform.position );										// PlaceBlock function 
 	}
}		

//////////////////////////////////////
// Description: This function shuffles / loops through an array, removing the previosly picked number so that it can't be picked again.
function ShuffleThis ( data : Array ) : Array
{  
    var size   : int = data.length;
    for (var i : int = 0; i < size; i++)
    {
        var indexToSwap : int 	= Random.Range(i, size);
        var oldValue 			= data[i];
       
        data[i] 				= data[indexToSwap];
        data[indexToSwap] 		= oldValue;
    }
    return data;
}
																								
//////////////////////////////////////////
function PlaceBlock ( position : Vector3 )
{	
	yield WaitForSeconds (Random.Range ( 1, 5) );

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

	var newBlock		: Transform 			= Instantiate (objectType, position, Quaternion.identity);
		newBlock.gameObject.transform.parent 	= objectHolder.transform;
	
	// if platformType == rock and newblock has component proceduraltree, make rock!
	if ( 	 platformType_rock == true )	
	{
		if ( newBlock.GetComponent ( script_proceduralTree ) )
		{
			newBlock.GetComponent ( script_proceduralTree ).randomPick 		= false;
			newBlock.GetComponent ( script_proceduralTree ).generateRock 	= true;
		}
		if ( newBlock.gameObject.renderer )
		{
			newBlock.gameObject.renderer.material.mainTexture = mainBlockType_rock;
		}					
	}
	else
	{
		if ( newBlock.GetComponent ( script_proceduralTree ) )
		{
			newBlock.GetComponent ( script_proceduralTree ).randomPick 		= true;
			newBlock.GetComponent ( script_proceduralTree ).generateRock 	= false;
		}
		if ( newBlock.gameObject.renderer )
		{
			newBlock.gameObject.renderer.material.mainTexture = mainBlockType_forest;
		}	
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	// Chance of extra block
	var chanceOfExtraPlatform_01 : float = 15.0;	
	var chanceOfExtraPlatform_02 : float = 5.0;
	//var chanceOfExtraPlatform_03 : float = 33.0;
	
	var randomNum 			: float = Random.Range(0.0, 100.0);
	 
	var placeExtraBlock_02 	: boolean = false;
		
	if ( 	  randomNum < chanceOfExtraPlatform_01 && objectType == blocktypeMain )
	{	
		PlaceExtraBlock ( newBlock, Vector3 ( 0, 1, 0 ) );	//Debug.Log("Extra block!");
		placeExtraBlock_02 = true;
	}
	if ( randomNum < chanceOfExtraPlatform_01 + chanceOfExtraPlatform_02 && placeExtraBlock_02 == true )	
	{	
		PlaceExtraBlock ( newBlock, ExtraBlockRandomPlacement ( 1 ) );	//Debug.Log("Extra block 2!");
	}		
		
	if ( objectType == blocktypeMain )
	{
		LerpSize ( newBlock, Vector3 ( 10, 10, 10 ), 15.0, 25.0 );	
	}
}

///////////////////////////
function PlaceExtraBlock ( oldBlockPos : Transform, newPos : Vector3 ) 
{
	var newBlockPos : Vector3   = oldBlockPos.transform.position;
	var newBlock 	: Transform = Instantiate ( blocktypeMain, newBlockPos + newPos, Quaternion.identity );

	LerpSize ( newBlock, Vector3 ( 10, 10, 10 ), 70.0, 100.0 );	
	
	newBlock.gameObject.transform.parent = objectHolder.transform;
	
	if ( platformType_rock == true )	
	{
		newBlock.gameObject.renderer.material.mainTexture = mainBlockType_rock;
	}
}

//////////////////////////
function ExtraBlockRandomPlacement ( blockHeight : int ) : Vector3
{
	var blockPos  : Vector3;
	var chance_01 : float = 25.0;	
	var chance_02 : float = 25.0;
	var chance_03 : float = 25.0;
	var chance_04 : float = 25.0;
	var randomNum : float = Random.Range(0.0, 100.0);
	
	if ( 	  randomNum < chance_01 )
	{	blockPos = Vector3 ( 1, blockHeight, 0 );	}
	
	else if ( randomNum < chance_01 + chance_02 )
	{	blockPos = Vector3 ( 0, blockHeight, 1 );	}
	
	else if ( randomNum < chance_01 + chance_02 + chance_03 )
	{	blockPos = Vector3 ( -1, blockHeight, 0 );	}
	
	else if ( randomNum < chance_01 + chance_02 + chance_03 + chance_04 )
	{	blockPos = Vector3 ( 0, blockHeight, -1 );	}
	
	return blockPos;
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




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*	

		var generateSpeed				 : float 		= 0.5;
private var z_width		 				 : int; 			
private var x_width		 				 : int; 			
		var Min_Z_width  				 : int;
		var Max_Z_width	 				 : int;
		var Min_X_width  				 : int;
		var Max_X_width  				 : int; 
private var make_Z_extraBlocks 			 : boolean 		= true;	

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
*/










