#pragma strict

public class hotBarScript extends MonoBehaviour
{
	private var amountOfSlots : int	= 9;

	function Start ()
	{
		for ( var i : int = 0; i < amountOfSlots; i++ )
		{
			transform.GetChild( i ).GetComponent ( hotbarSlot ).index = i + 1;
		}
	}
}