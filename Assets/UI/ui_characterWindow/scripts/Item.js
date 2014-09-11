#pragma strict


public class Item 
{

	public var itemName 		: String;
	public var itemID 			: int;
	public var itemDesc			: String;
	public var itemIcon 		: Sprite;
	public var itemModel 		: GameObject;
	public var itemPower 		: int;
	public var itemSpeed 		: int;
	public var itemValue 		: int;
	public var itemType 		: ItemType;
	public var itemColor 		: Color;
	public var itemMaterial		: Material;
	public var itemTexture		: Texture;
	
	
	public enum ItemType
	{
		None,
		Weapon, 
		Consumable,
		Quest, 
		Head,
		Shoulder,
		Chest, 
		Hands,
		Legs, 
		Feet,
		Material_rock_gray,
		Material_tree_brownlog,
		Material_tree_greenCrown,
		Material_bush_green,
		Material_cobber,
		Material_silver,
		Material_gold,
		Material_mystic
	}
	
	public function Item ( name : String, id : int, desc : String, power : int, speed : int, Value : int, type : ItemType, color : Color, material : Material, texture : Texture )
	{
		itemName 	= name;
		itemID 		= id;
		itemDesc	= desc;
		itemPower 	= power;
		itemSpeed	= speed;
		itemValue	= Value;
		itemType	= type;
		itemIcon 	= Resources.Load ( "" + name, Sprite );
		itemModel	= Resources.Load ( "lootableItem", GameObject );
		itemColor	= color;
		itemMaterial= material;
		itemTexture = texture;
	}
	
	public function Item ()
	{
		
	}

}





























