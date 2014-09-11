#pragma strict

//////////////////////////////////////////////////////////////////////////
///////////////////// CameraController script ////////////////////////////
//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////
// Variables 

		var target 					: Transform;						// target for camera to look at
		var targetHeight 			: float 			= 1.0;			// height of target
		var collisionLayers 		: LayerMask			= -1;			// collision layers for camera
		var distance 				: float 			= 8.0;			// distance between target and camera
private var xSpeed 					: float 			= 0.0;		// movement on horizontal
	    var ySpeed 					: float 			= 120.0;		// movement on vertical
	 	var yMinLimit 				: float 			= 40.0;			// limit how low on vertical to rotate
		var yMaxLimit 				: float 			= 50.0;			// limit how high on vertical to rotate
		var rotationSpeed 			: float 			= 3.0;			// speed of rotation
		var zoomMinLimit 			: float 			= 2.0;			// limit how close to zoom in (mousescroll)
		var zoomMaxLimit 			: float				= 6.0;			// limit how far to zoom out (mousescroll)
		var zoomDampening 			: float 			= 5.0;			// speed of zoom easing
		var offsetFromWall 			: float 			= 0.1;			// distance away from walls
	
static  var x					: float					= 0.0;			// store axis x from input
private var y 					: float 				= 0.0;			// store axis y from input
private var currentDistance 	: float;								// current distance between target and camera
private var desiredDistance 	: float;								// wanted distance between target and camera
private var correctedDistance 	: float;								// amount to correct for between target and camera
private var otherGameObject		: GameObject;
private var reduceOpacity 		: boolean				= false;
	

//////////////////////////////////////////
// Start 
function Start ()
{
	var angles : Vector2 	= transform.eulerAngles;
	
	x = angles.y;
	y = angles.x;
	
	currentDistance 		= distance;
	desiredDistance 		= distance;
	correctedDistance 		= distance;

}


//////////////////////////////////////////
// LateUpdate - good for camera 
function LateUpdate () 
{
	//x += Input.GetAxis("CameraX") * xSpeed * 0.02;
	//y -= Input.GetAxis("CameraY") * ySpeed * 0.02;
	
	//x += Input.GetAxis("Horizontal") * xSpeed * 0.02;
	y -= Input.GetAxis("Vertical") * ySpeed * 0.02;
	
	y = ClampAngle(y, yMinLimit, yMaxLimit);
	
	var rotation : Quaternion;
	
	if ( Input.GetMouseButton ( 1 ) )	// Right click
	{
	 	x 			+= Input.GetAxis("Mouse X") * xSpeed * 0.02;
        rotation 	= Quaternion.Slerp(transform.rotation, Quaternion.Euler(y, x, 0), Time.deltaTime * 3);
		xSpeed 		= 5;
	}
	else
	{
		rotation 	= Quaternion.Slerp(transform.rotation, Quaternion.Euler(y, x, 0), Time.deltaTime * 3);
		xSpeed	 	= 0;
	}
	
	var vTargetOffset = new Vector3 (0, -targetHeight, 0);
	
	var position = target.position - (rotation * Vector3.forward * desiredDistance + vTargetOffset);
	
	var collisionHit 		: RaycastHit;
	var trueTargetPosition 	: Vector3 = new Vector3 (target.position.x, target.position.y + targetHeight, target.position.z);
	
	var isCorrected 		: boolean = false;
	
	if(Physics.Linecast (trueTargetPosition, position, collisionHit, collisionLayers.value))
	//if(Physics.SphereCast (trueTargetPosition, 4.0, trueTargetPosition.back, collisionHit, Mathf.Infinity, collisionLayers.value))
	{
		Debug.DrawLine (Camera.main.transform.position, collisionHit.point);
		
		otherGameObject = collisionHit.transform.gameObject;
		correctedDistance = Vector3.Distance (trueTargetPosition, collisionHit.point) - offsetFromWall;
		isCorrected = true;
	}
	
	if(!isCorrected || correctedDistance > currentDistance)
	{
		currentDistance = Mathf.Lerp (currentDistance, correctedDistance, Time.deltaTime * zoomDampening);
		reduceOpacity 	= false;
	}
	else
	{
		isCorrected 	= false;
		currentDistance = correctedDistance; 
		reduceOpacity 	= true;
	}
	
	if ( reduceOpacity )
	{
		if ( otherGameObject != null && otherGameObject.renderer != null )
		{
			otherGameObject.transform.renderer.material.color.a = 0.2;				// Material needs to be Transparent!
		}	
	}
	else
	{
		if ( otherGameObject != null && otherGameObject.renderer != null )
		{
			otherGameObject.transform.renderer.material.color.a = 1.0;
		}
	}

	currentDistance = Mathf.Clamp (currentDistance, zoomMinLimit, zoomMaxLimit);
	position = target.position - (rotation * Vector3.forward * currentDistance + vTargetOffset);
	
	
	transform.rotation = rotation;	
	transform.position = position;
}



//////////////////////////////////////////
// static function for clamping angle
static function ClampAngle (angle : float, min : float, max : float)
{
	if (angle < -360)
	{
		angle += 360;
	}
	if (angle > 360)
	{
		angle -= 360;
	}
	
	return Mathf.Clamp (angle, min, max);
}






























