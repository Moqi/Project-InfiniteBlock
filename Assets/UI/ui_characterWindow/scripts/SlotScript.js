#pragma strict

import UnityEngine.UI;
import UnityEngine.EventSystems;

public class SlotScript extends MonoBehaviour 
{

	public  var item 		: Item;
	private var itemImage 	: UI.Image;
	public  var slotNumber  : int;		
	private var inventory 	: Inventory;

	private var itemAmount  : Text;

	function Start () 
	{
		itemAmount 	= gameObject.transform.GetChild ( 0 ).GetComponent ( Text );
		inventory 	= GameObject.FindGameObjectWithTag ( "Inventory" ).GetComponent (Inventory);
		itemImage 	= gameObject.transform.GetChild ( 1 ).GetComponent ( UI.Image );
	}

	function Update () 
	{
		if ( inventory.array_Items[slotNumber].itemName != null )
		{
			itemAmount.enabled 	= false;
		
			itemImage.enabled 	= true;
			itemImage.sprite  	= inventory.array_Items[slotNumber].itemIcon;
			
			if ( inventory.array_Items[slotNumber].itemType == item.ItemType.Consumable )
			{
				itemAmount.enabled	= true;
				itemAmount.text = "" + inventory.array_Items[slotNumber].itemValue;
			}
		}
		else
		{
			itemImage.enabled = false;
		}
	}
	
	function Slot_OnCursorClick ( PointerInputModule )
	{
		//Debug.Log ( "Mouse clicked: " + transform.name );

		if ( inventory.array_Items[slotNumber].itemType == Item.ItemType.Consumable && !inventory.draggingItem )	// consumable statement
		{
			inventory.array_Items[slotNumber].itemValue--; 
			if ( inventory.array_Items[slotNumber].itemValue == 0 )
			{
				inventory.array_Items[slotNumber] = new Item();
				itemAmount.enabled = false;
				inventory.CloseTooltip();
			}
		}
		
		if ( inventory.array_Items[slotNumber].itemName == null && inventory.draggingItem )							// If there is NOT an item in slot
		{
			inventory.array_Items[slotNumber] = inventory.theDraggedItem;
			inventory.CloseDraggedItem ();
		}
		else //if ( inventory.array_Items[slotNumber].itemName != null && inventory.draggingItem )					// if there IS an item in slot
		{
			try	// Statement for trying out stuff
			{	
				if ( inventory.draggingItem )
				{
					if ( inventory.array_Items[slotNumber].itemName != null )
					{
						inventory.array_Items[inventory.indexOfDraggedItem] = inventory.array_Items[slotNumber];
						inventory.array_Items[slotNumber] = inventory.theDraggedItem;
						inventory.CloseDraggedItem();
					}	
				}	
			}
			catch(err) // if its not working, return // this way, an error is avoided. 
			{ 
				return;
			}
		}	
	}
	
	public function Slot_OnCursorEnter ()
	{	
		if ( inventory.array_Items[slotNumber].itemName != null && !inventory.draggingItem )
		{
			//Debug.Log ( inventory.array_Items[slotNumber].itemDesc );
			
			inventory.ShowTooltip ( inventory.array_slots [ slotNumber ].GetComponent ( RectTransform ).localPosition, inventory.array_Items [ slotNumber ] );
		}
	}
	
	public function Slot_OnCursorExit ()
	{
		inventory.CloseTooltip();
	}
	
	public function Slot_OnCursorDrag ()
	{
		if ( !inventory.draggingItem )
		{
			/*
			if ( inventory.array_Items[slotNumber].itemType == Item.ItemType.Consumable ) // adds 1 to consumable since one will be subtracted due to dragging
			{
				inventory.array_Items[slotNumber].itemValue++;
			}
			*/
		
			if ( inventory.array_Items[slotNumber].itemName != null )
			{
				//Debug.Log ("Dragging!");
				inventory.ShowDraggedItem ( inventory.array_Items[slotNumber], slotNumber );
				inventory.array_Items[slotNumber] = new Item();
				
				itemAmount.enabled = false;
			}
		}
	}
	
	
}	




























