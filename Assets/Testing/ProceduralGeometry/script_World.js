#pragma strict
#pragma downcast

/*
	You can store the information in each chunk so that every chunk has the data 
	for the blocks it contains or you can use a big array for all the level data 
	that each chunk refers to. I think we'll use the big array because it's easier 
	later on. This will mean that our world has a fixed size though but making an 
	infinitely generating world will have to remain outside of the scope of this tutorial.
*/

	public var chunk 		: GameObject;
	public var chunks 		: script_Chunk[,,];
	public var chunkSize 	: int		= 16;

	public var data 		: byte[,,];
	public var worldX 		: int 		= 16;
	public var worldY 		: int 		= 16;
	public var worldZ 		: int 		= 16;
	
	private var noiseScript : script_Noise;

function Awake ()
{
	noiseScript = this.GetComponent(script_Noise);
}

function Start () 
{
	data = new byte[ worldX, worldY, worldZ ];																		// initiate the byte array with the world* variables as the sizes of the array.
/*
	With the default variables our world is only one chunk in size but we'll change that later. 
	This array is pretty useless when it's all empty so let's at least fill it with some placeholder 
	data, similar to how we filled the 2d array we'll cycle through all the dimensions of this array 
	and turn anything lower than 8 to stone. 
	
	Remember that in our data array 0 is air, 1 is stone and 2 is dirt.
*/
	for ( var x : int = 0; x < worldX; x++ )
	{
		for ( var z : int = 0; z < worldZ; z++ )
		{
						    //PerlinNoise( x,   y, z, scale, height, power )
			/*
			var stone : int = PerlinNoise( x,   0, z, 10, 3, 1.2f );
			stone		   += PerlinNoise( x, 300, z, 20, 4,    0 ) + 10;
			var dirt  : int = PerlinNoise( x, 100, z, 50, 2,    0 ) + 1;	// Added +1 to make sure minimum grass height is 1  
			*/
			var stone : int = PerlinNoise( x,   0, z, 10, 4, 1.2f );
			stone		   += PerlinNoise( x, 300, z, 20, 5,   0 ) + 10;
			var dirt  : int = PerlinNoise( x, 100, z, 50, 3,   0 ) + 1;	// Added +1 to make sure minimum grass height is 1   
			
			for ( var y : int = 0; y < worldY; y++ )
			{
				if ( y <= stone )
				{
					data[ x, y, z ] = 1;
				} 
				else if ( y <= dirt + stone )
				{
					data[ x, y, z ] = 2;
				}
			}
		}
	}
	chunks = new script_Chunk[ Mathf.FloorToInt( worldX / chunkSize ) , Mathf.FloorToInt( worldY / chunkSize ) , Mathf.FloorToInt( worldZ / chunkSize ) ];	
}

public function GenColumn( x : int, z : int )
{
	for ( var y : int = 0; y < chunks.GetLength(1); y++ )
	{
		var newChunk : GameObject = Instantiate( chunk, new Vector3 ( x * chunkSize - 0.5f, y * chunkSize + 0.5f, z * chunkSize - 0.5f ), new Quaternion(0,0,0,0)) as GameObject;
	
		chunks[ x, y, z]  = newChunk.GetComponent("script_Chunk");
		
		//var newChunkSize = chunks[ x, y, z].chunkSize;
		
		//newChunkSize = Random.Range(8, 16);				
			
		chunks[ x, y, z].worldGO 	= gameObject;
		chunks[ x, y, z].chunkSize 	= chunkSize;
		chunks[ x, y, z].chunkX		= x * chunkSize;
		chunks[ x, y, z].chunkY		= y * chunkSize;
		chunks[ x, y, z].chunkZ		= z * chunkSize;
	}
}	

public function UnloadColumn ( x : int, z : int )
{
	for ( var y : int = 0; y < chunks.GetLength(1); y++ ) 
	{
		Destroy( chunks [x, y, z].gameObject );	
	}
}


function PerlinNoise( x : int, y : int, z : int, scale : float, height : float, power : float ) : int 
{
	var rValue : float;
	
	rValue  = noiseScript.GetNoise( (x) / scale, (y) / scale, (z) / scale ); 

	rValue *= height;

	if ( power != 0 )
	{
		rValue = Mathf.Pow( rValue, power );
	}
	return parseInt(rValue);
}


public function Block( x : int, y : int, z : int ) : byte
{
	if ( x >= worldX || x < 0 || y >= worldY || y < 0 || z >= worldZ || z < 0 )
	{
		return 1;
	}
	return data[ x, y, z];
}


































