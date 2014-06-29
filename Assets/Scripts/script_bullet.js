// ----------- Bullet Script ----------


// Inspector variables

	// Effects 
	var explosion 	: Transform;
	var switchEffect: Transform;
	
	// Objects
	var platformChunk : Transform;
	
	// Sound
	var fxSound		: AudioClip;
	
	// GUIText:
	var sceneManager : Transform;
	var score100p    : Transform;		
		
	// Amount of scorepoint granted from each object: 
	var enemyScore 	: int = 100;	
		


function Start ()
{
	yield WaitForSeconds(3);
	
	Destroy(gameObject);
}



// Update = game loop    
function Update () 
{	
	/*var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	
	var hit : RaycastHit;
	
	
	if (Physics.Raycast (ray, hit, 1000)) 
	{		
  		Debug.Log(hit.point);
  		
  		var newDir = Vector3.RotateTowards(transform.forward, hit.point, 1000 * Time.deltaTime, 0.0);
  		
		transform.rotation = Quaternion.LookRotation(newDir);
		
		//transform.LookAt(hit.point);
		
	}*/
	
	//transform.Translate(0, bulletSpeed * Time.deltaTime, 0);
	
	
	/*if(transform.position.y >= bulletRange)
	{
		Destroy(gameObject);
	}*/
	
}

 
function OnTriggerEnter (other : Collider) // other = astroid
{
	// Check for the astroid
	if (other.gameObject.tag == "groundObject")
	{	
		//print("ground hit!");
		
		var explosionGround = Instantiate(explosion, transform.position, Quaternion.identity); 
		//audio.PlayClipAtPoint(fxSound, transform.position);
		
		Destroy(other.gameObject);
	}
	
	if (other.gameObject.tag == "enemy")
	{
		// Displaying scoreGUI at enemyPos translated to the MainCamera viewport:
		var displayPoints  = Instantiate(score100p, Camera.main.WorldToViewportPoint (other.transform.position), Quaternion.identity);
		
			// Accessing sceneManager script to add x points to the overAll Score.
				// Accessing blockcreator_ground script:
			var sceneManagerScript : script_sceneManager = sceneManager.GetComponent(script_sceneManager);
		
		// Adding points to overall score:				
		sceneManagerScript.overAllPoints += enemyScore;			
						
		// BOOOM - Explosion!						
		var explosionEnemy = Instantiate(explosion, transform.position, Quaternion.identity); 
		
		Destroy(other.gameObject);
	}
	
	if (other.gameObject.tag == "switch")
	{
		// Spawn platformCreator
		var newPlatform = Instantiate(platformChunk, transform.position, Quaternion.identity);
		
		// Effect				
		var effectSwitch = Instantiate(switchEffect, transform.position, Quaternion.identity);
		
		Destroy(other.gameObject);
	}
	
}
















