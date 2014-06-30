/////////////////////////////////////////////////////////
/////////// script for detail bilboards /////////////////




function Start()
{
	var parentPos : Transform = transform.parent;
	transform.position = parentPos.position + Vector3(Random.Range(-0.4, 0.4), 0.7, Random.Range(-0.4, 0.4));
}



function Update()
{
    transform.rotation = Camera.main.transform.rotation;
}