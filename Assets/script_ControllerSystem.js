#pragma strict
/*
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// ControllerSystem for the mainCharacter ////////////////////////////////////

// Christian Krogh (www.Christiankrogh.com)
// July, 2014
// Description: Controls all character (player) actions for movement / interaction

// Main variables to use are below:
// moveDirection 	= player forward direction
// targetDirection  = camera forward direction
// inAirVelocity    = speed of player (mainly for jumps)

/////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

		var skinMeshRenderer 				: SkinnedMeshRenderer;			// need skinned mesh renderer to toggle hide/unhide option
		var cameraObject					: Camera;						// player camera (usually main camera)
		var colliderAttack 					: GameObject;					// collider used by player to attact with
		var colliderHurt 					: GameObject;					// collider for player to get hurt
		var canWalk 						: boolean 			= true;		
		var canJog							: boolean 			= true;
		var canRun 							: boolean			= true;
		var canSprint						: boolean 			= true;
		var canJumpAll						: boolean			= true;
		var canJump_1						: boolean 			= true;
		var canJump_2						: boolean 			= true;
		var canJump_3						: boolean			= true;
		var canJumpFromCrouch				: boolean 			= true;
		var canJumpFromObject				: boolean			= true;
		var canControlDecent				: boolean			= true;
		var canCrouch 						: boolean			= true;
		var canCrouchHoldKeyDown			: boolean 			= true;
		var canAngleSlide					: boolean 			= true;
		var canIdleRotate					: boolean			= true;
		var canJumpFromPad					: boolean			= true;
		var canFall							: boolean			= true;
		var canLand							: boolean			= true;
		var canHurt							: boolean			= true;
		var canAttack						: boolean			= true;
		var canKillzone						: boolean			= true;
		var canGrab							: boolean			= true;
		var canPush							: boolean			= true;
		var autoPush						: boolean			= true;
		var keyboardControls				: boolean 			= false;
		
		var speedIdleMax 					: float				= 0.2;		// maximun idle speed before moving
		var speedIdleRotate					: float				= 1.2;		// rotate speed on idle turn
		var speedWalk						: float				= 3.0;		
		var speedJog						: float				= 5.0;
		var speedRun						: float				= 8.0;
		var speedSprint						: float				= 12.0;
		var speedSlide 						: float 			= 3.0;
		var speedPush						: float				= 1.5;
		var speedGrab 						: float				= 2.0;
		var speedJumpFromCrouch				: float				= 3.0;
		var speedJumpFromObject				: float				= 10.0;
		var speedCrouch 					: float				= 0.0;
		var speedInAir						: float				= 1.0;		// var inAirControlAcceleration
		var speedSmoothing 					: float				= 10.0;		// amount to smooth by
		var speedRotating 					: float				= 50.0;		// amount to rotate by
		
		var currentSpeed 					: float				= 10.0;		// store speed of character (walk, jog, run, sprint)
		var currentJumpHeight 				: float 			= 0.0;		// current height of character
		
		var jump_1	 						: float 			= 8.0;		// height for first jump
		var jump_2	 						: float				= 10.0;		// height for second jump
		var jump_3	 						: float				= 15.0;		// height for third jump
		
		var jumpFromCrouch 					: float				= 14.0;		// height for jump from crouch
		var jumpFromObject					: float				= 8.0;		// height for jump from object
		var jumpFromObjectTag				: String			= "wall";	// tag name of object player can jump from
		
		var jumpComboTime 					: float				= 1.5;		// combo time between jumps to go to next jump mode
		var jumpDelayTime					: float				= 0.5;		// time delay amount (currently used in jump 1)
		
		var crouchControllerHeight 			: float 			= 1.0;		// value for height of controller box
		var crouchControllerCenterY			: float				= 0.5;		// amount to move controller down
		
		var slideTag						: String			= "slide";	// tag name for any object that player can slide on
		var slideThreshold 					: float				= 0.88;		// amount of angle when slide-able
		var slideControllableSpeed 			: float 			= 5.0;		// speed where player still has control sliding down
		
		var pushPower 						: float				= 0.5;		// how hard the player can push
		var pushLayers						: LayerMask			= -1;		// Layers for pushing objects
		
		var gravity 						: float				= 20.0;		// gravity (downward pull only, added to vector.y)
		var health 							: int				= 100;		// hold health count
		
		var aniIdle_1 						: AnimationClip;
		var aniIdle_2 						: AnimationClip;
		var aniWalk							: AnimationClip;
		var aniJog 							: AnimationClip;
		var aniRun 							: AnimationClip;
		var aniSprint 						: AnimationClip;
		var aniCrouchIdle 					: AnimationClip;
		var aniLeanLeft 					: AnimationClip;
		var aniLeanRight 					: AnimationClip;
		var aniJumpFromCrouch 				: AnimationClip;
		var aniJumpFromObject 				: AnimationClip;
		var aniJump_01 						: AnimationClip;
		var aniJump_02 						: AnimationClip;
		var aniJump_03 						: AnimationClip;
		var aniJumpFall 					: AnimationClip;
		var aniJumpLand						: AnimationClip;
		var aniSlide 						: AnimationClip;
		var aniGrab 						: AnimationClip;
		var aniGrabIdle 					: AnimationClip;
		var aniPush 						: AnimationClip;
		var aniLand 						: AnimationClip;
		
		var DebugMode 						: boolean 			= true;		// sets mode to debug and prints messages to console 
		
		@HideInInspector													// hide characterController in the inspector 
		var characterController				: CharacterController;			// instance of character controller
		@HideInInspector
static  var moveSpeed 						: float 			= 0.0;		// current player moving speed
		
private var moveDirection 					: Vector3 			= Vector3.zero;	// store initial forward direction of player
private var inAirVelocity 					: Vector3 			= Vector3.zero; // current currentSpeed while in air

		
private var smoothDirection 				: float 			= 10.0;		// amount to smooth camera catching up to player
private var jumpRepeatTime 					: float				= 0.15;		// amount of time between jumps to make combo happen 
private var jumpFromObjectDelay 			: float				= 0.15;		// delay time so player can't just jump constantly from object
private var jumpDelay 						: float				= 0.15;		// standard jump delay time
private var groundedDelay 					: float				= 0.15;		//	
private var cameraTimeDelay 				: float				= 0.0;		// delay on camera time (to allow smoother follow after player moves)
private var sprintLastTime 					: float 			= 0.0;		// time last sprint happened
private var speedReset 						: float 			= 0.0;		// reset speed
private var verticalSpeed 					: float				= 0.0;		// speed for vertical use
private var walkTimeStart 					: float				= 0.0;		// store when user started walking to transition to jog

private var isControllable 					: boolean 			= true;		// control for all movement (could be public)
private var isMoving 						: boolean 			= false;	// is player pressing any keys
static 	var isCrouching 					: boolean 			= false;	// crouching enabled 			
private var isJumping_1 					: boolean 			= true;		// jumping 1 enabled 
private var isJumping_2 					: boolean 			= false;	// jumping 2 enabled
private var isJumping_3 					: boolean			= false;	// jumping 3 enabled
private var isLanding 						: boolean 			= false;	// is player landing
private var isKilled 						: boolean 			= false;	// killzone for player
private var curTime 						: float 			= 0.0;		// current time
private var showPlayer 						: boolean 			= true;		// hide / show player toggle
private var resetCharController 			: boolean 			= false; 	// resets controller for character toggle
private var objectJumpContactNormal 		: Vector3;						// average normal of the last touched geometry 
private var touchObjectJumpTime				: float 			= -1.0;		// when did we touch the wall the first time during this jump session
private var wallJumpTimeOut 				: float 			= 0.5;		// delay time for jumping on walls again
private var jumpableObject 					: boolean			= false;	// toggle for jumping off walls 
private var controllerHeightDefault 		: float;						// value of controller original height
private var controllerCenterYDefault 		: float;						// value of controller original center Y
private var slideDirection 					: Vector3;						// direction player is sliding
private var collisionFlags					: CollisionFlags;				// Last collision flag returned from control move

private var coin							: int				= 0;
private var key 							: int				= 0;

private var jumpingFromPad					: boolean 			= false;	// disable jumpPad till ready
private var playerStartPosition 			: Vector3;						// value to hold player position at start
private var playerStartRotation 			: Quaternion;					// value to hold player rotation at start
private var enemyHit 						: boolean;						// enable enemy hitting player
private var enemyHurt 						: GameObject;					// health reset to store original health value
private var resetHealth 					: int;							// health reset to store original health value  						
private var hitDirection					: Vector3 			= Vector3(0, 10, -2.5); // Hit direction to send player flying when hit by enemy
private var pushObject						: Transform 		= null;		// store push game Object
private var grabObject						: Transform			= null;		// store grab / pickup / putdown game Object
private var tempSpeed 						: float				= 0.0;		// hold current speed


@script RequireComponent ( CharacterController )							// if no characterController assigned, apply one -later
																
/////////////////
function Reset ()															// reset all variables and options to null (0)
{
	if (!isControllable)
	{
		Input.ResetInputAxes();												// stop all inputs if not controllable
	}
}

/////////////////
function Awake ()															// before starting, get moveDirectin forward from this.gameObject
{
	moveDirection = transform.TransformDirection ( Vector3.forward );		// assign moveDirection local to world forward 
}																				

/////////////////																																																																									
function Start () 															// Initialize variables
{
	characterController 		= GetComponent ( CharacterController );		// initialize characterController
	characterController.tag 	= "Player";									// set tag name to "player"
	controllerHeightDefault 	= characterController.height;				// set controllerHeightDefault to controller starting height
	controllerCenterYDefault 	= characterController.center.y;				// set controllerCenterYDefault to controllers starting center.y
	animation.Stop ();														// set animation to stop
	AnimationClickCheck ();													// check animation clips loaded, print missing ones 
	playerStartPosition 		= transform.position;						// store player initial positionm, move player back to this position if dead
	playerStartRotation 		= Quaternion.LookRotation (transform.position); // store player initial rotation
	resetHealth 				= health;									// store health value in resetHealth
	tempSpeed 					= currentSpeed;								// store tempSpeed of player (used when player pushes)
}

///////////////////////////////
function UpdateMoveDirection () 
{

}


// Tutorial link: http://vimeo.com/album/1765875/video/33034361




















