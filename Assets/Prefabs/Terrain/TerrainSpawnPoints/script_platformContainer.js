#pragma strict

		var destroyWorld 	: boolean 	= false;
private var destroySpeed 	: float		= 0.1;


function Update () 
{
	if ( Input.GetKeyDown ( KeyCode.F7 ) )
	{
		destroyWorld = true;
	}
	
	if ( destroyWorld == true )
	{
		DestroyTheWorld ();
	}
}


function DestroyTheWorld ()
{	
	var nextIndexToDestroy : int 	= 0;
	var allChildren 				= gameObject.GetComponentsInChildren(Transform);
	
	if ( nextIndexToDestroy < allChildren.Length )
	{
		yield WaitForSeconds ( destroySpeed );
	
		nextIndexToDestroy++;	
		
		if ( nextIndexToDestroy != allChildren.Length )
		{
			var objectToDestroy : Transform = allChildren[nextIndexToDestroy];
		}
		else
		{
			destroyWorld = false;
		}
			//Debug.Log (allChildren.Length);
		
		if ( objectToDestroy != null )
		{
			Debug.Log ( "Platform destroyed!" );
			Destroy ( objectToDestroy.gameObject );	// destroy current object, and increment counter	
		}	
	}
}
