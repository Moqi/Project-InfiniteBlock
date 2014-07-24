#pragma strict
///////////////////////////////////////////////////////////////////////////
///////////////////// Procedural Generated Tree script ////////////////////
///////////////////////////////////////////////////////////////////////////

		var DebugMode			: boolean 		= false;
		
		var generateTree 		: boolean		= true;
		var generateBush		: boolean		= false;
		var generateRock		: boolean 		= false;
		var randomPick			: boolean 		= false;
private var chanceOfObject_01 	: float 		= 25.0;			// if number is below x, then (= x-chance for this to happen) 
private var chanceOfObject_02 	: float 		= 25.0;			// 25 % chance 
private var chanceOfObject_03 	: float 		= 25.0;
		
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

	logPiece.localScale 	= Vector3 (1, 0.5, 1);
	crownPiece.localScale 	= Vector3 (1, 0.5, 1);
	
	bushPiece.localScale 	= Vector3 (1, 0.3, 1);		
	bushHeight 				= Random.Range(3, 6);
	
	rockPiece.localScale	= Vector3 (1, 0.3, 1);
	rockHeight 				= Random.Range(3, 6);
			

if (randomPick == false) // if manual pick, then...
{			
	if (generateTree == true)
	{	generateBush = false;
		generateRock = false;
/////////////////////////////////////////////////
// TreeGeneration:		
		
			Message ( "manualPick - Generating a tree!" );
	
		TreeGenerator ();
		
/////////////////////////////////////////////////	
	}		
	else if (generateBush == true)
	{		 generateTree = false;
			 generateRock = false;
/////////////////////////////////////////////////	
// BushGeneration: 
		
			Message ( "manualPick - Generating a bush!" );
		
		BushGenerator ();
		
/////////////////////////////////////////////////		
	}
	else if (generateRock == true)
	{		 generateBush = false;
			 generateTree = false;
/////////////////////////////////////////////////			
	
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
			Message ( "RandomPick - Generating a tree!" );
	
		return(TreeGenerator());
	}
	else if (randomNum < chanceOfObject_01 + chanceOfObject_02)
	{
			Message ( "RandomPick - Generating a bush!" );
		
		return(BushGenerator ());
	}
	else if (randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03) 
	{
			Message ( "RandomPick - Generating a rock!" );
		
		return(RockGenerator ());
	}
	else 
	{
			Message ( "RandomPick - Generating a tree!" );
	
		return(TreeGenerator());
	}
  }	
}


/////////////////////////////////////////////////////////
function Update () 
{
	/*
	if (Input.GetKeyUp ("space"))
	{
		TreeGenerator();
	}
	*/
}

/////////////////////////////////////////////////////////
function TreeGenerator ()
{
	randomColorVariant ();	// Sets color
	
	transform.localScale = Vector3 ( 1, 0.5, 1 );

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
	
			newLogPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
			newLogPiece.renderer.material.color 	= lightBrown;
	
		// Change Size 
				
			// logSize from ground and up	(NOTE: numbers = numbers minus originalsize) 
				var log_level_1_min : float = 0.35;
				var log_level_1_max : float = 0.45;
				
				var log_level_2_min : float = 0.45;
				var log_level_2_max : float = 0.55;
				
				var log_level_3_min : float = 0.55;
				var log_level_3_max : float = 0.65;
				
				var log_level_4_min : float = 0.65;
				var log_level_4_max : float = 0.75;
				
				var log_level_5_min : float = 0.75;
				var log_level_5_max : float = 0.85;
				
				var log_level_6_min : float = 0.85;
				var log_level_6_max : float = 0.95;
				
				var log_level_7_min : float = 0.95;
				var log_level_7_max : float = 0.95;
			
									
			if ( 		transform.position.y 	>= generatorStartPos.y + 0.5 && transform.position.y <= generatorStartPos.y + 1 )
			{
				newLogPiece.localScale 			-= Vector3 ( Random.Range ( log_level_1_min, log_level_1_max ), 0, Random.Range ( log_level_1_min, log_level_1_max ) );			
				
					Message ( "logStart.level (1)" );
			}
			else if ( 	transform.position.y 	>= generatorStartPos.y + 1 && transform.position.y <= generatorStartPos.y + 1.5 )
			{
				newLogPiece.localScale 			-= Vector3 ( Random.Range ( log_level_2_min, log_level_2_max ), 0, Random.Range ( log_level_2_min, log_level_2_max ) );
				
				newLogPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newLogPiece.renderer.material.color 	= mediumBrown;
				
					Message ( "logStart.level (2)" );
			}
			else if ( 	transform.position.y 	>= generatorStartPos.y + 1.5 && transform.position.y <= generatorStartPos.y + 2 )
			{
				newLogPiece.localScale 			-= Vector3 ( Random.Range ( log_level_3_min, log_level_3_max ), 0, Random.Range ( log_level_3_min, log_level_3_max ) );
				
				newLogPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newLogPiece.renderer.material.color 	= darkBrown;
				
					Message ( "logStart.level (3)" );
			}
			else if ( 	transform.position.y 	>= generatorStartPos.y + 2 && transform.position.y <= generatorStartPos.y + 2.5 )
			{
				newLogPiece.localScale 			-= Vector3 ( Random.Range ( log_level_4_min, log_level_4_max ), 0, Random.Range ( log_level_4_min, log_level_4_max ) );
				
				newLogPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newLogPiece.renderer.material.color 	= darkBrown;
				
					Message ( "logStart.level (4)" );
			}
			else if (	transform.position.y 	>= generatorStartPos.y + 2.5 && transform.position.y <= generatorStartPos.y + 3 )
			{
				newLogPiece.localScale 			-= Vector3 ( Random.Range ( log_level_5_min, log_level_5_max ), 0, Random.Range ( log_level_5_min, log_level_5_max ) );
				
				newLogPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newLogPiece.renderer.material.color 	= darkBrown;
				
					Message ( "logStart.level (5)" );
			}
			else if (	transform.position.y 	>= generatorStartPos.y + 3 && transform.position.y <= generatorStartPos.y + 3.5 )
			{
				newLogPiece.localScale 			-= Vector3 ( Random.Range ( log_level_6_min, log_level_6_max ), 0, Random.Range ( log_level_6_min, log_level_6_max ) );
				
				newLogPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newLogPiece.renderer.material.color 	= darkBrown;
				
					Message ( "logStart.level (6)" );
			}
			else if (	transform.position.y 	>= generatorStartPos.y + 3.5 && transform.position.y <= generatorStartPos.y + 4 )
			{
				newLogPiece.localScale 			-= Vector3 ( Random.Range ( log_level_7_min, log_level_7_max ), 0, Random.Range ( log_level_7_min, log_level_7_max ) );
				
				newLogPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newLogPiece.renderer.material.color 	= darkBrown;
				
						Message ( "logStart.level (7)" );
			}
		
		// Pushing instantiated object to treeArray		
			treeArray.Push(newLogPiece);	
	
		yield WaitForSeconds(0.5);
	}

	// CrownGenerator
	
	if (i >= logHeight)
	{
		transform.localScale = Vector3 ( 1, 0.5, 1 );
	
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
	
				newCrownPiece.renderer.material 		= new Material(Shader.Find("Diffuse"));
					
				newCrownPiece.renderer.material.color 	= darkGreen;
	
			// Change Size
			
			// CrownSize from middle and down	(NOTE: Numbers = numbers plus the originalSize)		
				var crown_level_1_min : float = 0.3;		// -
				var crown_level_1_max : float = 0.4;		// -
				
				var crown_level_2_min : float = 0.2;		// -
				var crown_level_2_max : float = 0.3;		// -
				
				var crown_level_3_min : float = 0.1;		// -
				var crown_level_3_max : float = 0.2;		// -
				
				var crown_level_4_min : float = 0.2;		// +
				var crown_level_4_max : float = 0.4;		// +
				
				var crown_level_5_min : float = 0.4;		// +
				var crown_level_5_max : float = 0.8;		// +
			
				var crown_level_6_min : float = 0.8;		// +
				var crown_level_6_max : float = 1.0;		// +
			
			// CrownSize from middle and up
			
				var crown_topLevel_1_min : float = 0.6;		// +
				var crown_topLevel_1_max : float = 0.8;		// +
				
				var crown_topLevel_2_min : float = 0.4;		// +
				var crown_topLevel_2_max : float = 0.6;		// +
				
				var crown_topLevel_3_min : float = 0.02;	// +
				var crown_topLevel_3_max : float = 0.04;	// + 
				
				var crown_topLevel_4_min : float = 0.1;		// - 
				var crown_topLevel_4_max : float = 0.2;		// - 	
				
				var crown_topLevel_5_min : float = 0.2;		// - 
				var crown_topLevel_5_max : float = 0.4;		// - 
				
				var crown_topLevel_6_min : float = 0.4;		// - 
				var crown_topLevel_6_max : float = 0.6;		// - 
				
				var crown_topLevel_7_min : float = 0.6;		// - 
				var crown_topLevel_7_max : float = 0.8;		// - 
				
				var crown_topLevel_8_min : float = 0.8;		// - 
				var crown_topLevel_8_max : float = 0.9;		// - 
				
				
				var crownPieceHeight 	 : float = 0;
			
			
			if (j < crownHeight / crownHeightDividedBy)
			{
				if ( 		transform.position.y 	>= generatorStartPos.y + 2.5 && transform.position.y <= generatorStartPos.y + 3 )
				{
					newCrownPiece.localScale 		-= Vector3 ( Random.Range ( crown_level_1_min, crown_level_1_max ), crownPieceHeight, Random.Range ( crown_level_1_min, crown_level_1_max ) );
					
						Message ( "crownStart.level (1)" );
				}
				else if ( 	transform.position.y 	>= generatorStartPos.y + 3 && transform.position.y <= generatorStartPos.y + 3.5 )
				{
					newCrownPiece.localScale 		-= Vector3 ( Random.Range ( crown_level_2_min, crown_level_2_max ), crownPieceHeight, Random.Range ( crown_level_2_min, crown_level_2_max ) );

						Message ( "crownStart.level (2)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 3.5 && transform.position.y <= generatorStartPos.y + 4 )
				{
					newCrownPiece.localScale 		-= Vector3 ( Random.Range ( crown_level_3_min, crown_level_3_max ), crownPieceHeight, Random.Range ( crown_level_3_min, crown_level_3_max ) );
					
						Message ( "crownStart.level (3)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 4 && transform.position.y <= generatorStartPos.y + 4.5 )
				{
					newCrownPiece.localScale 		+= Vector3 ( Random.Range ( crown_level_4_min, crown_level_4_max ), crownPieceHeight, Random.Range ( crown_level_4_min, crown_level_4_max ) );

						Message ( "crownStart.level (4)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 4.5 && transform.position.y <= generatorStartPos.y + 5 )
				{
					newCrownPiece.localScale 		+= Vector3 ( Random.Range ( crown_level_5_min, crown_level_5_max ), crownPieceHeight, Random.Range ( crown_level_5_min, crown_level_5_max ) );
					
						Message ( "crownStart.level (5)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 5 && transform.position.y <= generatorStartPos.y + 5.5 )
				{
					newCrownPiece.localScale 		+= Vector3 ( Random.Range ( crown_level_6_min, crown_level_6_max ), crownPieceHeight, Random.Range ( crown_level_6_min, crown_level_6_max ) );

						Message ( "crownStart.level (6)" );
				}
			}
			else 
			{	
				if ( 		transform.position.y 	>= generatorStartPos.y + 3.5 && transform.position.y <= generatorStartPos.y + 4 )
				{	
					newCrownPiece.localScale 		+= Vector3 ( Random.Range ( crown_topLevel_1_min, crown_topLevel_1_max ), crownPieceHeight, Random.Range ( crown_topLevel_1_min, crown_topLevel_1_max ) );
					
					newCrownPiece.renderer.material 		= new Material(Shader.Find("Diffuse"));
					
					newCrownPiece.renderer.material.color 	= mediumGreen;
						
						Message ( "crownMiddle.level (1)" );
				}
				else if ( 	transform.position.y 	>= generatorStartPos.y + 4 && transform.position.y <= generatorStartPos.y + 4.5)
				{
					newCrownPiece.localScale 		+= Vector3 ( Random.Range ( crown_topLevel_2_min, crown_topLevel_2_max ), crownPieceHeight, Random.Range ( crown_topLevel_2_min, crown_topLevel_2_max ) );
					
					newCrownPiece.renderer.material 		= new Material(Shader.Find("Diffuse"));
					
					newCrownPiece.renderer.material.color 	= mediumGreen;
					
						Message ( "crownMiddle.level (2)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 4.5 && transform.position.y <= generatorStartPos.y + 5 )
				{
					newCrownPiece.localScale 		+= Vector3 ( Random.Range ( crown_topLevel_3_min, crown_topLevel_3_max ), crownPieceHeight, Random.Range ( crown_topLevel_3_min, crown_topLevel_3_max ) );	
					
					newCrownPiece.renderer.material 		= new Material(Shader.Find("Diffuse"));
					
					newCrownPiece.renderer.material.color 	= lightGreen;
					
						Message ( "crownMiddle.level (3)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 5 && transform.position.y <= generatorStartPos.y + 5.5 )
				{
					newCrownPiece.localScale 		-= Vector3 ( Random.Range ( crown_topLevel_4_min, crown_topLevel_4_max ), crownPieceHeight, Random.Range ( crown_topLevel_4_min, crown_topLevel_4_max ) );	
					
					newCrownPiece.renderer.material 		= new Material(Shader.Find("Diffuse"));
					
					newCrownPiece.renderer.material.color 	= lightGreen;
					
						Message ( "crownMiddle.level (4)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 5.5 && transform.position.y <= generatorStartPos.y + 6 )
				{	
					newCrownPiece.localScale 		-= Vector3 ( Random.Range ( crown_topLevel_5_min, crown_topLevel_5_max ), crownPieceHeight, Random.Range ( crown_topLevel_5_min, crown_topLevel_5_max ) );
					
					newCrownPiece.renderer.material 		= new Material(Shader.Find("Diffuse"));
					
					newCrownPiece.renderer.material.color 	= lightGreen;
					
						Message ( "crownMiddle.level (5)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 6 && transform.position.y <= generatorStartPos.y + 6.5 )
				{
					newCrownPiece.localScale 		-= Vector3 ( Random.Range ( crown_topLevel_6_min, crown_topLevel_6_max ), crownPieceHeight, Random.Range ( crown_topLevel_6_min, crown_topLevel_6_max ) );
					
					newCrownPiece.renderer.material 		= new Material(Shader.Find("Diffuse"));
					
					newCrownPiece.renderer.material.color 	= lightGreen;
					
						Message ( "crownMiddle.level (6)" );
				}
				else if (	transform.position.y 	>= generatorStartPos.y + 6.5 && transform.position.y <= generatorStartPos.y + 7 )
				{
					newCrownPiece.localScale 		-= Vector3 ( Random.Range ( crown_topLevel_7_min, crown_topLevel_7_max ), crownPieceHeight, Random.Range ( crown_topLevel_7_min, crown_topLevel_7_max ) );
					
					newCrownPiece.renderer.material 		= new Material(Shader.Find("Diffuse"));
					
					newCrownPiece.renderer.material.color 	= lightGreen;
					
						Message ( "crownMiddle.level (7)" );
				}								 
				else if (	transform.position.y 	>= generatorStartPos.y + 7 && transform.position.y <= generatorStartPos.y + 7.5 )
				{
					newCrownPiece.localScale 		-= Vector3 ( Random.Range ( crown_topLevel_8_min, crown_topLevel_8_max ), crownPieceHeight, Random.Range ( crown_topLevel_8_min, crown_topLevel_8_max ) );
					
					newCrownPiece.renderer.material 		= new Material(Shader.Find("Diffuse"));
					
					newCrownPiece.renderer.material.color 	= lightGreen;
					
						Message ( "crownMiddle.level (8)" );
				}	
			}
	
		// Pushing instantiated object to treeArray
			treeArray.Push(newCrownPiece);	
	
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
	
	transform.localScale = Vector3 ( 1, 0.3, 1 );

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
	
			newBushPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
			newBushPiece.renderer.material.color 	= darkGreen;
	
		// Change Size 
				
			// bushSize from ground and up	(NOTE: numbers = numbers minus originalsize) 
				var bush_level_1_min : float = 0.35;
				var bush_level_1_max : float = 0.45;
				
				var bush_level_2_min : float = 0.45;
				var bush_level_2_max : float = 0.55;
				
				var bush_level_3_min : float = 0.55;
				var bush_level_3_max : float = 0.75;
				
				var bush_level_4_min : float = 0.75;
				var bush_level_4_max : float = 0.80;
				
				var bush_level_5_min : float = 0.80;
				var bush_level_5_max : float = 0.85;
				
				var bush_level_6_min : float = 0.85;
				var bush_level_6_max : float = 0.90;
				
				var bush_level_7_min : float = 0.90;
				var bush_level_7_max : float = 0.95;
			
									
			if ( 		transform.position.y 		>= generatorStartPos.y + 0.3 && transform.position.y <= generatorStartPos.y + 0.6 )
			{
				newBushPiece.localScale 			-= Vector3 ( Random.Range ( bush_level_1_min, bush_level_1_max ), 0, Random.Range ( bush_level_1_min, bush_level_1_max ) );			
				
					Message ( "bushStart.level (1)" );
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 0.6 && transform.position.y <= generatorStartPos.y + 0.9 )
			{
				newBushPiece.localScale 			-= Vector3 ( Random.Range ( bush_level_2_min, bush_level_2_max ), 0, Random.Range ( bush_level_2_min, bush_level_2_max ) );
				
				newBushPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newBushPiece.renderer.material.color 	= mediumGreen;
				
					Message ( "bushStart.level (2)" );
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 0.9 && transform.position.y <= generatorStartPos.y + 1.2 )
			{
				newBushPiece.localScale 			-= Vector3 ( Random.Range ( bush_level_3_min, bush_level_3_max ), 0, Random.Range ( bush_level_3_min, bush_level_3_max ) );
				
				newBushPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newBushPiece.renderer.material.color 	= mediumGreen;
				
					Message ( "bushStart.level (3)" );
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 1.2 && transform.position.y <= generatorStartPos.y + 1.5 )
			{
				newBushPiece.localScale 			-= Vector3 ( Random.Range ( bush_level_4_min, bush_level_4_max ), 0, Random.Range ( bush_level_4_min, bush_level_4_max ) );
				
				newBushPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newBushPiece.renderer.material.color 	= lightGreen;
				
					Message ( "bushStart.level (4)" );
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 1.5 && transform.position.y <= generatorStartPos.y + 1.8 )
			{
				newBushPiece.localScale 			-= Vector3 ( Random.Range ( bush_level_5_min, bush_level_5_max ), 0, Random.Range ( bush_level_5_min, bush_level_5_max ) );
				
				newBushPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newBushPiece.renderer.material.color 	= lightGreen;
				
					Message ( "bushStart.level (5)" );
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 1.8 && transform.position.y <= generatorStartPos.y + 2.1 )
			{
				newBushPiece.localScale 			-= Vector3 ( Random.Range ( bush_level_6_min, bush_level_6_max ), 0, Random.Range ( bush_level_6_min, bush_level_6_max ) );
				
				newBushPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newBushPiece.renderer.material.color 	= lightGreen;
				
					Message ( "bushStart.level (6)" );
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 2.1 && transform.position.y <= generatorStartPos.y + 2.4 )
			{
				newBushPiece.localScale 			-= Vector3 ( Random.Range ( bush_level_7_min, bush_level_7_max ), 0, Random.Range ( bush_level_7_min, bush_level_7_max ) );
				
				newBushPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newBushPiece.renderer.material.color 	= lightGreen;
				
					Message ( "bushStart.level (7)" );
			}
		
		// Pushing instantiated object to bushArray		
			bushArray.Push(newBushPiece);	
	
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
	
	transform.localScale = Vector3 ( 1, 0.3, 1 );

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
	
			newRockPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
				
			newRockPiece.renderer.material.color 	= darkGray;
	
		// Change Size 
					
			// rockSize from ground and up	(NOTE: numbers = numbers minus originalsize) 
			var rock_level_1_min : float = 0.0;	
			var rock_level_1_max : float = - 0.35;	// (- - = +)
				
			var rock_level_2_min : float = 0.25;
			var rock_level_2_max : float = 0.35;
				
			var rock_level_3_min : float = 0.35;
			var rock_level_3_max : float = 0.45;
				
			var rock_level_4_min : float = 0.45;
			var rock_level_4_max : float = 0.50;
				
			var rock_level_5_min : float = 0.50;
			var rock_level_5_max : float = 0.65;
				
			var rock_level_6_min : float = 0.65;
			var rock_level_6_max : float = 0.70;
				
			var rock_level_7_min : float = 0.70;
			var rock_level_7_max : float = 0.85;
			
									
			if ( 		transform.position.y 		>= generatorStartPos.y + 0.3 && transform.position.y <= generatorStartPos.y + 0.6 )
			{
				newRockPiece.localScale 			-= Vector3 ( Random.Range ( rock_level_1_min, rock_level_1_max ), 0, Random.Range ( rock_level_1_min, rock_level_1_max ) );			
				
					Message ( "rockStart.level (1)" );
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 0.6 && transform.position.y <= generatorStartPos.y + 0.9 )
			{
				newRockPiece.localScale 			-= Vector3 ( Random.Range ( rock_level_2_min, rock_level_2_max ), 0, Random.Range ( rock_level_2_min, rock_level_2_max ) );
				
				newRockPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newRockPiece.renderer.material.color 	= mediumGray;
				
					Message ( "rockStart.level (2)" );
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 0.9 && transform.position.y <= generatorStartPos.y + 1.2 )
			{
				newRockPiece.localScale 			-= Vector3 ( Random.Range ( rock_level_3_min, rock_level_3_max ), 0, Random.Range ( rock_level_3_min, rock_level_3_max ) );
				
				newRockPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newRockPiece.renderer.material.color 	= mediumGray;
				
					Message ( "rockStart.level (3)" );
			}
			else if ( 	transform.position.y 		>= generatorStartPos.y + 1.2 && transform.position.y <= generatorStartPos.y + 1.5 )
			{
				newRockPiece.localScale 			-= Vector3 ( Random.Range ( rock_level_4_min, rock_level_4_max ), 0, Random.Range ( rock_level_4_min, rock_level_4_max ) );
				
				newRockPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newRockPiece.renderer.material.color 	= lightGray;
				
					Message ( "rockStart.level (4)" );
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 1.5 && transform.position.y <= generatorStartPos.y + 1.8 )
			{
				newRockPiece.localScale 			-= Vector3 ( Random.Range ( rock_level_5_min, rock_level_5_max ), 0, Random.Range ( rock_level_5_min, rock_level_5_max ) );
				
				newRockPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newRockPiece.renderer.material.color 	= lightGray;
				
					Message ( "rockStart.level (5)" );
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 1.8 && transform.position.y <= generatorStartPos.y + 2.1 )
			{
				newRockPiece.localScale 			-= Vector3 ( Random.Range ( rock_level_6_min, rock_level_6_max ), 0, Random.Range ( rock_level_6_min, rock_level_6_max ) );
				
				newRockPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newRockPiece.renderer.material.color 	= lightGray;
				
					Message ( "rockStart.level (6)" );
			}
			else if (	transform.position.y 		>= generatorStartPos.y + 2.1 && transform.position.y <= generatorStartPos.y + 2.4 )
			{
				newRockPiece.localScale 			-= Vector3 ( Random.Range ( rock_level_7_min, rock_level_7_max ), 0, Random.Range ( rock_level_7_min, rock_level_7_max ) );
				
				newRockPiece.renderer.material 			= new Material(Shader.Find("Diffuse"));
					
				newRockPiece.renderer.material.color 	= lightGray;
				
					Message ( "rockStart.level (7)" );
			}
		
		// Pushing instantiated object to bushArray		
			rockArray.Push(newRockPiece);	
	
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
	
	// Define the rarity of object:
	if ( rareObject == true )
	{
		Message ( "This is a rare Rock!" );
	}
	else if ( veryRareObject == true )
	{
		Message ( "This is a very rare Rock" );
	}
	else if ( epicObject == true )
	{
		Message ( "This is an epic Rock!" );
	}
	else if ( legendaryObject == true )
	{
		Message ( "This is a legendary Rock" );
		
		var newLegendaryEffect : Transform = Instantiate(effectLegendary, transform.position, Quaternion.identity);
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










