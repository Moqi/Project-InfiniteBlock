#pragma strict
//////////////////////////////////////////////////////////////////////////
/////////////////////////////// House script /////////////////////////////
//////////////////////////////////////////////////////////////////////////

		var smoke 			: Transform;
		var smokeSpawnDelay : float 		= 1.5;
		var smokeDecayDelay : float 		= 1.5;

		var mySwitch 		: boolean 		= true;
	
private var ps				: ParticleSystem;
		var psColor			: Color;
	
	
function Start () 
{
	ps = smoke.GetComponent (ParticleSystem);
}

function Update () 
{   
	//Debug.Log("ParticleSystem color: " + psColor);
	//Debug.Log("My switch: " + mySwitch);
}


function OnTriggerEnter (other : Collider) 
{
	if (other.gameObject.tag == "Player")
	{		
		
		mySwitch = !mySwitch;	//(switch now equals false)
		
		if (mySwitch == true)
		{
			//Debug.Log("Enter True");
			//yield WaitForSeconds(smokeSpawnDelay);
			
			smoke.gameObject.SetActive(true);
			
			//return null;
			//psColor = Color.Lerp(Color(0, 0, 0, 0), Color(1, 1, 1, 1), Time.time / 5);
    
    		//ps.startColor = psColor;
		}
		
		/*if (mySwitch == false)
		{
			Debug.Log("Enter False");
			//psColor = Color(0, 0, 0, 0);
			
			//yield WaitForSeconds(smokeDecayDelay);
			
			smoke.active = false;
			
			return null;
			
			
		}*/
	}
}

function OnTriggerExit (other : Collider)
{
	if (other.gameObject.tag == "Player")
	{
		if (mySwitch == true)
		{
			//return null;
		}
		else 
		{
			Debug.Log("Enter False");
			
			smoke.gameObject.SetActive(false);
		}
	}
}



