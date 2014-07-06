//////////////////////////////////////////////////////////////////////////
//////////////////////// SceneManager script /////////////////////////////
//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////
// Variables 

// Overall Stats:	

static	var overAllPoints 						: int			= 0;	
	
// Progress GUI:
		
		var showProgressGUI 					: boolean 		= true;
		var progressGUI 						: GUISkin;
private var startGenerateProgress 				: float 		= 0.0;
		var duration 							: float 		= 17.0;
private var time 								: float;
		var GUItexture 							: Texture;
		// Animating GUITexture:
		var progressForground 					: Texture;
		var progressBackground 					: Texture;
		
// GUI (Main / start Menu):	
		
		var showMainMenu 			 			: boolean			= true;
		
		var playButtonGUI 			 			: GUISkin;
		var ExitGUI					 			: GUISkin;
		var textGUI 				 			: GUISkin;
		var optionButtonGUI			 			: GUISkin;
		var gameTitleGUI			 			: GUISkin;
		var detailTextGUI 			 			: GUISkin;
	// Options	
		var showCredits				 			: boolean = false;
		var showOptions			 	 			: boolean = false;
		var fogAmountSlider 		 			: int	   = 1;
		var lookSensitivity 		 			: float   = 15.0;
		var night 					 			: boolean = false;
		var dusk 				     			: boolean = true;
		
// Player & Enemy Spawn

		var playerMaySpawn						: boolean;
private var playerOriginalPos					: Vector3;
private var playerRespawn						: boolean 			= false;
		var player 			   					: GameObject;
		var enemies 		   					: GameObject;
		var areYouReadyPrompt					: boolean 			= true;
		var playerDead 							: boolean 			= false;
		var sceneCam							: GameObject;
		var cameraControllerScript;
		var cameraObject;
		var sceneCamOriginalPos 				: Vector3;
		var respawnButtonActive 				: boolean;
		
// Level/world/blocks

		var overAllBlockCount 					: int;
		var levelReady_; 
		
// Sound & music
		//var backgroundWind 				: AudioClip;		

function Start () 
{					
	sceneCamOriginalPos = sceneCam.transform.position;
	
	playerOriginalPos = player.transform.position;
	
	//InvokeRepeating("SpawnEnemy", 5, 10);
	
	audio.Play();
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
	
	//Debug.Log(levelReady_);
	
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
		//Debug.Log("Level done loading, player may spawn!");
			/*
			var enemyScript : script_enemy = GetComponent(script_enemy);
			
			var enemyObject = GameObject.FindWithTag("enemy");
			
			var enemyScript_playerAlive = enemyObject.GetComponent(script_enemy).playerAlive;
			
			*/
			var playerScript : script_playerBlock = GetComponent(script_playerBlock);
			
			var playerObject = GameObject.FindWithTag("Player");
			
			var playerObject_playerDead = playerObject.GetComponent(script_playerBlock).playerDead;
		
			playerDead = playerObject_playerDead;		
		
			
		if (player.active == true)
		{
			respawnButtonActive = false;
		}
		else 
		{
			respawnButtonActive = true;
		}
		
		
		if (playerDead == false)
		{		
			player.active = true;
		}
		else
		{	
				cameraObject = GameObject.FindWithTag("MainCamera");
			
				var cameraObject_camAtSafeZone = cameraObject.GetComponent(script_cameraReset).camAtSafeZone;
	
			if (respawnButtonActive == true && cameraObject_camAtSafeZone == true)
			{
			  
				if (Input.anyKey)
				{
					var sceneCamScript = sceneCam.GetComponent(script_cameraController);
		
						sceneCamScript.enabled = true;	
					
					playerDead = false;
				
					player.active = true;
					
					player.transform.position = playerOriginalPos;
					
				}
			}
		}
					
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
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////// Main / Start Menu ///////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////

	
	if (showMainMenu == true)
	{
	
	// Titel: 
	
		// Right side of the screen:			
		GUI.BeginGroup(Rect(Screen.width/2 - 400, Screen.height/2 - 440, Screen.width, Screen.height));

		// Game title:
			GUI.skin = gameTitleGUI;
	
				GUI.Label(Rect(0, 0, 800, 400), "TO THE CLOUDS");		
				
		// Ends group
		GUI.EndGroup();	

	
	// Made by: 
			
		// Right side of the screen:			
		GUI.BeginGroup(Rect(Screen.width/2 - 400, Screen.height/2 + 200, Screen.width, Screen.height));
	
			GUI.skin = detailTextGUI;		
		
				GUI.Label(Rect(0, 0, 800, 140), "Alpha Version 0.0.1\nCreated by Christian Krogh\nAudiodesign by Eskild Krogh");
			
		// Ends group
		GUI.EndGroup();	


	// Buttons:
	
		GUI.BeginGroup(Rect(Screen.width/2 - 50, Screen.height/2, Screen.width, Screen.height));
		
		// Play button:
		
			GUI.skin = playButtonGUI;
	
				if(GUI.Button(Rect(0, 0, 100, 50), "PLAY"))
				{
					showMainMenu = false;
					
					playerMaySpawn = true;
					
					Debug.Log("Playbutton pressed!");
				}
		
		// Options button: 		
	

			GUI.skin = optionButtonGUI;
		
				if(GUI.Toggle(Rect(0, 50, 100, 50), showOptions, "Options"))
				{
					showCredits = false;	// makes sure we can switch between credits and options
					showOptions = true;	
				}
				else
				{
					showOptions = false;	
				}
				
				// Options menu
				if(showOptions == true)
				{	
					GUI.skin = detailTextGUI;	
					
						GUI.Label(Rect(285, 105, 300, 30), "*** The settings have no effect currently ***");
				
				// ###### Options menu function ######	
					
					// # 1: Amount of fog controlled by slider:
							fogAmountSlider = GUI.HorizontalSlider(Rect(430, 8, 150, 30), fogAmountSlider, 1, 5);
				
							GUI.Label(Rect(250, 0, 200, 30), "Fog density level " + fogAmountSlider);
				
					// # 2: Look Sensitivity 
							lookSensitivity = GUI.HorizontalSlider(Rect(430, 45, 150, 20), lookSensitivity, 5.0, 35.0); 
					
							GUI.Label(Rect(250, 35, 200, 30), "Look sensitivity " + lookSensitivity.ToString("f1"));	
				
					// # 3: Toggle between night and dusk
					
							GUI.Label(Rect(250, 70, 200, 30), "Time of day mode ");
					
							// Night:
							if (GUI.Toggle(Rect(430, 75, 60, 30), night, "Night"))
							{
								dusk  = false;
								night = true;
							}
							else
							{
								night = false;
							}
					
							// Dusk:
							if (GUI.Toggle(Rect(500, 75, 60, 30), dusk, "Dusk"))
							{
								night = false;
								dusk  = true;
							}
							else
							{
								dusk = false;
							}
					
					// # 4:	
				
				}
		
				
		// Quit Game button:

			GUI.skin = ExitGUI;
		
				if(GUI.Button(Rect(0, 100, 100, 50), "EXIT"));
				{
					Application.Quit();
				}
																		
		// Ends group
		GUI.EndGroup();	
	
	} // end of if showMainMenu = true
	
	//////////////////////////// End of Main / Start Menu ////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////



	// Make a group on the center of the screen
	GUI.BeginGroup(Rect(Screen.width / 2 - 100, Screen.height / 2 - 100, 200,800));
		
		//GUI.Label( Rect(0, -100, 200, 800), "Number of blocks:  " + overAllBlockCount );
	
	// Ends group
	GUI.EndGroup();

	/*
	if (playerMaySpawn == false)
	{
		GUI.DrawTexture (Rect (0, 0, Screen.width, Screen.height), GUItexture);
	}
	*/
	GUI.skin = progressGUI;
	
	// Constrain all drawing to be within a 800x600 pixel area centered on the screen.
	GUI.BeginGroup (new Rect (Screen.width / 2 - 400, Screen.height / 2 - 300, 800, 600));
	
		if (showProgressGUI == true && levelReady_ == false)
		{
			// Displays the worldgeneration progress as a number from 1 to 100: 
			//GUI.Box (Rect(0, 0, 800, 600), "Generating level...");
			
			// LoadingBAR! 
			//DrawProgress(Vector2(300, 320 ), Vector2(200, 10), startGenerateProgress);
		}
		else 
		{
			/*
			if (!Input.anyKey && areYouReadyPrompt == true)
			{
				GUI.Box (Rect(0, 0, 800, 600), "Press Any Key to Start...");
			}
			if (Input.anyKeyDown)
			{
				areYouReadyPrompt = false;
				
				playerMaySpawn 	= true;
			}
			*/	
		}
		/*
		if (startGenerateProgress >= 100)
		{
			showProgressGUI = false;				
		}
		*/

			
			
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



function SpawnEnemy()
{
	var spawnEnemy  = Instantiate(enemies, player.transform.position + Vector3(Random.Range(-20, 20), Random.Range(-3, 3), Random.Range(-20, 20)), Quaternion.identity);
}





















