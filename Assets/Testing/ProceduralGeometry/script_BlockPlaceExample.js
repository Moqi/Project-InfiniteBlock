#pragma strict
#pragma downcast

	public  var terrain 	: GameObject;
	private var tScript 	: script_PolygonGenerator;
	public  var target 		: GameObject;
	private var layerMask 	: LayerMask = (1 << 0 ); 



function Start () 
{
	tScript = terrain.GetComponent("script_PolygonGenerator");
}

function Update () 
{
	var hit : RaycastHit;
	
	var distance : float = Vector3.Distance( transform.position, target.transform.position );
	
	if ( Physics.Raycast ( transform.position, ( target.transform.position - transform.position ).normalized, hit, distance, layerMask ) )
	{
		Debug.DrawLine( transform.position, hit.point, Color.red );
		
		var point : Vector2 = new Vector2( hit.point.x, hit.point.y );
		point += ( new Vector2 ( hit.normal.x, hit.normal.y )) * 0.5f;
		
		Debug.DrawLine( hit.point, new Vector3( point.x,point.y,hit.point.z ),Color.magenta );
		
		tScript.blocks[ Mathf.RoundToInt ( point.x - 0.5f ), Mathf.RoundToInt ( point.y + 0.5f )] = 1; // = 1 means dirt/stone
		tScript.update = true;
	} 
	else 
	{
		Debug.DrawLine( transform.position, target.transform.position, Color.blue );
	}
}