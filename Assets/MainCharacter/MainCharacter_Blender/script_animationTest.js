#pragma strict

	var aniTest 	: AnimationClip;



function Update () 
{
	animation[ aniTest.name ].wrapMode = WrapMode.Loop;
	
	animation.CrossFade ( aniTest.name, 0.3f );
}