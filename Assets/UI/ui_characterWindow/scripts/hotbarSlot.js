#pragma strict

import UnityEngine.UI;
import UnityEngine.EventSystems;

public class hotbarSlot extends MonoBehaviour 
{
	public var index 		: int;
	public var item  		: Item;
	public var inventory 	: Inventory;
	
	function Start ()
	{
		inventory = GameObject.FindGameObjectWithTag ( "Inventory" ).GetComponent ( Inventory );
	}
	
	function Update ()
	{
		if ( item.itemType != Item.ItemType.None )
		{
			transform.GetChild( 0 ).GetComponent( Image ).enabled = true;
			transform.GetChild( 0 ).GetComponent( Image ).sprite  = item.itemIcon;
		}
		else
		{
			transform.GetChild( 0 ).GetComponent( Image ).enabled = false;
		}
	}
	
	function InitializeSlotNumber ( slotNumber : int )
	{
		if ( inventory.draggingItem )
		{
			if ( index == slotNumber )		
			{
				if ( item.itemType != Item.ItemType.None )
				{
					var temp : Item = item;
					item = inventory.theDraggedItem;
					inventory.theDraggedItem = temp;
					inventory.ShowDraggedItem(temp, -1 );
				}
				else
				{
					item = inventory.theDraggedItem;
					inventory.CloseDraggedItem();
				}
			}
		}	
	}
	
	function Slot_OnCursorClick ( IPointerDownHandler )
	{
		InitializeSlotNumber ( 1 );
		InitializeSlotNumber ( 2 );
		InitializeSlotNumber ( 3 );
		InitializeSlotNumber ( 4 );
		InitializeSlotNumber ( 5 );
		InitializeSlotNumber ( 6 );
		InitializeSlotNumber ( 7 );
		InitializeSlotNumber ( 8 );
		InitializeSlotNumber ( 9 );		
	}
	
	public function Slot_OnCursorDrag ()
	{
		if ( !inventory.draggingItem )
		{
			if ( item.itemType != Item.ItemType.None )
			{
				inventory.theDraggedItem = item;
				inventory.ShowDraggedItem ( item, -1 );
				item = new Item ();
			}
		}	
	}
}	

























