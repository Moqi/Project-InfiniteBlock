#pragma strict
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// BlockSpawner LootTable ////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// The purpose of this script is to provide a varying chance for every platform to spawn some kind of  //
// object ontop of one some of its blocks. To do this, every blockSpawnerChild will need to know the   //
// Vector3 positions of its children and from there pick a random vector. The lootTable will be split  // 
// in two categories (1) Static Objects (bushes, trees etc.) and (2) Collectables (currency, quest 	   //
// items etc.). 																					   //
//																									   //
// The script will start out by determining which category to choose from (if choosing one at all?)    // 
// It then choose a random object/transform from the category. Some objects may been rarer than others //
// and therefor have a lower chance of being choosen.												   //
//																									   //
// The script will also instantiate GUI-messages at pickup locations aswell as sending info to the     //
// sceneManager_LootTableScript like the number of objects picked up and of what type.				   //

/////////////////////////////////////////////////////////////////////////////////////////////////////////

import System.Collections.Generic;

////////////
// Variables 

	// SpawnPositions
private var spawnNow 					: boolean 		= true;
private var spawnPos					: Transform;
private var pickedArrayPos 				: Transform;
private var pickedChild  				: Transform;
private	var pickSpawnPos 				: boolean;
private var childrensPos 				: List.<Transform> = new List.<Transform>();


	// Categories 	
		var category_Objects 			: Transform[];	
		var category_Collectables 		: Transform[];

private var spawnObject					: Transform;
	
	// DropChance:
		// for random CategoryPick function
private	var chanceOfCategory_Objects 	: float = 90.0;			
private	var chanceOfCategory_Collectable: float = 10.0;	
		
		// for random Objectpick function
private var chanceOfObjectTypeA 		: float = 25.0;			// if number is below x, then (= x-chance for this to happen) 
private var chanceOfObjectTypeB 		: float = 15.0;			// 15% spawn chance
private var chanceOfObjectTypeC 		: float = 10.0;
private var chanceOfObjectTypeD 		: float = 5.0;
		
		// for random CollectablePick function
private var chanceOfCollectableTypeA 	: float = 25.0;			// if number is below x, then (= x-chance for this to happen) 
private var chanceOfCollectableTypeB 	: float = 15.0;			// 15% spawn chance
private var chanceOfCollectableTypeC	: float = 10.0;
private var chanceOfCollectableTypeD 	: float = 5.0;
	

	// GUI 




/////////////////
function Start () 
{
	pickSpawnPos = true;
}



//////////////////
function Update () 
{
	if (transform.childCount <= 0)
	{
		return null;
	}
	else
	{
	// Adds the children found to arraylist:
		AddChildrenToParent ();
	// Finds a spawnPos based on randomPos from arrayList	
		FindLootSpawnPos ();
	}
}


///////////////////////////////
function AddChildrenToParent ()
{
	if (childrensPos.Count <= 20)
	{
		// loop through all the child transforms of the parent.
    	for (var child : Transform in transform) 
   		{
        	//if the child transform name is same as wanted, add it to the list(array)
       		if(child.tag == "groundObject")
        	{
        	    childrensPos.Add(child);
        	}
    	} 
    	//Debug.Log("BlockSpawner_LootTable: Childs in transform x : " + childrensPos.Count);
    }
}

////////////////////////////
function FindLootSpawnPos ()
{
	//Choose a random number based on the length of the arraylist
	var randomIndex 	: int 		= Random.Range(0, childrensPos.Count); 
	
		//Debug.Log("BlockSpawner_LootTable.randomIndex: " + randomIndex);
	
	if (pickSpawnPos == true)
	{
		//Choose a new point from the array of spawn points
 		var pickedPosition : Transform = childrensPos[randomIndex];
 	
 			//Debug.Log("BlockSpawner_LootTable.pickedPosition: " + pickedPosition.transform.position);
	}
		pickSpawnPos = false;	
	
		pickedArrayPos = pickedPosition;
	
	spawnPos = pickedArrayPos;
	

	for (var i = 0; i < childrensPos.Count; i++) 
	{ 
		pickedChild = childrensPos[i];	
					
		if (pickedChild == spawnPos)
		{
				//Debug.Log("BlockSpawner_LootTable: pickedPos already exits, finding new pos... ");
			FindLootSpawnPos ();	
		}
		else
		{	
			if (spawnNow == true)
			{
				spawnObject = GetRandomCategory ();
				
					//Debug.Log("blockSpawner_LootTable.spawnObject = " + GetRandomCategory ());
				
				// Random object, picked from random category:
				if (spawnObject != null)
				{
					var spawningObject = Instantiate(spawnObject, pickedChild.transform.position + Vector3.up, Quaternion.identity);
					
					// making the instantiated Object a child of parent
					spawningObject.transform.parent = this.transform;
				}				
			}
			spawnNow = false;
		}
	} 				
}	

	
/////////////////////////
function GetRandomCategory ()
{
	var randomNum : float = Random.Range(0.0, 100.0);
	
	//Debug.Log("BlockSpawner_LootTable.GetRandomCategory.randomNum: " + randomNum);
	
	if (randomNum < chanceOfObjectTypeA)
    {
       return GetRandomObject();
       //return(category_Objects[0]);
    }
    else if  (randomNum < chanceOfObjectTypeA + chanceOfObjectTypeB)
    {
       return GetRandomCollectable();
       //return(category_Objects[1]);
    }	
}

/////////////////////////
function GetRandomObject()
{
    var randomNum : float = Random.Range(0.0, 100.0); 
 
 	//Debug.Log("BlockSpawner_LootTable.GetRandomObject.randomNum: " + randomNum);
 
    if (randomNum < chanceOfObjectTypeA)
    {
       return(category_Objects[0]);
    }
    else if  (randomNum < chanceOfObjectTypeA + chanceOfObjectTypeB)
    {
       return(category_Objects[1]);
    }
    else if  (randomNum < chanceOfObjectTypeA + chanceOfObjectTypeB + chanceOfObjectTypeC)
    {
       return(category_Objects[2]);
    }
    else if  (randomNum < chanceOfObjectTypeA + chanceOfObjectTypeB + chanceOfObjectTypeC + chanceOfObjectTypeD)	
    {
       return(category_Objects[3]);
    }
    else
    {
       return(category_Objects[0]);
    }
}

/////////////////////////
function GetRandomCollectable()
{
    var randomNum : float = Random.Range(0.0, 100.0); 
 
 	//Debug.Log("BlockSpawner_LootTable.GetRandomCollectable.randomNum: " + randomNum);
 
    if (randomNum < chanceOfCollectableTypeA)
    {
       return(category_Collectables[0]);
    }
    else if  (randomNum < chanceOfCollectableTypeA + chanceOfCollectableTypeB)
    {
       return(category_Collectables[1]);
    }
    else if  (randomNum < chanceOfCollectableTypeA + chanceOfCollectableTypeB + chanceOfCollectableTypeC)
    {
       return(category_Collectables[2]);
    }
    else if  (randomNum < chanceOfCollectableTypeA + chanceOfCollectableTypeB + chanceOfCollectableTypeC + chanceOfCollectableTypeD)	
    {
       return(category_Collectables[3]);
    }
    else
    {
       return(category_Collectables[0]);
    }
}















