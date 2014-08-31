#pragma strict

private var startcolor 		: Color;


function OnMouseEnter () 
{
    startcolor 					= renderer.material.color;
    
	renderer.material.color = Color ( startcolor.r + 0.15, startcolor.g + 0.15, startcolor.b + 0.15 );
}

function OnMouseExit ()
{
    renderer.material.color 	= startcolor;

}