#pragma strict


private var spawnAmount 				 : int 			= 10;
		var objectHolder				 : Transform;
		var blocktypeMain 				 : Transform;
		var floraGenerator 				 : Transform;
		
/////////////////
function Start ()
{
	SpawnDetails ( this.transform );
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
function SpawnDetails ( pickedPlatform : Transform )
{
	yield WaitForSeconds (1.0);
 	
 	// Get all children of picked platform (SHUFFLED - see function below)
	var allChildren = ShuffleThis ( pickedPlatform.GetComponentsInChildren ( Transform ) );

 	for ( var i : int = 0; i < spawnAmount; i++ )
 	{
		var pickedChild : Transform = allChildren [ i ];
						
		//Debug.Log ( pickedChild );

		PlaceBlock ( pickedChild.transform.position );
 	}
}		

//////////////////////////////////////
// Description: This function shuffles / loops through an array, removing the previosly picked number so that it can't be picked again.
function ShuffleThis ( data : Array ) : Array
{  
    var size : int = data.length;
 
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

	var newBlock		: Transform 	= Instantiate (objectType, position, Quaternion.identity);

		newBlock.gameObject.transform.parent 			= objectHolder.transform;
	
		// Chance of extra block
			var chanceOfExtraPlatform_01 : float = 15.0;	
			var chanceOfExtraPlatform_02 : float = 5.0;
			//var chanceOfExtraPlatform_03 : float = 33.0;
			
			var randomNum 			: float = Random.Range(0.0, 100.0);
			 
			var placeExtraBlock_02 	: boolean = false;
		
			if ( 	  randomNum < chanceOfExtraPlatform_01 && objectType == blocktypeMain )
			{	
				//Debug.Log("Extra block!");
				PlaceExtraBlock ( newBlock, Vector3 ( 0, 1, 0 ) );
				placeExtraBlock_02 = true;
			}
			if ( randomNum < chanceOfExtraPlatform_01 + chanceOfExtraPlatform_02 && placeExtraBlock_02 == true )	
			{
				//Debug.Log("Extra block 2!");
				PlaceExtraBlock ( newBlock, ExtraBlockRandomPlacement ( 1 ) );
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

	var newBlock : Transform = Instantiate ( blocktypeMain, newBlockPos + newPos, Quaternion.identity );

	LerpSize ( newBlock, Vector3 ( 10, 10, 10 ), 70.0, 100.0 );	
	
	newBlock.gameObject.transform.parent = objectHolder.transform;
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
	{
		blockPos = Vector3 ( 1, blockHeight, 0 );
	}
	else if ( randomNum < chance_01 + chance_02 )
	{
		blockPos = Vector3 ( 0, blockHeight, 1 );
	}
	else if ( randomNum < chance_01 + chance_02 + chance_03 )
	{
		blockPos = Vector3 ( -1, blockHeight, 0 );
	}
	else if ( randomNum < chance_01 + chance_02 + chance_03 + chance_04 )
	{
		blockPos = Vector3 ( 0, blockHeight, -1 );
	}
	return blockPos;
}