

	var time_		: float;
	var timeToFade 	: float     = 1.5;
	var speed 		: float		= 0.15;
	
function Start () 
{
   //print("Score: +100!");
   
   time_ = Time.time;
}


function Update () 
{
    var y = Time.deltaTime * speed;
    
    transform.Translate(0, y, 0);
    
    guiText.material.color.a = Mathf.Cos((Time.time - time_) * (( Mathf.PI / 2 ) / timeToFade));
    
    Destroy (gameObject, timeToFade);
}