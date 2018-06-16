function reenviar(url){
	location.href=url;
}


function validacionsavear(){
	var cp = document.getElementById('CP').value;
	var sex = document.getElementById('sex').value;
	console.log('dd');
	if(cp.length <= 4 || cp.length > 4){
		alert('Codigo Postal incorrecto');
		return false;
	}
	
}
