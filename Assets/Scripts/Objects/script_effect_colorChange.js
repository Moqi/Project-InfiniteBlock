#pragma strict
	
	private var layerBreakable;

function Update () 
{

	//ColorByObjectType ();

	GetMousePosColorTwo ();

    //LerpParticleColor ();
    
    //GetMousePosColor ();
   
}

/*
function GetMousePosColor ()
{
	//	The texture must have the Read/Write Enabled flag set in the import settings, otherwise this function will fail	//
	
	var colorAtMousePosition 		: Color;
	var mainCamera 	: Camera		= Camera.mainCamera; 											// Camera to use for raycasting
	var pos 		: Vector2		= Input.mousePosition; 											// Mouse position
	var ray 		: Ray 			= mainCamera.ScreenPointToRay(pos);
	var hit 		: RaycastHit;

	Physics.Raycast( mainCamera.transform.position, ray.direction, hit, 10000.0f );

	if(hit.collider.gameObject.renderer.material.mainTexture) 
	{
    	var tex : Texture2D = hit.collider.gameObject.renderer.material.mainTexture; 				// Get texture of object under mouse pointer
    	
    	//colorAtMousePosition = tex.GetPixelBilinear ( hit.textureCoord2.x, hit.textureCoord2.y ); 	// Get color from texture
    	colorAtMousePosition = tex.GetPixelBilinear ( hit.textureCoord2.x, hit.textureCoord2.y ); 	// Get color from texture
    	
    	this.GetComponent(ParticleSystem).startColor = colorAtMousePosition;
    	
    	Debug.Log("Color at mouse position: " + colorAtMousePosition);
	}
}
*/

function GetMousePosColorTwo ()
{
   // Harvesting layer = breakable 
   layerBreakable = LayerMask.NameToLayer("breakable");
   
   var hit 	: RaycastHit;
   var ray 	= Camera.main.ScreenPointToRay (Input.mousePosition);
   
   if ( Physics.Raycast( ray, hit, Mathf.Infinity ) )
   {
      if ( hit.collider.gameObject.renderer && hit.transform.gameObject.layer == layerBreakable )
      {     	
      		this.gameObject.GetComponent(ParticleSystem).startColor = hit.collider.gameObject.renderer.material.color;
      }
   }
}

/*
function LerpParticleColor ()
{
	
    var alpha 		: float; 
    var lightOn 	: Color = Color.white;
    var lightOff 	: Color = Color.black;
    var duration 	: float = 1.0;

	var lerp 		: float = Mathf.PingPong (Time.time, duration) / duration;
    
    var color 		: Color = Color.Lerp (lightOn, lightOff, lerp);
    
    this.GetComponent(ParticleSystem).startColor = color;
}


function ColorByObjectType ()
{		
		var ray 		: Ray 			= Camera.main.ScreenPointToRay (Input.mousePosition);	
		var hit 		: RaycastHit;
	
		if (Physics.Raycast (ray, hit, 1000))
		{
			//Debug.DrawRay (ray.origin, hit.point, Color.red);
			
			if ( hit.collider.tag == "treeCrownPiece" || "bush" )
			{	
					Debug.Log ("ParticleColor = green!");
				
				this.GetComponent(ParticleSystem).startColor = new Color(151/255.0F, 232/255.0F, 67/255.0F, 0/255.0F);	// light  green;
			}
		   
		    if ( hit.collider.tag == "rock" )
			{
					Debug.Log ("ParticleColor = Gray!");
				
				this.GetComponent(ParticleSystem).startColor = new Color(107/255.0F, 101/255.0F, 92/255.0F, 0/255.0F);	// light gray
			}		
		}
}
*/






