#pragma strict
#pragma downcast
///////////////////////////////////////////////////////////////////////////
///////////////////////// WorldSpawnPoints script /////////////////////////
///////////////////////////////////////////////////////////////////////////


		var spawnPointsVisible 	: boolean 	= true;
private var alreadyTurnedOff 	: Array 	= new Array();


private var spawnPointArray		: Array		= new Array();

		var platformTrigger		: Transform;


//////////////////////////////////////////////////////////
function Start () 
{
/////////////////////////////////////////////////////////////////
	if (spawnPointsVisible == true)
	{
		spawnPointRenderer(true);
	}
	else 
	{
		spawnPointRenderer(false);
	}
	
/////////////////////////////////////////////////////////////////
	var children = gameObject.GetComponentsInChildren(Transform);
	
	for (var child : Transform in children)
	{
		spawnPointArray.Push(child);
		
		child.tag = "worldSpawnPoint";
		
		//print ("Childcount: " + spawnPointArray.length);
	}

	Instantiate ( platformTrigger, transform.position, Quaternion.identity);
	
}
/////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////
function spawnPointRenderer(on : boolean) 
{
    var renderers : Renderer[] = gameObject.GetComponentsInChildren.<Renderer>();
 
    if (on) 
    {
        for ( var r : Renderer in renderers) 
        {
            r.enabled = true;
        }
        for ( var o : Renderer in alreadyTurnedOff) 
        {
            o.enabled = false;
        }
    } 
    else 
    {
        alreadyTurnedOff.Clear();
        for ( var r : Renderer in renderers) 
        {
            if (!r.enabled)
                alreadyTurnedOff.Push(r);
 
            r.enabled = false;
        }
    }
}
/////////////////////////////////////////////////////////////////

















