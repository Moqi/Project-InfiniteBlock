#pragma strict

//import System.Collections;

/* For future update: May need to add a index(int) to this script (like character window)
   The reason for this is to be able to differentiate between the crafting slots   		*/

public class CraftingSlot extends MonoBehaviour 
{
	public  var item 			: Item;
	private var craftingSystem 	: CraftingSystem;
	private var inventory 		: Inventory;

	function Start () 
	{
		craftingSystem 	= GameObject.FindGameObjectWithTag("CraftingSystem").GetComponent(CraftingSystem);
		inventory 		= GameObject.FindGameObjectWithTag("Inventory").GetComponent(Inventory);
	}

	function Update () 
	{
		if ( item.itemType != Item.ItemType.None )
		{
			transform.GetChild(0).GetComponent(Image).enabled = true;
			transform.GetChild(0).GetComponent(Image).sprite  = item.itemIcon;
		}
		else if ( item.itemType == Item.ItemType.None )
		{
			transform.GetChild(0).GetComponent(Image).enabled = false;
		}
	}
	
	
	//function Slot_OnCursorClick ( PointerInputModule )
	function Slot_OnCursorClick ()
	{
		if ( inventory.draggingItem )
		{
			if ( item.itemType == Item.ItemType.None )
			{
				item = inventory.theDraggedItem;
				inventory.CloseDraggedItem();
				craftingSystem.ListWithItem();												// check itemlist
			}
			else if ( item.itemType != Item.ItemType.None )
			{
				var temp : Item = item;
				item = inventory.theDraggedItem;
				inventory.ShowDraggedItem( temp, -1 );
				craftingSystem.ListWithItem();												// check itemlist
			}
		}
	}
	
	//public function Slot_OnCursorDrag ( PointerInputModule )
	public function Slot_OnCursorDrag ()
	{
		if ( item.itemType != Item.ItemType.None && !inventory.draggingItem )
		{
			inventory.ShowDraggedItem ( item, -1 );
			item = new Item();
			craftingSystem.ListWithItem();													// check itemlist
		}
	}								

}































	