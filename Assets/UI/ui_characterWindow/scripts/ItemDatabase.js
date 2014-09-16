#pragma strict


public class ItemDatabase extends MonoBehaviour 
{	
	public 	var items : List.<Item> = new List.<Item>();
	
		// Colors 
		private var standardColor	 	: Color;	
		private var color_treeAndbush	: Color;
		private var color_treeLog		: Color;
		private var color_rock			: Color;
		
				// Color variants
				public var color_green_variant_01			: Color;	// Beech
				public var color_green_variant_02			: Color;	// maple
				public var color_green_variant_03			: Color;	// elm
				public var color_green_variant_04			: Color;	// dogwood
				public var color_green_variant_05			: Color;	// cherry
				
				public var color_brown_variant_01			: Color;
				public var color_brown_variant_02			: Color;
				public var color_brown_variant_03			: Color;
				public var color_brown_variant_04			: Color;
				public var color_brown_variant_05			: Color;
				
				public var color_gray_variant_01			: Color;
				
				public var color_cobber						: Color;	
				public var color_silver						: Color;
				public var color_gold						: Color;
				public var color_legendary					: Color;		
										
		// Materials 
		private var standardMaterial 	: Material;
		private var diffuseMaterial		: Material;
		private var transparentMaterial : Material;
		
		// Textures
		private var standardTexture		: Texture;
	
	
																							
  ///////////////////////////																								
	function Start ()
	{
		LoadColors 	  ();
		LoadMaterials ();
		LoadTextures  ();
		ItemDataBase  ();	
	}	
  ///////////////////////////
	function LoadColors ()
	{
		color_green_variant_01		= new Color(151/255.0F, 232/255.0F, 67/255.0F, 0/255.0F);		
		color_green_variant_02	  	= new Color(135/255.0F, 166/255.0F, 68/255.0F, 0/255.0F);
		color_green_variant_03  	= new Color(97/255.0F, 140/255.0F, 3/255.0F, 0/255.0F);		
		color_green_variant_04		= new Color(95/255.0F, 237/255.0F, 252/255.0F, 0/255.0F);		
		color_green_variant_05		= new Color(255/255.0F, 145/255.0F, 166/255.0F, 0/255.0F);	
		
		color_brown_variant_01 		= new Color(113/255.0F, 103/255.0F, 82/255.0F, 0/255.0F);
		color_brown_variant_02 		= new Color(113/255.0F, 103/255.0F, 82/255.0F, 0/255.0F);
		color_brown_variant_03 		= new Color(113/255.0F, 103/255.0F, 82/255.0F, 0/255.0F);
		color_brown_variant_04		= new Color(113/255.0F, 103/255.0F, 82/255.0F, 0/255.0F);
		color_brown_variant_05 		= new Color(113/255.0F, 103/255.0F, 82/255.0F, 0/255.0F);
		
		color_gray_variant_01		= new Color(107/255.0F, 101/255.0F, 92/255.0F, 0/255.0F);		
		
		color_cobber				= new Color(166/255.0F, 77/255.0F, 45/255.0F, 0/255.0F);
		color_silver				= new Color(166/255.0F, 158/255.0F, 157/255.0F, 0/255.0F);	// silver
		color_gold					= new Color(220/255.0F, 148/255.0F, 27/255.0F, 0/255.0F);	// gold
		color_legendary				= new Color(102/255.0F, 0/255.0F, 153/255.0F, 50/255.0F);	// purple
			
			
	}
  ///////////////////////////
	function LoadMaterials ()
	{
		diffuseMaterial 	= new Material (Shader.Find("Diffuse"));
		transparentMaterial = new Material(Shader.Find("Transparent/Diffuse"));
	}
  ///////////////////////////
	function LoadTextures ()
	{
		standardTexture 	= Resources.Load ( "tex_randomSquares", Texture2D );
	}
 
  ///////////////////////////
    function ItemDataBase ()
    {
    //  Item 	  			 (    name,        id, desc,                    power, speed, Amount, type )
		items.Add ( new Item ("A_Potion_01", 	0, "Description: Nice potion 01", 15, 10, 1, Item.ItemType.Consumable, 	standardColor, standardMaterial, standardTexture	) );
		items.Add ( new Item ("A_Potion_02", 	1, "Description: Nice potion 02", 30, 10, 3, Item.ItemType.Consumable, 	standardColor, standardMaterial, standardTexture	) );
		items.Add ( new Item ("A_Potion_03", 	2, "Description: Nice potion 03", 5, 10, 1,  Item.ItemType.Consumable, 	standardColor, standardMaterial, standardTexture	) );
		items.Add ( new Item ("A_Potion_04", 	3, "Description: Nice potion 04", 10, 10, 1, Item.ItemType.Consumable, 	standardColor, standardMaterial, standardTexture	) );
		
	// Materials
	
	/////#!		
		// test materials 
		items.Add ( new Item  ("iron ore", 		5, "Iron meh",					  10, 10, 3, Item.ItemType.Consumable, standardColor, standardMaterial, standardTexture ));
		items.Add ( new Item  ("woodplank", 	6, "woodplank meh",				  10, 10, 3, Item.ItemType.Consumable, standardColor, standardMaterial, standardTexture ));
		items.Add ( new Item  ("woodstick", 	7, "woodstick meh",				  10, 10, 3, Item.ItemType.Consumable, standardColor, standardMaterial, standardTexture ));
		items.Add ( new Item  ("stone", 		8, "stone meh",				 	  10, 10, 3, Item.ItemType.Consumable, standardColor, standardMaterial, standardTexture ));
		// test item
		items.Add ( new Item  ("Axe_01", 		14, "Axe with stone",			  10, 10, 1, Item.ItemType.Weapon, 	   standardColor, standardMaterial, standardTexture ));
		items.Add ( new Item  ("Axe_02", 		15, "Axe with iron",			  10, 10, 1, Item.ItemType.Weapon, 	   standardColor, standardMaterial, standardTexture ));
	/////#!
			
		// Trees
		// Tree Log
		items.Add ( new Item ("Brown woodlog",  		10, "", 3, 5, 1, Item.ItemType.Consumable, color_brown_variant_01, diffuseMaterial, standardTexture ) );
	
		// Tree Crown
		items.Add ( new Item ("Beech leaves", 			20, "", 0, 1, 1, Item.ItemType.Consumable, color_green_variant_01, diffuseMaterial, standardTexture	) );
		items.Add ( new Item ("Maple leaves", 			21, "", 0, 1, 1, Item.ItemType.Consumable, color_green_variant_02, diffuseMaterial, standardTexture	) );
		items.Add ( new Item ("Elm leaves", 			22, "", 0, 1, 1, Item.ItemType.Consumable, color_green_variant_03, diffuseMaterial, standardTexture	) );
		items.Add ( new Item ("Dogwood leaves", 		23, "", 0, 1, 1, Item.ItemType.Consumable, color_green_variant_04, diffuseMaterial, standardTexture	) );
		items.Add ( new Item ("Cherry leaves", 			24, "", 0, 1, 1, Item.ItemType.Consumable, color_green_variant_05, diffuseMaterial, standardTexture	) );
		
		// Bushes
		items.Add ( new Item ("Small Beech leaves", 	40, "", 0, 0, 1, Item.ItemType.Consumable, color_green_variant_01, diffuseMaterial, standardTexture ) );
		items.Add ( new Item ("Small Maple leaves", 	41, "", 0, 0, 1, Item.ItemType.Consumable, color_green_variant_02, diffuseMaterial, standardTexture ) );
		items.Add ( new Item ("Small Elm leaves", 		42, "", 0, 0, 1, Item.ItemType.Consumable, color_green_variant_03, diffuseMaterial, standardTexture ) );
		items.Add ( new Item ("Small Dogwood leaves", 	43, "", 0, 0, 1, Item.ItemType.Consumable, color_green_variant_04, diffuseMaterial, standardTexture ) );
		items.Add ( new Item ("Small Cherry leaves", 	44, "", 0, 0, 1, Item.ItemType.Consumable, color_green_variant_05, diffuseMaterial, standardTexture ) );
		
		// Rocks
		items.Add ( new Item ("Gray rock", 				60, "", 0, 0, 1, Item.ItemType.Consumable, 	color_gray_variant_01, 	diffuseMaterial, standardTexture ) );
		items.Add ( new Item ("Cobber ore", 			61, "", 0, 0, 1, Item.ItemType.Consumable, 	color_cobber, 			diffuseMaterial, standardTexture ) );
		items.Add ( new Item ("Silver ore", 			62, "", 0, 0, 1, Item.ItemType.Consumable, 	color_silver, 			diffuseMaterial, standardTexture ) );
		items.Add ( new Item ("Gold ore", 				63, "", 0, 0, 1, Item.ItemType.Consumable, 		color_gold, 			diffuseMaterial, standardTexture ) );
		items.Add ( new Item ("Mystic ore", 			64, "", 0, 0, 1, Item.ItemType.Consumable, 	color_legendary, 		diffuseMaterial, standardTexture ) );
    }
  ///////////////////////////		
  
  /////////////////////////////////
	function randomRarityPicker_treeLog () : int			
	{
		var pickedValue 		: int;
	
		// % chance of object x being picked: 
		var chanceOfObject_01 	: float = 50.0;	// if number is below x, then (= x-chance for this to happen) 
		var chanceOfObject_02 	: float = 15.0;	// 16% spawn chance
		var chanceOfObject_03 	: float = 15.0;
		var chanceOfObject_04 	: float = 15.0;
		var chanceOfObject_05 	: float = 5.0;	
		var randomNum 		 	: float = Random.Range(0.0, 100.0); 
		
		if ( 	   randomNum < chanceOfObject_01)
		{	pickedValue = 10;		}
		
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 )
		{   pickedValue = 10; 		}
		
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03 )
		{	pickedValue = 10;		}
		
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03 + chanceOfObject_04 )
		{	pickedValue = 10;		}
			
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03 + chanceOfObject_04 + chanceOfObject_05 )
		{	pickedValue = 10;		}
		
		else 
		{	pickedValue = 10;	 	}
			
		return pickedValue;
	}	
	
  /////////////////////////////////
	function randomRarityPicker_treeCrown () : int			
	{
		var pickedValue 		: int;
	
		// % chance of object x being picked: 
		var chanceOfObject_01 	: float = 50.0;	// if number is below x, then (= x-chance for this to happen) 
		var chanceOfObject_02 	: float = 15.0;	// 16% spawn chance
		var chanceOfObject_03 	: float = 15.0;
		var chanceOfObject_04 	: float = 15.0;
		var chanceOfObject_05 	: float = 5.0;	
		var randomNum 		 	: float = Random.Range(0.0, 100.0); 
		
		if ( 	   randomNum < chanceOfObject_01)
		{	pickedValue = 20;		}
		
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 )
		{   pickedValue = 21; 		}
		
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03 )
		{	pickedValue = 22;		}
		
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03 + chanceOfObject_04 )
		{	pickedValue = 23;		}
			
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03 + chanceOfObject_04 + chanceOfObject_05 )
		{	pickedValue = 24;		}
		
		else 
		{	pickedValue = 20;	 	}
			
		return pickedValue;
	}	
	
  /////////////////////////////////
	function randomRarityPicker_Bush () : int			
	{
		var pickedValue 		: int;
	
		// % chance of object x being picked: 
		var chanceOfObject_01 	: float = 50.0;	// if number is below x, then (= x-chance for this to happen) 
		var chanceOfObject_02 	: float = 15.0;	// 16% spawn chance
		var chanceOfObject_03 	: float = 15.0;
		var chanceOfObject_04 	: float = 15.0;
		var chanceOfObject_05 	: float = 5.0;	
		var randomNum 		 	: float = Random.Range(0.0, 100.0); 
		
		if ( 	   randomNum < chanceOfObject_01)
		{	pickedValue = 40;		}
		
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 )
		{   pickedValue = 41; 		}
		
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03 )
		{	pickedValue = 42;		}
		
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03 + chanceOfObject_04 )
		{	pickedValue = 43;		}
			
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03 + chanceOfObject_04 + chanceOfObject_05 )
		{	pickedValue = 44;		}
		
		else 
		{	pickedValue = 40;	 	}
			
		return pickedValue;
	}
	
  /////////////////////////////////
	function randomRarityPicker_Rock () : int			
	{
		var pickedValue 		: int;
	
		// % chance of object x being picked: 
		var chanceOfObject_01 	: float = 70.0;	// if number is below x, then (= x-chance for this to happen) 
		var chanceOfObject_02 	: float = 16.0;	// 16% spawn chance
		var chanceOfObject_03 	: float = 8.0;
		var chanceOfObject_04 	: float = 4.0;
		var chanceOfObject_05 	: float = 2.0;	
		var randomNum 		 	: float = Random.Range(0.0, 100.0); 
		
		if ( 	   randomNum < chanceOfObject_01)
		{	pickedValue = 60;		}
		
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 )
		{   pickedValue = 61; 		}
		
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03 )
		{	pickedValue = 62;		}
		
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03 + chanceOfObject_04 )
		{	pickedValue = 63;		}
			
		else if (  randomNum < chanceOfObject_01 + chanceOfObject_02 + chanceOfObject_03 + chanceOfObject_04 + chanceOfObject_05 )
		{	pickedValue = 64;		}
		
		else 
		{	pickedValue = 60;	 	}
			
		return pickedValue;
	}	
  
}




















































