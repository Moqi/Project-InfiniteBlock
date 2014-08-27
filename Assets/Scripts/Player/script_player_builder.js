#pragma strict
//////////////////////////////////////////////////////////////////////////
/////////////////////// PlayerBuilder script /////////////////////////////
//////////////////////////////////////////////////////////////////////////

		var aniAttack 					: AnimationClip;
		var toolTip						: Transform;
static  var buildModeEnabled 			: boolean;

		var blockContainer  			: Transform;
		var mouseCursorObject 			: Transform;
		var layerMask 					: LayerMask;
private var mousePosX 					: int;
private var mousePosY 					: int;
private var mousePosZ 					: int;

// Building blocks:
		var woodBlock 					: Transform;
		var leafBlock					: Transform;
		var stoneBlock					: Transform;
		var copperBlock					: Transform;
		var silverBlock					: Transform;
		var goldBlock					: Transform;
		var legendaryBlock				: Transform;

// Resources:
private var woodInStock 				: int;
private var leafInStock 				: int; 
private var stoneInStock 				: int; 
private var copperInStock 				: int; 
private var silverInStock 				: int; 
private var goldInStock 				: int; 
private var legendaryInStock 			: int; 

private var possibleToBuild_wood		: boolean;
private var possibleToBuild_leaf		: boolean;
private var possibleToBuild_stone		: boolean;
private var possibleToBuild_copper		: boolean;
private var possibleToBuild_silver		: boolean;
private var possibleToBuild_gold		: boolean;
private var possibleToBuild_legendary	: boolean;

private	var key_1_active 				: boolean	= false;
private	var key_2_active 				: boolean	= false;
private	var key_3_active 				: boolean	= false;
private var key_4_active 				: boolean	= false;
private	var key_5_active 				: boolean	= false;
private	var key_6_active 				: boolean	= false;
private var key_7_active 				: boolean	= false;

/////////////////
function Start ()
{	
	buildModeEnabled 	= false;
}

//////////////////
function Update () 
{
	ResourceChecker ();
	
	if ( Input.GetKeyDown ( KeyCode.B ) )
	{
		buildModeEnabled = !buildModeEnabled;
		
		if ( buildModeEnabled == true )		{ToolTip ( "Build Mode enabled..." );}	else	{ToolTip ( "Build Mode disabled..." );}
	}
	
	if ( buildModeEnabled == true )
	{	
		for (var child : Transform in mouseCursorObject) 
		{
    		child.renderer.enabled = true;
		}
		MousePosition ();
	}
	else 
	{	
		for (var child : Transform in mouseCursorObject) 
		{
    		child.renderer.enabled = false;
		}
	}
}

/////////////////////////
function MousePosition ()
{
	 var hitPosition 	: Vector3;
     var hit 			: RaycastHit = new RaycastHit ();    

   	 if ( Physics.Raycast ( Camera.main.ScreenPointToRay ( Input.mousePosition ), hit, Mathf.Infinity, layerMask ) )
     {
     		Debug.Log ( hit.collider.name );
     		mousePosX = hit.point.x;
     		mousePosY = hit.point.y;
     		mousePosZ = hit.point.z;
     		
     		if ( hit.collider.tag == "snapPoint" ) // Snap
     		{
     			hitPosition = hit.collider.transform.position;
     		}
     		else 
     		{
     			hitPosition = Vector3 ( mousePosX - 0.5, mousePosY + 0.5, mousePosZ - 0.5 );
     		}		
     }
     		
     mouseCursorObject.transform.position = hitPosition;
     
	 BlockPicker ();   
}


///////////////////////
function BlockPicker ()
{

// Key 1: WoodBlock		
	if ( Input.GetKeyDown ( KeyCode.Alpha1 ) )	{	key_1_active = !key_1_active;	 ToolTip( "Numeric key 1: 'Wood' selected" );	}
	
	if ( key_1_active == true && possibleToBuild_wood == true )
	{
		key_2_active = false;	
		key_3_active = false;
		key_4_active = false;
		key_5_active = false;
		key_6_active = false;
		key_7_active = false;
		if ( (Input.GetMouseButtonDown ( 0 ) || Input.GetKeyDown ( KeyCode.E ) ) ) {	BuildBlock ( woodBlock, "treeLogPiece" );	}
	}
// Key 2: leafBlock		
	if ( Input.GetKeyDown ( KeyCode.Alpha2 ) )	{	key_2_active = !key_2_active;	ToolTip( "Numeric key 2: 'Leaf' selected" );	}
	
	if ( key_2_active == true && possibleToBuild_leaf == true )
	{
		key_1_active = false;	
		key_3_active = false;
		key_4_active = false;
		key_5_active = false;
		key_6_active = false;
		key_7_active = false;
		if ( (Input.GetMouseButtonDown ( 0 ) || Input.GetKeyDown ( KeyCode.E ) ) ) {	BuildBlock ( leafBlock, "bush" );	}
	}
// Key 3: stoneBlock		
	if ( Input.GetKeyDown ( KeyCode.Alpha3 ) )	{	key_3_active = !key_3_active;	ToolTip( "Numeric key 3: 'Stone' selected" );	}
	
	if ( key_3_active == true && possibleToBuild_stone == true )
	{
		key_1_active = false;	
		key_2_active = false;
		key_4_active = false;
		key_5_active = false;
		key_6_active = false;
		key_7_active = false;
		if ( (Input.GetMouseButtonDown ( 0 ) || Input.GetKeyDown ( KeyCode.E ) ) ) {	BuildBlock ( stoneBlock, "rock" );	}
	}	
// Key 4: copperBlock		
	if ( Input.GetKeyDown ( KeyCode.Alpha4 ) )	{	key_4_active = !key_4_active;	ToolTip( "Numeric key 4: 'Copper' selected" );	}
	
	if ( key_4_active == true && possibleToBuild_copper == true )
	{
		key_1_active = false;	
		key_2_active = false;
		key_3_active = false;
		key_5_active = false;
		key_6_active = false;
		key_7_active = false;
		if ( (Input.GetMouseButtonDown ( 0 ) || Input.GetKeyDown ( KeyCode.E ) ) ) {	BuildBlock ( copperBlock, "rareObject_cobber" );	}
	}	
// Key 5: silverBlock		
	if ( Input.GetKeyDown ( KeyCode.Alpha5 ) )	{	key_5_active = !key_5_active;	ToolTip( "Numeric key 5: 'Silver' selected" );	}
	
	if ( key_5_active == true && possibleToBuild_silver == true )
	{
		key_1_active = false;	
		key_2_active = false;
		key_3_active = false;
		key_4_active = false;
		key_6_active = false;
		key_7_active = false;
		if ( (Input.GetMouseButtonDown ( 0 ) || Input.GetKeyDown ( KeyCode.E ) ) ) {	BuildBlock ( silverBlock, "veryRareObject_silver" );	}
	}	
// Key 6: goldBlock		
	if ( Input.GetKeyDown ( KeyCode.Alpha6 ) )	{	key_6_active = !key_6_active;	ToolTip( "Numeric key 6: 'Gold' selected" );	}
	
	if ( key_6_active == true && possibleToBuild_gold == true )
	{
		key_1_active = false;	
		key_2_active = false;
		key_3_active = false;
		key_4_active = false;
		key_5_active = false;
		key_7_active = false;
		if ( (Input.GetMouseButtonDown ( 0 ) || Input.GetKeyDown ( KeyCode.E ) ) ) {	BuildBlock ( goldBlock, "epicObject_gold" );	}
	}
// Key 7: legendaryBlock		
	if ( Input.GetKeyDown ( KeyCode.Alpha6 ) )	{	key_7_active = !key_7_active;	ToolTip( "Numeric key 7: 'Legendary' selected" );	}
	
	if ( key_7_active == true && possibleToBuild_legendary == true )
	{
		key_1_active = false;	
		key_2_active = false;
		key_3_active = false;
		key_4_active = false;
		key_5_active = false;
		key_6_active = false;
		if ( (Input.GetMouseButtonDown ( 0 ) || Input.GetKeyDown ( KeyCode.E ) ) ) {	BuildBlock ( legendaryBlock, "legendaryObject_" );	}
	}	
}


//////////////////////
function BuildBlock ( buildBlock : Transform, specificTag : String )
{	
	var sceneManagerObject 						= GameObject.FindWithTag("scenemanager");
	var sceneManager 	: script_sceneManager 	= sceneManagerObject.GetComponent(script_sceneManager);	

	var blockStartScale = Vector3.zero;
	var blockEndScale 	= Vector3(1, 1, 1);
	var t : float 		= 0.0;

	var newBlock 				= Instantiate ( buildBlock, mouseCursorObject.transform.position, Quaternion.identity );
	
	newBlock.gameObject.tag 	= specificTag;
		
	newBlock.localScale 		= blockStartScale;	

	newBlock.transform.parent 	= blockContainer;

		// Subtracting from resources based on type of block		
		if ( buildBlock == woodBlock )
		{
			sceneManager.fragment_wood 		-= 1;
		}
		if ( buildBlock == leafBlock )
		{
			sceneManager.fragment_leaf 		-= 1;
		}
		if ( buildBlock == stoneBlock )
		{
			sceneManager.fragment_stone 	-= 1;
		}
		if ( buildBlock == copperBlock )
		{
			sceneManager.fragment_copper 	-= 1;
		}
		if ( buildBlock == silverBlock )
		{
			sceneManager.fragment_silver 	-= 1;
		}
		if ( buildBlock == goldBlock )
		{
			sceneManager.fragment_gold 		-= 1;
		}
		if ( buildBlock == legendaryBlock )
		{
			sceneManager.fragment_legendary -= 1;
		}
																																													
	while ( t < 1.0 && Input.GetMouseButton ( 0 ) || Input.GetKey ( KeyCode.E ) )
	{
		// Animation	
		animation[ aniAttack.name ].wrapMode = WrapMode.Loop;
	
		animation.CrossFade ( aniAttack.name, 0.3f );
	
		if ( Input.GetKey ( KeyCode.LeftShift ) )
		{
			t += Time.deltaTime * 5.0;
		}
		else 
		{
			t += Time.deltaTime / 20.0;
		}
		
		newBlock.transform.localScale = Vector3.Lerp (newBlock.localScale, blockEndScale, t );
		
		yield;
	}
	
	if ( newBlock.transform.localScale.magnitude >= blockEndScale.magnitude )
	{
		animation.Stop ();
	}
}


///////////////////////////
function ResourceChecker ()
{
	var sceneManagerObject 						= GameObject.FindWithTag("scenemanager");
	var sceneManager 	: script_sceneManager 	= sceneManagerObject.GetComponent(script_sceneManager);	

	woodInStock 	 = sceneManager.fragment_wood;
	leafInStock 	 = sceneManager.fragment_leaf;
	stoneInStock 	 = sceneManager.fragment_stone;
	copperInStock 	 = sceneManager.fragment_copper;
	silverInStock 	 = sceneManager.fragment_silver;
	goldInStock 	 = sceneManager.fragment_gold;
	legendaryInStock = sceneManager.fragment_legendary;

	if ( woodInStock 		>= 1 ) { possibleToBuild_wood 		= true; } else { possibleToBuild_wood 		= false; }
	if ( leafInStock 		>= 1 ) { possibleToBuild_leaf 		= true; } else { possibleToBuild_leaf 		= false; }
	if ( stoneInStock 		>= 1 ) { possibleToBuild_stone 		= true; } else { possibleToBuild_stone		= false; }
	if ( copperInStock 		>= 1 ) { possibleToBuild_copper 	= true; } else { possibleToBuild_copper 	= false; }
	if ( silverInStock 		>= 1 ) { possibleToBuild_silver 	= true; } else { possibleToBuild_silver 	= false; }
	if ( goldInStock 		>= 1 ) { possibleToBuild_gold 		= true; } else { possibleToBuild_gold 		= false; }
	if ( legendaryInStock	>= 1 ) { possibleToBuild_legendary 	= true; } else { possibleToBuild_legendary 	= false; }
}

////////////////////////////////////////////////////////////
function ToolTip (text : String )
{	
 	var newToolTip 	: Transform = Instantiate ( toolTip, Vector3(0.4, 0.7, 0), Quaternion.identity );
 
 	newToolTip.guiText.text	= text;		
}










