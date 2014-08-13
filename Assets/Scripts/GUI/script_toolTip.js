#pragma strict


		var time_		: float;
		var timeToFade 	: float     = 1.5;

function Start () 
{
	time_ = Time.time;
}

function Update () 
{
	guiText.material.color.a = Mathf.Cos((Time.time - time_) * (( Mathf.PI / 2 ) / timeToFade));
	
	Destroy (gameObject, timeToFade);
}