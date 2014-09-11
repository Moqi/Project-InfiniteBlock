#pragma strict

		var lootGainEffect 	: Transform;

private var bounceEffect 	: boolean		= true;
private var mask 			: LayerMask 	= -1;
private var velocity 		: Vector3;
private var angularVelocity : Vector3;
//private var moveToPlayer 	: boolean 		= false;
private var playerPos 		: GameObject;

function Start () 
{
	transform.rotation = Camera.main.transform.rotation;
	
	// create a random up direction 1 unit accross and 20 units up.
	velocity 				= Random.insideUnitSphere;
	velocity.y 				= 0;
	velocity.Normalize();
	velocity.y 				= 5;	// make this smaller if it shoots too high.
	
	// this is a random rotation.
    angularVelocity = Random.insideUnitSphere.normalized;
    
    yield WaitForSeconds (2);
    
    Destroy(gameObject);
    //moveToPlayer = true;
}

function Update () 
{	
	if ( bounceEffect == true )
	{
		// adjust the velocity for gravity. (Physics.gravity.y is -9.8)
    	// add a multiplier here if it just isn't dropping fast enough. *2 if needed.
    	velocity.y += Physics.gravity.y * Time.deltaTime;
	
		// only hit if we are going down.
    	if(velocity.y < 0)
   		{     
        	// build a raycast to test if we hit something.
        	var dist : float 	=  velocity.magnitude * Time.deltaTime;
        	var hit : RaycastHit; 
        	var ray : Ray		= new Ray(transform.position, velocity);
         
        	if(Physics.Raycast(ray, hit, dist, mask))
         	{
                // if we hit something then set the transform to the hit point.
                transform.position = hit.point;
                // adjust the object to look right on the ground.
                transform.LookAt(transform.position + transform.forward, hit.normal);
                // make sure to destroy this so that it doesnt go off next Update
                	//Destroy(gameObject.GetComponent("script_LootEffect"));
                // get out to prevent the normal movement.
                
                bounceEffect = false;
                
                return;  
          	}
     	}
       
        // if we didnt hit anything, just move the transform.
        transform.position += velocity * Time.deltaTime;
        
        transform.Rotate(angularVelocity * Time.deltaTime);
        
        transform.RotateAround (this.transform.position, Vector3.forward, 125.0 * Time.deltaTime);
    }    
 	 
 	 // Move object to player
       
     playerPos = GameObject.FindWithTag ( "playerLootCollector" );   
     
     /*     
     if ( moveToPlayer == true )
     {
     	//Debug.Log ( "Move to player!" );   	
     	gameObject.transform.position = Vector3.Lerp ( this.transform.position, playerPos.transform.position, Time.deltaTime * 5.0 );
     }   
     */
}

/*
function OnTriggerEnter ( other : Collider )
{
	if ( other.collider.tag == "playerLootCollector" )
	{
		var newLootGainEffect = Instantiate (lootGainEffect, other.collider.transform.position, Quaternion.identity );
		
		Destroy(gameObject);
	}
}
*/















