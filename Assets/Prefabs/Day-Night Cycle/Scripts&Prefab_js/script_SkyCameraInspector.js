
@script AddComponentMenu ("Day-Night Cycle/SkyCameraInspector")
@script RequireComponent(Camera)
public class SkyCameraInspector extends MonoBehaviour
{
	private var _isFogEnabled : boolean;
	private var _ambientLight : Color;
//Render settings controller
	public function OnPreRender ()
	{
		_isFogEnabled = RenderSettings.fog;
		_ambientLight = RenderSettings.ambientLight;

		RenderSettings.fog = false;
		RenderSettings.ambientLight = new Color(1f, 1f, 1f);
	}

	public function OnPostRender ()
	{
		RenderSettings.fog = _isFogEnabled;
		RenderSettings.ambientLight = _ambientLight;
	}
}
