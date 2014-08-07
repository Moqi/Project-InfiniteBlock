#pragma strict
////////////////////////////////////////////////////////////////////////////////////////////
//////////// Script: Controls the triangle located ontop of the players head ///////////////
////////////////////////////////////////////////////////////////////////////////////////////

private var speed 			: float 		= 30.0;

		var target 			: Transform;
   		var smoothTime 						= 1.0;
    	var xOffset 		: float 		= 0.15;
    	var yOffset 		: float 		= 0.1;
    	var zOffset 		: float 		= 0.15;
private var thisTransform 	: Transform;
private var velocity 		: Vector2;


function Start()
{
    thisTransform = transform;
}


function Update () 
{
	transform.RotateAround (this.transform.position, Vector3 (Random.Range( 0, 360), Random.Range( 0, 360), Random.Range( 0, 360) ), speed * Time.deltaTime);
	
}


function LateUpdate()
{
    thisTransform.position.x = Mathf.Lerp( thisTransform.position.x, target.position.x - xOffset, Time.deltaTime * smoothTime);
 
    //thisTransform.position.y = Mathf.Lerp( thisTransform.position.y, target.position.y + yOffset, Time.deltaTime * smoothTime);
    
    thisTransform.position.z = Mathf.Lerp( thisTransform.position.z, target.position.z - zOffset, Time.deltaTime * smoothTime);
}












