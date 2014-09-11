#pragma strict


public class lootableItem extends MonoBehaviour
{
	public  var item 				: Item;
	private var inventory 			: Inventory;
	
	public  var lootGainEffect 		: Transform;
	private var bounceEffect 		: boolean		= true;
	private var mask 				: LayerMask 	= -1;
	private var velocity 			: Vector3;
	private var angularVelocity 	: Vector3;
	private var moveToPlayer 		: boolean 		= false;
	private var playerPos 			: GameObject;
	
	function Start ()
	{
		inventory 				= GameObject.FindGameObjectWithTag ("Inventory").GetComponent(Inventory);
		
		velocity 				= Random.insideUnitSphere;		// create a random up direction 1 unit accross and 20 units up.
		velocity.y 				= 0;
		velocity.Normalize();
		velocity.y 				= 5;							// make this smaller if it shoots too high.
	    angularVelocity 		= Random.insideUnitSphere.normalized;	// this is a random rotation.
	    
	    transform.renderer.material.color = item.itemColor;
	    
	    yield WaitForSeconds (5);
    
    	moveToPlayer = true;
	}
	
	function Update ()
	{
		BounceEffect ();
		
		playerPos = GameObject.FindWithTag ( "playerLootCollector" );   
         
     	if ( moveToPlayer == true )
     	{
     		gameObject.transform.position = Vector3.Lerp ( this.transform.position, playerPos.transform.position, Time.deltaTime * 5.0 );
     	}   
	}
	
	function BounceEffect ()
	{
		if ( bounceEffect == true )
		{
	    	velocity.y += Physics.gravity.y * Time.deltaTime;
	
	    	if(velocity.y < 0)
	   		{     
	        	var dist : float 	=  velocity.magnitude * Time.deltaTime;
	        	var hit  : RaycastHit; 
	        	var ray  : Ray		= new Ray(transform.position, velocity);
	         
	        	if(Physics.Raycast(ray, hit, dist, mask))
	         	{
	                transform.position = hit.point;
	             
	                transform.LookAt(transform.position + transform.forward, hit.normal);
	                
	                bounceEffect = false;
	                
	                return;  
	          	}
	     	}
	       
	        transform.position += velocity * Time.deltaTime;
	        
	        transform.Rotate(angularVelocity * Time.deltaTime);
	        
	        transform.RotateAround (this.transform.position, Vector3.forward, 125.0 * Time.deltaTime);
	    }
	}
	
	
	function OnTriggerEnter ( other : Collider )
	{
		if ( other.collider.tag == "Player" )
		{
			moveToPlayer = true;
		}
		
		if ( other.collider.tag == "playerLootCollector" )
		{
			inventory.AddItem ( item.itemID ); 
			//var newLootGainEffect = Instantiate (lootGainEffect, other.collider.transform.position, Quaternion.identity );
			
			Destroy(gameObject);
		}
	}
}	





















