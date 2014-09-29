#pragma strict

import System.Collections.Generic;

	public  var newVertices 		: List.<Vector3> 	= new List.<Vector3>();				// This first list contains every vertex of the mesh that we are going to render
	public  var newTriangles 		: List.<int> 		= new List.<int>();					// The triangles tell Unity how to build each section of the mesh joining the vertices
	public  var newUV 				: List.<Vector2> 	= new List.<Vector2>();				// The UV list is unimportant right now but it tells Unity how the texture is aligned on each polygon

	private var mesh				: Mesh;													// A mesh is made up of the vertices, triangles and UVs we are going to define, after we make them up we'll save them as this mesh
	private var col					: MeshCollider;

	private var tUnit 				: float 			= 0.25;
	private var tStone				: Vector2 			= new Vector2 ( 1, 0 );
	private var tGrass				: Vector2 			= new Vector2 ( 0, 1 );
	private var tGrassTop			: Vector2 			= new Vector2 ( 1, 1 );

	private var faceCount 			: int;

	public  var chunkX 				: int;
	public  var chunkY 				: int;
	public  var chunkZ 				: int;

	public  var worldGO				: GameObject;
	private var world 				: script_World;
	public  var chunkSize 			: int 				=	16;

function Start () 
{
	mesh 	= GetComponent(MeshFilter).mesh;
	col  	= GetComponent(MeshCollider);
	world	= worldGO.GetComponent(script_World);
	
	GenerateMesh ();
}

function Update () 
{

}


function Block ( x : int, y : int, z : int ) : byte
{
	return world.Block ( x + chunkX, y + chunkY, z + chunkZ );
}

public function GenerateMesh ()
{
	for ( var x : int = 0; x < chunkSize; x++ )
	{
		for ( var y : int = 0; y < chunkSize; y++ )
		{
			for ( var z : int = 0; z < chunkSize; z++ )
			{
				//This code will run for every block in the chunk
				if ( Block( x, y, z) != 0 )
				{
					//If the block is solid
					if ( Block( x, y + 1, z ) == 0 )
					{
						//Block above is air
						CubeTop( x, y, z, Block( x, y, z ) );
					}

					if ( Block( x, y - 1, z ) == 0 )
					{
						//Block below is air
						CubeBot( x, y, z, Block( x, y, z ) );
					}

					if ( Block( x + 1, y, z ) == 0 )
					{
						//Block east is air
						CubeEast( x, y, z, Block( x, y, z ) );
					}

					if ( Block( x - 1, y, z ) == 0 )
					{
						//Block west is air
						CubeWest( x, y, z, Block( x, y, z ) );
					}

					if ( Block( x, y, z + 1 ) == 0 )
					{
						//Block north is air
						CubeNorth( x, y, z, Block(x , y, z ) );
					}

					if ( Block( x, y, z - 1 ) == 0 )
					{
						//Block south is air
						CubeSouth( x, y, z, Block ( x, y, z ) );
					}
				}
			}
		}
	}
	UpdateMesh ();
}

function UpdateMesh ()																		// update mesh will commit the verticies and things to the mesh filter
{
/*
	What's happening here? Well CubeTop runs first and it creates verticies for a square facing 
	upwards using the x,y,z coordinates, then it creates numbers for the triangles using the 
	faceCount and lastly it applies the texture at the coordinates to the face. 
*/
	mesh.Clear ();
	mesh.vertices 	= newVertices.ToArray();
	mesh.uv 		= newUV.ToArray();
	mesh.triangles 	= newTriangles.ToArray();
	mesh.Optimize ();
	mesh.RecalculateNormals ();

	col.sharedMesh = null;
	col.sharedMesh = mesh;

	newVertices.Clear();
	newUV.Clear();
	newTriangles.Clear();
	faceCount = 0; 
}

function Cube ( texturePos : Vector2 )
{
	newTriangles.Add( faceCount * 4 	); //1
	newTriangles.Add( faceCount * 4 + 1 ); //2
	newTriangles.Add( faceCount * 4 + 2 ); //3
	newTriangles.Add( faceCount * 4  	); //1
	newTriangles.Add( faceCount * 4 + 2 ); //3
	newTriangles.Add( faceCount * 4 + 3 ); //4
	
	newUV.Add( new Vector2 ( tUnit * texturePos.x + tUnit, tUnit * texturePos.y			));
	newUV.Add( new Vector2 ( tUnit * texturePos.x + tUnit, tUnit * texturePos.y + tUnit	));
	newUV.Add( new Vector2 ( tUnit * texturePos.x		 , tUnit * texturePos.y + tUnit	));
	newUV.Add( new Vector2 ( tUnit * texturePos.x		 , tUnit * texturePos.y			));
	
	faceCount++;
}

function CubeTop ( x : int, y : int, z : int, block : byte )								// CubeTop will be one of six functions that generate a side of the cube 
{
	newVertices.Add( new Vector3 ( x	,  y,  z + 1));
	newVertices.Add( new Vector3 ( x + 1,  y,  z + 1));
	newVertices.Add( new Vector3 ( x + 1,  y,  z 	));
	newVertices.Add( new Vector3 ( x	,  y,  z 	));

	var texturePos : Vector2 = new Vector2( 0, 0);

	if ( Block ( x, y, z ) == 1 )
	{
   		texturePos = tStone;
  	} 
  	else if ( Block ( x, y, z ) == 2 )
  	{
   		texturePos = tGrassTop;
  	}
  	
  	Cube (texturePos);
}

function CubeNorth ( x : int, y : int, z : int, block : byte )
{
	newVertices.Add( new Vector3 ( x + 1, y - 1, z + 1 ));
	newVertices.Add( new Vector3 ( x + 1, y	   , z + 1 ));
	newVertices.Add( new Vector3 ( x	, y	   , z + 1 ));
	newVertices.Add( new Vector3 ( x	, y - 1, z + 1 ));
	
	var texturePos : Vector2 = new Vector2( 0, 0);
	
	if ( Block ( x, y, z ) == 1 )
	{
   		texturePos = tStone;
  	} 
  	else if ( Block ( x, y, z ) == 2 )
  	{
   		texturePos = tGrass;
  	}
  	
  	Cube (texturePos);
}

function CubeEast ( x : int, y : int, z : int, block : byte )
{
	newVertices.Add( new Vector3 ( x + 1, y - 1, z     ));
	newVertices.Add( new Vector3 ( x + 1, y	   , z	   ));
	newVertices.Add( new Vector3 ( x + 1, y    , z + 1 ));
	newVertices.Add( new Vector3 ( x + 1, y - 1, z + 1 ));
	
	var texturePos : Vector2 = new Vector2( 0, 0);
	
	if ( Block ( x, y, z ) == 1 )
	{
   		texturePos = tStone;
  	} 
  	else if ( Block ( x, y, z ) == 2 )
  	{
   		texturePos = tGrass;
  	}
  	
  	Cube (texturePos);
}

function CubeSouth ( x : int, y : int, z : int, block : byte )
{
	newVertices.Add( new Vector3 ( x	, y - 1, z ));
	newVertices.Add( new Vector3 ( x	, y	   , z ));
	newVertices.Add( new Vector3 ( x + 1, y    , z ));
	newVertices.Add( new Vector3 ( x + 1, y - 1, z ));
	
	var texturePos : Vector2 = new Vector2( 0, 0);
	
	if ( Block ( x, y, z ) == 1 )
	{
   		texturePos = tStone;
  	} 
  	else if ( Block ( x, y, z ) == 2 )
  	{
   		texturePos = tGrass;
  	}
  	
  	Cube (texturePos);
}

function CubeWest ( x : int, y : int, z : int, block : byte )
{
	newVertices.Add( new Vector3 ( x, y - 1, z + 1 ));
	newVertices.Add( new Vector3 ( x, y	   , z + 1 ));
	newVertices.Add( new Vector3 ( x, y    , z     ));
	newVertices.Add( new Vector3 ( x, y - 1, z     ));
	
	var texturePos : Vector2 = new Vector2( 0, 0);
	
	if ( Block ( x, y, z ) == 1 )
	{
   		texturePos = tStone;
  	} 
  	else if ( Block ( x, y, z ) == 2 )
  	{
   		texturePos = tGrass;
  	}
  	
  	Cube (texturePos);
}

function CubeBot ( x : int, y : int, z : int, block : byte )
{
	newVertices.Add( new Vector3 ( x	, y - 1,  z     ));
	newVertices.Add( new Vector3 ( x + 1, y - 1,  z     ));
	newVertices.Add( new Vector3 ( x + 1, y - 1,  z + 1 ));
	newVertices.Add( new Vector3 ( x	, y - 1,  z + 1 ));
	
	var texturePos : Vector2 = new Vector2( 0, 0);
	
	if ( Block ( x, y, z ) == 1 )
	{
   		texturePos = tStone;
  	} 
  	else if ( Block ( x, y, z ) == 2 )
  	{
   		texturePos = tGrass;
  	}
  	
  	Cube (texturePos);
}












