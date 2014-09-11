#pragma strict

import System.Collections.Generic;
import UnityEngine.UI;


public class Dropbox extends MonoBehaviour
{
	private var inventory 				: Inventory;
	public  var droppedItem 			: GameObject[];
	public  var droppedItemsNearPlayer 	: List.<GameObject> = new List.<GameObject>();
	public  var itemBox 				: GameObject;
	public  var listItemBox			 	: List.<GameObject> = new List.<GameObject>();
	

	function Start () 
	{
		inventory = GameObject.FindGameObjectWithTag ("Inventory").GetComponent (Inventory);
	}

	function Update () 
	{
		droppedItem = GameObject.FindGameObjectsWithTag("Item");
		GetDroppedItemsInRange ();
		CheckIfItemStillInRange ();
	}
	
	function updateIndex ()
	{
		for ( var i : int = 0; i < listItemBox.Count; i++ )
		{
			listItemBox[i].GetComponent(ItemInBox).index = i;
		}
	}
	
	function CreateItemsInBox ()
	{
		//var itemBoxPos 	: Vector3 		= new Vector3 ( 0, ( -35 * listItemBox.Count ) + 123.8, 0 );	// 123.8 is the .y position of the first box
		var itemBoxPos 	: Vector3 		= new Vector3 ( 0, ( -35 * listItemBox.Count ) - 150, 0 );	// 123.8 is the .y position of the first box
		var newItem 	: GameObject 	= Instantiate ( itemBox );
		var boxWithItem : ItemInBox 	= newItem.GetComponent (ItemInBox);
		
			boxWithItem.index			= listItemBox.Count;
			boxWithItem.item 			= droppedItemsNearPlayer[listItemBox.Count].GetComponent(lootableItem).item;
		
		listItemBox.Add(newItem);
						newItem.transform.parent = this.gameObject.transform;
						newItem.GetComponent(RectTransform).localPosition = itemBoxPos;
						
		newItem.transform.GetChild(0).GetComponent(Image).sprite 	= droppedItemsNearPlayer[listItemBox.Count - 1].GetComponent(lootableItem).item.itemIcon;	// Set itemIcon	
		newItem.transform.GetChild(1).GetComponent(Text).text 		= droppedItemsNearPlayer[listItemBox.Count - 1].GetComponent(lootableItem).item.itemName;	// Set itemName
		if ( droppedItemsNearPlayer[listItemBox.Count - 1].GetComponent(lootableItem).item.itemType == Item.ItemType.Consumable )	// Check if item is a consumable 
		{
			newItem.transform.GetChild(2).GetComponent(Text).enabled 	= true;
			newItem.transform.GetChild(2).GetComponent(Text).text 		= "x" + droppedItemsNearPlayer[listItemBox.Count - 1].GetComponent(lootableItem).item.itemValue;
		}		
	}
	
	function UpdateItemBoxPosition ()
	{
		for ( var i : int = 0; i < listItemBox.Count; i++ )
		{
			var position : Vector3 = new Vector3 ( 0, (-35 * i) - 150, 0 );
			listItemBox[i].GetComponent ( RectTransform ).localPosition = position;
		}
	}	
	
	function CheckIfItemStillInRange ()
	{
		for ( var i : int = 0; i < droppedItemsNearPlayer.Count; i++ )
		{
			var distance : float = 100000000;
			if ( droppedItemsNearPlayer[i] != null )
			{
				distance = Vector3.Distance ( droppedItemsNearPlayer[i].transform.position, GameObject.FindGameObjectWithTag("Player").transform.position );
			}
			if ( distance > 3 )
			{
				Destroy ( listItemBox[i] );
				listItemBox.RemoveAt(i);
				droppedItemsNearPlayer.RemoveAt(i);
				UpdateItemBoxPosition ();
			}
		}
	}
	
	function GetDroppedItemsInRange ()
	{
		for ( var i : int = 0; i < droppedItem.Length; i++ )
		{
			var distance : float = Vector3.Distance(droppedItem[i].transform.position, GameObject.FindGameObjectWithTag("Player").transform.position );
			if ( distance <= 3 )
			{
				var item : Item = droppedItem[i].GetComponent(lootableItem).item;
			
				if ( droppedItemsNearPlayer.Count == 0 )
				{
					droppedItemsNearPlayer.Add ( droppedItem[i] );
					// CreateItemBoxInBox
					CreateItemsInBox ();
				}
				else
				{
					var temp : boolean = false;
					
					for ( var k : int = 0; k < droppedItemsNearPlayer.Count; k++ )
					{
						if ( droppedItemsNearPlayer[k] != null )
						{
							if ( droppedItemsNearPlayer[k].GetComponent(lootableItem).item.Equals( item ) )
							{
								temp = true;
							}
							if ( !temp && k == droppedItemsNearPlayer.Count - 1 )
							{
								droppedItemsNearPlayer.Add( droppedItem[i] );
								// CreateItemInBox
								CreateItemsInBox ();
							}
						}
					}
				}
			}
		}
	}
	
	public function Slot_OnCursorClick ()
	{
		if ( inventory.draggingItem )
		{
			DropItem ( inventory.theDraggedItem );
			inventory.CloseDraggedItem();
		}
	}
	
	function DropItem( item : Item )
	{
		var newItem : GameObject = Instantiate ( item.itemModel, GameObject.FindGameObjectWithTag("Player").transform.position, Quaternion.identity );	
		newItem.GetComponent(lootableItem).item = item;
	}
	
	
}