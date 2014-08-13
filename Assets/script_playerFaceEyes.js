#pragma strict
/*
// Script PlayerFaceMouth 
// Christian Krogh (www.Christiankrogh.com)
// August 12, 2014
// Description: Controls the eyes of the player (animation) 
*/

var DebugMode						: boolean		= true;

// Eyes
		var leftEye					: GameObject;
		var rightEye 				: GameObject;

// Animations 
		var aniEyeIdle 				: AnimationClip;
		var aniEyeSleep 			: AnimationClip;
		var aniEyeSurprised 		: AnimationClip;
		var aniEyeSuspicious 		: AnimationClip;

// Checks
static 	var isEyesIdle 				: boolean		= false;
static 	var isEyesSleeping			: boolean		= false;
static 	var isEyesSurprised 		: boolean		= false;
static 	var isEyesSuspicious 		: boolean		= false;		

//////////////////
function Update () 
{
	Eyes_idle 			();	// Standard State
	Eyes_sleeping 		();
	Eyes_surprised 		();
	Eyes_suspicious 	();
}

/////////////////////
function Eyes_idle ()
{
	if ( isEyesIdle && !isEyesSleeping && !isEyesSurprised && !isEyesSuspicious ) 
	{
		isEyesSleeping		= false;
		isEyesSurprised 	= false;
		isEyesSuspicious 	= false;
	
		PlayAnimation ( aniEyeIdle );
		Message ( "Ani State: Eyes are idle" );
	}
}
/////////////////////////
function Eyes_sleeping ()
{
	if ( isEyesSleeping && !isEyesSurprised && !isEyesSuspicious )
	{
		isEyesIdle			= false;
		isEyesSurprised 	= false;
		isEyesSuspicious 	= false;
		
		PlayAnimation ( aniEyeSleep );
		Message ( "Ani State: Eyes are sleeping" );
	}
}
/////////////////////////
function Eyes_surprised ()
{
	if ( isEyesSurprised && !isEyesSleeping && !isEyesSuspicious )
	{
		isEyesSurprised 	= false;	// To avoid animation looping

		isEyesIdle			= false;
		isEyesSleeping 		= false;
		isEyesSuspicious 	= false;
		
		PlayAnimation ( aniEyeSurprised );
		Message ( "Ani State: Eyes are surprised" );
	}
}
/////////////////////////
function Eyes_suspicious ()
{
	if ( isEyesSuspicious && !isEyesSleeping && !isEyesSurprised )
	{
		isEyesSuspicious 	= false;	// To avoid animation looping

		isEyesIdle			= false;
		isEyesSleeping 		= false;
		isEyesSurprised 	= false;

		PlayAnimation ( aniEyeSuspicious );
		Message ( "Ani State: Eyes are suspicious" );
	}
}

//////////////////////////////////
function Message ( text : String ) 													// debug mode handling for development - easy toggle on/off
{	
	if ( DebugMode )
		Debug.Log ( text );
}


//////////////////////////////////
function PlayAnimation ( animation : AnimationClip )
{
	// Left eye
	leftEye.animation[ animation.name ].wrapMode = WrapMode.Loop;
	leftEye.animation.CrossFade ( animation.name );
	// Right eye
	rightEye.animation[ animation.name ].wrapMode = WrapMode.Loop;
	rightEye.animation.CrossFade ( animation.name );
}





















