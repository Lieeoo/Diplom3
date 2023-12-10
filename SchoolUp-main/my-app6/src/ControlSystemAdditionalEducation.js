import './ProjectCSS.css';
import ReactDOM from 'react-dom';

import {TopPanel,LeftPanelUS} from "./Panels.js";
import {AddEducationCreateNapr,AddEducationCreateOrganization,AddEducationShowDirections,AddEducationShowOrganizations,AddEducationCreateProgram,AddEducationShowPrograms} from "./See.js";

let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let port_create_organization = "http://mavr.kemsu.ru:5500/API/institution/";
let port_show_direction = "http://mavr.kemsu.ru:5500/api/napravlenie";
let port_find_direction = "http://mavr.kemsu.ru:5500/api/additEduc/getNAPR";
let port_create_program = "http://mavr.kemsu.ru:5500/API/additEduc/";
let port_create_program_add_direction = "http://mavr.kemsu.ru:5500/API/additEduc/addNAPR";
let port_reg_napravlenie = "http://mavr.kemsu.ru:5500/api/napravlenie/";

let directionDelete=0;
let organizationDelete=0;
let directionAddToProgram=0;
let organizationAddToProgram=0;
let programDelete=0;

function Page() {
	window.onload = function() {
			document.getElementById('upr').className = "topbutton-page";
			document.getElementById('controlAdditionalEducatuion').style.background = "#8ccba1";
			enterControlSystemAddEducationShowDirections();
		};
	return (
		<div>
				< TopPanel />
				<div className="mavr">
					<LeftPanelUS/>
					<div className="control-space">
					
						<div>
							<p className="text-main"> Программа дополнительного образования: </p> 
							<p className="text-main"> 
							Создать программу:  
							<AddEducationCreateProgram />
							Удалить программу:  
							<AddEducationShowPrograms />
							</p>
						</div>
						
						<div>
							<p className="text-main"> <hr/> Направления воспитательной работы:  </p>
								<p className="text-main"> Создать:  
								<AddEducationCreateNapr />
								</p>
								<p className="text-main"> Удалить: 
								<AddEducationShowDirections />
								</p>
						</div>
						
						<div>
							<p className="text-main"> <hr/> Организации дополнительного образования:  </p>
							<p className="text-main"> Создать:  
							<AddEducationCreateOrganization />
							Удалить:  
							<AddEducationShowOrganizations />
							</p>
						</div>
						
							
					</div>
				</div>

		</div>
  );	
}
//Создание организации для дополнительных образований
export async function enterControlSystemAddEducation() {
	let organization = {
		name:document.getElementById("AddEducationCreateOrganizationInputName").value,
		descriprtion:document.getElementById("AddEducationCreateOrganizationInputDescriprtion").value,
		};
	let responseorganization = await fetch(port_create_organization, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(organization),
		});
	let resultorganization = await responseorganization.json();
}

export async function enterControlSystemAddEducationShowDirections() {
	//Заполнение списков направлений
	let responsenap = await fetch(port_show_direction, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resultnap = await responsenap.json();
	
	let i=0;
	while(i<resultnap.count){
		let result2 = resultnap.rows[i].name;
		let p = document.createElement('option')
		p.value=resultnap.rows[i].id;
		let txt = document.createTextNode(result2)
		p.appendChild(txt);
		document.getElementById('showDirectionsSelect').appendChild(p);
		let result3 = resultnap.rows[i].name;
		let p2 = document.createElement('option')
		p2.value=resultnap.rows[i].id;
		let txt2 = document.createTextNode(result3)
		p2.appendChild(txt2);
		document.getElementById('createProgramShowDirectionsSelect').appendChild(p2);
		i++;
	}
	document.getElementById('showDirectionsSelect').onchange = e => {directionDelete = e.target.value;};
	document.getElementById('createProgramShowDirectionsSelect').onchange = e => {enterControlSystemAddEducationThisDirection(e.target.value);};
	//Заполнение списков учреждений
	let responseshowallorganizations = await fetch(port_create_organization, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resultshowallorganizations = await responseshowallorganizations.json();
	
	i=0;
	while(i<resultshowallorganizations.count){
		let resultshowallorganizations2 = resultshowallorganizations.rows[i].name;
		let p = document.createElement('option')
		p.value=resultshowallorganizations.rows[i].id;
		let txt = document.createTextNode(resultshowallorganizations2)
		p.appendChild(txt);
		document.getElementById('showOrganizationsSelect').appendChild(p);
		let resultshowallorganizations3 = resultshowallorganizations.rows[i].name;
		let p2 = document.createElement('option')
		p2.value=resultshowallorganizations.rows[i].id;
		let txt2 = document.createTextNode(resultshowallorganizations3)
		p2.appendChild(txt2);
		document.getElementById('createProgramShowOrganizationsSelect').appendChild(p2);
		i++;
	}
	document.getElementById('showOrganizationsSelect').onchange = e => {organizationDelete = e.target.value;};
	document.getElementById('createProgramShowOrganizationsSelect').onchange = e => {organizationAddToProgram = e.target.value;};
	//Заполнение списков программ
	let responseprogram = await fetch(port_create_program, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resultprogram = await responseprogram.json();
	
	i=0;
	while(i<resultprogram.count){
		let resultprogram2 = resultprogram.rows[i].name;
		let p = document.createElement('option')
		p.value=resultprogram.rows[i].id;
		let txt = document.createTextNode(resultprogram2)
		p.appendChild(txt);
		document.getElementById('showProgramSelect').appendChild(p);
		i++;
	}
	document.getElementById('showProgramSelect').onchange = e => {programDelete = e.target.value;};
}
//Удаление направления
export async function enterControlSystemAddEducationDeleteDirections() {
	if(directionDelete==0) alert("Направление не выбрано!");
	else{
		let program = {
		id:document.getElementById("showDirectionsSelect").options[directionDelete-1].value,
		};
		let responseprogram = await fetch(port_reg_napravlenie, {
		method: 'DELETE',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(program),
		});
	let resultprogram = await responseprogram.json();
	}
}
//Удаление учреждения
export async function enterControlSystemAddEducationDeleteOrganizations() {
	if(organizationDelete==0) alert("Учреждение не выбрано!");
}
//Удаление программы
export async function enterControlSystemAddEducationDeletePrograms() {
	if(programDelete==0) alert("Программа не выбрана!");
	else{
		let program = {
		id:programDelete,
		};
	let responseprogram = await fetch(port_create_program, {
		method: 'DELETE',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(program),
		});
	let resultprogram = await responseprogram.json();
	}
}
//Управление select-ом, куда помещаются выбранные направления
export async function enterControlSystemAddEducationThisDirection(a) {
	//Проверка, нет ли уже этого направления в select
	let kolstr = document.getElementById("createProgramShowDirectionsSelectChoose").options.length;
	let i=0;
	let j=0;
	while(i<kolstr){
		if(document.getElementById("createProgramShowDirectionsSelectChoose").options[i].value==a) j++;
		i++;
	}
	if (j>0){
		alert("Это направление уже есть в списке!");
	}
	else{
		//Добавление выбранного направления в select
		let responsedirection = await fetch(port_show_direction, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultdirection = await responsedirection.json();
		let h=0;
		while(a!=resultdirection.rows[h].id) h++;
		let thisDirection = resultdirection.rows[h].name;
		let p = document.createElement('option')
		p.value=resultdirection.rows[h].id;
		let txt = document.createTextNode(thisDirection);
		p.appendChild(txt);
		document.getElementById('createProgramShowDirectionsSelectChoose').appendChild(p);
	}
}
//Удаление направления из select-а при клике
export async function enterControlSystemAddEducationDeleteDirectionFromSelect(a) {
	document.getElementById("createProgramShowDirectionsSelectChoose").options[a] = null;
}
//Создание программы
export async function enterControlSystemAddEducationCreateProgram() {
	let program = {
		id_institution:document.getElementById("createProgramShowOrganizationsSelect").value,
		name:document.getElementById("createProgramNameInput").value,
		descriprtion:document.getElementById("createProgramDescriprtionInput").value
		};
	let responseprogram = await fetch(port_create_program, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(program),
		});
	let resultprogram = await responseprogram.json();
	//Привязка направлений к программе
	let directionCount = document.getElementById("createProgramShowDirectionsSelectChoose").options.length;
	let i=0;
	while(i<directionCount){
		let programadddirection = {
			id:resultprogram.id,
			napr_id:document.getElementById("createProgramShowDirectionsSelectChoose").options[i].value
			};
		let responseprogramadddirection = await fetch(port_create_program_add_direction, {
			method: 'POST',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(programadddirection),
			});
		let resultprogramadddirection = await responseprogramadddirection.json();
		i++;
	}
}

export default Page;
