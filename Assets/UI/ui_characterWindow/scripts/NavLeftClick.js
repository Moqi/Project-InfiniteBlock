#pragma strict


public class NavLeftClick extends MonoBehaviour	
{		

	private var resultScript : ResultScript;

	
	function Start () 
	{
		resultScript = GameObject.FindGameObjectWithTag("Finish").GetComponent(ResultScript);
	}

	function Slot_OnCursorClick ( PointerInputModule )
	{
		if ( resultScript.temp != 0 )
		{
			resultScript.temp--;
		}
	}

}