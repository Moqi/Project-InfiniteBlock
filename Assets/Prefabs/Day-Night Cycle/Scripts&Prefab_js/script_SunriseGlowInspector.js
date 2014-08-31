

@script AddComponentMenu ("Day-Night Cycle/SunriseGlowInspector")
public class SunriseGlowInspector extends MonoBehaviour
{//float for angle
	public var degreeAboveHorizon : float = 30;

	function Update ()
	{
		var angle = 90 - Vector3.Angle ( transform.position, Vector3.up );

		transform.LookAt ( transform.parent, Vector3.up );
		transform.Rotate ( new Vector3 ( 90, 0, 0 ) );

		var alpha : float = Mathf.InverseLerp ( degreeAboveHorizon, 0, angle );
		renderer.material.SetColor ( "_TintColor", new Color ( 0.5f, 0.5f, 0.5f, alpha / 4 ) );
	}
}
