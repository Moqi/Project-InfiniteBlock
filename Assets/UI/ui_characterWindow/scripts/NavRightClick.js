#pragma strict


public class NavRightClick extends MonoBehaviour	
{		

	private var resultScript 	: ResultScript;
	private var craftingSystem 	: CraftingSystem;
	
	function Start () 
	{
		resultScript 	= GameObject.FindGameObjectWithTag("Finish").GetComponent(ResultScript);
		craftingSystem 	= GameObject.FindGameObjectWithTag("CraftingSystem").GetComponent(CraftingSystem);
	}

	function Slot_OnCursorClick ( PointerInputModule )
	{
		if ( resultScript.temp < craftingSystem.possibleItems.Count - 1 )
		{
			resultScript.temp++;
		}
	}

}