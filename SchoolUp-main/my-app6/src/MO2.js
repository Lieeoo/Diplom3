import './ProjectCSS.css';
import ReactDOM from 'react-dom';

import {TopPanel, LeftPanelO} from "./Panels.js";
import {OCl2, OCl3, OCl4, OCl5, OCl6, OCl7, OCl8, OCl9, OClNORM} from "./See.js";

let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let port_find_students = "http://mavr.kemsu.ru:5500/API/student/:id";
let port_show_family = "http://mavr.kemsu.ru:5500/API/family/";


function Page() {
	window.onload = function() {
			document.getElementById('mo').className = "topbutton-page";
			document.getElementById('o2').style.background = "#8ccba1";
			enterocl();
		};
	return (
		<div>
				< TopPanel />
				<div className="Test">
					<LeftPanelO/>
					<div className="workspaceClassWork">
						<div className="displayFlexColumnNorm">
						<div>Составить отчеты:</div>
						<div>Класс:<select id="clSel">
						</select></div>
							<OClNORM/>
						<div>
							<button id="reportButton2" className="profile-button"><img src="https://i.ibb.co/tDWy41D/create-document.png" className="profile-button2"></img></button> 
						</div>
						</div>
					</div>
				</div>

		</div>
  );	
}

async function enterocl() {
	let responseo = await fetch(port_reg_cl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resulto = await responseo.json();
	let i=0;
	while(i<resulto.count){
		let result2 = resulto.rows[i].number + resulto.rows[i].letter;
		let p = document.createElement('option')
		p.value=resulto.rows[i].id;
		let txt = document.createTextNode(result2)
		p.appendChild(txt);
		document.getElementById('clSel').appendChild(p);
		i++;
	}
	document.getElementById('reportButton2').onclick = function() {enterocl2();};
	
}

async function enterocl2() {
	if (document.getElementById('reportQuantityName').checked){
		let ocl = {
			class_ID:document.getElementById('clSel').value,
		};
		let responseocl = await fetch(port_find_students, {
			method: 'POST',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(ocl)
			});
		let resultocl = await responseocl.json();
		let i = 0;
		var q=new Array();
		while (i<resultocl.count){
			q.push(resultocl.rows[i].name);
			i++;
		}
		alert(q);
	}
	if (document.getElementById('reportQuantity').checked){
		let ocl = {
			class_ID:document.getElementById('clSel').value,
		};
		let responseocl = await fetch(port_find_students, {
			method: 'POST',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(ocl)
			});
		let resultocl = await responseocl.json();
		alert(resultocl.count);
	}
	if (document.getElementById('reportSexMale').checked){
		let ocl = {
			class_ID:document.getElementById('clSel').value,
		};
		let responseocl = await fetch(port_find_students, {
			method: 'POST',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(ocl)
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.count){
			if(resultocl.rows[i].sex==2) k++;
			i++;
		}
		alert(k);
	}
	if (document.getElementById('reportSexFemale').checked){
		let ocl = {
			class_ID:document.getElementById('clSel').value,
		};
		let responseocl = await fetch(port_find_students, {
			method: 'POST',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(ocl)
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.count){
			if(resultocl.rows[i].sex==1) k++;
			i++;
		}
		alert(k);
	}
	if (document.getElementById('reportFamilyAll').checked){
		let responseocl = await fetch(port_show_family, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultocl = await responseocl.json();
		alert(resultocl.length);
	}
	if (document.getElementById('reportFamilyFull').checked){
		let responseocl = await fetch(port_show_family, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.length){
			if(resultocl[i].family_status==1) k++;
			i++;
		}
		alert(k);
	}
	if (document.getElementById('reportFamilyNoFull').checked){
		let responseocl = await fetch(port_show_family, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.length){
			if(resultocl[i].family_status==2||resultocl[i].family_status==3) k++;
			i++;
		}
		alert(k);
	}
	if (document.getElementById('reportFamilyGuardian').checked){
		let responseocl = await fetch(port_show_family, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.length){
			if(resultocl[i].family_status==4||resultocl[i].family_status==5) k++;
			i++;
		}
		alert(k);
	}
	if (document.getElementById('reportFamilyLonelyFathers').checked){
		let responseocl = await fetch(port_show_family, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.length){
			if(resultocl[i].family_status==3) k++;
			i++;
		}
		alert(k);
	}
	if (document.getElementById('reportFamilyLonelyMothers').checked){
		let responseocl = await fetch(port_show_family, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.length){
			if(resultocl[i].family_status==2) k++;
			i++;
		}
		alert(k);
	}
	if (document.getElementById('reportFamilyMaterialConditionLow').checked){
		let responseocl = await fetch(port_show_family, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.length){
			if(resultocl[i].material_condition=="низкий доход") k++;
			i++;
		}
		alert(k);
	}
	if (document.getElementById('reportFamilyMaterialConditionMiddle').checked){
		let responseocl = await fetch(port_show_family, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.length){
			if(resultocl[i].material_condition=="средний доход") k++;
			i++;
		}
		alert(k);
	}
	if (document.getElementById('reportFamilyMaterialConditionMany').checked){
		let responseocl = await fetch(port_show_family, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.length){
			if(resultocl[i].material_condition=="вполне благополучная семья") k++;
			i++;
		}
		alert(k);
	}
	if (document.getElementById('reportFamilyEducationHigh').checked){
		let responseocl = await fetch(port_show_family, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.length){
			switch(resultocl[i].family_status) {
				case 1:
				if(resultocl[i].educationMother=="высшее") k++;
				if(resultocl[i].educationFather=="высшее") k++;
				break;
				case 2:
				if(resultocl[i].educationMother=="высшее") k++;
				break;
				case 3:
				if(resultocl[i].educationFather=="высшее") k++;
				break;
				case 4:
				if(resultocl[i].educationMother=="высшее") k++;
				break;
				case 5:
				if(resultocl[i].educationFather=="низкий") k++;
				break;
			}
			i++;
		}
		alert(k);
	}
	if (document.getElementById('reportFamilyEducationHighNoFull').checked){
		let responseocl = await fetch(port_show_family, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.length){
			switch(resultocl[i].family_status) {
				case 1:
				if(resultocl[i].educationMother=="незаконченное высшее") k++;
				if(resultocl[i].educationFather=="незаконченное высшее") k++;
				break;
				case 2:
				if(resultocl[i].educationMother=="незаконченное высшее") k++;
				break;
				case 3:
				if(resultocl[i].educationFather=="незаконченное высшее") k++;
				break;
				case 4:
				if(resultocl[i].educationMother=="незаконченное высшее") k++;
				break;
				case 5:
				if(resultocl[i].educationFather=="незаконченное высшее") k++;
				break;
			}
			i++;
		}
		alert(k);
	}
	if (document.getElementById('reportFamilyEducationMiddleSpecial').checked){
		let responseocl = await fetch(port_show_family, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.length){
			switch(resultocl[i].family_status) {
				case 1:
				if(resultocl[i].educationMother=="средне-специальное") k++;
				if(resultocl[i].educationFather=="средне-специальное") k++;
				break;
				case 2:
				if(resultocl[i].educationMother=="средне-специальное") k++;
				break;
				case 3:
				if(resultocl[i].educationFather=="средне-специальное") k++;
				break;
				case 4:
				if(resultocl[i].educationMother=="средне-специальное") k++;
				break;
				case 5:
				if(resultocl[i].educationFather=="средне-специальное") k++;
				break;
			}
			i++;
		}
		alert(k);
	}
	if (document.getElementById('reportFamilyEducationMiddle').checked){
		let responseocl = await fetch(port_show_family, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.length){
			switch(resultocl[i].family_status) {
				case 1:
				if(resultocl[i].educationMother=="среднее") k++;
				if(resultocl[i].educationFather=="среднее") k++;
				break;
				case 2:
				if(resultocl[i].educationMother=="среднее") k++;
				break;
				case 3:
				if(resultocl[i].educationFather=="среднее") k++;
				break;
				case 4:
				if(resultocl[i].educationMother=="среднее") k++;
				break;
				case 5:
				if(resultocl[i].educationFather=="среднее") k++;
				break;
			}
			i++;
		}
		alert(k);
	}
	if (document.getElementById('reportFamilyEducationMiddleNoFull').checked){
		let responseocl = await fetch(port_show_family, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultocl = await responseocl.json();
		let i = 0;
		let k=0;
		while (i<resultocl.length){
			switch(resultocl[i].family_status) {
				case 1:
				if(resultocl[i].educationMother=="неполное среднее") k++;
				if(resultocl[i].educationFather=="неполное среднее") k++;
				break;
				case 2:
				if(resultocl[i].educationMother=="неполное среднее") k++;
				break;
				case 3:
				if(resultocl[i].educationFather=="неполное среднее") k++;
				break;
				case 4:
				if(resultocl[i].educationMother=="неполное среднее") k++;
				break;
				case 5:
				if(resultocl[i].educationFather=="неполное среднее") k++;
				break;
			}
			i++;
		}
		alert(k);
	}
}

export default Page;