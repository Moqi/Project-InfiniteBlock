#pragma strict
#pragma downcast
//////////////////////////////////////////////////////////////////////////
//////////////////////// SceneManager script /////////////////////////////
//////////////////////////////////////////////////////////////////////////

// Variables 

// Player
	   	var player 			   					: GameObject;

// Overall Stats:	
private var daysPassed 							: int;

	    // Fragments
static  var fragment_wood 						: int				= 0;
static  var fragment_leaf						: int				= 0;
static  var fragment_stone 						: int				= 0;
static  var fragment_copper						: int				= 0;
static  var fragment_silver						: int				= 0;
static  var fragment_gold						: int				= 0;
static  var fragment_legendary					: int				= 0;

// Level/world/blocks
static  var maxDistancePlayerObject 			: float 			= 35;

// Progress GUI:
		
		var showProgressGUI 					: boolean		= false;
		var mainMenuLootstats 					: Transform;
		var progressGUI 						: GUISkin;
		var progressForground 					: Texture;
		var progressBackground 					: Texture;
		
// GUI (Main / start Menu):			
		var showMainMenu 			 			: boolean			= true;
		var mainMenuSkyLerp						: boolean			= false;
		var mainMenuSky							: Transform;	
private var mainMenuSkyLerpDuration				: float 			= 8.0; 	// duration in seconds
private var mainMenuSkyLerpTime					: float 			= 0.0; // lerp control variable
private var guiTime 							: float 			= 0.0;
				
		var playButtonGUI 			 			: GUISkin;
		var ExitGUI					 			: GUISkin;
		var textGUI 				 			: GUISkin;
		var optionButtonGUI			 			: GUISkin;
		var gameTitleGUI			 			: GUISkin;
		var detailTextGUI 			 			: GUISkin;
		var creditsGUI 							: GUISkin;
		
	// Options	
private var showCredits				 			: boolean 			= false;
private var showOptions			 	 			: boolean 			= false;
private var fogAmountSlider 		 			: int	   			= 1;
private var lookSensitivity 		 			: float   			= 15.0;
private var night 					 			: boolean 			= false;
private var dusk 				     			: boolean 			= true;

// Sound & music


/////////////////
function Start () 
{								
	if (showMainMenu == false && mainMenuSky != null )
	{
		 // Disabling the mainMenuSky texture
  			mainMenuSky.gameObject.SetActive(false);
  		
  		// Making sure mainMenu is totally gone
  			showMainMenu = false;
	}
	
	audio.Play();			
}

//////////////////
function Update () 
{
	daysPassed = script_DayNight.daysPassed;

	// Toggle progressGUI on/off 
	if ( Input.GetKeyDown ( KeyCode.Tab ) )
	{
		showProgressGUI = !showProgressGUI;
	}
	
	if (mainMenuSkyLerp == true)
	{
		MainMenuSkyLerp();
	}
}

function OnGUI()
{
	////////////////////////////////////////////
	////////////// LootTable ///////////////////
	
		if ( showProgressGUI == true )
		{
			mainMenuLootstats.gameObject.SetActive(true);										
	
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
			mainMenuLootstats.gameObject.SetActive(false);
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
}




// Used for animating guitextures
function DrawProgress(location : Vector2, size : Vector2, progress : float)
{
    // forground
    GUI.DrawTexture(Rect(location.x, location.y, size.x, size.y), progressBackground);
    // background
    GUI.DrawTexture(Rect(location.x, location.y, 2 * progress, size.y), progressForground);	 
}



// MainMenuSky color lerp:
function MainMenuSkyLerp()
{
	if ( mainMenuSky != null )
	{
		var startColor 	: Color;
		var endColor 	: Color;

		if (mainMenuSkyLerpTime < 1)
	  	{ 	// while t below the end limit...
	    	// increment it at the desired rate every update:
	    	mainMenuSkyLerpTime += Time.deltaTime / mainMenuSkyLerpDuration;
	  	}

		mainMenuSky.GetComponent(GUITexture).color = Color.Lerp(startColor.white, endColor.clear, mainMenuSkyLerpTime);

		if (mainMenuSky.GetComponent(GUITexture).color == endColor.clear)
	  	{
	  		// Disabling the mainMenuSky texture
	  			mainMenuSky.gameObject.SetActive(false);
	  		
	  		// Making sure mainMenu is totally gone
	  			showMainMenu = false;
	  	}
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














