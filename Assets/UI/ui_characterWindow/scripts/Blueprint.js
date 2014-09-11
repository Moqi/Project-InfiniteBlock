#pragma strict


import System.Collections.Generic;

public class Blueprint 
{
	public var ingredients  : List.<int> = new List.<int>();
	public var finalItem 	: Item;

	public function Blueprint ( ingredients : List.<int>, item : Item )
	{
		this.ingredients = ingredients;
		finalItem 		 = item;
	}
}