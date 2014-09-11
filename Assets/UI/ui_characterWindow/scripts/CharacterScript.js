#pragma strict

public class CharacterScript extends MonoBehaviour
{
	private var amountOfSlots : int	= 6;

	function Start ()
	{
		for ( var i : int = 0; i < amountOfSlots; i++ )
		{
			transform.GetChild( i ).GetComponent ( CharacterSlot ).index = i;
		}
	}
}