//////////////////////////////////////////////////////////////////////////
/////////////////// Block Terrain creator script /////////////////////////
//////////////////////////////////////////////////////////////////////////

// Variables: 

		// Level status
static  var levelReady 		 : boolean;	
		var generateSpeed 	 : float 	= 0.5;
		// Generate switch 
		var switchActive 	 : boolean;
		var blockSwitch 	 : Transform;
			
		// Block types: 
		var blockPrefab_01   : GameObject;
		var blockPrefab_02   : GameObject;
	
private var z_width		 : int; 			// max = 35
private var x_width		 : int; 			// max = 35
		
		var Min_Z_width  : int;
		var Max_Z_width	 : int;
		var Min_X_width  : int;
		var Max_X_width  : int; 
		//var blockAmount : GameObject[];
	
private var make_Z_extraBlocks : boolean = true;


function Start ()
{
	//transform.position = transform.position + Vector3(-10, 0, 10);
	

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
    		var randomNumOne_extraRandomOne 				: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(Random.Range(1, -2), sideBlocks_Ypos, i), Quaternion.identity);
    		
    		if(randomNumOne <= 6)
    		{
    			var randomNumOne_extraRandomTwo 			: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(Random.Range(-2, -3), sideBlocks_Ypos, i), Quaternion.identity);
    			
    			if(randomNumOne <= 4)
    			{
    				var randomNumOne_extraRandomThree 		: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(Random.Range(-3, -6), sideBlocks_Ypos, i), Quaternion.identity);
    				
    				if(randomNumOne <= 2)
    				{
    					var randomNumOne_extraRandomFour 	: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(Random.Range(-6, -10), sideBlocks_Ypos, i), Quaternion.identity);
    				}
    			}
    		}
    	}
    	
    // ######### Fill cubes ##########################################################################################	
   			for (var j : int = 0; j < x_width; j++)
    		{
    			sideBlocks_Ypos = Random.Range(-1, 2);
    		
      			var tile : GameObject = Instantiate (blockPrefab_01, transform.position + Vector3(j, 0, i), Quaternion.identity);
      			
      			//print("Filler");
      			
      		// ############## random blocks ontop of fillerBlocks #####################################################
      			var randomNumFive : float = Random.Range(0.0, 9.0);
      			
      			if (randomNumFive <= 0.4)
      			{
      				var randomNumFive_extraRandomOne 								: GameObject = Instantiate (blockPrefab_01, transform.position + Vector3(j, 1, i), Quaternion.identity);
      				
      				if(randomNumFive <= 0.2)
      				{
      					var randomNumFive_extraRandomTwo 							: GameObject = Instantiate (blockPrefab_01, transform.position + Vector3(j, 1, i + Random.Range(-1, 2)), Quaternion.identity);
      					
      					if(randomNumFive <= 0.1)
      					{
      						var randomNumFive_extraRandomThree 						: GameObject = Instantiate (blockPrefab_01, transform.position + Vector3(j + Random.Range(-1, 2), 1, i), Quaternion.identity);
      						
      						if(randomNumFive <= 0.08)
      						{
      							var randomNumFive_extraRandomFour 					: GameObject = Instantiate (blockPrefab_01, transform.position + Vector3(j, 2, i), Quaternion.identity);
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
    							var randomNumThree_extraRandomOne 					: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(j, sideBlocks_Ypos, i + Random.Range(-1, -2)), Quaternion.identity);
    							
    							if(randomNumThree <= 6)
    							{
    								var randomNumThree_extraRandomTwo 				: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(j, sideBlocks_Ypos, i + Random.Range(-2, -3)), Quaternion.identity);
    			
    								if(randomNumThree <= 4)
    								{
    									var randomNumThree_extraRandomThree 		: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(j, sideBlocks_Ypos, i + Random.Range(-3, -6)), Quaternion.identity);
    				
    									if(randomNumThree <= 2)
    									{
    										var randomNumThree_extraRandomFour 		: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(j, sideBlocks_Ypos, i + Random.Range(-6, -10)), Quaternion.identity);
    									}
    								}
    							}
  						}
  				
  				// ########## RandomNumFour ######### Side: Z(plus) #############				
  						var randomNumFour : int = Random.Range(0, 9);
    	
    					if(randomNumFour <= 8)
    					{
    							var randomNumFour_extraRandomOne 					: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(j, sideBlocks_Ypos, z_width + Random.Range(0, 2)), Quaternion.identity);
    							
    							if(randomNumFour <= 6)
    							{
    								var randomNumFour_extraRandomTwo 				: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(j, sideBlocks_Ypos, z_width + Random.Range(2, 3)), Quaternion.identity);
    			
    								if(randomNumFour <= 4)
    								{
    									var randomNumFour_extraRandomThree 			: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(j, sideBlocks_Ypos, z_width + Random.Range(3, 6)), Quaternion.identity);
    					
    									if(randomNumFour <= 2)
    									{
    										var randomNumFour_extraRandomFour 		: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(j, sideBlocks_Ypos, z_width + Random.Range(6, 10)), Quaternion.identity);
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
    		var randomNumTwo_extraRandomOne 				: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(j + Random.Range(0, 2), sideBlocks_Ypos, i), Quaternion.identity);
    		
    		if(randomNumTwo <= 6)
    		{
    			var randomNumTwo_extraRandomTwo 			: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(j + Random.Range(2, 3), sideBlocks_Ypos, i), Quaternion.identity);
    			
    			if(randomNumTwo <= 4)
    			{
    				var randomNumTwo_extraRandomThree 		: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(j + Random.Range(3, 6), sideBlocks_Ypos, i), Quaternion.identity);
    				
    				if(randomNumTwo <= 2)
    				{
    					var randomNumTwo_extraRandomFour 	: GameObject = Instantiate (blockPrefab_02, transform.position + Vector3(j + Random.Range(6, 10), sideBlocks_Ypos, i), Quaternion.identity);
    				}
    			}
    		}
    	}
    	  	
     // ################ Yield to slow generationProcess down ###################
      
    	yield WaitForSeconds(generateSpeed);
  	 }
  	 
  	//blockAmount = GameObject.FindGameObjectsWithTag("groundObject");
	
	//print(blockAmount.Length);
	
	//Debug.Log("Loop finished");
	
	levelReady = true;
	
	if (switchActive == true)
	{
		if (! GameObject.FindWithTag("switch"))
		{
			var newBlockSwitch = Instantiate (blockSwitch, transform.position + Vector3(    Random.Range(-6, 6), Random.Range(1, 3),     Random.Range(-6, 6)), Quaternion.identity);
		}
	}
	
}






















