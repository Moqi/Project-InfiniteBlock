#pragma strict

import System.Collections.Generic;

private var showGUIatStart		: boolean = false;

private var guiButtons			: List.<GameObject> = new List.<GameObject>();
private var guiInventory 		: List.<GameObject> = new List.<GameObject>();
private var guiCrafting		 	: List.<GameObject> = new List.<GameObject>();
private var guiCharacterWindow 	: List.<GameObject> = new List.<GameObject>();

private var showButtons 		: boolean = false;
private var showInventory		: boolean = false;
private var showCrafting		: boolean = false;
private var showCharacter		: boolean = false;

private var toggleInventory		: Toggle;
private var toggleCrafting 		: Toggle;
private var toggleCharacter		: Toggle;

function Start () 
{
	GUIStartUpCheck ();
	
	toggleInventory = gameObject.transform.GetChild(0).GetComponent(Toggle);
	toggleCrafting  = gameObject.transform.GetChild(1).GetComponent(Toggle);
	toggleCharacter = gameObject.transform.GetChild(2).GetComponent(Toggle);
}

function Update () 
{

}

/////////////////////////////
// Buttons
function GUIshow_Buttons ()
{
	showButtons = !showButtons;

	GUIshow_inventory ();
	GUIshow_Crafting  ();
	GUIshow_Character ();

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
	
	guiButtons.Add(toggleInventory_obj );
	guiButtons.Add(toggleCrafting_obj  );
	guiButtons.Add(toggleCharacter_obj );
	
	for ( var a : int = 0; a < guiButtons.Count; a++ )			// Disabling certain guiElements at start
	{	guiButtons[a].gameObject.SetActive(showGUIatStart);	}

	var guiInventoryObjects = GameObject.FindGameObjectsWithTag("guiInventory");
	var guiCraftingObjects  = GameObject.FindGameObjectsWithTag("guiCrafting");
	var guiCharacterObjects = GameObject.FindGameObjectsWithTag("guiCharacter");
	
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


























