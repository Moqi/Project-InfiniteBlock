#pragma strict
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// mainBlock Script ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////



		var endScale    : Vector3;
private var t 			= 0.0;
private var speed 		= Random.Range ( 1.0, 2.5);





///////////////////////////////////////
function Start ()
{		
	this.transform.localScale 		= Vector3.zero;
	
	LerpSize (this.transform);
}





///////////////////////////////////////
function LerpSize ( other : Transform )
{
	//ndScale = Vector3 ( Random.Range ( 15.0, 25.0 ), 15.0, Random.Range ( 15.0, 25.0 ) );
	
	//endScale = Vector3 ( 10.0, 10.0, 10.0 );
	
	while ( t < 1.0)
	{
		t += Time.deltaTime * speed;
			
		other.localScale = Vector3.Lerp(other.localScale, endScale, t);
						
		yield;	
	}
}				
///////////////////////////////////////			