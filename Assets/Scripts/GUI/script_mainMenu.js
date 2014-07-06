// ----------- MainMenu Script ----------

// Inspector variables

	var playButtonGUI 			 : GUISkin;
	var textGUI 				 : GUISkin;
	var redMarkerGUI		     : GUISkin;
	var ExitGUI					 : GUISkin;
	var optionButtonGUI			 : GUISkin;
	var greyLineGUI				 : GUISkin;
	var gameTitleGUI			 : GUISkin;
	var gameTitleGUI2			 : GUISkin;
	var detailTextGUI 			 : GUISkin;

	var showCredits				 : boolean = false;
	var showOptions			 	 : boolean = false;
	
	// Options menu
	var fogAmountSlider 		 : int	   = 1;
	var lookSensitivity 		 : float   = 15.0;
	var night 					 : boolean = false;
	var dusk 				     : boolean = true;



function Awake ()
{	
	// Makes sure the time is actually running when reloading the scene
	Time.timeScale = 1;			
}



function OnGUI () 
{

// Right side of the screen:			
GUI.BeginGroup(Rect(Screen.width/2 - 875, Screen.height/2 - 340, Screen.width, Screen.height));

// Game title:
	GUI.skin = gameTitleGUI;

		GUI.Label(Rect(0, 0, 800, 400), "Project");

	GUI.skin = gameTitleGUI2;
		
		GUI.Label(Rect(585, 15, 400, 400), "Z");

// Ends group
GUI.EndGroup();	
	

	
// Right side of the screen:			
GUI.BeginGroup(Rect(Screen.width/2 - 700, Screen.height/2, Screen.width, Screen.height));
	
	GUI.skin = detailTextGUI;		
		
			GUI.Label(Rect(93, 415, 800, 150), "Created by Christian Krogh, February 2014, Early Alpha Version: 1.0");
	
// Ends group
GUI.EndGroup();	




// Left side of the screen:		
	GUI.BeginGroup(Rect(Screen.width/2 - 700, Screen.height/2, Screen.width, Screen.height));



// greyLine:

		GUI.skin = greyLineGUI;

		GUI.Label(Rect(46.5, 2, 200, 1000), "");



// Play button:
		GUI.skin = playButtonGUI;
	
			if(GUI.Button(Rect(0, 0, 250, 50), "Play"))
			{
				Application.LoadLevel("scene_loading");
			}
	
		
	
// Options button:

		GUI.skin = optionButtonGUI;
		
			if(GUI.Toggle(Rect(0, 60, 250, 50), showOptions, "Options"))
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

					GUI.skin = redMarkerGUI;	
					
					GUI.Label(Rect(250, 59, 600, 300), "");	// Red marker!
					
					GUI.skin = detailTextGUI;	
					
					GUI.Label(Rect(340, 59, 800, 300), "*** The settings have no effect currently ***");
				
				// ###### Options menu function ######		
				// # 1: Amount of fog controlled by slider:
					fogAmountSlider = GUI.HorizontalSlider(Rect(515, 98, 300, 30), fogAmountSlider, 1, 5);
				
					GUI.Label(Rect(340, 90, 200, 30), "Fog density level " + fogAmountSlider);
				
				// # 2: Look Sensitivity 
					lookSensitivity = GUI.HorizontalSlider(Rect(515, 130, 300, 20), lookSensitivity, 5.0, 35.0); 
					
					GUI.Label(Rect(340, 122, 200, 30), "Look sensitivity " + lookSensitivity.ToString("f1"));	
				
				// # 3: Toggle between night and dusk
					
					GUI.Label(Rect(340, 170, 100, 30), "Time of day mode ");
					
					// Night:
					if (GUI.Toggle(Rect(519, 170, 60, 30), night, "Night"))
					{
						dusk  = false;
						night = true;
					}
					else
					{
						night = false;
					}
					
					// Dusk:
					if (GUI.Toggle(Rect(600, 170, 60, 30), dusk, "Dusk"))
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



// Credits button:			// note: Toggle = on / off button which switches between showCredits being true or false!
    	GUI.skin = optionButtonGUI;	
    		
    		if(GUI.Toggle(Rect(0, 120, 250, 50), showCredits, "Credits"))	
			{        
				showOptions = false;	// makes sure we can switch between credits and options
				showCredits = true;
			}
			else
			{
				showCredits = false;	
			}
				// Credits menu
				if(showCredits == true)
				{

					GUI.skin = redMarkerGUI;	
					
					GUI.Label(Rect(250, 120, 600, 300), "");	// Red marker!
					
					GUI.skin = detailTextGUI;	
					
					GUI.Label(Rect(330, 120, 600, 300), "- Arteria3d: ShantyTown 2 \n\n- Arteria3d: Urban Decay City Pack \n\n- Manufactura K4: Nature Pack \n\n- Tomasz Stobierski: Relief Terrain Pack v3 \n\n");
		
				}
	
	
// Quit Game button:

		GUI.skin = ExitGUI;
		
			if(GUI.Button(Rect(0, 250, 250, 50), "Exit"));
			{
				Application.Quit();
			}

 	
			
	// Ends group
	GUI.EndGroup();	

}










