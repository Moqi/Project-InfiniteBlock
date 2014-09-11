#pragma strict

import System.Collections.Generic;

public class BlueprintDatabase extends MonoBehaviour 
{
	public  var blueprints 	: List.<Blueprint> = new List.<Blueprint>();
	private var database 	: ItemDatabase;

	function Start () 
	{
		database = GameObject.FindGameObjectWithTag("ItemDatabase").GetComponent(ItemDatabase);		
		/*															## Based on itemID ## 						*/
		/*												Item needed			    			Item result			*/
		blueprints.Add ( new Blueprint ( new List.<int>( new List.<int>(6) ), 			database.items[7] ) );
		blueprints.Add ( new Blueprint ( new List.<int>( new List.<int>(7) ),			database.items[14] ) );
		blueprints.Add ( new Blueprint ( new List.<int>( new List.<int>( [7, 8] ) ), 	database.items[14] ) );	// fx: multiple items (fx: itemID [7, 8]) may be needed to craft x (fx: itemID [14])
		blueprints.Add ( new Blueprint ( new List.<int>( new List.<int>( [5, 7] ) ), 	database.items[15] ) );

	}

} 