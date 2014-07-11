#pragma strict



// Smooth towards the target
			var target 				: Transform;
			var smoothTime 			= 3.0;
	private var velocity 			= Vector3.zero;
	
function Update () 
{
	if (target.transform.position.y >= -4)
	{
		// Define a target position above and behind the target transform
		var targetPosition : Vector3 = target.transform.position;
		
		// Smoothly move the camera towards that target position
		transform.position = Vector3.SmoothDamp(transform.position, targetPosition, velocity, smoothTime);
	}
}