#pragma strict
#pragma downcast

	public  var terrain 	: GameObject;
	private var tScript 	: script_PolygonGenerator;
	public  var size 		: int 						= 4;
	public  var circular    : boolean					= false;


function Start () 
{
	tScript = terrain.GetComponent("script_PolygonGenerator");
}

function Update () 
{
	/*
	So we run this for each block in a square of size by size, if the circular bool is true then first 
	we check to see if the distance from the origin is smaller than one third the size to create a circular effect. 
	Then for both the circular and noncircular parts we remove the block at that point subtracting half the size 
	(Because otherwise the object would be in the top left of the blast, this offsets it to the center) if the 
	remove block function returns true we set the collision we defined earlier to true. After the loops if anything 
	set collision to true we update the polygon generator, this way we don't update the mesh if nothing was removed.
	*/
	var collision : boolean = false;
	
	for ( var x : int = 0; x < size; x++ )
	{
		for( var y : int = 0; y < size; y++ )
		{
			if ( circular )
			{
				if ( Vector2.Distance ( new Vector2 ( x - ( size / 2 ), y - ( size / 2 ) ), Vector2.zero ) <= ( size / 3 ) ) 
				{
					if ( RemoveBlock ( x - ( size / 2 ), y - ( size / 2 ) ) )
					{
						collision = true;
					}
				}
			} 
			else 
			{ 
				if ( RemoveBlock ( x - ( size / 2 ), y - ( size / 2 ) ) )
				{
					collision = true;
				}
			}
	   }
	}
	if ( collision )
	{
		tScript.update = true;
	}
}


function RemoveBlock ( offsetX : float, offsetY : float ) : boolean 
{
	var x : int = Mathf.RoundToInt ( transform.position.x 	   + offsetX );
	var y : int = Mathf.RoundToInt ( transform.position.y + 1f + offsetY );
	
	if ( x < tScript.blocks.GetLength(0) && y < tScript.blocks.GetLength(1) && x >= 0 && y >= 0 )
	{
		if ( tScript.blocks[ x, y] != 0 )
		{
			tScript.blocks[ x, y ] = 0;
			return true;
		}
	}
	return false;
}






































