import '../../../../ProjectCSS.css';
import ReactDOM from 'react-dom';

import {TopPanel,LeftPanelOfControlPage} from "../../NavigationPanels/NavigationPanels.jsx";
import {EventCreateNapr,EventCreateOrganization,EventShowDirections,EventShowOrganizations,EventCreateProgram,EventShowPrograms} from "../../../../See.js";

let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let port_create_organization = "http://mavr.kemsu.ru:5500/API/institution/";
let port_show_direction = "http://mavr.kemsu.ru:5500/api/napravlenie";
let port_find_direction = "http://mavr.kemsu.ru:5500/api/additEduc/getNAPR";
let port_create_program = "http://mavr.kemsu.ru:5500/API/additEduc/";
let port_create_program_add_direction = "http://mavr.kemsu.ru:5500/API/additEduc/addNAPR";

let directionDelete=0;
let organizationDelete=0;
let directionAddToProgram=0;
let organizationAddToProgram=0;
let programDelete=0;

function Page() {
	window.onload = function() {
			document.getElementById('upr').className = "topbutton-page";
			document.getElementById('controlEvents').style.background = "#8ccba1";
			enterControlSystemEventsShowDirections();
		};
	return (
		<div>
				< TopPanel />
				<div className="mavr">
					<LeftPanelOfControlPage/>
					<div className="control-space">
					
						<div>
							<p className="text-main"> Программа дополнительного образования: </p> 
							<p className="text-main"> 
							Создать программу:  
							<EventCreateProgram />
							Удалить программу:  
							<EventShowPrograms />
							</p>
						</div>
						
						<div>
							<p className="text-main"> <hr/> Направления воспитательной работы:  </p>
								<p className="text-main"> Создать:  
								<EventCreateNapr />
								</p>
								<p className="text-main"> Удалить: 
								<EventShowDirections />
								</p>
						</div>
						
						<div>
							<p className="text-main"> <hr/> Организации дополнительного образования:  </p>
							<p className="text-main"> Создать:  
							<EventCreateOrganization />
							Удалить:  
							<EventShowOrganizations />
							</p>
						</div>
						
							
					</div>
				</div>

		</div>
  );	
}
//Создание организации для дополнительных образований
export async function enterControlSystemEvents() {
	let organization = {
		name:document.getElementById("EventCreateOrganizationInputName").value,
		descriprtion:document.getElementById("EventCreateOrganizationInputDescriprtion").value,
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
	alert(JSON.stringify(resultorganization));
}

export async function enterControlSystemEventsShowDirections() {
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
	document.getElementById('showDirectionsSelect').onchange = e => {directionDelete = e.target.value; alert(directionDelete);};
	document.getElementById('createProgramShowDirectionsSelect').onchange = e => {enterControlSystemEventsThisDirection(e.target.value);};
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
	document.getElementById('showOrganizationsSelect').onchange = e => {organizationDelete = e.target.value; alert(organizationDelete);};
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
export async function enterControlSystemEventsDeleteDirections() {
	if(directionDelete==0) alert("Направление не выбрано!");
	else alert(directionDelete);
}
//Удаление учреждения
export async function enterControlSystemEventsDeleteOrganizations() {
	if(organizationDelete==0) alert("Учреждение не выбрано!");
	else alert(organizationDelete);
}
//Удаление программы
export async function enterControlSystemEventsDeletePrograms() {
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
export async function enterControlSystemEventsThisDirection(a) {
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
export async function enterControlSystemEventsDeleteDirectionFromSelect(a) {
	document.getElementById("createProgramShowDirectionsSelectChoose").options[a] = null;
}
//Создание программы
export async function enterControlSystemEventsCreateProgram() {
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
