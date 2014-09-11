#pragma strict

import System.Collections.Generic;
import UnityEngine.UI;

//
// Remember to change the script executionOrder: Go to Edit > Project Execution Order > Inspector > Add #1: ItemDatabase.js, #2: Inventory.js, #3: SlotScript.js
//

public class Inventory extends MonoBehaviour
{
   	private var dataBase	: ItemDatabase;
    public 	var array_slots	: List.<GameObject> 	= new List.<GameObject>();
    public 	var array_Items : List.<Item> 			= new List.<Item>();
	public  var slot 		: GameObject;
	private var x 			: int					= -123;
	private var y 			: int					= 62;
	
	public var toolTip 					: GameObject;
	public var draggedItemGameObject 	: GameObject;
	public var draggingItem 			: boolean	= false;
	public var theDraggedItem			: Item;
	public var indexOfDraggedItem		: int;
	
	function Update ()
	{
		if ( draggingItem )
		{
			var iconPosition : Vector3 = ( Input.mousePosition - GameObject.FindGameObjectWithTag ( "Canvas" ).GetComponent ( RectTransform ).localPosition);
			draggedItemGameObject.GetComponent ( RectTransform ).localPosition = new Vector3 ( iconPosition.x + 25, iconPosition.y - 25, iconPosition.z );
		}
	}
	
	public function ShowTooltip ( toolPosition : Vector3, item : Item )
	{
		toolTip.SetActive ( true ); 
		toolTip.GetComponent (RectTransform).localPosition = new Vector3 (toolPosition.x + 24, toolPosition.y + 35, toolPosition.z );
		
		toolTip.transform.GetChild ( 0 ).GetComponent ( Text ).text = item.itemName;
		toolTip.transform.GetChild ( 1 ).GetComponent ( Text ).text = item.itemPower.ToString();	
		toolTip.transform.GetChild ( 2 ).GetComponent ( Text ).text = item.itemDesc;			
	}
	
	public function CloseTooltip ()
	{
		if ( array_Items[slot.GetComponent(SlotScript).slotNumber].itemName != null )
		{
			toolTip.SetActive ( false );
		}
	}
	
	public function ShowDraggedItem ( item : Item, slotNumber : int )
	{
		indexOfDraggedItem = slotNumber;
		CloseTooltip ();
		draggedItemGameObject.SetActive ( true );
		theDraggedItem 	= item;
		draggingItem 	= true;
		draggedItemGameObject.GetComponent ( Image ).sprite = item.itemIcon;
	}
	
	public function CloseDraggedItem ()
	{
		draggingItem = false;
		draggedItemGameObject.SetActive ( false );
	}
	
	
	function Start () 
	{
		var slotAmount : int = 0;
		
		dataBase = GameObject.FindGameObjectWithTag ( "ItemDatabase" ).GetComponent ( ItemDatabase );
	
		for ( var i : int = 1; i < 5; i++ )
		{
			for ( var k : int = 1; k < 8; k++ )
			{
				var newSlot : GameObject 		= Instantiate ( slot, transform.position, Quaternion.identity );
					newSlot.GetComponent (SlotScript).slotNumber = slotAmount;
					array_slots.Add ( newSlot );
					array_Items.Add ( new Item() );
					newSlot.transform.parent 	= this.transform;
					newSlot.name = "Slot" + i + "." + k;
					newSlot.GetComponent ( RectTransform ).localPosition = new Vector3 ( x, y, 0 );
				
				x += 41;
				
				if ( k == 7 )
				{
					x = -123; 
					y -= 41;
				}
				
				slotAmount++;
			}
		}
		
		AddItem(5);
		AddItem(6);
		AddItem(7);
		AddItem(8);
		//AddItem(3);
	
		//Debug.Log(array_Items[0].itemName);
		//Debug.Log(array_Items[1].itemID);
	
	}
	
	public function CheckIfItemExist ( itemID : int, item : Item )
	{
		for ( var i : int = 0; i < array_Items.Count; i++ )
		{
			if ( array_Items[i].itemID == itemID )
			{
				array_Items[i].itemValue += item.itemValue;
				break;
			}
			else if ( i == array_Items.Count - 1 )
			{
				AddItemAtEmptySlot ( item );
			}
		}
	}
	
	public function AddExistingItem ( item : Item )
	{
		if ( item.itemType == Item.ItemType.Consumable )
		{
			CheckIfItemExist ( item.itemID, item );
		}
		else
		{
			AddItemAtEmptySlot ( item );
		}
	}
	
	function AddItem ( id : int ) 
	{
		for ( var i : int = 0; i < dataBase.items.Count; i++ )
		{
			if ( dataBase.items[i].itemID == id )
			{
				var item = dataBase.items[i];
				
				if ( dataBase.items[i].itemType == Item.ItemType.Consumable )
				{
					CheckIfItemExist ( id, item );
					break;
				}
				else
				{
					AddItemAtEmptySlot ( item );
				}
			}
		}
	}
	
	function AddItemAtEmptySlot ( item : Item )
	{	
		for ( var i : int = 0; i < array_Items.Count; i++ )
		{
			if ( array_Items[i].itemName == null )
			{
				array_Items[i] = item;
				break;
			}
		}
	}

}























