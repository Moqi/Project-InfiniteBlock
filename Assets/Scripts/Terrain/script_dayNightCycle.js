


		var backgroundCam		: Transform;
		var backgroundImage 	: Transform;
		var backgroundSky 		: Transform;
		var foregroundSky 		: Transform;
	
		var slider 				: float;
		var slider2 			: float;
private var Hour 				: float;
private var Tod					: float;

		var sun					: Light;

		var speed = 50;

		var NightFogColor 		: Color;
		var DuskFogColor 		: Color;
		var MorningFogColor		: Color;
		var MiddayFogColor 		: Color;

		var NightAmbientLight 	: Color;
		var DuskAmbientLight 	: Color;
		var MorningAmbientLight : Color;
		var MiddayAmbientLight 	: Color;

		/*var NightTint 			: Color;
		var DuskTint 			: Color;
		var MorningTint 		: Color;
		var MiddayTint 			: Color;
		*/
		//var SkyBoxMaterial1 	: Material;
		//var SkyBoxMaterial2 	: Material;

		var SunNight 			: Color;
		var SunDay 				: Color;


function OnGUI () 
{

	if(slider >= 1.0)
	{
		slider = 0;
	}

	slider	= GUI.HorizontalSlider( Rect ( 20, 20, 200, 30 ), slider, 0,1.0 );
	Hour	= slider * 24;
	Tod		= slider2 * 24;
	
	sun.transform.localEulerAngles 	= Vector3 ( ( slider * 360 ) -90, 0, 0 );
	slider 							= slider + Time.deltaTime / speed;
	
	sun.color = Color.Lerp (SunNight, SunDay, slider * 2);

	if(slider<0.5)
	{
		slider2	= slider;
	}
	if ( slider > 0.5 )
	{
		slider2 = ( 1 - slider );
	}
	
	sun.intensity = ( slider2 - 0.2 ) * 1.7;
	
	if ( Tod < 4 )				// it is Night
	{
		SetBackgroundColor ( SunNight );
		RenderSettings.ambientLight 	 = NightAmbientLight;
		RenderSettings.fogColor 		 = NightFogColor;
	}
	if ( Tod > 4 && Tod < 6 )	// it is Dusk
	{
		LerpBackgroundColor ( SunNight, SunDay, 2 );
		RenderSettings.ambientLight 	 = Color.Lerp (NightAmbientLight, DuskAmbientLight, 	( Tod / 2 ) - 2 );
		RenderSettings.fogColor 		 = Color.Lerp (NightFogColor,DuskFogColor, 				( Tod / 2 ) - 2 );	
	}
	if ( Tod > 6 && Tod < 8 ) 	//it is Morning
	{
		SetBackgroundColor ( SunDay );
		RenderSettings.ambientLight 	 = Color.Lerp (DuskAmbientLight, MorningAmbientLight,	( Tod / 2 ) - 3 );
		RenderSettings.fogColor 		 = Color.Lerp (DuskFogColor, MorningFogColor, 			( Tod / 2 ) - 3 );
	}
	if ( Tod > 8 && Tod < 10 )	// it is getting Midday
	{
		LerpBackgroundColor ( SunDay, SunNight, 2 );
		RenderSettings.ambientLight 	 = MiddayAmbientLight;
		RenderSettings.ambientLight 	 = Color.Lerp (MorningAmbientLight, MiddayAmbientLight, ( Tod / 2 ) - 4 );
		RenderSettings.fogColor 		 = Color.Lerp (MorningFogColor,MiddayFogColor, 			( Tod / 2 ) - 4 );
	}
}

function LerpBackgroundColor ( colorOne : Color, colorTwo : Color, speed : int )
{
	backgroundCam.GetComponent (Camera).camera.backgroundColor = Color.Lerp ( colorOne, colorTwo, ( Tod / 2 ) - speed );
	backgroundImage.GetComponent (GUITexture).guiTexture.color = Color.Lerp ( colorOne, colorTwo, ( Tod / 2 ) - speed );
	backgroundSky.GetComponent   (GUITexture).guiTexture.color = Color.Lerp ( colorOne, colorTwo, ( Tod / 2 ) - speed );
	foregroundSky.GetComponent   (GUITexture).guiTexture.color = Color.Lerp ( colorOne, colorTwo, ( Tod / 2 ) - speed );
}

function SetBackgroundColor ( newColor : Color )
{
	backgroundCam.GetComponent (Camera).camera.backgroundColor = newColor;
	backgroundImage.GetComponent (GUITexture).guiTexture.color = newColor;
	backgroundSky.GetComponent   (GUITexture).guiTexture.color = newColor;
	foregroundSky.GetComponent   (GUITexture).guiTexture.color = newColor;
}
























