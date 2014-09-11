#pragma strict


public class ResultScript extends MonoBehaviour 
{
	private var craftingSystem  : CraftingSystem;
	private var inventory 		: Inventory;
	public  var temp 			: int 				= 0;
	
	
	function Start () 
	{
		inventory 		= GameObject.FindGameObjectWithTag("Inventory").GetComponent(Inventory);
		craftingSystem 	= GameObject.FindGameObjectWithTag("CraftingSystem").GetComponent(CraftingSystem);
	}

	function Update () 
	{
		if ( craftingSystem.possibleItems.Count != 0 )
		{
			transform.GetChild(0).GetComponent(Image).enabled = true;
			transform.GetChild(0).GetComponent(Image).sprite  = craftingSystem.possibleItems[temp].itemIcon;
		}
		else
		{
			transform.GetChild(0).GetComponent(Image).enabled = false;
		}
	}
	
	function Slot_OnCursorClick ( PointerInputModule )
	{
		inventory.ShowDraggedItem ( craftingSystem.possibleItems[temp], -1 );
		craftingSystem.DeleteItems( craftingSystem.possibleItems[temp] );
	}
	

}
























