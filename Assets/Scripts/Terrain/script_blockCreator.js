//////////////////////////////////////////////////////////////////////////
//////////////////////// Block creator script ////////////////////////////
//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////
// Variables 

		var blockCreator 	: Transform;
private	var blockCount 		: int 			= 0;
private	var maxBlockCount   : int			= 0;
		var minBlocks	    : int			= 15;		// assign in inspector
		var maxBlocks       : int 			= 35; 		// assign in inspector
		var blockList 		: GameObject[]; 			// assign in inspector
private var newBlock		: GameObject;
private	var block 			: GameObject;
		
		var spawnPoints 	: Vector3[];				//create an array of positions
private	var prevPos 						= new Array();
		
		var textGUI 		: GUISkin;
		
		// for random blockType function
		var chanceOfBlockTypeA : float = 25.0;	// if number is below x, then (= x-chance for this to happen) 
		var chanceOfBlockTypeB : float = 15.0;	// 15% spawn chance
		var chanceOfBlockTypeC : float = 10.0;
		var chanceOfBlockTypeD : float = 5.0;

		var geometryHolder  : Transform;

		//var blockPlacementWidth : int; 
//////////////////////////////////////////
// Start
function Start () 
{
	
	maxBlockCount = Random.Range(minBlocks, maxBlocks);
	
	//print(maxBlockCount);
	
	transform.position = new Vector3(Random.Range(2, 33), 0, Random.Range(2, 33));
	
	InvokeRepeating("createBlock", 1, 0.3);	// spawn every 0.3 seconds
	
}


//////////////////////////////////////////
// Update
function Update () 
{
/*
	// get blockcount variable from blockcreator_ground script to decide spawnposition width.
	// Accessing blockcreator_ground script:
	var blockCreatorGroundScript : script_blockCreator_ground = GetComponent(script_blockCreator_ground);
	// Declaring where to find the script:
	var blockCreatorGround = GameObject.FindWithTag("blockCreatorGround");
	// And what variable:
	var blockCreatorGroundVariable = blockCreatorGround.GetComponent(script_blockCreator_ground).maxBlockCount;
	
	blockPlacementWidth = blockCreatorGroundVariable;
	
	print("blockPlacementWidth: " + blockPlacementWidth);
*/	
}



//////////////////////////////////////////
// OnGUI
function OnGUI ()
{
	// Make a group on the center of the screen
	GUI.BeginGroup(Rect(Screen.width / 2 - 100, Screen.height / 2 - 100, 200,800));
	
		GUI.skin = textGUI;
		
		GUI.Label( Rect(0, -100, 200, 800), "Number of blocks:  " + blockCount );
	
	// Ends group
	GUI.EndGroup();
}




/////////////////////////////////////////////////////////////////////////
////////////////////////// My functions /////////////////////////////////


function createBlock()
{

	//Choose a random number based on the length of the array
	var randomIndex : int = Random.Range(0, spawnPoints.length); 
   
    //Choose a new point from the array of spawn points
 	var newLocation : Vector3 = transform.position + spawnPoints[randomIndex];
	
	// moves blockcreator to the new location	
	transform.position = newLocation;  
 
	for (var n : int = 0; n < prevPos.length; n++)
	{
   		if ( prevPos[n] == newLocation )	// if prevPos == newlocation start over! 
   		{	
   			//print("position have already been used!");
   			
   			createBlock();	// ### resets function!! ###
        }
	}
 
 	//### Finds a random blocktype	(## 2 ways ##) ###
 	
 	// 1 # : 'Based on chance' (see GetRandomBlock function)
 	
 	//newBlock = GetRandomBlock(); 
 	  newBlock = blockList[0];
 			
 	// 2 # : 'totally random pick from array' 
 		//var randomBlockTypeIndex : int = Random.Range (0, blockList.length);
 		//newBlock = blockList[randomBlockTypeIndex];
 				
 	// Checks if free space is avaliable
 			
	// Instantiate 1 block (random type) at location (the new location + current position)
	for (var i : int = 0; i < 1; i++)
	{
		// instantiated object is stored in variable `block´			
		block = Instantiate (newBlock, i * newLocation + transform.position + Vector3(0, 1, 0), Quaternion.identity);
		
		// Make the parent of blocks the gameobject: geometryholder
		block.transform.parent = GameObject.FindWithTag("geometryholder").transform;
										
		// Saves new blocks position in prevPos array
		var blockPos : Vector3 = block.transform.position;
			
		prevPos.Push(blockPos);  
		
		// adds 1 to the total blockcount		
		blockCount = blockCount + 1; 
			
		break;	// break = ending the statement (instead of return which ends the function)
	}	
	
	// what happens once every block is placed: 
	if (blockCount >= maxBlockCount)
	{
		CancelInvoke();
		
	}				
}



 
/*function GetRandomBlock()
{
    var randomNum : float = Random.Range(0.0, 100.0); 
 
 	//print(randomNum);
 
    if (randomNum < chanceOfBlockTypeA)
    {
       return(blockList[0]);
    }
    else if  (randomNum < chanceOfBlockTypeA + chanceOfBlockTypeB)
    {
       return(blockList[1]);
    }
    else if  (randomNum < chanceOfBlockTypeA + chanceOfBlockTypeB + chanceOfBlockTypeC)
    {
       return(blockList[2]);
    }
    else if  (randomNum < chanceOfBlockTypeA + chanceOfBlockTypeB + chanceOfBlockTypeC + chanceOfBlockTypeD)	
    {
       return(blockList[3]);
    }
    else
    {
       return(blockList[0]);
    }
}*/






















