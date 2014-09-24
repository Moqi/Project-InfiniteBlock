#pragma strict

import System.Collections.Generic;

private var showGUIatStart		: boolean = false;

private var guiButtons			: List.<GameObject> = new List.<GameObject>();
private var guiInventory 		: List.<GameObject> = new List.<GameObject>();
private var guiCrafting		 	: List.<GameObject> = new List.<GameObject>();
private var guiCharacterWindow 	: List.<GameObject> = new List.<GameObject>();
private var guiObjective 		: List.<GameObject> = new List.<GameObject>();
private var guiStats			: List.<GameObject> = new List.<GameObject>();

private var showButtons 		: boolean = false;
private var showInventory		: boolean = false;
private var showCrafting		: boolean = false;
private var showCharacter		: boolean = false;
private var showObjective		: boolean = false;
private var showStats 			: boolean = false;

private var toggleInventory		: Toggle;
private var toggleCrafting 		: Toggle;
private var toggleCharacter		: Toggle;
private var toggleObjective 	: Toggle;
private var toggleStats 		: Toggle;

function Start () 
{
	GUIStartUpCheck ();
	
	toggleInventory = gameObject.transform.GetChild(0).gameObject.transform.GetChild(3).GetComponent(Toggle);
	toggleCrafting  = gameObject.transform.GetChild(1).gameObject.transform.GetChild(3).GetComponent(Toggle);
	toggleCharacter = gameObject.transform.GetChild(2).gameObject.transform.GetChild(3).GetComponent(Toggle);
	toggleObjective	= gameObject.transform.GetChild(3).gameObject.transform.GetChild(3).GetComponent(Toggle);
	toggleStats 	= gameObject.transform.GetChild(4).gameObject.transform.GetChild(3).GetComponent(Toggle);
}

function Update () 
{
	CheckButtonOnOROff ();
}

/////////////////////////////
function CheckButtonOnOROff ()
{
	if ( toggleInventory.isOn )
	{
		gameObject.transform.GetChild(0).gameObject.transform.GetChild(1).gameObject.SetActive(false);
	}	
	else 
	{
		gameObject.transform.GetChild(0).gameObject.transform.GetChild(1).gameObject.SetActive(true);
	}
	
	if ( toggleCrafting.isOn )
	{
		gameObject.transform.GetChild(1).gameObject.transform.GetChild(1).gameObject.SetActive(false);
	}	
	else 
	{
		gameObject.transform.GetChild(1).gameObject.transform.GetChild(1).gameObject.SetActive(true);
	}
	
	if ( toggleCharacter.isOn )
	{
		gameObject.transform.GetChild(2).gameObject.transform.GetChild(1).gameObject.SetActive(false);
	}	
	else 
	{
		gameObject.transform.GetChild(2).gameObject.transform.GetChild(1).gameObject.SetActive(true);
	}
	
	if ( toggleObjective.isOn )
	{
		gameObject.transform.GetChild(3).gameObject.transform.GetChild(1).gameObject.SetActive(false);
	}	
	else 
	{
		gameObject.transform.GetChild(3).gameObject.transform.GetChild(1).gameObject.SetActive(true);
	}
	
	if ( toggleStats.isOn )
	{
		gameObject.transform.GetChild(4).gameObject.transform.GetChild(1).gameObject.SetActive(false);
	}	
	else 
	{
		gameObject.transform.GetChild(4).gameObject.transform.GetChild(1).gameObject.SetActive(true);
	}
}

/////////////////////////////
// Buttons
function GUIshow_Buttons ()
{
	showButtons = !showButtons;

	GUIshow_inventory ();
	GUIshow_Crafting  ();
	GUIshow_Character ();
	GUIshow_Objective ();
	GUIshow_Stats 	  ();

	for ( var i : int = 0; i < guiButtons.Count; i++ )			// Disabling certain guiElements at start
	{	
		guiButtons[i].gameObject.SetActive(showButtons);	
	}
}

/////////////////////////////
// GUI check at startup
function GUIStartUpCheck ()
{
	var toggleInventory_obj = gameObject.transform.GetChild(0).gameObject;
	var toggleCrafting_obj  = gameObject.transform.GetChild(1).gameObject;
	var toggleCharacter_obj = gameObject.transform.GetChild(2).gameObject;
	var toggleObjecttive_obj= gameObject.transform.GetChild(3).gameObject;
	var toggleStats_obj		= gameObject.transform.GetChild(4).gameObject;
	
	guiButtons.Add(toggleInventory_obj );
	guiButtons.Add(toggleCrafting_obj  );
	guiButtons.Add(toggleCharacter_obj );
	guiButtons.Add(toggleObjecttive_obj);
	guiButtons.Add(toggleStats_obj);
	
	for ( var a : int = 0; a < guiButtons.Count; a++ )			// Disabling certain guiElements at start
	{	guiButtons[a].gameObject.SetActive(showGUIatStart);	}

	var guiInventoryObjects = GameObject.FindGameObjectsWithTag("guiInventory");
	var guiCraftingObjects  = GameObject.FindGameObjectsWithTag("guiCrafting");
	var guiCharacterObjects = GameObject.FindGameObjectsWithTag("guiCharacter");
	var guiObjectiveObjects = GameObject.FindGameObjectsWithTag("guiObjective");
	var guiStatsObjects 	= GameObject.FindGameObjectsWithTag("guiStats");
	
	// Inventory				
	for ( var guiElements : GameObject in guiInventoryObjects )
	{	guiInventory.Add(guiElements);	}
	
	for ( var i : int = 0; i < guiInventory.Count; i++ )			// Disabling certain guiElements at start
	{	guiInventory[i].gameObject.SetActive(showGUIatStart);	}
	
	// Crafting
	for ( var guiElements : GameObject in guiCraftingObjects )
	{	guiCrafting.Add(guiElements);	}
	
	for ( var j : int = 0; j < guiCrafting.Count; j++ )				// Disabling certain guiElements at start
	{	guiCrafting[j].gameObject.SetActive(showGUIatStart);	}
	
	// Character
	for ( var guiElements : GameObject in guiCharacterObjects )
	{	guiCharacterWindow.Add(guiElements);	}
	
	for ( var k : int = 0; k < guiCharacterWindow.Count; k++ )					// Disabling certain guiElements at start
	{	guiCharacterWindow[k].gameObject.SetActive(showGUIatStart);	}	
	
	// Objective
	for ( var guiElements : GameObject in guiObjectiveObjects )
	{	guiObjective.Add(guiElements);	}
	
	for ( var l : int = 0; l < guiObjective.Count; l++ )					// Disabling certain guiElements at start
	{	guiObjective[l].gameObject.SetActive(showGUIatStart);	}
	
	// Stats
	for ( var guiElements : GameObject in guiStatsObjects )
	{	guiStats.Add(guiElements);	}
	
	for ( var o : int = 0; o < guiStats.Count; o++ )					// Disabling certain guiElements at start
	{	guiStats[o].gameObject.SetActive(showGUIatStart);	}
}

/////////////////////////////
// Inventory
function GUIshow_inventory ()
{
	if ( toggleInventory.isOn && showButtons )	// instead of //showInventory = !showInventory;
	{
		showInventory 			= true;
	}
	else 
	{
		toggleInventory.isOn 	= false;
		showInventory 			= false;
	}
					
	for ( var i : int = 0; i < guiInventory.Count; i++ )
	{
		guiInventory[i].gameObject.SetActive(showInventory);
	}
}

/////////////////////////////
// Crafting
function GUIshow_Crafting ()
{
	if ( toggleCrafting.isOn && showButtons )
	{
		showCrafting 			= true;
	}
	else  
	{
		toggleCrafting.isOn 	= false;
		showCrafting 			= false;
	}	
				
	for ( var i : int = 0; i < guiCrafting.Count; i++ )
	{
		guiCrafting[i].gameObject.SetActive(showCrafting);
	}
}

/////////////////////////////
// CharacterWindow
function GUIshow_Character ()
{
	if ( toggleCharacter.isOn && showButtons )
	{
		showCharacter 			= true;
	}
	else 
	{
		toggleCharacter.isOn 	= false;
		showCharacter 			= false;
	}		
				
	for ( var i : int = 0; i < guiCharacterWindow.Count; i++ )
	{
		guiCharacterWindow[i].gameObject.SetActive(showCharacter);
	}
}

/////////////////////////////
// Objective
function GUIshow_Objective ()
{
	if ( toggleObjective.isOn && showButtons )
	{
		showObjective 			= true;
	}
	else 
	{
		toggleObjective.isOn 	= false;
		showObjective 			= false;
	}		
				
	for ( var i : int = 0; i < guiObjective.Count; i++ )
	{
		guiObjective[i].gameObject.SetActive(showObjective);
	}
}

/////////////////////////////
// Stats
function GUIshow_Stats ()
{
	if ( toggleStats.isOn && showButtons )
	{
		showStats				= true;
	}
	else 
	{
		toggleStats.isOn 		= false;
		showStats				= false;
	}		
				
	for ( var i : int = 0; i < guiStats.Count; i++ )
	{
		guiStats[i].gameObject.SetActive(showStats);
	}
}






















