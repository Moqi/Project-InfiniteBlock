#pragma strict
#pragma downcast

	var world 		: script_World;
	var cameraGO 	: GameObject;



function Start ()
{
	world 		= gameObject.GetComponent("script_World");
	cameraGO 	= GameObject.FindGameObjectWithTag("MainCamera");
}





public function ReplaceBlockCenter ( range : float, block : byte )
{
	// Replaces the block directly in front of the player
}


public function AddBlockCenter ( range : float, block : byte )
{
	// Adds the block specified directly in front of the player
}


public function ReplaceBlockCursor ( block : byte )
{
	// Replaces the block specified where the mouse cursor is pointing
}


public function AddBlockCursor ( block : byte )
{
	// Adds the block specified where the mouse cursor is pointing
}


public function ReplaceBlockAt ( hit : RaycastHit, block : byte )
{
	// removes a block at these impact coordinates, you can raycast against the terrain and call this with the hit.point
}


public function AddBlockAt ( hit : RaycastHit, block : byte )
{
	// adds the specified block at these impact coordinates, you can raycast against the terrain and call this with the hit.point
}


public function SetBlockAt ( position : Vector3, block : byte )
{
	// SETS the specified block at these coordinates
}


public function SetBlockAt ( x : int, y : int, z : int, block : byte )
{
	// ADDS the specified block at these coordinates
}


public function UpdateChunkAt ( x : int, y : int, z : int )
{
	// Updates the chunk containing this block
}





















































































