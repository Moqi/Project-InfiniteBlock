#pragma strict
#pragma downcast

	var world 		: script_World;
	var cameraGO 	: GameObject;



function Start ()
{
	world 		= gameObject.GetComponent("script_World");
	cameraGO 	= GameObject.FindGameObjectWithTag("MainCamera");
}

function Update ()
{
	if ( Input.GetMouseButtonDown( 0 ))
	{
		ReplaceBlockCursor(0);
		//ReplaceBlockCenter( 5, 0 );
	}
	
	if ( Input.GetMouseButtonDown( 1 ))
	{
		AddBlockCursor(1);
		//AddBlockCenter( 5, 255 );
	}
	
	LoadChunks( GameObject.FindGameObjectWithTag("Player").transform.position, 32, 48 );
	//LoadChunks( GameObject.FindGameObjectWithTag("Player").transform.position, 225, 225 );
}

public function LoadChunks ( playerPos : Vector3, distToLoad : float, distToUnload : float )
{
	for ( var x : int = 0; x < world.chunks.GetLength(0); x++ )
	{
		for ( var z : int = 0; z < world.chunks.GetLength(2); z++ )
		{
			var dist : float = Vector2.Distance( new Vector2 ( x * world.chunkSize, z * world.chunkSize ), new Vector2 ( playerPos.x, playerPos.z ) );
			
			if ( dist < distToLoad )
			{
				if ( world.chunks[x, 0, z] == null )
				{
					world.GenColumn(x, z);
				}
			}
			else if ( dist > distToUnload )
			{
				if ( world.chunks[x, 0, z] != null )
				{
					world.UnloadColumn(x, z);
				}
			}
		}
	}
}


public function ReplaceBlockCenter ( range : float, block : byte )
{
	// Replaces the block directly in front of the player
	var ray : Ray = new Ray( cameraGO.transform.position, cameraGO.transform.forward );		// CHANGE THIS AT SOME POINT DUE TO DIFFERENT CAMERA ANGLE
	
	var hit : RaycastHit;
	
	if ( Physics.Raycast ( ray, hit ) )
	{
		if ( hit.distance < range )
		{
			ReplaceBlockAt( hit, block );
		}
	}								
}


public function AddBlockCenter ( range : float, block : byte )
{
	// Adds the block specified directly in front of the player
	var ray : Ray = new Ray( cameraGO.transform.position, cameraGO.transform.forward );		// CHANGE THIS AT SOME POINT DUE TO DIFFERENT CAMERA ANGLE
	
	var hit : RaycastHit;
	
	if ( Physics.Raycast ( ray, hit ) )
	{
		if ( hit.distance < range )
		{
			AddBlockAt( hit, block );
		}
		Debug.DrawLine( ray.origin, ray.origin + ( ray.direction * hit.distance ), Color.green, 2 );
	}	
}


public function ReplaceBlockCursor ( block : byte )
{
	// Replaces the block specified where the mouse cursor is pointing
	var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	
	var hit : RaycastHit;
	
	if ( Physics.Raycast (ray, hit ) ) 
	{		
		ReplaceBlockAt( hit, block );	
	}
}


public function AddBlockCursor ( block : byte )
{
	// Adds the block specified where the mouse cursor is pointing
	var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	
	var hit : RaycastHit;

	if ( Physics.Raycast ( ray, hit ) ) 
	{	
		AddBlockAt( hit, block );
		
		Debug.DrawLine( ray.origin, ray.origin + ( ray.direction * hit.distance ), Color.green, 2 );
	}
}


public function ReplaceBlockAt ( hit : RaycastHit, block : byte )
{
	// removes a block at these impact coordinates, you can raycast against the terrain and call this with the hit.point
	var position : Vector3 = hit.point;
	
		position		  += ( hit.normal * -0.5f );

	SetBlockAt( position, block );
}


public function AddBlockAt ( hit : RaycastHit, block : byte )
{
	// adds the specified block at these impact coordinates, you can raycast against the terrain and call this with the hit.point
	var position : Vector3 = hit.point;

		position		  += ( hit.normal * 0.5f );

	SetBlockAt( position,block );
}


public function SetBlockAt ( position : Vector3, block : byte )
{
	// SETS the specified block at these coordinates	
	var x : int = Mathf.RoundToInt( position.x );
	var y : int = Mathf.RoundToInt( position.y );
	var z : int = Mathf.RoundToInt( position.z );

	SetBlockAt( x, y, z, block );
}


public function SetBlockAt ( x : int, y : int, z : int, block : byte )
{
	// ADDS the specified block at these coordinates
			
	//Debug.Log("Adding: " + x + ", " + y + ", " + z);
	
	if ( world.data[ x + 1, y, z ] == 254 )
	{
		 world.data[ x + 1, y, z ] = 255;
	}
	if ( world.data[ x - 1, y, z ] == 254 )
	{
		 world.data[ x - 1, y, z ] = 255;
	}
	if ( world.data[ x, y, z + 1 ] == 254 )
	{
		 world.data[ x, y, z + 1 ] = 255;
	}
	if ( world.data[ x, y, z - 1 ] == 254)
	{
		 world.data[ x, y, z - 1 ] = 255;
	}
	if ( world.data[ x, y + 1, z ] == 254 )
	{
		 world.data[ x, y + 1, z ] = 255;
	}
	
	world.data[ x, y, z] = block;
	
	UpdateChunkAt( x, y, z, block );
}

//To do: add a way to just flag the chunk for update then it update it in lateupdate
public function UpdateChunkAt ( x : int, y : int, z : int, block : byte )
{
	// Updates the chunk containing this block
	
	var updateX : int = Mathf.FloorToInt( x / world.chunkSize );
	var updateY : int = Mathf.FloorToInt( y / world.chunkSize );
	var updateZ : int = Mathf.FloorToInt( z / world.chunkSize );
	
	//Debug.Log("Updating: " + updateX + ", " + updateY + ", " + updateZ);
	
	world.chunks[ updateX, updateY, updateZ ].update = true;
	
	if ( x - ( world.chunkSize * updateX ) == 0 && updateX !=0 )
	{
		world.chunks[ updateX - 1, updateY, updateZ ].update = true;
	}
	
	if ( x - ( world.chunkSize * updateX ) == 15 && updateX != world.chunks.GetLength(0) - 1 )
	{
		world.chunks[ updateX + 1, updateY, updateZ ].update = true;
	}
	
	if ( y - ( world.chunkSize * updateY ) == 0 && updateY != 0 )
	{
		world.chunks[ updateX, updateY - 1, updateZ ].update = true;
	}
	
	if ( y - ( world.chunkSize * updateY ) == 15 && updateY != world.chunks.GetLength(1) - 1 )
	{
		world.chunks[ updateX, updateY + 1, updateZ ].update = true;
	}
	
	if ( z - ( world.chunkSize * updateZ ) == 0 && updateZ != 0 )
	{
		world.chunks[ updateX, updateY, updateZ - 1 ].update = true;
	}
	
	if ( z - ( world.chunkSize * updateZ ) == 15 && updateZ != world.chunks.GetLength(2) - 1 )
	{
		world.chunks[ updateX, updateY, updateZ + 1 ].update = true;
	}
}





















































































