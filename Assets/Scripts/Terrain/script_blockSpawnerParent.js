#pragma strict

////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// BlockSpawnerParent Script ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// Variables
	
	// Blocks to spawn:
		var mainPlatform 			: GameObject;
		var blocktypeMain 			: GameObject;
	
	// SpawnPoints: 
		var blockSpawnerChild		: GameObject;
		var spawnPoints 			: Vector3[];	//create an array of positions

	// Generate blocks:
		var generateSpeed			: float 		= 0.5;
private var z_width		 			: int; 			
private var x_width		 			: int; 			
		var Min_Z_width  			: int;
		var Max_Z_width	 			: int;
		var Min_X_width  			: int;
		var Max_X_width  			: int; 
private var make_Z_extraBlocks 		: boolean 		= true;

/////////////////
function Start () 
{

	//Choose a random number based on the length of the array
		var randomIndex : int = Random.Range(0, spawnPoints.length); 
		
			//Debug.Log("BlockSpawnerParent_randomIndex: " + randomIndex);
	
	//Choose a new point from the array of spawn points
 		var pickedPosition : Vector3 = transform.position + spawnPoints[randomIndex];
	
			//Debug.Log("BlockSpawnerParent_pickedPosition: " + pickedPosition);
			
	// transform.position = the pickedLocation
		transform.position = pickedPosition;
		
		transform.parent = GameObject.FindWithTag("blockSpawnMaster").transform;
	
	// yields to generate in at a steady pace
		yield WaitForSeconds(1);
		
	// Instantiates main platform
		var mainPlatform : GameObject = Instantiate(mainPlatform, transform.position - Vector3(0, 2, 0), Quaternion.identity);	
		
	// Instantiates a new blockSpawner before creating the current platform		
		var newBlockSpawnerChild : GameObject = Instantiate(blockSpawnerChild, transform.position, Quaternion.identity);
	
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////// Generate platform ///////////////////////////////////////
	
	z_width = Random.Range(Min_Z_width, Max_Z_width);
	
		//Debug.Log(z_width);
	
	x_width = Random.Range(Min_X_width, Max_X_width);
	
		//Debug.Log(x_width);
		
	
	transform.position = transform.position - (Vector3( x_width, 0, z_width) / 2);		
		

	for (var i : int = 0; i < z_width; i++) 
  	{
  		var sideBlocks_Ypos = Random.Range(-1, 2);
	
		//print(sideBlocks_Ypos);
 							
  	// ######### Extra sidecubes ## Side: -X ######### 
  		var randomNumOne : int = Random.Range(0, 9);
    	
    	if(randomNumOne <= 8)
    	{
    		var randomNumOne_extraRandomOne 				: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(Random.Range(1, -2), sideBlocks_Ypos, i), Quaternion.identity);
    		
    			randomNumOne_extraRandomOne.transform.parent 			 = this.transform;
    		
    		if(randomNumOne <= 6)
    		{
    			var randomNumOne_extraRandomTwo 			: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(Random.Range(-2, -3), sideBlocks_Ypos, i), Quaternion.identity);
    			
    				randomNumOne_extraRandomTwo.transform.parent 		 = this.transform;
    				
    			if(randomNumOne <= 4)
    			{
    				var randomNumOne_extraRandomThree 		: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(Random.Range(-3, -6), sideBlocks_Ypos, i), Quaternion.identity);
    				
    					randomNumOne_extraRandomThree.transform.parent   = this.transform;
    				
    				if(randomNumOne <= 2)
    				{
    					var randomNumOne_extraRandomFour 	: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(Random.Range(-6, -10), sideBlocks_Ypos, i), Quaternion.identity);
    				
    						randomNumOne_extraRandomFour.transform.parent= this.transform;
    				}
    			}
    		}
    	}
   	
    // ######### Fill cubes ##########################################################################################	
   			for (var j : int = 0; j < x_width; j++)
    		{
    			sideBlocks_Ypos = Random.Range(-1, 2);
    		
      			var tile : GameObject 		= Instantiate (blocktypeMain, transform.position + Vector3(j, 0, i), Quaternion.identity);
      			
      				tile.transform.parent   = this.transform;
      			
      		
      		// ############## random blocks ontop of fillerBlocks #####################################################
      			var randomNumFive : float = Random.Range(0.0, 9.0);
      			
      			if (randomNumFive <= 0.4)
      			{
      				var randomNumFive_extraRandomOne 								: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j, 1, i), Quaternion.identity);
      				
      					randomNumFive_extraRandomOne.transform.parent 							 = this.transform;
      				
      				if(randomNumFive <= 0.2)
      				{
      					var randomNumFive_extraRandomTwo 							: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j, 1, i + Random.Range(-1, 2)), Quaternion.identity);
      					
      						randomNumFive_extraRandomTwo.transform.parent 						 = this.transform;
      					
      					if(randomNumFive <= 0.1)
      					{
      						var randomNumFive_extraRandomThree 						: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j + Random.Range(-1, 2), 1, i), Quaternion.identity);
      						
      							randomNumFive_extraRandomThree.transform.parent 				 = this.transform;
      						
      						if(randomNumFive <= 0.08)
      						{
      							var randomNumFive_extraRandomFour 					: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j, 2, i), Quaternion.identity);
      						
      								randomNumFive_extraRandomFour.transform.parent 				 = this.transform;
      						}
      					}
      				}
      			}
      			
      			
			// ################ Extra Z blocks ########################################################################	
      			if (j <= x_width && make_Z_extraBlocks == true)
  				{
  				// ########## RandomNumThree ######### Side: Z(minus) #############	
  						var randomNumThree : int = Random.Range(0, 9);
    	
    					if(randomNumThree <= 8)
    					{
    							var randomNumThree_extraRandomOne 					: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j, sideBlocks_Ypos, i + Random.Range(-1, -2)), Quaternion.identity);
    							
    								randomNumThree_extraRandomOne.transform.parent 				 = this.transform;
    							
    							if(randomNumThree <= 6)
    							{
    								var randomNumThree_extraRandomTwo 				: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j, sideBlocks_Ypos, i + Random.Range(-2, -3)), Quaternion.identity);
    			
    									randomNumThree_extraRandomTwo.transform.parent 			 = this.transform;
    			
    								if(randomNumThree <= 4)
    								{
    									var randomNumThree_extraRandomThree 		: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j, sideBlocks_Ypos, i + Random.Range(-3, -6)), Quaternion.identity);
    				
    										randomNumThree_extraRandomThree.transform.parent 	 = this.transform;
    				
    									if(randomNumThree <= 2)
    									{
    										var randomNumThree_extraRandomFour 		: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j, sideBlocks_Ypos, i + Random.Range(-6, -10)), Quaternion.identity);
    									
    											randomNumThree_extraRandomFour.transform.parent  = this.transform;
    									}
    								}
    							}
  						}
  				
  				// ########## RandomNumFour ######### Side: Z(plus) #############				
  						var randomNumFour : int = Random.Range(0, 9);
    	
    					if(randomNumFour <= 8)
    					{
    							var randomNumFour_extraRandomOne 					: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j, sideBlocks_Ypos, z_width + Random.Range(0, 2)), Quaternion.identity);
    							
    								randomNumFour_extraRandomOne.transform.parent 				 = this.transform;
    							
    							if(randomNumFour <= 6)
    							{
    								var randomNumFour_extraRandomTwo 				: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j, sideBlocks_Ypos, z_width + Random.Range(2, 3)), Quaternion.identity);
    			
    									randomNumFour_extraRandomTwo.transform.parent			 = this.transform;
    			
    								if(randomNumFour <= 4)
    								{
    									var randomNumFour_extraRandomThree 			: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j, sideBlocks_Ypos, z_width + Random.Range(3, 6)), Quaternion.identity);
    					
    										randomNumFour_extraRandomThree.transform.parent 	 = this.transform;
    					
    									if(randomNumFour <= 2)
    									{
    										var randomNumFour_extraRandomFour 		: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j, sideBlocks_Ypos, z_width + Random.Range(6, 10)), Quaternion.identity);
    									
    											randomNumFour_extraRandomFour.transform.parent 	 = this.transform;
    									}
    								}
    							}
  						}		
  				}	
  			
  				yield WaitForSeconds(generateSpeed);
  
    		}
		
		// Locks the Z-extra blocks, so that they don't appear as filler
		make_Z_extraBlocks = false;

		
    // ######### Extra sidecubes ## Side: +X
    	var randomNumTwo : int = Random.Range(0, 9);
    	
    	if(randomNumTwo <= 8)
    	{
    		var randomNumTwo_extraRandomOne 				: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j + Random.Range(0, 2), sideBlocks_Ypos, i), Quaternion.identity);
    		
    			randomNumTwo_extraRandomOne.transform.parent 			 = this.transform;
    		
    		if(randomNumTwo <= 6)
    		{
    			var randomNumTwo_extraRandomTwo 			: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j + Random.Range(2, 3), sideBlocks_Ypos, i), Quaternion.identity);
    			
    				randomNumTwo_extraRandomTwo.transform.parent 		 = this.transform;
    			
    			if(randomNumTwo <= 4)
    			{
    				var randomNumTwo_extraRandomThree 		: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j + Random.Range(3, 6), sideBlocks_Ypos, i), Quaternion.identity);
    				
    					randomNumTwo_extraRandomThree.transform.parent 	 = this.transform;
    				
    				if(randomNumTwo <= 2)
    				{
    					var randomNumTwo_extraRandomFour 	: GameObject = Instantiate (blocktypeMain, transform.position + Vector3(j + Random.Range(6, 10), sideBlocks_Ypos, i), Quaternion.identity);
    				
    						randomNumTwo_extraRandomFour.transform.parent= this.transform;
    				}
    			}
    		}
    	}
    	  	
     // ################ Yield to slow generationProcess down ###################
      
    	yield WaitForSeconds(generateSpeed);
  	 }
	
	
	
}

//////////////////
function Update () 
{
		
}