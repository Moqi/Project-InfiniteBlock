#pragma strict
///////////////////////////////////////////////////////////////////////////
///////////////////// Procedural Generated Tree script ////////////////////
///////////////////////////////////////////////////////////////////////////

		var DebugMode			: boolean 		= false;
		
		var generateTree 		: boolean		= true;
		var generateBush		: boolean		= false;
		var generateRock		: boolean 		= false;
		var randomPick			: boolean 		= false;
private var chanceOfObject_01 	: float 		= 33.33;		// if number is below x, then (= x-chance for this to happen) 
private var chanceOfObject_02 	: float 		= 33.33;		// 33.33 % chance 
private var chanceOfObject_03 	: float 		= 33.33;
		
private var generatorStartPos 	: Vector3;		

private var lightGreen			: Color; 						// colors used in the colorPicker function	
private var mediumGreen 		: Color; 		
private var darkGreen	 		: Color; 		
private var lightGray			: Color;			
private var mediumGray			: Color;			
private var darkGray 			: Color;
private var lightBrown 			: Color;
private var mediumBrown 		: Color;
private var darkBrown 			: Color;

private var rareObject 			: boolean		= false;		// bools which defines objects rarity
private var veryRareObject 		: boolean		= false;
private var epicObject 			: boolean		= false;
private var legendaryObject 	: boolean		= false;
		
		var effectLegendary 	: Transform;

		/////////////////////////////////////////////
		// TreeGenerator
		var manualHeightActive  : boolean 		= false;
		var logHeightManual		: int;
		var crownHeightManual	: int;
		var crownDividedBy		: int;
		
		var logPiece 			: Transform;
		var logPieceRotateBy    : float 		= 10;
private var logHeight 			: int;
		
		var crownPiece 			: Transform;
		var crownPieceRotateBy  : float 		= 25;
private var crownHeight 		: int;
private var crownHeightDividedBy: int;

private var treeArray							= new Array();

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
/////////////////////////////////////////////////
// TreeGeneration:		
		transform.position.y -= 0.75;
		
			Message ( "manualPick - Generating a tree!" );
	
		TreeGenerator ();
		
/////////////////////////////////////////////////	
	}		
	else if (generateBush == true)
	{		 generateTree = false;
			 generateRock = false;
/////////////////////////////////////////////////	
// BushGeneration: 
		transform.position.y -= 0.65;
		
			Message ( "manualPick - Generating a bush!" );
		
		BushGenerator ();
		
/////////////////////////////////////////////////		
	}
	else if (generateRock == true)
	{		 generateBush = false;
			 generateTree = false;
/////////////////////////////////////////////////			
		transform.position.y -= 0.65;
		
			Message ( "manualPick - Generating a rock!" );
	
		RockGenerator ();
		
/////////////////////////////////////////////////				
	}
  }
  else // Pick a random generationform - tree or bush
  {
	var randomNum : float = Random.Range(0.0, 100.0); 
	
	if (randomNum < chanceOfObject_01)
	{
		transform.position.y -= 0.75;
		
			Message ( "RandomPick - Generating a tree!" );
		
		return(TreeGenerator());
	}
	else if (randomNum < chanceOfObject_01 + chanceOfObject_02)
	{
		transform.position.y -= 0.65;
		
			Message ( "RandomPick - Generating a bush!" );
		
		return(BushGenerator ());
	}
	else if (randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03) 
	{
		transform.position.y -= 0.65;
		
			Message ( "RandomPick - Generating a rock!" );
		
		return(RockGenerator ());
	}
	else 
	{
		transform.position.y -= 0.75;
		
			Message ( "RandomPick - Generating a tree!" );
	
		return(TreeGenerator());
	}
  }	
}


/////////////////////////////////////////////////////////
function Update () 
{
	
}

/////////////////////////////////////////////////////////
function TreeGenerator ()
{
	// Define object color:
	randomColorVariant ();
	
	// LogPieceGenerator
	
	for (var i : int = 0; i < logHeight; i++)
	{
		// Rotate new generated piece by variable 'logPieceRotateBy'
			transform.eulerAngles 	+= Vector3 (0, logPieceRotateBy, 0);
		
		// + 1 to y-pos
			var yPosLog 			= transform.position.y + 0.5;
		
		// Random placement
			transform.position		= Vector3( transform.position.x + Random.Range(-0.2, 0.2), yPosLog, transform.position.z + Random.Range(-0.2, 0.2));
		
		// Generate new piece
		var newLogPiece : Transform = Instantiate(logPiece, transform.position, transform.rotation);
	
		// Change Size 
				var endScale_01  	: Vector3;
				var objectHeight 	: float = 0.5;
				
			// logSize from ground and up	
				var log_level_1_min : float = 0.75;
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
				LerpScale (endScale_01, log_level_1_min, log_level_1_max, objectHeight, newLogPiece, lightBrown, 		"logStart.level (1)" 	);		
			}
			else if ( 	transform.position.y 	>= generatorStartPos.y + 1 && transform.position.y <= generatorStartPos.y + 1.5 )
			{
				LerpScale (endScale_01, log_level_2_min, log_level_2_max, objectHeight, newLogPiece, mediumBrown, 	"logStart.level (2)" 	);	
			}
			else if ( 	transform.position.y 	>= generatorStartPos.y + 1.5 && transform.position.y <= generatorStartPos.y + 2 )
			{
				LerpScale (endScale_01, log_level_3_min, log_level_3_max, objectHeight, newLogPiece, darkBrown, 		"logStart.level (3)" 	);	
			}
			else if ( 	transform.position.y 	>= generatorStartPos.y + 2 && transform.position.y <= generatorStartPos.y + 2.5 )
			{
				LerpScale (endScale_01, log_level_4_min, log_level_4_max, objectHeight, newLogPiece, darkBrown, 		"logStart.level (4)" 	);	
			}
			else if (	transform.position.y 	>= generatorStartPos.y + 2.5 && transform.position.y <= generatorStartPos.y + 3 )
			{
				LerpScale (endScale_01, log_level_5_min, log_level_5_max, objectHeight, newLogPiece, darkBrown, 		"logStart.level (5)" 	);	
			}
			else if (	transform.position.y 	>= generatorStartPos.y + 3 && transform.position.y <= generatorStartPos.y + 3.5 )
			{
				LerpScale (endScale_01, log_level_6_min, log_level_6_max, objectHeight, newLogPiece, darkBrown, 		"logStart.level (6)" 	);	
			}
			else if (	transform.position.y 	>= generatorStartPos.y + 3.5 && transform.position.y <= generatorStartPos.y + 4 )
			{
				LerpScale (endScale_01, log_level_7_min, log_level_7_max, objectHeight, newLogPiece, darkBrown, 		"logStart.level (7)" 	);	
			}
		
			treeArray.Push(newLogPiece);	// Pushing instantiated object to treeArray		
		
		// Define tagname based on rarity
		RarityHandler ( newLogPiece, 
						"treeLogPiece", 	// commonTagName
						"treeLogPiece", 	// rareTagName
						"treeLogPiece", 	// very rare tagName
						"treeLogPiece", 	// epic tagName
						"treeLogPiece");	// legendary tagName
		
		yield WaitForSeconds(0.5);
	}
	
	////////////////////////////////////////
	// CrownGenerator
	
	if (i >= logHeight)
	{
		for (var j : int = 0; j < crownHeight; j++)
		{
			// Rotate new generated piece by variable 'logPieceRotateBy'
				transform.eulerAngles += Vector3 (0, crownPieceRotateBy, 0);
		
			// + 1 to y-pos
				var yPosCrown = transform.position.y + 0.5;
		
			// Random placement
				transform.position = Vector3( transform.position.x + Random.Range(-0.2, 0.2), yPosCrown, transform.position.z + Random.Range(-0.2, 0.2));
	
			// Generate new piece
			var newCrownPiece : Transform = Instantiate(crownPiece, transform.position, transform.rotation);
	
			// Change Size
				var endScale_02    : Vector3;
				
			// CrownSize from middle and down	
				var crown_level_1_min : float = 0.5;		
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
			
			// CrownSize from middle and up
			
				var crown_topLevel_1_min : float = 1.5;		
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
				if ( 		transform.position.y 	>= generatorStartPos.y + 2.5 && transform.position.y <= generatorStartPos.y + 3 )
				{
					LerpScale (endScale_02, crown_level_1_min, crown_level_1_max, objectHeight, newCrownPiece, darkGreen, "crownStart.level (1)" );	
				}
				else if ( 	transform.position.y 	>= generatorStartPos.y + 3 && transform.position.y <= generatorStartPos.y + 3.5 )
				{
					LerpScale (endScale_02, crown_level_2_min, crown_level_2_max, objectHeight, newCrownPiece, darkGreen, "crownStart.level (2)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 3.5 && transform.position.y <= generatorStartPos.y + 4 )
				{
					LerpScale (endScale_02, crown_level_3_min, crown_level_3_max, objectHeight, newCrownPiece, darkGreen, "crownStart.level (3)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 4 && transform.position.y <= generatorStartPos.y + 4.5 )
				{
					LerpScale (endScale_02, crown_level_4_min, crown_level_4_max, objectHeight, newCrownPiece, darkGreen, "crownStart.level (4)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 4.5 && transform.position.y <= generatorStartPos.y + 5 )
				{
					LerpScale (endScale_02, crown_level_5_min, crown_level_5_max, objectHeight, newCrownPiece, darkGreen, "crownStart.level (5)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 5 && transform.position.y <= generatorStartPos.y + 5.5 )
				{
					LerpScale (endScale_02, crown_level_6_min, crown_level_6_max, objectHeight, newCrownPiece, darkGreen, "crownStart.level (6)" );
				}
			}
			else 
			{	
				if ( 		transform.position.y 	>= generatorStartPos.y + 3.5 && transform.position.y <= generatorStartPos.y + 4 )
				{	
					LerpScale (endScale_02, crown_topLevel_1_min, crown_topLevel_1_max, objectHeight, newCrownPiece, mediumGreen, "crownMiddle.level (1)" );
				}
				else if ( 	transform.position.y 	>= generatorStartPos.y + 4 && transform.position.y <= generatorStartPos.y + 4.5)
				{
					LerpScale (endScale_02, crown_topLevel_2_min, crown_topLevel_2_max, objectHeight, newCrownPiece, mediumGreen, "crownMiddle.level (2)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 4.5 && transform.position.y <= generatorStartPos.y + 5 )
				{	
					LerpScale (endScale_02, crown_topLevel_3_min, crown_topLevel_3_max, objectHeight, newCrownPiece, lightGreen, "crownMiddle.level (3)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 5 && transform.position.y <= generatorStartPos.y + 5.5 )
				{
					LerpScale (endScale_02, crown_topLevel_4_min, crown_topLevel_4_max, objectHeight, newCrownPiece, lightGreen, "crownMiddle.level (4)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 5.5 && transform.position.y <= generatorStartPos.y + 6 )
				{	
					LerpScale (endScale_02, crown_topLevel_5_min, crown_topLevel_5_max, objectHeight, newCrownPiece, lightGreen, "crownMiddle.level (5)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 6 && transform.position.y <= generatorStartPos.y + 6.5 )
				{
					LerpScale (endScale_02, crown_topLevel_6_min, crown_topLevel_6_max, objectHeight, newCrownPiece, lightGreen, "crownMiddle.level (6)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 6.5 && transform.position.y <= generatorStartPos.y + 7 )
				{
					LerpScale (endScale_02, crown_topLevel_7_min, crown_topLevel_7_max, objectHeight, newCrownPiece, lightGreen, "crownMiddle.level (7)" );
				}								 
				else if (	transform.position.y 	>= generatorStartPos.y + 7 && transform.position.y <= generatorStartPos.y + 7.5 )
				{
					LerpScale (endScale_02, crown_topLevel_8_min, crown_topLevel_8_max, objectHeight, newCrownPiece, lightGreen, "crownMiddle.level (8)" );
				}	
			}
	
			treeArray.Push(newCrownPiece);	// Pushing instantiated object to treeArray
		
		// Define tagname based on rarity
		RarityHandler ( newCrownPiece, 
						"treeCrownPiece", 	// commonTagName
						"treeCrownPiece", 	// rareTagName
						"treeCrownPiece", 	// very rare tagName
						"treeCrownPiece", 	// epic tagName
						"treeCrownPiece");	// legendary tagName	
	
			yield WaitForSeconds(0.5);
		}
	}
		
	// Make treeParts (logs and crowns) childs of this object (parent)
	if (i >= logHeight && j >= crownHeight)
	{
		for (var treeParts : Transform in treeArray) 
		{
			treeParts.transform.parent = this.transform;
		}	
	} 
}


/////////////////////////////////////////////////
function BushGenerator ()
{
	randomColorVariant ();	// Sets color

	// BushGenerator
	
	for (var i : int = 0; i < bushHeight; i++)
	{
		// Rotate new generated piece by variable 'bushRotateBy'
			transform.eulerAngles 	+= Vector3 (0, bushRotateBy, 0);
		
		// + 1 to y-pos
			var yPosLog 			= transform.position.y + 0.3;
		
		// Random placement
			transform.position		= Vector3( transform.position.x + Random.Range(-0.05, 0.15), yPosLog, transform.position.z + Random.Range(-0.05, 0.15));
		
		// Generate new piece
		var newBushPiece : Transform = Instantiate(bushPiece, transform.position, transform.rotation);
	
		// Change Size 		
				var endScale    	 : Vector3;
				var objectHeight	 : float = 0.3;
				
			// bushSize from ground and up	(NOTE: numbers = numbers minus originalsize) 
				var bush_level_1_min : float = 0.90;
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
				LerpScale (endScale, bush_level_1_min, bush_level_1_max, objectHeight, newBushPiece, darkGreen, "bushStart.level (1)" 	);
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 0.6 && transform.position.y <= generatorStartPos.y + 0.9 )
			{
				LerpScale (endScale, bush_level_2_min, bush_level_2_max, objectHeight, newBushPiece, mediumGreen, "bushStart.level (2)" );
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 0.9 && transform.position.y <= generatorStartPos.y + 1.2 )
			{
				LerpScale (endScale, bush_level_3_min, bush_level_3_max, objectHeight, newBushPiece, mediumGreen, "bushStart.level (3)" );
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 1.2 && transform.position.y <= generatorStartPos.y + 1.5 )
			{
				LerpScale (endScale, bush_level_4_min, bush_level_4_max, objectHeight, newBushPiece, lightGreen, "bushStart.level (4)" );
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 1.5 && transform.position.y <= generatorStartPos.y + 1.8 )
			{
				LerpScale (endScale, bush_level_5_min, bush_level_5_max, objectHeight, newBushPiece, lightGreen, "bushStart.level (5)" );
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 1.8 && transform.position.y <= generatorStartPos.y + 2.1 )
			{
				LerpScale (endScale, bush_level_6_min, bush_level_6_max, objectHeight, newBushPiece, lightGreen, "bushStart.level (6)" );
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 2.1 && transform.position.y <= generatorStartPos.y + 2.4 )
			{
				LerpScale (endScale, bush_level_7_min, bush_level_7_max, objectHeight, newBushPiece, lightGreen, "bushStart.level (7)" );
			}
		
			bushArray.Push(newBushPiece);	// Pushing instantiated object to bushArray		
	
		// Define tagname based on rarity
		RarityHandler ( newBushPiece, 
						"bush", 	// commonTagName
						"bush", 	// rareTagName
						"bush", 	// very rare tagName
						"bush", 	// epic tagName
						"bush");	// legendary tagName
	
		yield WaitForSeconds(0.5);
	}

	// Make bushParts childs of this object (parent)
	if (i >= bushHeight)
	{
		for (var bushParts : Transform in bushArray) 
		{
			bushParts.transform.parent = this.transform;
		}	
	} 
}

/////////////////////////////////////////////////
function RockGenerator ()
{
	randomColorVariant ();	// Sets color
	
	// rockGenerator
	
	for (var i : int = 0; i < rockHeight; i++)
	{
		// Rotate new generated piece by variable 'rockRotateBy'
			transform.eulerAngles 	+= Vector3 (0, rockRotateBy, 0);
		
		// + 1 to y-pos
			var yPosLog 			= transform.position.y + 0.3;
		
		// Random placement
			transform.position		= Vector3( transform.position.x + Random.Range(-0.05, 0.15), yPosLog, transform.position.z + Random.Range(-0.05, 0.15));
		
		// Generate new piece
		var newRockPiece : Transform = Instantiate(rockPiece, transform.position, transform.rotation);
	
		// Change Size 
			var endScale    	: Vector3;
			var objectHeight	: float	 = 0.3;
							
			// rockSize from ground and up	(NOTE: numbers = numbers minus originalsize) 
			var rock_level_1_min : float = 0.70;	
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
				LerpScale (endScale, rock_level_1_min, rock_level_1_max, objectHeight, newRockPiece, darkGray, "rockStart.level (1)" 	);
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 0.6 && transform.position.y <= generatorStartPos.y + 0.9 )
			{
				LerpScale (endScale, rock_level_2_min, rock_level_2_max, objectHeight, newRockPiece, mediumGray, "rockStart.level (2)" 	);
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 0.9 && transform.position.y <= generatorStartPos.y + 1.2 )
			{
				LerpScale (endScale, rock_level_3_min, rock_level_3_max, objectHeight, newRockPiece, mediumGray, "rockStart.level (3)" 	);
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 1.2 && transform.position.y <= generatorStartPos.y + 1.5 )
			{
				LerpScale (endScale, rock_level_4_min, rock_level_4_max, objectHeight, newRockPiece, lightGray, "rockStart.level (4)" 	);
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 1.5 && transform.position.y <= generatorStartPos.y + 1.8 )
			{
				LerpScale (endScale, rock_level_5_min, rock_level_5_max, objectHeight, newRockPiece, lightGray, "rockStart.level (5)" 	);
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 1.8 && transform.position.y <= generatorStartPos.y + 2.1 )
			{
				LerpScale (endScale, rock_level_6_min, rock_level_6_max, objectHeight, newRockPiece, lightGray, "rockStart.level (6)" 	);
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 2.1 && transform.position.y <= generatorStartPos.y + 2.4 )
			{
				LerpScale (endScale, rock_level_7_min, rock_level_7_max, objectHeight, newRockPiece, lightGray, "rockStart.level (7)" 	);				
			}
			
			rockArray.Push(newRockPiece);	// Pushing instantiated object to bushArray		
		
		// Define tagname based on rarity
		RarityHandler ( newRockPiece, 
						"rock", 					// commonTagName
						"rareObject_cobber", 		// rareTagName
						"veryRareObject_silver", 	// very rare tagName
						"epicObject_gold", 			// epic tagName
						"legendaryObject_");		// legendary tagName
	  	
		yield WaitForSeconds(0.5);
	}
	
	// Make rockParts childs of this object (parent)
	if (i >= rockHeight)
	{
		for (var rockParts : Transform in rockArray) 
		{
			rockParts.transform.parent = this.transform;
		}	
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////
function Message ( text : String ) 		// debug mode handling for development - easy toggle on/off
{	
	if ( DebugMode )
		Debug.Log ( text );
}

/////////////////////////////////
function Message ( text : float )  		// debug mode handling for development - easy toggle on/off
{
	if ( DebugMode )
		Debug.Log ( text );
}

///////////////////////////////
function Message ( text : int )    		// debug mode handling for development - easy toggle on/off
{
	if ( DebugMode )
		Debug.Log ( text );
}

///////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function LerpScale (endScale : Vector3, minRange : float, maxRange : float, objectHeight : float, scaleObject : Transform, color : Color, message : String )
{
	//////////////////////////
	// Material & color
	scaleObject.renderer.material 			= new Material(Shader.Find("Transparent/Diffuse"));
					
	scaleObject.renderer.material.color 	= color;
	
	scaleObject.renderer.material.color.a 	= 1.0;
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
			
		scaleObject.localScale 	= Vector3.Lerp ( startScale, endScale, t );	
						
		yield;	
		
		transform.localScale 	= endScale;				
	}						
	Message ( message );
}

/////////////////////////////////////////////////////////
function RarityHandler ( object : Transform, commonTagName : String, rareTagName : String, veryRareTagName : String, epicTagName : String, legendaryTagName : String )
{
	// Define the rarity of object:
	if ( rareObject == true )
	{
		Message ( "This is a rare object!" );
	
		object.tag = rareTagName;
	}
	else if ( veryRareObject == true )
	{
		Message ( "This is a very rare object" );
	
		object.tag = veryRareTagName;
	}
	else if ( epicObject == true )
	{
		Message ( "This is an epic object!" );
	
		object.tag = epicTagName;
	}
	else if ( legendaryObject == true )
	{
		Message ( "This is a legendary object" );
	
		object.tag = legendaryTagName;
	}
	else 
	{
		object.tag = commonTagName;
	}
}

//////////////////////////////
function randomColorVariant ()			// Sets color of blocks
{
	// % chance of color x being picked: 
	var chanceOfColor_01 : float = 70.0;	// if number is below x, then (= x-chance for this to happen) 
	var chanceOfColor_02 : float = 16.0;	// 16% spawn chance
	var chanceOfColor_03 : float = 8.0;
	var chanceOfColor_04 : float = 4.0;
	var chanceOfColor_05 : float = 2.0;
	
	var randomNum 		 : float = Random.Range(0.0, 100.0); 
	
	if ( 	  randomNum < chanceOfColor_01)
	{
			  Message ( "colorPick, rarity: 'common'" );
		
					// Gray Variant 1 - most common 
					lightGreen			= new Color(151/255.0F, 232/255.0F, 67/255.0F, 0/255.0F);	// light  green
					mediumGreen  		= new Color(126/255.0F, 194/255.0F, 55/255.0F, 0/255.0F);	// medium green
					darkGreen	  		= new Color(103/255.0F, 155/255.0F, 45/255.0F, 0/255.0F);	// dark   green
			  		
			  		// Green Variant 1 - most common										
 					lightGray			= new Color(107/255.0F, 101/255.0F, 92/255.0F, 0/255.0F);	
					mediumGray			= new Color( 84/255.0F,  80/255.0F, 75/255.0F, 0/255.0F);	
					darkGray 			= new Color( 59/255.0F,  56/255.0F, 54/255.0F, 0/255.0F);
	
					// Brown Variant 1 - most common
					lightBrown 			= new Color(113/255.0F, 103/255.0F, 82/255.0F, 0/255.0F);
					mediumBrown 		= new Color(100/255.0F, 91/255.0F, 73/255.0F, 0/255.0F);
					darkBrown 			= new Color(74/255.0F, 68/255.0F, 54/255.0F, 0/255.0F);				
	}
	else if ( randomNum < chanceOfColor_01 + chanceOfColor_02)
	{
			  Message ( "colorPick, rarity: 'rare'" );

			  rareObject = true;
					
					// Gray Variant 2 - second most common (SPECIAL COLOR)
					lightGray 			= new Color(166/255.0F, 77/255.0F, 45/255.0F, 0/255.0F);	// cobber
					mediumGray 			= new Color(166/255.0F, 77/255.0F, 45/255.0F, 0/255.0F);	// cobber
					darkGray 			= new Color(166/255.0F, 77/255.0F, 45/255.0F, 0/255.0F);	// cobber
					
					// Green Variant 2 - second most common
					lightGreen			= new Color(135/255.0F, 166/255.0F, 68/255.0F, 0/255.0F);	
					mediumGreen  		= new Color(94/255.0F, 115/255.0F, 50/255.0F, 0/255.0F);	
					darkGreen	  		= new Color(53/255.0F, 64/255.0F, 30/255.0F, 0/255.0F);	
			
					// Brown Variant 2 - second most common
					lightBrown 			= new Color(113/255.0F, 103/255.0F, 82/255.0F, 0/255.0F);
					mediumBrown 		= new Color(100/255.0F, 91/255.0F, 73/255.0F, 0/255.0F);
					darkBrown 			= new Color(74/255.0F, 68/255.0F, 54/255.0F, 0/255.0F);
					
	}
	else if ( randomNum < chanceOfColor_01 + chanceOfColor_02 + chanceOfColor_03) 
	{
			  Message ( "colorPick, rarity: 'very rare'" );		
			
			  veryRareObject = true;
						
					// Gray Variant 3 - third most common (SPECIAL COLOR)
					lightGray 			= new Color(166/255.0F, 158/255.0F, 157/255.0F, 0/255.0F);	// silver
					mediumGray 			= new Color(166/255.0F, 158/255.0F, 157/255.0F, 0/255.0F);	// silver
					darkGray 			= new Color(166/255.0F, 158/255.0F, 157/255.0F, 0/255.0F);	// silver
					
					// Green Variant 3 - third most common
					lightGreen			= new Color(97/255.0F, 140/255.0F, 3/255.0F, 0/255.0F);	
					mediumGreen  		= new Color(54/255.0F, 89/255.0F, 2/255.0F, 0/255.0F);	
					darkGreen	  		= new Color(33/255.0F, 64/255.0F, 1/255.0F, 0/255.0F);	
					
					// Brown Variant 3 - third most common
					lightBrown 			= new Color(113/255.0F, 103/255.0F, 82/255.0F, 0/255.0F);
					mediumBrown 		= new Color(100/255.0F, 91/255.0F, 73/255.0F, 0/255.0F);
					darkBrown 			= new Color(74/255.0F, 68/255.0F, 54/255.0F, 0/255.0F);
					
	}
	else if ( randomNum < chanceOfColor_01 + chanceOfColor_02 + chanceOfColor_03 + chanceOfColor_04)
	{
			  Message ( "colorPick, rarity: 'epic'" );
	
			  epicObject = true;
	
					// Gray Variant 4 - epic rarity (SPECIAL COLOR)
					lightGray 			= new Color(220/255.0F, 148/255.0F, 27/255.0F, 0/255.0F);	// gold
					mediumGray 			= new Color(220/255.0F, 148/255.0F, 27/255.0F, 0/255.0F);	// gold
					darkGray 			= new Color(220/255.0F, 148/255.0F, 27/255.0F, 0/255.0F);	// gold
					
					// Green Variant 4 - epic rarity 
					lightGreen			= new Color(95/255.0F, 237/255.0F, 252/255.0F, 0/255.0F);	
					mediumGreen  		= new Color(71/255.0F, 177/255.0F, 188/255.0F, 0/255.0F);	
					darkGreen	  		= new Color(56/255.0F, 141/255.0F, 150/255.0F, 0/255.0F);	
	
					// Brown Variant 4 - epic rarity
					lightBrown 			= new Color(113/255.0F, 103/255.0F, 82/255.0F, 0/255.0F);
					mediumBrown 		= new Color(100/255.0F, 91/255.0F, 73/255.0F, 0/255.0F);
					darkBrown 			= new Color(74/255.0F, 68/255.0F, 54/255.0F, 0/255.0F);
	}
	else if ( randomNum < chanceOfColor_01 + chanceOfColor_02 + chanceOfColor_03 + chanceOfColor_04 + chanceOfColor_05)
	{
			  Message ( "colorPick, rarity: 'legendary'" );	
			  
			  legendaryObject = true;
			  		
			  		// Gray variant 5 - legendary rarity (SPECIAL COLOR)
			  		lightGray 			= new Color(102/255.0F, 0/255.0F, 153/255.0F, 50/255.0F);	// purple
			  		mediumGray 			= new Color(102/255.0F, 0/255.0F, 153/255.0F, 50/255.0F);	// purple
			  		darkGray 			= new Color(102/255.0F, 0/255.0F, 153/255.0F, 50/255.0F);	// purple
			  		
			  		// Green Variant 5 - legendary rarity
					lightGreen			= new Color(255/255.0F, 145/255.0F, 166/255.0F, 0/255.0F);	
					mediumGreen  		= new Color(255/255.0F, 170/255.0F, 187/255.0F, 0/255.0F);	
					darkGreen	  		= new Color(178/255.0F, 84/255.0F, 102/255.0F, 0/255.0F);	
					
					// Brown Variant 5 - legendary rarity
					lightBrown 			= new Color(113/255.0F, 103/255.0F, 82/255.0F, 0/255.0F);
					mediumBrown 		= new Color(100/255.0F, 91/255.0F, 73/255.0F, 0/255.0F);
					darkBrown 			= new Color(74/255.0F, 68/255.0F, 54/255.0F, 0/255.0F);
	}
	else 
	{
			  Message ( "colorPick, rarity: 'common'" );
				
					// Gray variant 1 - most common
					lightGray			= new Color(107/255.0F, 101/255.0F, 92/255.0F, 0/255.0F);	
					mediumGray			= new Color( 84/255.0F,  80/255.0F, 75/255.0F, 0/255.0F);	
					darkGray 			= new Color( 59/255.0F,  56/255.0F, 54/255.0F, 0/255.0F);
				
					// Green Variant 1 - most common 
					lightGreen			= new Color(151/255.0F, 232/255.0F, 67/255.0F, 0/255.0F);	// light  green
					mediumGreen  		= new Color(126/255.0F, 194/255.0F, 55/255.0F, 0/255.0F);	// medium green
					darkGreen	  		= new Color(103/255.0F, 155/255.0F, 45/255.0F, 0/255.0F);	// dark   green	
					
					// Brown Variant 1 - most common
					lightBrown 			= new Color(113/255.0F, 103/255.0F, 82/255.0F, 0/255.0F);
					mediumBrown 		= new Color(100/255.0F, 91/255.0F, 73/255.0F, 0/255.0F);
					darkBrown 			= new Color(74/255.0F, 68/255.0F, 54/255.0F, 0/255.0F);
	}
}













































