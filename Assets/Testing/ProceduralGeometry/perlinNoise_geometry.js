#pragma strict
#pragma downcast

	var scale 		: float = 1; 
	var heightScale : int 	= 1;

private var side_size 	: int = 50;
	var cube 		: GameObject;
	
	var colorList 	: List.<Color> = new List.<Color>();

function Start () 
{
	/*
	colorList.Add(Color.red);
	colorList.Add(Color.blue);
	colorList.Add(Color.green);
	colorList.Add(Color.yellow);
	*/
	colorList.Add(Color.gray);
	colorList.Add(Color.white);

	for ( var x = 0; x < side_size; x++ )
	{
		for ( var z = 0; z < side_size; z++ )
		{	
			//for ( var y = 0; y < side_size; y++ )
			//{
				//var newBlock = Instantiate (cube, Vector3( x, y, z ), Quaternion.identity );
				var newBlock = Instantiate (cube, Vector3( x, 0, z ), Quaternion.identity );
			
				newBlock.transform.parent = transform;

			//}
		}
	}
	
	
	UpdateGeometry ();
}

function Update () 
{
	
}



function UpdateGeometry ()
{
	//transform.position.y = heightScale * Mathf.PerlinNoise ( Time.time + ( transform.position.x * scale ), Time.time + ( transform.position.z * scale ) );
	
	for ( var child : Transform in transform )
	{
		//child.transform.position.y = heightScale * Mathf.PerlinNoise ( Time.time + ( child.transform.position.x * scale ), Time.time + ( child.transform.position.z * scale ) );
		
		child.transform.position.y = heightScale * Mathf.PerlinNoise ( Time.time + ( child.transform.position.x * scale ), Time.time + ( child.transform.position.z * scale ) );
		
		//UpdateGeomtryColor ( child );
	}
}


function UpdateGeomtryColor ( child : Transform )
{
	var index : int = Random.Range(0, colorList.Count );
	
	var newColor : Color = colorList[index];
	
	child.transform.renderer.material.color = newColor;
}



































