#pragma strict
/*
// Script PlayerFaceMouth 
// Christian Krogh (www.Christiankrogh.com)
// August 12, 2014
// Description: Controls the mouth of the player (animation) 
*/

var DebugMode						: boolean		= true;

// Animations 
		var aniMouthIdle 			: AnimationClip;
		var aniMouthSleep 			: AnimationClip;
		var aniMouthSurprised 		: AnimationClip;
		var aniMouthSuspicious 		: AnimationClip;

// Checks
static 	var isMouthIdle 			: boolean		= false;
static 	var isMouthSleeping			: boolean		= false;
static 	var isMouthSurprised 		: boolean		= false;
static 	var isMouthSuspicious 		: boolean		= false;		

//////////////////
function Update () 
{
	Mouth_idle 			();	// Standard State
	Mouth_sleeping 		();
	Mouth_surprised 	();
	Mouth_suspicious 	();
}

/////////////////////
function Mouth_idle ()
{
	if ( isMouthIdle && !isMouthSleeping && !isMouthSurprised && !isMouthSuspicious ) 
	{
		isMouthSleeping		= false;
		isMouthSurprised 	= false;
		isMouthSuspicious 	= false;
	
		animation[ aniMouthIdle.name ].wrapMode = WrapMode.Loop;
		animation.CrossFade ( aniMouthIdle.name );
		Message ( "Ani State: Mouth is idle" );
	}
}
/////////////////////////
function Mouth_sleeping ()
{
	if ( isMouthSleeping && !isMouthSurprised && !isMouthSuspicious )
	{
		isMouthIdle			= false;
		isMouthSuspicious 	= false;
		isMouthSurprised	= false;
		
		animation[ aniMouthSleep.name ].wrapMode = WrapMode.Loop;
		animation.CrossFade ( aniMouthSleep.name );
		Message ( "Ani State: Mouth is sleeping" );
	}
}
/////////////////////////
function Mouth_surprised ()
{
	if ( isMouthSurprised && !isMouthSleeping && !isMouthSuspicious )
	{
		isMouthSurprised 	= false;	// To avoid animation looping

		isMouthIdle			= false;
		isMouthSleeping 	= false;
		isMouthSuspicious 	= false;
		
		animation[ aniMouthSurprised.name ].wrapMode = WrapMode.Once;
		animation.CrossFade ( aniMouthSurprised.name );
		Message ( "Ani State: Mouth is surprised" );
	}
}
/////////////////////////
function Mouth_suspicious ()
{
	if ( isMouthSuspicious && !isMouthSleeping && !isMouthSurprised )
	{
		isMouthSuspicious 	= false;	// To avoid animation looping

		isMouthIdle			= false;
		isMouthSleeping 	= false;
		isMouthSurprised 	= false;

		animation[ aniMouthSuspicious.name ].wrapMode = WrapMode.Once;
		animation.CrossFade ( aniMouthSuspicious.name );
		Message ( "Ani State: Mouth is suspicious" );
	}
}

//////////////////////////////////
function Message ( text : String ) 													// debug mode handling for development - easy toggle on/off
{	
	if ( DebugMode )
		Debug.Log ( text );
}
