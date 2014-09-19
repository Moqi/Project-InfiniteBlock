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
		var aniEyeBlink 			: AnimationClip;
		var aniEyeSemiClosed		: AnimationClip;
		var aniEyeCloseToOpen		: AnimationClip;

static var manualAnimationPick 		: boolean 		= false;

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
	if ( isEyesIdle && !isEyesSleeping && !isEyesSurprised && !isEyesSuspicious && !manualAnimationPick ) 
	{
		isEyesSleeping		= false;
		isEyesSurprised 	= false;
		isEyesSuspicious 	= false;
	
		PlayAnimation ( aniEyeIdle, WrapMode.Loop );
		Message ( "Ani State: Eyes are idle" );
	}
}
/////////////////////////
function Eyes_sleeping ()
{
	if ( isEyesSleeping && !isEyesSurprised && !isEyesSuspicious && !manualAnimationPick )
	{
		isEyesIdle			= false;
		isEyesSurprised 	= false;
		isEyesSuspicious 	= false;
		
		PlayAnimation ( aniEyeSleep, WrapMode.Loop );
		Message ( "Ani State: Eyes are sleeping" );
	}
}
/////////////////////////
function Eyes_surprised ()
{
	if ( isEyesSurprised && !isEyesSleeping && !isEyesSuspicious && !manualAnimationPick )
	{
		isEyesSurprised 	= false;	// To avoid animation looping

		isEyesIdle			= false;
		isEyesSleeping 		= false;
		isEyesSuspicious 	= false;
		
		PlayAnimation ( aniEyeSurprised, WrapMode.Loop );
		Message ( "Ani State: Eyes are surprised" );
	}
}
/////////////////////////
function Eyes_suspicious ()
{
	if ( isEyesSuspicious && !isEyesSleeping && !isEyesSurprised && !manualAnimationPick )
	{
		isEyesSuspicious 	= false;	// To avoid animation looping

		isEyesIdle			= false;
		isEyesSleeping 		= false;
		isEyesSurprised 	= false;

		PlayAnimation ( aniEyeSuspicious, WrapMode.Loop );
		Message ( "Ani State: Eyes are suspicious" );
	}
}

/////////////////////////
function Eyes_blinking ()
{
	PlayAnimation ( aniEyeBlink, WrapMode.Once );
	Message ( "Ani State: Eyes are blinking" );
}

/////////////////////////
function Eyes_semiClosed ()
{
	PlayEyeHolderAnimation ( aniEyeSemiClosed, WrapMode.ClampForever );
}

/////////////////////////
function Eyes_fromCloseToOpen ()
{	
	PlayEyeHolderAnimation ( aniEyeCloseToOpen, WrapMode.ClampForever );
}

//////////////////////////////////
function Message ( text : String ) 													// debug mode handling for development - easy toggle on/off
{	
	if ( DebugMode )
		Debug.Log ( text );
}


//////////////////////////////////
function PlayAnimation ( animation : AnimationClip, wrapMode : WrapMode )
{
	// Left eye
	leftEye.animation[ animation.name ].wrapMode = wrapMode;
	leftEye.animation.CrossFade ( animation.name );
	// Right eye
	rightEye.animation[ animation.name ].wrapMode = wrapMode;
	rightEye.animation.CrossFade ( animation.name );
}

//////////////////////////////////
function PlayEyeHolderAnimation ( animation : AnimationClip, wrapMode : WrapMode )
{
	gameObject.animation[ animation.name ].wrapMode = wrapMode;
	gameObject.animation.CrossFade ( animation.name );
}



















