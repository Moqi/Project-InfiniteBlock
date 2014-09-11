#pragma strict
#pragma downcast
///////////////////////////////////////////////////////////////////////////
///////////////////// Procedural Generated Tree script ////////////////////
///////////////////////////////////////////////////////////////////////////

		var DebugMode			: boolean 		= false;
		
static 	var generateTree 		: boolean		= false;
static	var generateBush		: boolean		= false;
static	var generateRock		: boolean 		= false;
static	var randomPick			: boolean 		= true;

private var generatorStartPos 	: Vector3;		

		var squareTexture		: Texture;
		var effectLegendary 	: Transform;

		/////////////////////////////////////////////
	
private var dataBase			: ItemDatabase;
		// TreeGenerator
		var manualHeightActive  : boolean 		= false;
		var logHeightManual		: int;
		var crownHeightManual	: int;
		var crownDividedBy		: int;
		
		var logPiece 			: Transform;
		var logPieceRotateBy    : float 		= 10;
private var logHeight 			: int;
private var treeLogArray						= new Array();
	
		var crownPiece 			: Transform;
		var crownPieceRotateBy  : float 		= 25;
private var crownHeight 		: int;
private var crownHeightDividedBy: int;
private var treeCrownArray						= new Array();

		/////////////////////////////////////////////
		// BushGenerator
		var bushPiece 			: Transform;
		var bushRotateBy 		: float 		= 10;
private var bushHeight 			: int;		
private var bushArray							= new Array();

		/////////////////////////////////////////////
		// RockGenerator	
		var rockPiece 			: Transform;
		var rockRotateBy		: float			= 10;
private var rockHeight			: int;
private var rockArray 							= new Array();

		/////////////////////////////////////////////
		
		// Effects
		var effectWoodHit 		: Transform;
		var effectPlantHit 		: Transform;
		var effectRockHit 		: Transform;

////////////////////////////////////////////////////////////
function Start () 
{	
	dataBase 				= GameObject.FindGameObjectWithTag ( "ItemDatabase" ).GetComponent ( ItemDatabase );
	
	generatorStartPos 		= transform.position;

	if (manualHeightActive == true)
	{	
		logHeight			= logHeightManual;
		crownHeight 		= crownHeightManual;
		crownHeightDividedBy= crownDividedBy;
	}
	else 
	{
		logHeight 			= Random.Range(3, 6);
		crownHeight	 		= Random.Range(6, 8);
		crownHeightDividedBy= 2;
	}

	//logPiece.localScale 	= Vector3 (1, 0.5, 1);
	crownPiece.localScale 	= Vector3 (1, 0.5, 1);
	
	//bushPiece.localScale 	= Vector3 (1, 0.3, 1);		
	bushHeight 				= Random.Range(3, 6);
	
	//rockPiece.localScale	= Vector3 (1, 0.3, 1);
	rockHeight 				= Random.Range(3, 6);
			

	if (randomPick == false) // if manual pick, then...
	{			
		if (generateTree == true)
		{	generateBush = false;
			generateRock = false;	
			transform.position.y -= 0.75;
			TreeGenerator ();			Message ( "manualPick - Generating a tree!" );
		}		
		else if (generateBush == true)
		{		 generateTree = false;
				 generateRock = false;
			transform.position.y -= 0.65;
			BushGenerator ();			Message ( "manualPick - Generating a bush!" );
		}
		else if (generateRock == true)
		{		 generateBush = false;
				 generateTree = false;			
			transform.position.y -= 0.65;
			RockGenerator ();			Message ( "manualPick - Generating a rock!" );		
		}
	}
	else // Pick a random generationform - tree or bush
	{
		var chanceOfObject_01 	: float 		= 33.33;		// if number is below x, then (= x-chance for this to happen) 
	    var chanceOfObject_02 	: float 		= 33.33;		// 33.33 % chance 
		var chanceOfObject_03 	: float 		= 33.33;
		var randomNum 			: float 		= Random.Range(0.0, 100.0); 

		if (randomNum < chanceOfObject_01)
		{
			transform.position.y -= 0.75;
			Message ( "RandomPick - Generating a tree!" );
			TreeGenerator();	
		}
		else if (randomNum < chanceOfObject_01 + chanceOfObject_02)
		{
			transform.position.y -= 0.65;
			Message ( "RandomPick - Generating a bush!" );
			BushGenerator ();	
		}
		else if (randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03) 
		{
			transform.position.y -= 0.65;
			Message ( "RandomPick - Generating a rock!" );
			RockGenerator ();	
		}
		else 
		{
			transform.position.y -= 0.75;	
			Message ( "RandomPick - Generating a tree!" );
			TreeGenerator();	
		}
	}	
}


/////////////////////////////////////////////////////////
function Update () 
{
	
}

///////////////////////////////////////////////////////////////	IMPORTANT: Remember to add this script to the script execution order list.
function ObjectType ( object : Transform, objectID : int ) 	/// 		   If this is not done, the function will not be executed in the right order. 
{
	for ( var i : int = 0; i < dataBase.items.Count; i++ )
	{
		if ( dataBase.items[i].itemID == objectID )
		{
			var dataBaseItem : Item = dataBase.items[i];
			
			object.GetComponent(Object_ItemType).item = dataBaseItem;
		}
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////
function SetMaterialAndColor ( object : Transform, fromLightToDark : boolean, colorChangeAmount : Color )
{
	// Material & color		
	//object.renderer.material 				= new Material(Shader.Find("Transparent/Diffuse"));
	object.renderer.material 				= object.GetComponent(Object_ItemType).item.itemMaterial;
	object.renderer.material.mainTexture 	= object.GetComponent(Object_ItemType).item.itemTexture;;	
	object.renderer.material.color 			= object.GetComponent(Object_ItemType).item.itemColor;
	//object.renderer.material.color.a 		= 1.0;
	if ( fromLightToDark )
	{
		object.renderer.material.color 			-= colorChangeAmount;
	}
	else 
	{
		object.renderer.material.color 			+= colorChangeAmount;
	}	
}	

/////////////////////////////////////////////////////////
function TreeGenerator ()
{
	var logColor   : int = dataBase.randomRarityPicker_treeLog 	 ();					// Define object type from database
	var crownColor : int = dataBase.randomRarityPicker_treeCrown ();					// Define object type from databse
	
	for (var i : int = 0; i < logHeight; i++)											// Generate the treeLog
	{
			transform.eulerAngles 	+= Vector3 (0, logPieceRotateBy, 0);				// Rotate new generated piece by variable 'logPieceRotateBy'
			
			var yPosLog 			= transform.position.y + 0.5;						// + 1 to y-pos
		
			transform.position		= Vector3( transform.position.x + Random.Range(-0.2, 0.2), yPosLog, transform.position.z + Random.Range(-0.2, 0.2));	// Random placement
			
		var newLogPiece : Transform = Instantiate(logPiece, transform.position, transform.rotation);	// Generate new piece
		
			treeLogArray.Push(newLogPiece);												// Pushing instantiated object to treeCrownArray			
			
			ObjectType ( newLogPiece, logColor );										// Gets object from database
				
			SetMaterialAndColor ( newLogPiece, true, Color(0.0, 0.0, 0.0, 0) );			// Sets material, color, and color decrease/increase level based on new instance of item() from database
						
				var endScale_01  	: Vector3;											// Change Size 
				var objectHeight 	: float = 0.5;										// Sets object height
				
				var log_level_1_min : float = 0.75;										// logSize from ground and up	
				var log_level_1_max : float = 0.85;	
				var log_level_2_min : float = 0.65;
				var log_level_2_max : float = 0.75;
				var log_level_3_min : float = 0.55;
				var log_level_3_max : float = 0.65;
				var log_level_4_min : float = 0.45;
				var log_level_4_max : float = 0.55;
				var log_level_5_min : float = 0.35;
				var log_level_5_max : float = 0.45;
				var log_level_6_min : float = 0.25;
				var log_level_6_max : float = 0.35;
				var log_level_7_min : float = 0.15;
				var log_level_7_max : float = 0.25;
							
			if ( 		transform.position.y 	>= generatorStartPos.y + 0.5 && transform.position.y <= generatorStartPos.y + 1 )
			{	
				SetMaterialAndColor ( newLogPiece, true, Color(0.1, 0.1, 0.1, 0) );
				LerpScale (endScale_01, log_level_1_min, log_level_1_max, objectHeight, newLogPiece, 		"logStart.level (1)" 	);		
			}
			else if ( 	transform.position.y 	>= generatorStartPos.y + 1 && transform.position.y <= generatorStartPos.y + 1.5 )
			{
				SetMaterialAndColor ( newLogPiece, true, Color(0.15, 0.15, 0.15, 0) );
				LerpScale (endScale_01, log_level_2_min, log_level_2_max, objectHeight, newLogPiece, 	"logStart.level (2)" 	);	
			}
			else if ( 	transform.position.y 	>= generatorStartPos.y + 1.5 && transform.position.y <= generatorStartPos.y + 2 )
			{
				SetMaterialAndColor ( newLogPiece, true, Color(0.20, 0.20, 0.20, 0) );
				LerpScale (endScale_01, log_level_3_min, log_level_3_max, objectHeight, newLogPiece, 		"logStart.level (3)" 	);	
			}
			else if ( 	transform.position.y 	>= generatorStartPos.y + 2 && transform.position.y <= generatorStartPos.y + 2.5 )
			{
				SetMaterialAndColor ( newLogPiece, true, Color(0.25, 0.25, 0.25, 0) );
				LerpScale (endScale_01, log_level_4_min, log_level_4_max, objectHeight, newLogPiece, 		"logStart.level (4)" 	);	
			}
			else if (	transform.position.y 	>= generatorStartPos.y + 2.5 && transform.position.y <= generatorStartPos.y + 3 )
			{
				SetMaterialAndColor ( newLogPiece, true, Color(0.30, 0.30, 0.30, 0) );
				LerpScale (endScale_01, log_level_5_min, log_level_5_max, objectHeight, newLogPiece, 		"logStart.level (5)" 	);	
			}
			else if (	transform.position.y 	>= generatorStartPos.y + 3 && transform.position.y <= generatorStartPos.y + 3.5 )
			{
				SetMaterialAndColor ( newLogPiece, true, Color(0.35, 0.35, 0.35, 0) );
				LerpScale (endScale_01, log_level_6_min, log_level_6_max, objectHeight, newLogPiece, 		"logStart.level (6)" 	);	
			}
			else if (	transform.position.y 	>= generatorStartPos.y + 3.5 && transform.position.y <= generatorStartPos.y + 4 )
			{
				SetMaterialAndColor ( newLogPiece, true, Color(0.40, 0.40, 0.40, 0) );
				LerpScale (endScale_01, log_level_7_min, log_level_7_max, objectHeight, newLogPiece, 		"logStart.level (7)" 	);	
			}
		yield WaitForSeconds(0.5);
	}
	
	if (i >= logHeight)																						
	{
		for (var j : int = 0; j < crownHeight; j++)															// Generate the treecrown
		{
				transform.eulerAngles 	+= Vector3 (0, crownPieceRotateBy, 0);								// Rotate new generated piece by variable 'logPieceRotateBy'	
		
				var yPosCrown 			= transform.position.y + 0.5;										// + 1 to y-pos
	
				transform.position 		= Vector3( transform.position.x + Random.Range(-0.2, 0.2), yPosCrown, transform.position.z + Random.Range(-0.2, 0.2)); // Random placement
	
			var newCrownPiece : Transform = Instantiate(crownPiece, transform.position, transform.rotation); // Generate new piece
	
				treeCrownArray.Push(newCrownPiece);															// Pushing instantiated object to treeCrownArray			
			
				ObjectType ( newCrownPiece, crownColor );
				
				SetMaterialAndColor ( newCrownPiece, false, Color(0.0, 0.0, 0.0, 0) );
				
				var endScale_02    	  : Vector3;															// Change Size
				
				var crown_level_1_min : float = 0.5;														// CrownSize from middle and down		
				var crown_level_1_max : float = 0.8;		
				var crown_level_2_min : float = 0.8;		
				var crown_level_2_max : float = 1.2;	
				var crown_level_3_min : float = 1.2;		
				var crown_level_3_max : float = 1.5;		
				var crown_level_4_min : float = 1.5;		
				var crown_level_4_max : float = 2.0;		
				var crown_level_5_min : float = 2.0;		
				var crown_level_5_max : float = 2.5;		
				var crown_level_6_min : float = 2.5;		
				var crown_level_6_max : float = 3.0;		
			
				var crown_topLevel_1_min : float = 1.5;														// CrownSize from middle and up
				var crown_topLevel_1_max : float = 2.5;		
				var crown_topLevel_2_min : float = 1.7;		
				var crown_topLevel_2_max : float = 2.3;		
				var crown_topLevel_3_min : float = 1.4;	
				var crown_topLevel_3_max : float = 1.7;	
				var crown_topLevel_4_min : float = 1.0;		
				var crown_topLevel_4_max : float = 1.4;		
				var crown_topLevel_5_min : float = 0.8;		
				var crown_topLevel_5_max : float = 1.0;		
				var crown_topLevel_6_min : float = 0.6;		
				var crown_topLevel_6_max : float = 0.8;		
				var crown_topLevel_7_min : float = 0.4;		
				var crown_topLevel_7_max : float = 0.6;		
				var crown_topLevel_8_min : float = 0.2;		
				var crown_topLevel_8_max : float = 0.4;		
			
			if (j < crownHeight / crownHeightDividedBy)
			{
				if ( 		transform.position.y 	>= generatorStartPos.y + 0.5 && transform.position.y <= generatorStartPos.y + 3 )
				{
					SetMaterialAndColor ( newCrownPiece, true, Color(0.30, 0.30, 0.30, 0) );
					LerpScale (endScale_02, crown_level_1_min, crown_level_1_max, objectHeight, newCrownPiece, "crownStart.level (1)" );	
				}
				else if ( 	transform.position.y 	>= generatorStartPos.y + 3 && transform.position.y <= generatorStartPos.y + 3.5 )
				{
					SetMaterialAndColor ( newCrownPiece, true, Color(0.25, 0.25, 0.25, 0) );
					LerpScale (endScale_02, crown_level_2_min, crown_level_2_max, objectHeight, newCrownPiece, "crownStart.level (2)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 3.5 && transform.position.y <= generatorStartPos.y + 4 )
				{
					SetMaterialAndColor ( newCrownPiece, true, Color(0.20, 0.20, 0.20, 0) );
					LerpScale (endScale_02, crown_level_3_min, crown_level_3_max, objectHeight, newCrownPiece, "crownStart.level (3)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 4 && transform.position.y <= generatorStartPos.y + 4.5 )
				{
					SetMaterialAndColor ( newCrownPiece, true, Color(0.15, 0.15, 0.15, 0) );
					LerpScale (endScale_02, crown_level_4_min, crown_level_4_max, objectHeight, newCrownPiece, "crownStart.level (4)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 4.5 && transform.position.y <= generatorStartPos.y + 5 )
				{
					SetMaterialAndColor ( newCrownPiece, true, Color(0.10, 0.10, 0.10, 0) );
					LerpScale (endScale_02, crown_level_5_min, crown_level_5_max, objectHeight, newCrownPiece, "crownStart.level (5)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 5 && transform.position.y <= generatorStartPos.y + 5.5 )
				{
					SetMaterialAndColor ( newCrownPiece, true, Color(0.05, 0.05, 0.05, 0) );
					LerpScale (endScale_02, crown_level_6_min, crown_level_6_max, objectHeight, newCrownPiece, "crownStart.level (6)" );
				}
			}
			else 
			{	
				if ( 		transform.position.y 	>= generatorStartPos.y + 3.5 && transform.position.y <= generatorStartPos.y + 4 )
				{	
					SetMaterialAndColor ( newCrownPiece, false, Color(0.00, 0.00, 0.00, 0) );
					LerpScale (endScale_02, crown_topLevel_1_min, crown_topLevel_1_max, objectHeight, newCrownPiece, "crownMiddle.level (1)" );
				}
				else if ( 	transform.position.y 	>= generatorStartPos.y + 4 && transform.position.y <= generatorStartPos.y + 4.5)
				{
					SetMaterialAndColor ( newCrownPiece, false, Color(0.05, 0.05, 0.05, 0) );
					LerpScale (endScale_02, crown_topLevel_2_min, crown_topLevel_2_max, objectHeight, newCrownPiece, "crownMiddle.level (2)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 4.5 && transform.position.y <= generatorStartPos.y + 5 )
				{	
					SetMaterialAndColor ( newCrownPiece, false, Color(0.10, 0.10, 0.10, 0) );
					LerpScale (endScale_02, crown_topLevel_3_min, crown_topLevel_3_max, objectHeight, newCrownPiece, "crownMiddle.level (3)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 5 && transform.position.y <= generatorStartPos.y + 5.5 )
				{
					SetMaterialAndColor ( newCrownPiece, false, Color(0.15, 0.15, 0.15, 0) );
					LerpScale (endScale_02, crown_topLevel_4_min, crown_topLevel_4_max, objectHeight, newCrownPiece, "crownMiddle.level (4)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 5.5 && transform.position.y <= generatorStartPos.y + 6 )
				{	
					SetMaterialAndColor ( newCrownPiece, false, Color(0.20, 0.20, 0.20, 0) );
					LerpScale (endScale_02, crown_topLevel_5_min, crown_topLevel_5_max, objectHeight, newCrownPiece, "crownMiddle.level (5)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 6 && transform.position.y <= generatorStartPos.y + 6.5 )
				{
					SetMaterialAndColor ( newCrownPiece, false, Color(0.25, 0.25, 0.25, 0) );
					LerpScale (endScale_02, crown_topLevel_6_min, crown_topLevel_6_max, objectHeight, newCrownPiece, "crownMiddle.level (6)" );
				}	
				else if (	transform.position.y 	>= generatorStartPos.y + 6.5 && transform.position.y <= generatorStartPos.y + 7 )
				{
					SetMaterialAndColor ( newCrownPiece, false, Color(0.25, 0.25, 0.25, 0) );
					LerpScale (endScale_02, crown_topLevel_7_min, crown_topLevel_7_max, objectHeight, newCrownPiece, "crownMiddle.level (7)" );
				}								 
				else if (	transform.position.y 	>= generatorStartPos.y + 7 && transform.position.y <= generatorStartPos.y + 7.5 )
				{
					SetMaterialAndColor ( newCrownPiece, false, Color(0.25, 0.25, 0.25, 0) );
					LerpScale (endScale_02, crown_topLevel_8_min, crown_topLevel_8_max, objectHeight, newCrownPiece, "crownMiddle.level (8)" );
				}	
			}
			yield WaitForSeconds(0.5);
		}
	}
	if (i >= logHeight && j >= crownHeight)																		// Make treeParts (logs and crowns) childs of this object (parent)
	{
		for (var treeLogParts : Transform in treeLogArray) 
		{
			if ( treeLogParts != null )
			{
				treeLogParts.transform.parent 	= this.transform;
			}
		}
		
		for (var treeCrownParts : Transform in treeCrownArray) 
		{
			if ( treeCrownParts != null )
			{
				treeCrownParts.transform.parent = this.transform;
			}	
		}	
	} 
}


/////////////////////////////////////////////////
function BushGenerator ()
{
	var bushColor : int = dataBase.randomRarityPicker_Bush ();
	
	for (var i : int = 0; i < bushHeight; i++)
	{
			transform.eulerAngles 	+= Vector3 (0, bushRotateBy, 0);											// Rotate new generated piece by variable 'bushRotateBy'
		
			var yPosLog 			= transform.position.y + 0.3;												// + 1 to y-pos
		
			transform.position		= Vector3( transform.position.x + Random.Range(-0.05, 0.15), yPosLog, transform.position.z + Random.Range(-0.05, 0.15));	// Random placement
		
		var newBushPiece : Transform = Instantiate(bushPiece, transform.position, transform.rotation);			// Generate new piece
	
			bushArray.Push(newBushPiece);																		// Pushing instantiated object to bushArray		
	
			ObjectType ( newBushPiece, bushColor );
	
			SetMaterialAndColor ( newBushPiece, true, Color(0.25, 0.25, 0.25, 0) );
		
				var endScale    	 : Vector3;																	// Change Size 
				var objectHeight	 : float = 0.3;
			
				var bush_level_1_min : float = 0.90;	// bushSize from ground and up	(NOTE: numbers = numbers minus originalsize) 
				var bush_level_1_max : float = 0.95;
				var bush_level_2_min : float = 0.75;
				var bush_level_2_max : float = 0.90;
				var bush_level_3_min : float = 0.65;
				var bush_level_3_max : float = 0.75;
				var bush_level_4_min : float = 0.45;
				var bush_level_4_max : float = 0.65;
				var bush_level_5_min : float = 0.35;
				var bush_level_5_max : float = 0.45;
				var bush_level_6_min : float = 0.15;
			  	var bush_level_6_max : float = 0.35;
				var bush_level_7_min : float = 0.05;
				var bush_level_7_max : float = 0.15;
									
			if ( 		transform.position.y 		>= generatorStartPos.y + 0.3 && transform.position.y <= generatorStartPos.y + 0.6 )
			{
				SetMaterialAndColor ( newBushPiece, true, Color(0.15, 0.15, 0.15, 0) );
				LerpScale (endScale, bush_level_1_min, bush_level_1_max, objectHeight, newBushPiece, "bushStart.level (1)" 	);
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 0.6 && transform.position.y <= generatorStartPos.y + 0.9 )
			{
				SetMaterialAndColor ( newBushPiece, true, Color(0.10, 0.10, 0.10, 0) );
				LerpScale (endScale, bush_level_2_min, bush_level_2_max, objectHeight, newBushPiece, "bushStart.level (2)" );
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 0.9 && transform.position.y <= generatorStartPos.y + 1.2 )
			{
				SetMaterialAndColor ( newBushPiece, true, Color(0.05, 0.05, 0.05, 0) );
				LerpScale (endScale, bush_level_3_min, bush_level_3_max, objectHeight, newBushPiece, "bushStart.level (3)" );
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 1.2 && transform.position.y <= generatorStartPos.y + 1.5 )
			{
				SetMaterialAndColor ( newBushPiece, false, Color(0.05, 0.05, 0.05, 0) );
				LerpScale (endScale, bush_level_4_min, bush_level_4_max, objectHeight, newBushPiece, "bushStart.level (4)" );
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 1.5 && transform.position.y <= generatorStartPos.y + 1.8 )
			{
				SetMaterialAndColor ( newBushPiece, false, Color(0.10, 0.10, 0.10, 0) );
				LerpScale (endScale, bush_level_5_min, bush_level_5_max, objectHeight, newBushPiece, "bushStart.level (5)" );
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 1.8 && transform.position.y <= generatorStartPos.y + 2.1 )
			{
				SetMaterialAndColor ( newBushPiece, false, Color(0.15, 0.15, 0.15, 0) );
				LerpScale (endScale, bush_level_6_min, bush_level_6_max, objectHeight, newBushPiece, "bushStart.level (6)" );
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 2.1 && transform.position.y <= generatorStartPos.y + 2.4 )
			{
				SetMaterialAndColor ( newBushPiece, false, Color(0.25, 0.25, 0.25, 0) );
				LerpScale (endScale, bush_level_7_min, bush_level_7_max, objectHeight, newBushPiece, "bushStart.level (7)" );
			}
		yield WaitForSeconds(0.5);
	}
	if (i >= bushHeight)																								// Make bushParts childs of this object (parent)
	{
		for (var bushParts : Transform in bushArray) 
		{
			if ( bushParts != null )
			{
				bushParts.transform.parent = this.transform; 
			}	
		}	
	} 
}

/////////////////////////////////////////////////
function RockGenerator ()
{
	var rockColor	: int = dataBase.randomRarityPicker_Rock ();
	
	for (var i : int = 0; i < rockHeight; i++)
	{
			transform.eulerAngles 	+= Vector3 (0, rockRotateBy, 0);															// Rotate new generated piece by variable 'rockRotateBy'
		
			var yPosLog 			= transform.position.y + 0.3;																// + 1 to y-pos
		
			transform.position		= Vector3( transform.position.x + Random.Range(-0.05, 0.15), yPosLog, transform.position.z + Random.Range(-0.05, 0.15));	// Random placement
	
		var newRockPiece : Transform 				= Instantiate(rockPiece, transform.position, transform.rotation);			// Generate new piece with custom material and color
		
			rockArray.Push(newRockPiece);																						// Pushing instantiated object to bushArray		
			
			ObjectType ( newRockPiece, rockColor );  																			// Setting object type!
	
			SetMaterialAndColor ( newRockPiece, true, Color(0.25, 0.25, 0.25, 0) );
			
			var endScale    	: Vector3;																						// Change Size 
			var objectHeight	: float	 = 0.3;
							
			var rock_level_1_min : float = 0.70;																				// rockSize from ground and up	(NOTE: numbers = numbers minus originalsize) 
			var rock_level_1_max : float = 0.95;	
			var rock_level_2_min : float = 0.60;
			var rock_level_2_max : float = 0.70;
			var rock_level_3_min : float = 0.50;
			var rock_level_3_max : float = 0.60;
			var rock_level_4_min : float = 0.40;
			var rock_level_4_max : float = 0.50;
			var rock_level_5_min : float = 0.30;
			var rock_level_5_max : float = 0.40;
			var rock_level_6_min : float = 0.20;
			var rock_level_6_max : float = 0.30;
			var rock_level_7_min : float = 0.10;
			var rock_level_7_max : float = 0.20;
			
									
			if ( 		transform.position.y 		>= generatorStartPos.y + 0.3 && transform.position.y <= generatorStartPos.y + 0.6 )
			{
				SetMaterialAndColor ( newRockPiece, true, Color(0.15, 0.15, 0.15, 0) );
				LerpScale (endScale, rock_level_1_min, rock_level_1_max, objectHeight, newRockPiece, "rockStart.level (1)" 	);
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 0.6 && transform.position.y <= generatorStartPos.y + 0.9 )
			{
				SetMaterialAndColor ( newRockPiece, true, Color(0.10, 0.10, 0.10, 0) );
				LerpScale (endScale, rock_level_2_min, rock_level_2_max, objectHeight, newRockPiece, "rockStart.level (2)" 	);
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 0.9 && transform.position.y <= generatorStartPos.y + 1.2 )
			{
				SetMaterialAndColor ( newRockPiece, true, Color(0.05, 0.05, 0.05, 0) );
				LerpScale (endScale, rock_level_3_min, rock_level_3_max, objectHeight, newRockPiece, "rockStart.level (3)" 	);
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 1.2 && transform.position.y <= generatorStartPos.y + 1.5 )
			{
				SetMaterialAndColor ( newRockPiece, false, Color(0.05, 0.05, 0.05, 0) );
				LerpScale (endScale, rock_level_4_min, rock_level_4_max, objectHeight, newRockPiece, "rockStart.level (4)" 	);
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 1.5 && transform.position.y <= generatorStartPos.y + 1.8 )
			{
				SetMaterialAndColor ( newRockPiece, false, Color(0.10, 0.10, 0.10, 0) );
				LerpScale (endScale, rock_level_5_min, rock_level_5_max, objectHeight, newRockPiece, "rockStart.level (5)" 	);
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 1.8 && transform.position.y <= generatorStartPos.y + 2.1 )
			{
				SetMaterialAndColor ( newRockPiece, false, Color(0.15, 0.15, 0.15, 0) );
				LerpScale (endScale, rock_level_6_min, rock_level_6_max, objectHeight, newRockPiece, "rockStart.level (6)" 	);
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 2.1 && transform.position.y <= generatorStartPos.y + 2.4 )
			{
				SetMaterialAndColor ( newRockPiece, false, Color(0.25, 0.25, 0.25, 0) );
				LerpScale (endScale, rock_level_7_min, rock_level_7_max, objectHeight, newRockPiece, "rockStart.level (7)" 	);				
			}
		yield WaitForSeconds(0.5);
	}
	if (i >= rockHeight)																									// Make rockParts childs of this object (parent)
	{
		for (var rockParts : Transform in rockArray) 
		{
			if  ( rockParts != null )
			{
				rockParts.transform.parent = this.transform;
			}	
		}	
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////
function Message ( text : String ) 																							// debug mode handling for development - easy toggle on/off
{	
	if ( DebugMode )
		Debug.Log ( text );
}

/////////////////////////////////
function Message ( text : float )  																							// debug mode handling for development - easy toggle on/off
{
	if ( DebugMode )
		Debug.Log ( text );
}

///////////////////////////////
function Message ( text : int )    																							// debug mode handling for development - easy toggle on/off
{
	if ( DebugMode )
		Debug.Log ( text );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function LerpScale (endScale : Vector3, minRange : float, maxRange : float, objectHeight : float, scaleObject : Transform, message : String )
{
	//////////////////////////
	// Calculate scale 
	var t 			: float		= 0.0;
	var speed 		: float		= 0.0;
	var startScale 	: Vector3 	= Vector3.zero;
	
	endScale = Vector3 ( Random.Range ( minRange, maxRange ), objectHeight, Random.Range ( minRange, maxRange ) );			
	
	speed 						= Random.Range ( 1.0, 3.5 );
							
	while ( t < 1.0)
	{
		t += Time.deltaTime * speed;
		
		if ( scaleObject != null )
		{		
			scaleObject.localScale 	= Vector3.Lerp ( startScale, endScale, t );	
		}				
		yield;	
		
		transform.localScale 	= endScale;				
	}						
	Message ( message );
}








































