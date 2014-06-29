//////////////////////////////////////////////////////////////////////////
//////////////////////// SceneManager script /////////////////////////////
//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////
// Variables 

// Overall Stats:	
static	var overAllPoints 				: int			= 0;	
	
// Progress GUI:
		var showProgressGUI 			: boolean 		= true;
		var progressGUI 				: GUISkin;
private var startGenerateProgress 		: float 		= 0.0;
		var duration 					: float 		= 17.0;
private var time 						: float;
		var GUItexture 					: Texture;
		// Animating GUITexture:
		var progressForground 			: Texture;
		var progressBackground 			: Texture;
	
// Player & Enemy Spawn
		var playerMaySpawn				: boolean;
		var player 			   			: GameObject;
		var enemies 		   			: GameObject;
		var areYouReadyPrompt			: boolean 			= true;
		
// Level/world/blocks
		var overAllBlockCount 			: int;
		var levelReady_; 

function Start () 
{
	yield WaitForSeconds(1);
	
	player.transform.position = GameObject.FindWithTag("groundObject").transform.position + Vector3(0, 4, 0);
}

function Update () 
{
	if(!enemies)
	{
		enemies = null;
		Debug.Log("SceneManager: Please assign enemy in the inspector.");
	}
	
	// Checking if level has been generated: 
	var scenemanager = GameObject.FindWithTag("scenemanager");
	
	levelReady_ = scenemanager.GetComponent(script_gridTerrain).levelReady;
	
	Debug.Log(levelReady_);
	
	if (levelReady_ == true)
	{
		generationProgress = 0.1;
	}
	
	// Calculating the amount of blocks in the scene: 
	blockAmount = GameObject.FindGameObjectsWithTag("groundObject");
	
	overAllBlockCount = blockAmount.Length;
	
	// Calculate duration:
	time += Time.deltaTime / duration;
	// Lerp from one number to another over x time. 
	startGenerateProgress = Mathf.Lerp(0, 100, time);
	
	
	if (playerMaySpawn == true)
	{
		Debug.Log("Level done loading, player may spawn!");
		
			var enemyScript : script_enemy = GetComponent(script_enemy);
			
			var enemyObject = GameObject.FindWithTag("enemy");
			
			var enemyScript_playerAlive = enemyObject.GetComponent(script_enemy).playerAlive;
			
		if (enemyScript_playerAlive == true)
		{		
			player.active = true;
		}
		else
		{
			player.active = false;
		}
		
		//print("Player alive?: " + enemyScript_playerAlive);	
		if (enemies)
		{
			enemies.SetActive(true);
		}			
		
	}
	

}

/*
	// get blockcount variable from blockcreator_ground script to decide spawnposition width.
	// Accessing blockcreator_ground script:
	var sceneManagerScript : script_sceneManager = GetComponent(script_sceneManager);
			
	var sceneManager = GameObject.FindWithTag("scenemanager");
			
	var sceneManager_playerAlive = sceneManager.GetComponent(script_sceneManager).playerAlive;
	
*/	
//////////////////////////////////////////
// OnGUI
function OnGUI()
{


	// Make a group on the center of the screen
	GUI.BeginGroup(Rect(Screen.width / 2 - 100, Screen.height / 2 - 100, 200,800));
		
		GUI.Label( Rect(0, -100, 200, 800), "Number of blocks:  " + overAllBlockCount );
	
	// Ends group
	GUI.EndGroup();


	if (playerMaySpawn == false)
	{
		GUI.DrawTexture (Rect (0, 0, Screen.width, Screen.height), GUItexture);
	}
	
	GUI.skin = progressGUI;
	
	// Constrain all drawing to be within a 800x600 pixel area centered on the screen.
	GUI.BeginGroup (new Rect (Screen.width / 2 - 400, Screen.height / 2 - 300, 800, 600));
	
		if (showProgressGUI == true && levelReady_ == false)
		{
			// Displays the worldgeneration progress as a number from 1 to 100: 
			GUI.Box (Rect(0, 0, 800, 600), "Generating level...");
			
			// LoadingBAR! 
			DrawProgress(Vector2(300, 320 ), Vector2(200, 10), startGenerateProgress);
		}
		else 
		{
			if (!Input.anyKey && areYouReadyPrompt == true)
			{
				GUI.Box (Rect(0, 0, 800, 600), "Press Any Key to Start...");
			}
			if (Input.anyKeyDown)
			{
				areYouReadyPrompt = false;
				
				playerMaySpawn 	= true;
			}	
		}
		
		if (startGenerateProgress >= 100)
		{
			showProgressGUI = false;				
		}
			
	GUI.EndGroup ();
	
// ############## New group! ###############
	
	GUI.BeginGroup (new Rect (Screen.width / 2 - 400, Screen.height / 2 - Screen.height / 2, 800, Screen.height));
	
		if (showProgressGUI == false && overAllPoints > 1)
		{
			GUI.Label(Rect(0, 0, 800, 100), overAllPoints.ToString());
		}
		
	GUI.EndGroup ();	
}




// Used for animating guitextures
function DrawProgress(location : Vector2, size : Vector2, progress : float)
{
    // forground
    GUI.DrawTexture(Rect(location.x, location.y, size.x, size.y), progressBackground);
    // background
    GUI.DrawTexture(Rect(location.x, location.y, 2 * progress, size.y), progressForground);	 
}



























