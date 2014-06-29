//////////////////////////////////////////////////////////////////////////
////////////////////////// Enemy Block script ////////////////////////////
//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////
// Variables 		
		var vectorArray 	= new Array();
		var spawnPoints 	: Vector3[];				//create an array of positions
private var playerPos 		: Vector3;
		var newLocation 	: Vector3;
		var randomStrategyNum : int;
		
		// effects:
		var enemyBite 		: Transform;
		var playerBlood 	: Transform;
		
		// player
static	var playerAlive 	: boolean			= true;

//////////////////////////////////////////
// Start
function Start () 
{
	
	InvokeRepeating("RandomNum", 1, 5);	
	
}


//////////////////////////////////////////
// Update
function Update () 
{
	playerPos = GameObject.FindWithTag("Player").transform.position;
	
	moveBlock();
}

/* NOTES ####### ARRAY INFO: 
fx 
	var initiParentToPointDistance : Vector3 = new Vector3[8]; // Vector3 of 8 indexes
	var openList : Array = new Array(); // an empty array, able to be added to
	var closedList : Array = new Array(); // an empty array, able to be added to
*/

/////////////////////////////////////////////////////////////////////////
////////////////////////// My functions /////////////////////////////////


function moveBlock()
{
		var current_X = transform.position.x;
		var current_Y = transform.position.y;
		var current_Z = transform.position.z;
		
		var moveSpeed : float = 1;	
		
		var move_X : float;  
		var move_Y : float;  
		var move_Z : float;
		
		
// Pick random strategy!: 	
	
	if (randomStrategyNum <= 4)
	{
		//print("Enemy is moving around randomly!");
			
			var gameObjectArray : GameObject[] = GameObject.FindGameObjectsWithTag("groundObject");
	
				//print("Number of objects: " + gameObjectArray.Length);
	
			for (var i : int = 0; i < gameObjectArray.Length; i++)
			{
				var arrayItem = gameObjectArray[i];
		
					//arrayItem.transform.position.z = arrayItem.transform.parent.transform.position.z;
		
				//var arrayItemPos : Vector3 = arrayItem.transform.position;
				
				var arrayItemPos = Vector3(Random.Range(0, 35), 0, Random.Range(0, 35));
				
					//arrayItemPos.z = arrayItem.transform.parent.transform.position.z;
					
				//var arrayItemFinalPos = arrayItemPos + Vector3(0, 0, arrayItem.transform.parent.transform.position.z);	
				
			}					
			
			//print("ArrayItemPos: " + arrayItemPos);	
																																		
   			var randomVector : Vector3 = arrayItemPos;
   			
   	//print ("RandomVector: " + randomVector);
   			
   			var randomVector_X = randomVector.x;
   			var randomVector_Y = 0;
   			var randomVector_Z = randomVector.z;
   
   			move_X = Mathf.MoveTowards(current_X, randomVector_X, moveSpeed * Time.deltaTime);
			//move_Y = Mathf.MoveTowards(current_Y, randomVector_Y, moveSpeed * Time.deltaTime);
			move_Z = Mathf.MoveTowards(current_Z, randomVector_Z, moveSpeed * Time.deltaTime);
   
    	newLocation = Vector3(move_X, move_Y, move_Z);	

	}
	else if (randomStrategyNum >= 5)
	{
		//print("Enemy is moving TOWARDS the player!");
		
			var player_X = playerPos.x;
			var player_Y = 0;
			var player_Z = playerPos.z;
		
			move_X = Mathf.MoveTowards(current_X, player_X, moveSpeed * Time.deltaTime);
			move_Y = Mathf.MoveTowards(current_Y, player_Y, moveSpeed * Time.deltaTime);
			move_Z = Mathf.MoveTowards(current_Z, player_Z, moveSpeed * Time.deltaTime);
		
		newLocation = Vector3(move_X, move_Y, move_Z);	
			
	}
	else if (randomStrategyNum == 8)
	{
		animation.Play("stirr_on_ground");
		
		newLocation = transform.position;
	}
	
 	// Finds lookdirection:
 		var newDirection : Vector3 = (newLocation - transform.position).normalized;
 	
 		var lookRotation : Quaternion = Quaternion.LookRotation(newDirection);
 		
 		transform.rotation = Quaternion.Slerp(transform.rotation, lookRotation, 3.0 * Time.deltaTime);
 		
 		// moves blockcreator to the new location	
		transform.position = newLocation;
	
						
}

function RandomNum()
{
	randomStrategyNum = Random.Range(0, 9);
}






function OnTriggerEnter (other : Collider) // other = astroid
{
	// Check for the astroid
	if (other.gameObject.tag == "groundObject")
	{	
		print("Enemy is eating ground!");
		
		//var explosionCopy = Instantiate(explosion, transform.position, Quaternion.identity); 
		//audio.PlayClipAtPoint(fxSound, transform.position);
		
		animation.Play("bite");
		
		var biteEffect = Instantiate(enemyBite, transform.position, Quaternion.identity); 
		
			//biteEffect.transform.parent = GameObject.FindWithTag("enemy").transform;
		
		Destroy(other.gameObject);
	}

	if (other.gameObject.tag == "Player")
	{
		//print("Player died!");
		
		animation.Play("laugh");
		
		var playerBloodEffect = Instantiate(playerBlood, transform.position, Quaternion.identity); 
		
		playerAlive = false;	
		
		//Destroy(other.gameObject);
	}
}



 





















