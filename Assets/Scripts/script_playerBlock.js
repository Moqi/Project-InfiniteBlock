//////////////////////////////////////////////////////////////////////////
//////////////////////// Player BLock script /////////////////////////////
//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////
// Variables 

	var player			: Transform;
	var bullet 			: GameObject;
	var spawnPoint 		: GameObject;

//////////////////////////////////////////
// Start
function Start () 
{
	spawnPoint = GameObject.Find ("socketProjectile");
	
	var cannonForward : Vector3 = player.transform.forward;
	
}


//////////////////////////////////////////
// Update
function Update () 
{
	// Create a bullet
	if(Input.GetMouseButtonDown(0))
	{
		Fire();
	}

}


function Fire()
{
	var playerForward : Vector3 = player.transform.forward;
	
	var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	
	var hit : RaycastHit;
	
	if (Physics.Raycast (ray, hit, 1000))
	{

		Debug.DrawRay (transform.position, playerForward, Color.red);
			
		var newBullet = Instantiate(bullet, spawnPoint.transform.position, Quaternion.identity) as GameObject;
			
		newBullet.transform.LookAt (hit.point);
			
		newBullet.rigidbody.AddRelativeForce(Vector3.forward * 500);
		
	}
}








































