#pragma strict
//////////////////////////////////////////////////////////////////////////
//////////////////////// SceneManager script /////////////////////////////
//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////
// Variables 

// Overall Stats:	

static	var overAllPoints 						: int			= 0;	
	
// Progress GUI:
		
		var showProgressGUI 					: boolean		= false;
		var mainMenuLootstats 					: Transform;
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
		var mainMenuSky							: Transform;
		var mainMenuSkyLerp						: boolean			= false;
		var mainMenuSkyLerpDuration				: float 			= 8.0; 	// duration in seconds
private var mainMenuSkyLerpTime					: float 			= 0.0; // lerp control variable
		var guiTime 							: float 			= 0.0;
				
		var playButtonGUI 			 			: GUISkin;
		var ExitGUI					 			: GUISkin;
		var textGUI 				 			: GUISkin;
		var optionButtonGUI			 			: GUISkin;
		var gameTitleGUI			 			: GUISkin;
		var detailTextGUI 			 			: GUISkin;
		var creditsGUI 							: GUISkin;
		
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
private var cameraObject 						: GameObject;
		var sceneCamOriginalPos 				: Vector3;
		var respawnButtonActive 				: boolean;

		
// Level/world/blocks
static  var maxDistancePlayerObject 			: float 			= 35;
private var overAllBlockCount 					: int;
		var levelReady_; 
static 	var newBlockSpawnerChildCanSpawn 		: boolean 			= true;
        var max_BlockSpawnChildCount 			: int				= 10;
private var current_BlockSpawnChildAmount 		: int 				= 0;

// Sound & music
		//var backgroundWind 				: AudioClip;	

////////////////					
// Looting stats 

	// Fragments
static var fragment_wood 						: int				= 0;
static var fragment_leaf						: int				= 0;
static var fragment_stone 						: int				= 0;
static var fragment_copper						: int				= 0;
static var fragment_silver						: int				= 0;
static var fragment_gold						: int				= 0;
static var fragment_legendary					: int				= 0;

////////////////

/////////////////
function Start () 
{					
	if (showMainMenu == false)
	{
		 // Disabling the mainMenuSky texture
  			mainMenuSky.active = false;
  		
  		// Making sure mainMenu is totally gone
  			showMainMenu = false;
		
		// Enables playerControl			
			playerMaySpawn = true;
	}
	
	sceneCamOriginalPos = sceneCam.transform.position;
	
	playerOriginalPos 	= player.transform.position;

	//InvokeRepeating("SpawnEnemy", 5, 10);
	
	audio.Play();
			
}



//////////////////
function Update () 
{
	// Toggle progressGUI on/off 
	if ( Input.GetKeyDown ( KeyCode.Tab ) )
	{
		showProgressGUI = !showProgressGUI;
	}

	//////////////////////
	// TerrainChilds spawn
	var current_BlockSpawnChilds_inTheScene : int = GameObject.FindGameObjectsWithTag("blockSpawnChild").Length;
		
		current_BlockSpawnChildAmount = current_BlockSpawnChilds_inTheScene;
	
			//Debug.Log("BlockSpawner, current count: " + current_BlockSpawnChildAmount);
	
		if ( current_BlockSpawnChildAmount >= max_BlockSpawnChildCount )
		{
			newBlockSpawnerChildCanSpawn = false;
		}
		else
		{
			newBlockSpawnerChildCanSpawn = true;
		}
	//////////////////////
	
	
	if (mainMenuSkyLerp == true)
	{
		MainMenuSkyLerp();
	}

	if(!enemies)
	{
		enemies = null;
		//Debug.Log("SceneManager: Please assign enemy in the inspector.");
	}
	
	// Checking if level has been generated: 
	var scenemanager = GameObject.FindWithTag("scenemanager");
	
	levelReady_ = scenemanager.GetComponent(script_gridTerrain).levelReady;
	
	//Debug.Log(levelReady_);
	
	if (levelReady_ == true)
	{
		//generationProgress = 0.1;
	}
	/*
		// Calculating the amount of blocks in the scene: 
		blockAmount = GameObject.FindGameObjectsWithTag("groundObject");
	
			overAllBlockCount = blockAmount.Length;
		
		// Calculate duration:
		time += Time.deltaTime / duration;
			// Lerp from one number to another over x time. 
			startGenerateProgress = Mathf.Lerp(0, 100, time);
	*/
	
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
//////////////////////////////////////////////////////////////////////////////////////////////
function OnGUI()
{
	//////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////// OnGUI start ///////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	
	////////////////////////////////////////////
	////////////// LootTable ///////////////////
	////////////////////////////////////////////
	
		if ( showProgressGUI == true )
		{
			mainMenuLootstats.active = true;										
	
				//		Type of point to add, at what object				  , set active to true
			PlusScoreGUI ( fragment_wood, "guiTexture_lootTable_icon_wood", true );						

			PlusScoreGUI ( fragment_leaf, "guiTexture_lootTable_icon_leaf", true );									
			
			PlusScoreGUI ( fragment_stone, "guiTexture_lootTable_icon_stone", true );										
			
			PlusScoreGUI ( fragment_copper, "guiTexture_lootTable_icon_copper", true );									
			
			PlusScoreGUI ( fragment_silver, "guiTexture_lootTable_icon_silver", true );												

			PlusScoreGUI ( fragment_gold, "guiTexture_lootTable_icon_gold", true );									
	
			PlusScoreGUI ( fragment_legendary, "guiTexture_lootTable_icon_legendary", true );									
		}
		else 
		{
			mainMenuLootstats.active = false;
		}

	////////////////////////////////////////////

	// Fades in mainMenu:
		var guiLerpDuration : float = 10.0;
		var tempColor 		: Color = GUI.color.white;
		
			if (guiTime < 1)
  			{ 	// while t below the end limit...
    			// increment it at the desired rate every update:
    			guiTime += Time.deltaTime / guiLerpDuration;
  			}
  	
  		tempColor.a = Mathf.MoveTowards(0, 1, guiTime);	// from alpha min(0) to max(1) over guiTime
  	
  		GUI.color = tempColor;
  		
  	
	// Fading the menu out when Playbutton is pressed:
			if (mainMenuSkyLerp == true)
			{
				tempColor.a = Mathf.MoveTowards(1, 0, mainMenuSkyLerpTime); // from alpha max(1) to min(0) over mainMenuSkyLerpTime
  	
  				GUI.color = tempColor;
			}
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////// Main / Start Menu ///////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	if (showMainMenu == true)
	{
		
	// Titel: 
	
		// Right side of the screen:			
		GUI.BeginGroup(Rect(Screen.width/2 - 400, Screen.height/2 - 240, Screen.width, Screen.height));

		// Game title:
			GUI.skin = gameTitleGUI;
	
				GUI.Label(Rect(0, -100, 800, 400), "TO THE CLOUDS");		
				
		// Ends group
		GUI.EndGroup();	

	
	// Made by: 
			
		// Right side of the screen:			
		GUI.BeginGroup(Rect(Screen.width / 2 - 400, Screen.height / 2 + 320, Screen.width, Screen.height));
	
			GUI.skin = creditsGUI;		
		
				GUI.Label(Rect(0, 0, 800, 140), "Alpha Version 0.0.1\nCreated by Christian Krogh\nAudiodesign by Eskild Krogh");
			
		// Ends group
		GUI.EndGroup();	


	// Buttons:
	
		GUI.BeginGroup(Rect(Screen.width/2 - 400, Screen.height/2 - 300, 800, 600));
		
		// Play button:
		
			GUI.skin = playButtonGUI;
			
				if(GUI.Button(Rect(350, 250, 100, 80), "Play"))
				{		
					mainMenuSkyLerp = true;
				}
		
		// Quit Game button:

			GUI.skin = ExitGUI;
		
				if(GUI.Button(Rect(350, 400, 100, 50), "Quit"));
				{
					Application.Quit();
				}
																		
		// Options button: 		
	
			GUI.skin = optionButtonGUI;
		
				if(GUI.Toggle(Rect(335, 350, 120, 50), showOptions, "Settings"))
				{
					showCredits = false;	// makes sure we can switch between credits and options
					showOptions = true;	
				}
				else
				{
					showOptions = false;	
				}
	
		// Ends group
		GUI.EndGroup();	
							
				// Options menu
				if(showOptions == true)
				{	
					// Dedicated options-group:
					GUI.BeginGroup( Rect(Screen.width/2 + 100, Screen.height/2 - 300, 800, 600));
				
					GUI.skin = detailTextGUI;	
					
						GUI.Label(Rect(35, 127, 800, 600), "*** The settings currently has no effect ***");
				
				// ###### Options menu function ######	
					
					// # 1: Amount of fog controlled by slider:
							fogAmountSlider = GUI.HorizontalSlider(Rect(135, 344, 150, 20), fogAmountSlider, 1, 5);
				
							GUI.Label(Rect(0, 50, 800, 600), "Fog density level " + fogAmountSlider);
				
					// # 2: Look Sensitivity 
							lookSensitivity = GUI.HorizontalSlider(Rect(135, 369, 150, 20), lookSensitivity, 5.0, 35.0); 
					
							GUI.Label(Rect(0, 75, 800, 600), "Look sensitivity " + lookSensitivity.ToString("f1"));	
				
					// # 3: Toggle between night and dusk
					
							GUI.Label(Rect(0, 100, 800, 600), "Time of day mode ");
					
							// Night:
							if (GUI.Toggle(Rect(135, 390, 50, 20), night, "Night"))
							{
								dusk  = false;
								night = true;
							}
							else
							{
								night = false;
							}
					
							// Dusk:
							if (GUI.Toggle(Rect(200, 390, 50, 20), dusk, "Dusk"))
							{
								night = false;
								dusk  = true;
							}
							else
							{
								dusk = false;
							}
					
					// # 4:	
					
					// Ends group
					GUI.EndGroup();	
				}
		
				

	
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


// MainMenuSky color lerp:
function MainMenuSkyLerp()
{
	var startColor 	: Color;
	var endColor 	: Color;

	if (mainMenuSkyLerpTime < 1)
  	{ 	// while t below the end limit...
    	// increment it at the desired rate every update:
    	mainMenuSkyLerpTime += Time.deltaTime / mainMenuSkyLerpDuration;
  	}

	mainMenuSky.renderer.material.color = Color.Lerp(startColor.white, endColor.clear, mainMenuSkyLerpTime);


  	if (mainMenuSky.renderer.material.color == endColor.clear)
  	{
  		// Disabling the mainMenuSky texture
  			mainMenuSky.active = false;
  		
  		// Making sure mainMenu is totally gone
  			showMainMenu = false;
		
		// Enables playerControl			
			playerMaySpawn = true;
  	}
}


function PlusScoreGUI ( scoreVariable : int, iconName : String, childActive : boolean )
{
 	var score : String 	= scoreVariable.ToString();	
 	
 	var allChildren 	= this.gameObject.GetComponentsInChildren(Transform);

 	for ( var child : Transform in allChildren )
 	{
 		if ( child.name == iconName )
 		{
 				if ( scoreVariable >= 1 )
 				{
 					child.gameObject.guiTexture.enabled 	= childActive;
 					child.gameObject.guiText.enabled 		= childActive;
 				}
 		
 				child.transform.GetComponent(GUIText).guiText.text = score;
		}
 	}	
}














