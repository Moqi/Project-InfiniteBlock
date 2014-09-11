#pragma strict


public class Object_ItemType extends MonoBehaviour
{
	public  var item : Item;
	
	static  var spawnLootableItem 	: boolean 		= false;
	static  var spawnPosition 	  	: Vector3;

	function Update ()
	{
		if ( spawnLootableItem )
		{
			spawnLootableItem = false;
			DropItem( item );
		}	
	}
	
	function DropItem( dropItem : Item )
	{
		var newItem : GameObject = Instantiate ( dropItem.itemModel, spawnPosition, Quaternion.identity );	
		newItem.GetComponent(lootableItem).item = dropItem;
	}
}	