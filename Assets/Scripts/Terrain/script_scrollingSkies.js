#pragma strict


	 var scrollingSpeed  		: float 	= 30;


function Update () 
{
	var guiTex = gameObject.GetComponent (GUITexture);
	
	guiTex.pixelInset.x = PingPong(Time.time * scrollingSpeed, -1500, -500);	// PingPong between -1500 and -500 over Time.time * scrollingspeed
	guiTex.pixelInset.y = PingPong(Time.time * scrollingSpeed, -1500, -500);
}

  
function PingPong(aValue : float, aMin : float, aMax : float) : float
{
    return Mathf.PingPong(aValue, aMax-aMin) + aMin;
}      