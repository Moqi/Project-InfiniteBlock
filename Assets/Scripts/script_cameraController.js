﻿//////////////////////////////////////////////////////////////////////////
///////////////////// CameraController script ////////////////////////////
//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////
// Variables 

	var target 					: Transform;						// target for camera to look at
	var targetHeight 			: float 			= 1.0;			// height of target
	var collisionLayers 		: LayerMask			= -1;			// collision layers for camera
	var distance 				: float 			= 8.0;			// distance between target and camera
	var xSpeed 					: float 			= 250.0;		// movement on horizontal
	var ySpeed 					: float 			= 120.0;		// movement on vertical
	var yMinLimit 				: float 			= -12.0;		// limit how low on vertical to rotate
	var yMaxLimit 				: float 			= 80.0;			// limit how high on vertical to rotate
	var rotationSpeed 			: float 			= 3.0;			// speed of rotation
	var zoomMinLimit 			: float 			= 2.0;			// limit how close to zoom in (mousescroll)
	var zoomMaxLimit 			: float				= 6.0;			// limit how far to zoom out (mousescroll)
	var zoomDampening 			: float 			= 5.0;			// speed of zoom easing
	var offsetFromWall 			: float 			= 0.1;			// distance away from walls
	
private var x					: float				= 0.0;			// store axis x from input
private var y 					: float 			= 0.0;			// store axis y from input
private var currentDistance 	: float;							// current distance between target and camera
private var desiredDistance 	: float;							// wanted distance between target and camera
private var correctedDistance 	: float;							// amount to correct for between target and camera

 
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
	
	x += Input.GetAxis("Horizontal") * xSpeed * 0.02;
	y -= Input.GetAxis("Vertical") * ySpeed * 0.02;
	
	y = ClampAngle(y, yMinLimit, yMaxLimit);
	
	var rotation = Quaternion.Slerp(transform.rotation, Quaternion.Euler(y, x, 0), Time.deltaTime * 3);
	
	vTargetOffset = new Vector3 (0, -targetHeight, 0);
	
	position = target.position - (rotation * Vector3.forward * desiredDistance + vTargetOffset);
	
	var collisionHit : RaycastHit;
	var trueTargetPosition : Vector3 = new Vector3 (target.position.x, target.position.y + targetHeight, target.position.z);
	
	var isCorrected : boolean = false;
	if(Physics.Linecast (trueTargetPosition, position, collisionHit, collisionLayers.value))
	{
		correctedDistance = Vector3.Distance (trueTargetPosition, collisionHit.point) - offsetFromWall;
		isCorrected = true;
	}
	
	if(!isCorrected || correctedDistance > currentDistance)
	{
		currentDistance = Mathf.Lerp (currentDistance, correctedDistance, Time.deltaTime * zoomDampening);
	}
	else
	{
		isCorrected = false;
		currentDistance = correctedDistance; 
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
































