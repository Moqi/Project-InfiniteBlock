#pragma strict

/////////////////////////////////////////////////////////
/////////// script for detail bilboards /////////////////

private var parentPos   : Transform;

function Start()
{
	yield WaitForSeconds(2);

	parentPos = transform.parent;
	
	transform.position = parentPos.position + Vector3(Random.Range(-0.4, 0.4), 0.7, Random.Range(-0.4, 0.4));
	
	transform.localScale = Vector3.zero;
	//transform.localScale += Vector3(Random.Range(0, 0.005), Random.Range(- 0.005, 0.013), Random.Range(0, 0.005));
	
	var endScale    : Vector3;
	var t 			= 0.0;
	var speed 		= Random.Range ( 1.0, 2.5);

	endScale = Vector3(Random.Range(0, 0.005), Random.Range(- 0.005, 0.013), Random.Range(0, 0.005));

	while ( t < 1.0)
	{
		t += Time.deltaTime * speed;
			
		transform.localScale = Vector3.Lerp(this.transform.localScale, endScale, t);
						
		yield;	
	}
}



function Update()
{
    transform.rotation = Camera.main.transform.rotation;
}