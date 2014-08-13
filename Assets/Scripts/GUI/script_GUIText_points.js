#pragma strict

		var time_		: float;
		var timeToFade 	: float     = 1.5;
		//var speed 		: float		= 0.15;
private var velocity 		: Vector3;
private var angularVelocity : Vector3;
	
	
function Start () 
{
   time_ = Time.time;
  
   	// create a random up direction 1 unit accross and 20 units up.
	velocity 				= Random.insideUnitSphere;
	velocity.y 				= 0;
	velocity.Normalize();
	velocity.y 				= 3.0;	// make this smaller if it shoots too high.
	
	// this is a random rotation.
    angularVelocity = Random.insideUnitSphere.normalized;
   
}


function Update () 
{
    //var y = Time.deltaTime * speed;   
    //transform.Translate(0, y, 0);
    
    guiText.material.color.a = Mathf.Cos((Time.time - time_) * (( Mathf.PI / 2 ) / timeToFade));

	// adjust the velocity for gravity. (Physics.gravity.y is -9.8)
    // add a multiplier here if it just isn't dropping fast enough. *2 if needed.
    velocity.y += Physics.gravity.y * Time.deltaTime / 2 ;

    // if we didnt hit anything, just move the transform.
    transform.position += velocity * Time.deltaTime / 20;
        
    transform.Rotate(angularVelocity * Time.deltaTime * 10);
    
    
    Destroy (gameObject, timeToFade);
    
}

























