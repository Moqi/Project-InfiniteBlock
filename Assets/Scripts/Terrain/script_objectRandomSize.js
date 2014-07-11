#pragma strict

function Start () 
{
	transform.localScale += Vector3(Random.Range(- 10, 10), Random.Range(- 10, 10), Random.Range(- 10, 10));
}

