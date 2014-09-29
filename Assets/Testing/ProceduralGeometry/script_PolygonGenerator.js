#pragma strict

import System.Collections.Generic;

	public  var newVertices 		: List.<Vector3> 	= new List.<Vector3>();				// This first list contains every vertex of the mesh that we are going to render
	public  var newTriangles 		: List.<int> 		= new List.<int>();					// The triangles tell Unity how to build each section of the mesh joining the vertices
	public  var newUV 				: List.<Vector2> 	= new List.<Vector2>();				// The UV list is unimportant right now but it tells Unity how the texture is aligned on each polygon
	public  var colVertices 		: List.<Vector3> 	= new List.<Vector3>();
	public  var colTriangles 		: List.<int> 		= new List.<int>();
	
	private var mesh				: Mesh;													// A mesh is made up of the vertices, triangles and UVs we are going to define, after we make them up we'll save them as this mesh
	private var col					: MeshCollider;

	private var tUnit 				: float 			= 0.25;
	private var tStone				: Vector2 			= new Vector2 ( 1, 0 );
	private var tGrass				: Vector2 			= new Vector2 ( 0, 1 );

	private var squareCount 		: int;
	private var colCount			: int;

	public  var blocks				: byte[,];												// A byte array is an easy choice for level information. 
																							// It supports numbers 0-255 so that's a lot of blocks and 
																							// it saves us the hassle of using enumerators. What we'll 
																							// do is have 0 be air, 1 is rock and 2 is grassand that should be enough for now.
	public  var update 				: boolean 			= false;


function Start () 
{
	mesh = GetComponent(MeshFilter).mesh;
	col  = GetComponent(MeshCollider);
	
	GenTerrain();
	BuildMesh ();
	UpdateMesh();
}

function Update ()
{
	if ( update )
	{
		BuildMesh ();
		UpdateMesh();
		update = false;
	}
}


function GenTerrain ()																		// We'll need a way to build this array into something other than blank space so create a function called GenTerrain. 
{
	blocks = new byte[ 96, 128 ];															// Size of terrain
	
																							// We create a stone int and a dirt int and using a few layers of perlin noise they get more textured values. 
																							// Because this is essentially a 1d heightmap we only need x and the y variable can be used just to sample from a different area to make sure the results aren't the same.
																							// You can see the stone is three noise layers with different values. 
	for ( var px : int = 0; px < blocks.GetLength(0); px++ )								
	{
		var stone : int = Noise ( px, 0, 80, 15 , 1 );	// Layer 1							// Layer 1: has a scale of 80 making it quite smooth with large rolling hills, the magnitude is 15 so the hills are at most 15 high (but in practice they're usually around 12 at the most) 
																							// and at the least 0 and the exponent is 1 so no change is applied exponentially.
																							
		stone += Noise ( px, 0, 50, 30, 1 );			// Layer 2							// The next layer has a smaller scale so it's more choppy (but still quite tame) and has a larger magnitude so a higher max height. This ends up being the most prominent layer making the hills.
		stone += Noise ( px, 0, 10, 10, 1 );			// Layer 3							// The third layer has an even smaller scale so it's even noisier but it's magnitude is 10 so its max height is lower, it's mostly for adding some small noise to the stone to make it look more natural. 
		stone += 75;																		// Lastly we add 75 to the stone to raise it up.
		
		var dirt : int = Noise ( px, 0, 100, 35, 1 );										// The dirt layer has to be mostly higher than the stone so the magnitudes here are higher but the scales are 100 and 50 which gives us rolling hills with little noise.
		
		dirt += Noise ( px, 0, 50, 30, 1 );
		dirt += 75;																			//  Again we add 75 to raise it up.
	
		for ( var py : int = 0; py < blocks.GetLength(1); py++ )
		{
			if ( py < stone )
			{
				blocks[ px, py ] = 1;
																							// The next three lines make dirt spots in random places
				if ( Noise ( px, py, 12, 16, 1 ) > 10 )										// an if that compares noise with 10 so if the noise we return is larger than 10 it turns the block to dirt instead of stone. The magnitude of the noise value is 16 so it reruns a over 10 only a little of the time and the scale is fairly low so the spots are pretty small and frequent.				
				{
					blocks[ px, py ] = 2;
				}
																							// The next three lines remove dirt and rock to make caves in certain places
				if ( Noise ( px, py * 2, 16, 14, 1 ) > 10 )	 								// we multiply y by two to stretch out the caves so they are wider than they are tall and we use a larger scale to make larger less frequent caves and the magnitude is lower to reduce the size of the caves that was increased by the scale.						
				{
					blocks[ px, py ] = 0;
				}
			}
			else if ( py < dirt )
			{
				blocks[ px, py ] = 2;
			}
			
			/*
			if ( px == 5 )
			{
				blocks[ px, py ] = 0;
			}
			*/
		}
	}	
}

function BuildMesh ()
{
	for ( var px : int = 0; px < blocks.GetLength(0); px++ )								
	{
		for ( var py : int = 0; py < blocks.GetLength(1); py++ )
		{
			if ( blocks[ px, py] != 0 )														// If the block is not air
			{
				GenCollider ( px, py ); 													// GenCollider here, this will apply it to every block other than air
			
				if 		( blocks[ px, py ] == 1 )
				{
					GenSquare ( px, py, tStone );
				}
				else if ( blocks[ px, py ] == 2 )
				{
					GenSquare ( px, py, tGrass );
				}
			}	
		}
	}	
}

function GenSquare ( x : int, y : int, texture : Vector2 )
{
	newVertices.Add ( new Vector3 ( x	 , y	, 0 ) );
	newVertices.Add ( new Vector3 ( x + 1, y	, 0 ) );
	newVertices.Add ( new Vector3 ( x + 1, y - 1, 0 ) );
	newVertices.Add ( new Vector3 ( x	 , y - 1, 0 ) );
	
	newTriangles.Add(  squareCount * 4);
	newTriangles.Add(( squareCount * 4) + 1);
	newTriangles.Add(( squareCount * 4) + 3);
	newTriangles.Add(( squareCount * 4) + 1);
	newTriangles.Add(( squareCount * 4) + 2);
	newTriangles.Add(( squareCount * 4) + 3);
	
	newUV.Add ( new Vector2 ( tUnit * texture.x			, tUnit * texture.y + tUnit 	) );
	newUV.Add ( new Vector2 ( tUnit * texture.x + tUnit	, tUnit * texture.y + tUnit 	) );
	newUV.Add ( new Vector2 ( tUnit * texture.x + tUnit	, tUnit * texture.y 			) );
	newUV.Add ( new Vector2 ( tUnit * texture.x			, tUnit * texture.y 			) );
	
	squareCount++;
}

function UpdateMesh () 
{
	mesh.Clear ();
	mesh.vertices 	= newVertices.ToArray();
	mesh.triangles 	= newTriangles.ToArray();
	mesh.uv 		= newUV.ToArray();
	mesh.Optimize ();
	mesh.RecalculateNormals ();
			
	newVertices.Clear();
	newTriangles.Clear();
	newUV.Clear();
	squareCount = 0;
	
	var newMesh : Mesh 	= new Mesh();
	newMesh.vertices 	= colVertices.ToArray();
	newMesh.triangles 	= colTriangles.ToArray();
	col.sharedMesh 		= newMesh;
	
	colVertices.Clear();
	colTriangles.Clear();
	colCount = 0;
}

function Block ( x : int, y : int ) : byte
{
	if ( x == -1 || x == blocks.GetLength(0) || y == - 1 || y == blocks.GetLength(1) )
	{
		return 1; 
	}	
	return blocks[ x, y ];
}

function GenCollider ( x : int, y : int )
{
	if ( Block (x, y + 1 ) == 0 ) 																// an if that checks in the direction of the collider. ie. the left collider is only generated if the block to this block's left is air
	{
		// Top 
		colVertices.Add( new Vector3 ( x	, y, 1 ));
		colVertices.Add( new Vector3 ( x + 1, y, 1 ));
		colVertices.Add( new Vector3 ( x + 1, y, 0 ));
		colVertices.Add( new Vector3 ( x	, y, 0 ));
		
		ColliderTriangles ();
		colCount++;
	}
	
	if ( Block (x, y - 1 ) == 0 ) 																// an if that checks in the direction of the collider. ie. the left collider is only generated if the block to this block's left is air
	{
		// Bottom
		colVertices.Add( new Vector3 ( x  	, y - 1, 0 ));
		colVertices.Add( new Vector3 ( x + 1, y - 1, 0 ));
		colVertices.Add( new Vector3 ( x + 1, y - 1, 1 ));
		colVertices.Add( new Vector3 ( x  	, y - 1, 1 ));

		ColliderTriangles();
		colCount++;
	}

	if ( Block (x - 1, y ) == 0 ) 																// an if that checks in the direction of the collider. ie. the left collider is only generated if the block to this block's left is air
	{
		// Left
		colVertices.Add( new Vector3 ( x  	, y - 1 , 1 ));
		colVertices.Add( new Vector3 ( x  	, y  	, 1 ));
		colVertices.Add( new Vector3 ( x  	, y  	, 0 ));
		colVertices.Add( new Vector3 ( x  	, y - 1 , 0 ));

		ColliderTriangles();
		colCount++;
	}
	
	if ( Block (x + 1, y ) == 0 ) 																// an if that checks in the direction of the collider. ie. the left collider is only generated if the block to this block's left is air
	{
		// Right
		colVertices.Add( new Vector3 ( x + 1, y    , 1 ));
		colVertices.Add( new Vector3 ( x + 1, y - 1, 1 ));
		colVertices.Add( new Vector3 ( x + 1, y - 1, 0 ));
		colVertices.Add( new Vector3 ( x + 1, y    , 0 ));

		ColliderTriangles();
		colCount++;
	}
}

function ColliderTriangles ()
{
	colTriangles.Add( colCount * 4 );
	colTriangles.Add(( colCount * 4 ) + 1);
	colTriangles.Add(( colCount * 4 ) + 3);
	colTriangles.Add(( colCount * 4 ) + 1);
	colTriangles.Add(( colCount * 4 ) + 2);
	colTriangles.Add(( colCount * 4 ) + 3);
}

function Noise ( x : int, y : int, scale : float, mag : float, exp : float ) : int
{
	return Mathf.Pow ( ( Mathf.PerlinNoise( x / scale, y / scale ) * mag ), ( exp ) );  		
}
																								// Noise function explained: 
																								// What the function above does is it takes coordinates for x and y to sample for noise, 
																								// then it calls the perlin noise function with those divided by scale.
																								// Then we take the value we get from perlin noise and multiply it by the magnitude "mag" 
																								// because perlin noise returns a value between 0 and 1 and we are going to want noise that 
																								// creates hills that vary in height by larger sizes like between 0 and 10. Then we take the 
																								// result and put it to the power of the exponent "exp". This is useful for mountains and things. 
																								// Lastly we convert the float returned into an int.










































