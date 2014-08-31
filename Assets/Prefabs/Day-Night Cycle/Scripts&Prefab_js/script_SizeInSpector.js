

@script AddComponentMenu ("Day-Night Cycle/SizeInspector")
public class SizeInspector extends MonoBehaviour
{

	//floats for min Size and max Size
	public var minSize : float = 10f;
	public var maxSize : float = 20f;

	function Update()
	{
		var v1 		= transform.position;
		var angle 	= Vector3.Angle(v1, Vector3.up);
//Set angle and Scale size
		var scale : float;
		if (angle > 90)
		{
			scale = maxSize;
		}
		else if (angle < 45)
		{
			scale = minSize;
		}
		else
		{
			scale = minSize + (angle - 45) / 45 * (maxSize - minSize);
		}

		transform.localScale = new Vector3(scale, scale, scale);
	}
}
