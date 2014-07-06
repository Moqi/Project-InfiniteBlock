

private var originalPos 			: Vector3;
		var playerPos 				: Transform;
static  var camAtSafeZone 			: boolean;
		
/////////////////////////////////////////
// Start
function Start () 
{
	originalPos = playerPos.transform.position;
}

/////////////////////////////////////////
// Update 
function Update()
{
	if (gameObject.transform.position == originalPos)
	{
		camAtSafeZone = true;
	}
	else 
	{
		camAtSafeZone = false;
	}

	if (!GameObject.FindWithTag("Player"))
	{	
		//Debug.Log("Camera: Moving to original position!");
       	MoveObject(transform, transform.position, originalPos, 3.0);		
	}
}

//////////////////////////////////////////
// Used to reset camera movement
function MoveObject (thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) 
{
    var i 		= 0.0;
    var rate 	= 1.0 / time;
    while (i < 1.0) 
    {
        i += Time.deltaTime * rate;
        
        thisTransform.position = Vector3.Lerp(startPos, endPos, i);
        
        yield; 
    }
}


