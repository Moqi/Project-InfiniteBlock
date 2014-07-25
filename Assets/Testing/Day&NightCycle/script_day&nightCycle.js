#pragma strict
///////////////////////////////////////////////////////////////////////////
////////////////////////// day&night cycle script /////////////////////////
///////////////////////////////////////////////////////////////////////////


		var sunObject		: Transform;
private	var dayLengthInSecs : int			= 300;


function Start () 
{

	

}

function Update () 
{	
	SunController ();
}


function SunController ()
{
	// Spin the object around the world origin at 20 degrees/second.
	
	sunObject.transform.RotateAround (Vector3.zero, Vector3.right, 360 * Time.deltaTime / dayLengthInSecs);
}