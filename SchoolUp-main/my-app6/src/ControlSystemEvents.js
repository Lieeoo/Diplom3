import './ProjectCSS.css';
import ReactDOM from 'react-dom';

import {TopPanel,LeftPanelUS} from "./Panels.js";
import {AddEducationCreateNapr,AddEducationCreateOrganization,AddEducationShowDirections,AddEducationShowOrganizations,AddEducationCreateProgram,AddEducationShowPrograms,EventCreateProgram,EventShowPrograms,EventCreateNapr,EventShowDirections} from "./See.js";

let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let port_create_organization = "http://mavr.kemsu.ru:5500/API/institution/";
let port_show_event_direction = "http://mavr.kemsu.ru:5500/API/naprOBR";
let port_find_direction = "http://mavr.kemsu.ru:5500/api/additEduc/getNAPR";
let port_create_form = "http://mavr.kemsu.ru:5500/API/formVospSob/";
let port_create_form_add_direction = "http://mavr.kemsu.ru:5500/API/formVospSob/napravlenie_set";
let port_reg_event_napravlenie = "http://mavr.kemsu.ru:5500/API/naprOBR";

let directionDelete=0;
let organizationDelete=0;
let directionAddToProgram=0;
let organizationAddToProgram=0;
let programDelete=0;

function Page() {
	window.onload = function() {
			document.getElementById('upr').className = "topbutton-page";
			document.getElementById('controlEvents').style.background = "#8ccba1";
			enterControlSystemAddEducationShowDirections();
		};
	return (
		<div>
				< TopPanel />
				<div className="mavr">
					<LeftPanelUS/>
					<div className="control-space">
					
						<div>
							<p className="text-main"> Форма воспитательных событий: </p> 
							<p className="text-main"> 
							Создать форму:  
							<EventCreateProgram />
							Удалить форму:  
							<EventShowPrograms />
							</p>
						</div>
						
						<div>
							<p className="text-main"> <hr/> Направления форм воспитательных событий:  </p>
								<p className="text-main"> Создать:  
								<EventCreateNapr />
								</p>
								<p className="text-main"> Удалить: 
								<EventShowDirections />
								</p>
						</div>					
							
					</div>
				</div>

		</div>
  );	
}
//Создание направления
export async function enterControlSystemEventCreateDirection() {
	let crnapravlenie = {
		name:document.getElementById("EventCreateDirection").value,
		};
	let responsecrnapravlenie = await fetch(port_reg_event_napravlenie, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(crnapravlenie),
		});
	let resultcrnapravlenie = await responsecrnapravlenie.json();
}

export async function enterControlSystemAddEducationShowDirections() {
	//Заполнение списков направлений
	let responsenap = await fetch(port_show_event_direction, {
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
		document.getElementById('EventShowDirectionsSelect').appendChild(p);
		let result3 = resultnap.rows[i].name;
		let p2 = document.createElement('option')
		p2.value=resultnap.rows[i].id;
		let txt2 = document.createTextNode(result3)
		p2.appendChild(txt2);
		document.getElementById('EventCreateProgramShowDirectionsSelect').appendChild(p2);
		i++;
	}
	document.getElementById('EventShowDirectionsSelect').onchange = e => {directionDelete = e.target.value;};
	document.getElementById('EventCreateProgramShowDirectionsSelect').onchange = e => {enterControlSystemEventThisDirection(e.target.value);};
	//Заполнение списков форм
	let responseprogram = await fetch(port_create_form, {
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
		document.getElementById('EventShowProgramSelect').appendChild(p);
		i++;
	}
	document.getElementById('EventShowProgramSelect').onchange = e => {programDelete = e.target.value;};
}
//Удаление направления
export async function enterControlSystemEventDeleteDirections() {
	if(directionDelete==0) alert("Направление не выбрано!");
	else{
		let program = {
		id:document.getElementById("EventShowDirectionsSelect").options[directionDelete-1].value,
		};
		let responseprogram = await fetch(port_reg_event_napravlenie, {
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

//Удаление формы
export async function enterControlSystemEventDeletePrograms() {
	if(programDelete==0) alert("Программа не выбрана!");
	else{
		alert(programDelete);
		let program = {
		id:programDelete,
		};
	let responseprogram = await fetch(port_create_form, {
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
export async function enterControlSystemEventThisDirection(a) {
	//Проверка, нет ли уже этого направления в select
	let kolstr = document.getElementById("EventCreateProgramShowDirectionsSelectChoose").options.length;
	let i=0;
	let j=0;
	while(i<kolstr){
		if(document.getElementById("EventCreateProgramShowDirectionsSelectChoose").options[i].value==a) j++;
		i++;
	}
	if (j>0){
		alert("Это направление уже есть в списке!");
	}
	else{
		//Добавление выбранного направления в select
		let responsedirection = await fetch(port_show_event_direction, {
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
		document.getElementById('EventCreateProgramShowDirectionsSelectChoose').appendChild(p);
	}
}
//Удаление направления из select-а при клике
export async function enterControlSystemEventDeleteDirectionFromSelect(a) {
	document.getElementById("EventCreateProgramShowDirectionsSelectChoose").options[a] = null;
}
//Создание формы
export async function enterControlSystemEventCreateProgram() {
	let program = {
		name:document.getElementById("EventCreateProgramNameInput").value,
		picture_Need:0,
		time_of_event:0
		};
	let responseprogram = await fetch(port_create_form, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(program),
		});
	let resultprogram = await responseprogram.json();
	//Привязка направлений к программе
	let directionCount = document.getElementById("EventCreateProgramShowDirectionsSelectChoose").options.length;
	let i=0;
	while(i<directionCount){
		let programadddirection = {
			id:resultprogram.id,
			napr_id:document.getElementById("EventCreateProgramShowDirectionsSelectChoose").options[i].value
			};
		let responseprogramadddirection = await fetch(port_create_form_add_direction, {
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
