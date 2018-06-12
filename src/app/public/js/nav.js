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

function CrearFila(op){
	switch (op) {
		case 1:
			var tr = document.createElement('tr');
			var td1 = document.createElement('td');
			var td2 = document.createElement('td');
			var td3 = document.createElement('td');
			var td4 = document.createElement('td');
			var td5 = document.createElement('td');
			var td6 = document.createElement('td');
			var td7 = document.createElement('td');

			var inp1 = document.createElement('input');
			inp1.setAttribute('type','text');
			inp1.setAttribute('class','form-control');
			var inp2 = document.createElement('input');
			inp2.setAttribute('type','text');
			inp2.setAttribute('class','form-control');
			var inp3 = document.createElement('input');
			inp3.setAttribute('type','text');
			inp3.setAttribute('class','form-control');
			var inp4 = document.createElement('input');
			inp4.setAttribute('type','text');
			inp4.setAttribute('class','form-control');
			var inp5 = document.createElement('input');
			inp5.setAttribute('type','text');
			inp5.setAttribute('class','form-control');

			var save = document.createElement('button');
			save.setAttribute('class','btn btn-secondary');
			save.appendChild(document.createTextNode('Guardar'));
			var cancel = document.createElement('button');
			cancel.setAttribute('class','btn btn-secondary');
			cancel.appendChild(document.createTextNode('Cancelar'));
			

			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
			tr.appendChild(td6);
			tr.appendChild(td7);

			td1.appendChild(inp1);
			td2.appendChild(inp2);
			td3.appendChild(inp3);
			td4.appendChild(inp4);
			td5.appendChild(inp5);
			td6.appendChild(save);
			td7.appendChild(cancel);

			var tbody = t1.lastElementChild;
			var lasttr = tbody.lastElementChild;
			
			tbody.insertBefore(tr,lasttr);

			cancel.onclick = () =>{
				tbody.removeChild(tr);	
			}
			save.onclick = () =>{
				var ntd1 = document.createElement('td');
				var cont1 = document.createTextNode(inp1.value);
				ntd1.appendChild(cont1);
				tr.replaceChild(ntd1,td1);

				var ntd2 = document.createElement('td');
				var cont2 = document.createTextNode(inp2.value);
				ntd2.appendChild(cont2);
				tr.replaceChild(ntd2,td2);

				var ntd3 = document.createElement('td');
				var cont3 = document.createTextNode(inp3.value);
				ntd3.appendChild(cont3);
				tr.replaceChild(ntd3,td3);

				var ntd4 = document.createElement('td');
				var cont4 = document.createTextNode(inp4.value);
				ntd4.appendChild(cont4);
				tr.replaceChild(ntd4,td4);

				var ntd5 = document.createElement('td');
				var cont5 = document.createTextNode(inp5.value);
				ntd5.appendChild(cont5);
				tr.replaceChild(ntd5,td5);

				var edit = document.createElement('button');
				var cedit = document.createTextNode('Editar');
				edit.appendChild(cedit);
				edit.setAttribute('class','btn btn-secundary');
				tr.replaceChild(edit,save);
				
			}
			break;
	
		default:
			break;
	}
}

