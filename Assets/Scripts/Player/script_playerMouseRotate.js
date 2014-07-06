


function Update()
{
		var mouseScreenPosition : Vector3 = new Vector3(Input.mousePosition.x, Input.mousePosition.y, Camera.main.transform.position.z);
 
        var mouseWorldPosition  : Vector3 = Camera.main.ScreenToWorldPoint(mouseScreenPosition);        
       
        mouseWorldPosition.y = 0;
        
        print(mouseWorldPosition);

        
        transform.LookAt(mouseWorldPosition, Vector3.up);
}