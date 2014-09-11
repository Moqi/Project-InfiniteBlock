#pragma strict
// This script will  rotate the suns and moons in the sky according to the current in game time.
// This script will  change the skybox from the day skybox to the night skybox as time progresses in game.


@script AddComponentMenu ("Day-Night Cycle")
public class script_DayNight extends MonoBehaviour
{
		private var second 				: float = 1.0;				// constant for 1 second
		private var minute 				: float = 60.0 * second;		// constant for 60 seconds in a minute
		private var hour   				: float = 60.0 * minute;		// constant for 60 minutes in an hour
		private var day    				: float = 24.0 * hour;		// constant for 24 hours in a day

		private var _currentEnvironmentState	: EnvironmentState;
		private var _currentTransition			: TimeOfDayTransition;
		private var _sourceEnvironmentState		: EnvironmentState;

		private var _sunLight 			: Light;

		// Current time in seconds
		private var  _timeInSeconds 	: float;

		public  var playerCamera 		: Camera;
		public  var attachedTo 			: Transform;

		public  var sun 				: Transform;
		public  var moon				: Transform;

		public  var backgroundSky		: Transform;
		public  var foregroundSky 		: Transform;

		// Number of days passed since the game had started
		static  var daysPassed			: int;

		public  var timeOfDayTransitions: TimeOfDayTransition[];
		public  var InitialStateIndex   : int;

		// Day-night cycle period in real time minutes
		public  var dayCycleInMinutes 	: float = 1;

		// Current time in hours
		public  var timeInHours			: float; 


	//Time and Light
	function Start ()
	{
		_sunLight = sun.GetComponentInChildren ( Light );
		
		if ( InitialStateIndex >= 0 && InitialStateIndex < timeOfDayTransitions.Length )
		{
			_currentTransition  = timeOfDayTransitions [ InitialStateIndex ];
		}
		else
		{	
			_currentTransition 	= timeOfDayTransitions [ 0 ];
		}
		
		_timeInSeconds 			= hour * timeInHours;
		
		_sourceEnvironmentState = GetEnvironmentStateFromTransition ( _currentTransition );
		
		ApplyEnvironmentState ( _sourceEnvironmentState );
	}

		
	public function GetSeconds() : int
	{
		return _timeInSeconds;
	}

	public function GetDaysPassed() : int
	{	
		return daysPassed;
	}

	public function GetCurrentEnvironmentState(): EnvironmentState
	{
		return _currentEnvironmentState;
	}
	
	//Color of Sky
	private function ReadEnvironmentState(): EnvironmentState
	{
			var env : EnvironmentState;
				
				env.ambientLight  		= RenderSettings.ambientLight;
				env.moonTintColor 		= moon.gameObject.renderer.material.GetColor("_Color");
				env.fogColor 			= RenderSettings.fogColor;
				env.fogDensity 			= RenderSettings.fogDensity;
				env.sunColor 			= _sunLight.color;
				env.sunIntensity 		= _sunLight.intensity;
				env.sunTintColor 		= sun.gameObject.renderer.material.GetColor("_TintColor");
				env.skyboxBlendValue 	= RenderSettings.skybox.GetFloat("_Blend");
				env.skyboxTintColor 	= RenderSettings.skybox.GetColor("_Tint");	
				env.backgroundSkyColor  = backgroundSky.gameObject.GetComponent (GUITexture).guiTexture.color;
				env.foregroundSkyColor  = foregroundSky.gameObject.GetComponent (GUITexture).guiTexture.color;		

		if ( _currentEnvironmentState != null)
		{
			env.auxColor1 = _currentEnvironmentState.auxColor1;
			env.auxColor2 = _currentEnvironmentState.auxColor2;
		}
		else
		{
			env.auxColor1 = Color.black;
			env.auxColor2 = Color.black;
		}

		return env;
	}
	

	private function ApplyEnvironmentState ( env: EnvironmentState )
	{
		RenderSettings.ambientLight = env.ambientLight;

		moon.gameObject.renderer.material.SetColor("_Color", env.moonTintColor);

		RenderSettings.fogColor 	= env.fogColor;
		RenderSettings.fogDensity 	= env.fogDensity;
		RenderSettings.fog 			= Mathf.Abs(env.fogDensity) > Mathf.Epsilon;

		RenderSettings.skybox.SetFloat("_Blend", env.skyboxBlendValue);
		RenderSettings.skybox.SetColor("_Tint", env.skyboxTintColor);

		_sunLight.color 			= env.sunColor;
		_sunLight.intensity 		= env.sunIntensity;
		
		sun.gameObject.renderer.material.SetColor("_TintColor", env.sunTintColor);
	
		backgroundSky.gameObject.GetComponent (GUITexture).guiTexture.color = env.backgroundSkyColor;
		foregroundSky.gameObject.GetComponent (GUITexture).guiTexture.color = env.foregroundSkyColor;
				
		_currentEnvironmentState 	= env;
	}

	function Update ()
	{
		// Update time
		var _realSecondToIngameSecond 	 = 24 * 60 / dayCycleInMinutes;
		
			_timeInSeconds 				+= Time.deltaTime * _realSecondToIngameSecond;

		if (_timeInSeconds >= day)
		{
			_timeInSeconds -= day;
			daysPassed++;
		}
		if (_timeInSeconds < 0)
		{
			timeInHours += day;
		}

		timeInHours = _timeInSeconds / hour;

		// Update Sun and Moon position
		transform.rotation = Quaternion.Euler(new Vector3(360 / day * _timeInSeconds, 0, 0));

		if (playerCamera != null)
		{
			transform.position = attachedTo.position;

			var ambient = _sunLight.color * _sunLight.intensity;
			playerCamera.backgroundColor = ambient;
		}

		// Update environment state
		if (_currentTransition == null)
		{
			_currentTransition = FindActiveTransition(_timeInSeconds);
			
			if (_currentTransition != null)
			{
				_sourceEnvironmentState = ReadEnvironmentState();
			}
		}

		if (_currentTransition != null)
		{
			ApplyCurrentTransition();
		}
	}

	private static function GetEnvironmentStateFromTransition(t: TimeOfDayTransition): EnvironmentState
	{
			var env : EnvironmentState;
		          
          		env.ambientLight 		= t.ambientLight;
          		env.moonTintColor 		= t.moonTintColor;
          		env.sunColor 			= t.sunColor;
          		env.sunIntensity 		= t.sunIntensity;
          		env.sunTintColor 		= t.sunTintColor;
          		env.fogColor 			= t.fogColor;
          		env.fogDensity 			= t.fogDensity;
          		env.skyboxBlendValue 	= t.skyboxBlendValue;
          		env.skyboxTintColor 	= t.skyboxTintColor;
          		env.auxColor1 			= t.auxColor1;
          		env.auxColor2 			= t.auxColor2;  
          		env.backgroundSkyColor  = t.backgroundSkyColor;
				env.foregroundSkyColor  = t.foregroundSkyColor;     
		          
		return env;
	}

	private function ApplyCurrentTransition ()
	{
		var s 			= 	_sourceEnvironmentState;
		var t 			= 	_currentTransition;

		var currentTime = 	timeInHours;
		
		if (currentTime - t.startHour < 0)
		{
			currentTime += 24;
		}

		var x = ( currentTime - t.startHour ) / t.durationInHours;
		
		if ( x > 1 )
		{
			x = 1;
			
			_currentTransition = null;
		}

		var env : EnvironmentState;
	          
	  		env.ambientLight 		= Color.Lerp ( s.ambientLight, 		t.ambientLight, 	x );
	  		env.moonTintColor 		= Color.Lerp ( s.moonTintColor, 	t.moonTintColor, 	x );
	  		env.sunColor 			= Color.Lerp ( s.sunColor, 			t.sunColor, 		x );
	  		env.sunIntensity 		= Mathf.Lerp ( s.sunIntensity, 		t.sunIntensity, 	x );
	  		env.sunTintColor 		= Color.Lerp ( s.sunTintColor, 		t.sunTintColor, 	x );
	  		env.fogColor 			= Color.Lerp ( s.fogColor, 			t.fogColor, 		x );
	  		env.fogDensity 			= Mathf.Lerp ( s.fogDensity, 		t.fogDensity, 		x );
	  		env.skyboxBlendValue 	= Mathf.Lerp ( s.skyboxBlendValue, 	t.skyboxBlendValue, x );
	  		env.skyboxTintColor 	= Color.Lerp ( s.skyboxTintColor, 	t.skyboxTintColor, 	x );
	  		env.auxColor1 			= Color.Lerp ( s.auxColor1, 		t.auxColor1, 		x );
	  		env.auxColor2 			= Color.Lerp ( s.auxColor2, 		t.auxColor2, 		x );
	  		env.backgroundSkyColor  = Color.Lerp ( s.backgroundSkyColor,t.backgroundSkyColor, x );
			env.foregroundSkyColor  = Color.Lerp ( s.foregroundSkyColor,t.foregroundSkyColor, x );	
	       
			ApplyEnvironmentState ( env );
	}

	private function FindActiveTransition ( seconds: float ): TimeOfDayTransition
	{
		var hours = seconds / hour;
		
		for ( var transition in timeOfDayTransitions )
		{
			if (transition.enabled && hours > transition.startHour && ( hours - transition.startHour ) < transition.durationInHours )
			{
				return transition;
			}
		}
		return null;
	}

}	// end of class























