#pragma strict

import System.Collections.Generic;

public class CraftingSystem extends MonoBehaviour 
{
	public 	var slots 				: List.<CraftingSlot> = new List.<CraftingSlot>();
	private var craftingSlotAmount 	: int = 9; 									// Note: should be hardcoded / equal to the actually amount of crafting slots currently in the game

	public  var itemID 				: List.<int> 	      = new List.<int>();
	private var blueprintDatabase   : BlueprintDatabase;
	public  var possibleItems 		: List.<Item>		  = new List.<Item>();

	private var result 				: ResultScript;

	function Start () 
	{
		for ( var i : int = 0; i < craftingSlotAmount; i++ )
		{
			slots.Add (transform.GetChild( i ).GetComponent( CraftingSlot ) );
		}
		
		blueprintDatabase 	= GameObject.FindGameObjectWithTag("BlueprintDatabase").GetComponent(BlueprintDatabase);
		result 				= GameObject.FindGameObjectWithTag("Finish").GetComponent(ResultScript);
	}	


	public function ListWithItem()
	{
		itemID.Clear();
		possibleItems.Clear();
		result.temp = 0;
		
		for ( var i : int = 0; i < slots.Count; i++ )
		{
			if ( slots[i].item.itemType != Item.ItemType.None )
			{
				itemID.Add ( slots[i].item.itemID );
			}
		}
		
		for ( var k : int = 0; k < blueprintDatabase.blueprints.Count; k++ )
		{
			var amountOfTrue : int = 0; 
			
			for ( var j : int = 0; j < blueprintDatabase.blueprints[ k ].ingredients.Count; j++ )
			{
				for ( var z : int = 0; z < itemID.Count; z++ )
				{
					if ( blueprintDatabase.blueprints[ k ].ingredients[ j ] == itemID[ z ] )
					{
						amountOfTrue++;
						break;
					}
				}
				
				if ( amountOfTrue == blueprintDatabase.blueprints[ k ].ingredients.Count )
				{
					possibleItems.Add ( blueprintDatabase.blueprints[ k ].finalItem );
				}
			}
		}
	}
	
	public function DeleteItems ( item : Item )
	{
		for ( var i : int = 0; i < blueprintDatabase.blueprints.Count; i++ )
		{
			if ( blueprintDatabase.blueprints[i].finalItem.Equals( item ) )
			{
				for ( var k : int = 0; k < blueprintDatabase.blueprints[i].ingredients.Count; k++ )
				{
					for ( var z : int = 0; z < slots.Count; z++ )
					{
						if ( slots[z].item.itemID == blueprintDatabase.blueprints[i].ingredients[k] )
						{
							slots[z].item = new Item();
							ListWithItem();
							break;
						}
					}
				}
			}
		}
	} 
	
	
}


























