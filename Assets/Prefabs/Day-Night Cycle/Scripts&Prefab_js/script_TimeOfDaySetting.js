#pragma strict

public class TimeOfDayTransition 
{
	public var name				: String;
	public var enabled			: boolean;

	public var startHour		: float;
	public var durationInHours	: float;

	public var ambientLight		: Color;

	public var skyboxBlendValue	: float;
	public var skyboxTintColor	: Color;

	public var fogColor			: Color;
	public var fogDensity		: float;

	public var sunColor			: Color;
	public var sunIntensity		: float;
	public var sunTintColor		: Color;

	public var moonTintColor	: Color;

	public var auxColor1		: Color;
	public var auxColor2		: Color;
	
	public var backgroundSkyColor : Color;
	public var foregroundSkyColor : Color;

}

public class EnvironmentState extends MonoBehaviour
{
	public static var skyboxBlendValue	: float;
	public static var skyboxTintColor	: Color;

	public static var fogColor			: Color;
	public static var fogDensity		: float;

	public static var sunIntensity		: float;
	public static var sunColor			: Color;
	public static var sunTintColor		: Color;

	public static var ambientLight		: Color;

	public static var moonTintColor		: Color;

	public static var auxColor1			: Color;
	public static var auxColor2			: Color;
	
	public static var backgroundSkyColor : Color;
	public static var foregroundSkyColor : Color;
}


