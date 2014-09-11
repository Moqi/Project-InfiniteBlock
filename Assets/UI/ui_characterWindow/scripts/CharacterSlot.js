#pragma strict


import UnityEngine.UI;
import UnityEngine.EventSystems;

public class CharacterSlot extends MonoBehaviour 
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
	
	function InitializeCharacterSlotNumberAndType ( slotNumber : int, itemSlotType : Item.ItemType )
	{
		if ( inventory.draggingItem )
		{
			if ( index == slotNumber && inventory.theDraggedItem.itemType == itemSlotType )		
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
		InitializeCharacterSlotNumberAndType ( 0, Item.ItemType.Head 		);
		InitializeCharacterSlotNumberAndType ( 1, Item.ItemType.Shoulder 	);
		InitializeCharacterSlotNumberAndType ( 2, Item.ItemType.Chest 		);
		InitializeCharacterSlotNumberAndType ( 3, Item.ItemType.Hands 		);
		InitializeCharacterSlotNumberAndType ( 4, Item.ItemType.Legs 		);
		InitializeCharacterSlotNumberAndType ( 5, Item.ItemType.Feet 		);		
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










































