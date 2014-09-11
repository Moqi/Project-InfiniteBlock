#pragma strict


public class ItemInBox extends MonoBehaviour
{
	public  var item 		: Item;
	private var inventory 	: Inventory; 
	private var dropbox		: Dropbox;
	public  var index 		: int;


	function Start () 
	{
		inventory 	= GameObject.FindGameObjectWithTag("Inventory").GetComponent(Inventory);
		dropbox 	= GameObject.FindGameObjectWithTag("Dropbox").GetComponent(Dropbox);
	}

	function ItemInBox_OnCursorClick ()
	{
		inventory.AddExistingItem( item );
		Destroy ( dropbox.listItemBox[index] );
		dropbox.listItemBox.RemoveAt( index );
		Destroy ( dropbox.droppedItemsNearPlayer[index] );
		dropbox.droppedItemsNearPlayer.RemoveAt( index );
		dropbox.updateIndex ();
	}
}